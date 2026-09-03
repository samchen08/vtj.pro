/**
 * 大模型计划输出解析（Architect / Editor 共用）
 * 识别三种情况：
 * 1. 有效计划（含 answer 直接回答，或含 intent 规划）→ 返回 plan
 * 2. 模型自报错误（{"error": "..."}）→ 返回 error，最终失败时反馈给用户
 * 3. 无效输出（空白 / 非 JSON / 仅有碎片）→ plan 与 error 均为空
 */
import type { ToolRegistry } from '../../../../framework';
import type {
  PlanResult,
  PlanningContextRequest,
  StepResultRef
} from '../types/agent';
import { extractJsonObject } from './json';
import { isStepResultRef, validatePlannedToolParameters } from './directTool';

export interface PlanValidationIssue {
  path: string;
  message: string;
}

export interface PlanOutputParseResult {
  plan: PlanResult | null;
  preflight?: PlanningContextRequest;
  /** 大模型明确输出的错误说明（如缺少关键信息），最终失败时反馈给用户 */
  error?: string;
  /** 完整校验错误，仅用于 Architect 纠错重试。 */
  correction?: string;
  issues?: PlanValidationIssue[];
}

function collectStepRefs(value: unknown, refs: StepResultRef[] = []) {
  if (isStepResultRef(value)) {
    refs.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectStepRefs(item, refs));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStepRefs(item, refs));
  }
  return refs;
}

function parsePreflight(value: unknown): PlanningContextRequest | undefined {
  if (!value || typeof value !== 'object') return;
  const request = value as PlanningContextRequest;
  const skills = request.skills;
  const queries = request.queries;
  if (
    skills !== undefined &&
    (!Array.isArray(skills) ||
      skills.some((item) => typeof item !== 'string' || !item.trim()))
  ) {
    return;
  }
  if (
    queries !== undefined &&
    (!Array.isArray(queries) ||
      queries.some(
        (item) =>
          typeof item !== 'string' &&
          (!item ||
            typeof item !== 'object' ||
            typeof item.action !== 'string' ||
            (item.parameters !== undefined && !Array.isArray(item.parameters)))
      ))
  ) {
    return;
  }
  if (!skills?.length && !queries?.length) return;
  return request;
}

/**
 * 归一化计划：统一步骤类型，并补全可由工具定义确定的参数和依赖。
 */
function normalizePlan(plan: any, registry?: ToolRegistry): PlanResult {
  const steps = Array.isArray(plan.steps)
    ? plan.steps.map((s: any) => {
        const tool =
          s.type === 'tool_call' && typeof s.toolName === 'string'
            ? registry?.get(s.toolName)
            : undefined;
        const parameters =
          s.parameters === undefined && tool?.parameters.length === 0
            ? []
            : s.parameters;
        const refs = collectStepRefs(parameters).map((ref) => ref.$ref.stepId);
        const dependsOn =
          refs.length &&
          (s.dependsOn === undefined || Array.isArray(s.dependsOn))
            ? [...new Set([...(s.dependsOn || []), ...refs])]
            : s.dependsOn;
        return {
          ...s,
          type: s.type === 'code' ? 'vue_code' : s.type,
          ...(parameters === undefined ? {} : { parameters }),
          ...(dependsOn === undefined ? {} : { dependsOn })
        };
      })
    : plan.steps === undefined
      ? []
      : plan.steps;
  return {
    ...plan,
    safety: plan.safety || (steps.length === 0 ? 'readonly' : plan.safety),
    steps
  };
}

export function validatePlan(
  plan: PlanResult,
  registry?: ToolRegistry
): PlanValidationIssue[] {
  const issues: PlanValidationIssue[] = [];
  const steps = plan.steps;
  const validSafety = ['readonly', 'write', 'destructive'];
  const validTypes = ['tool_call', 'vue_code', 'diff', 'text'];

  if (!validSafety.includes(plan.safety)) {
    issues.push({ path: 'safety', message: '安全等级无效' });
  }
  if (!Array.isArray(steps)) {
    issues.push({ path: 'steps', message: '必须是数组' });
    return issues;
  }
  if (
    plan.contextKeys !== undefined &&
    (!Array.isArray(plan.contextKeys) ||
      plan.contextKeys.some((key) => typeof key !== 'string'))
  ) {
    issues.push({ path: 'contextKeys', message: '必须是字符串数组' });
  }

  const ids = new Set<string>();
  for (const [index, step] of steps.entries()) {
    const path = `steps[${index}]`;
    if (!step || typeof step !== 'object') {
      issues.push({ path, message: '必须是对象' });
      continue;
    }
    if (typeof step.id !== 'string' || !step.id.trim()) {
      issues.push({ path: `${path}.id`, message: '不能为空' });
    } else if (ids.has(step.id)) {
      issues.push({ path: `${path}.id`, message: '步骤 ID 重复' });
    } else {
      ids.add(step.id);
    }
    if (!validTypes.includes(step.type)) {
      issues.push({ path: `${path}.type`, message: '步骤类型无效' });
    }
    if (typeof step.description !== 'string' || !step.description.trim()) {
      issues.push({ path: `${path}.description`, message: '不能为空' });
    }
    if (step.dependsOn !== undefined && !Array.isArray(step.dependsOn)) {
      issues.push({ path: `${path}.dependsOn`, message: '必须是数组' });
    }
    if (step.target?.includes('{{')) {
      issues.push({ path: `${path}.target`, message: '不能使用模板占位符' });
    }

    if (step.type === 'tool_call') {
      if (typeof step.toolName !== 'string' || !step.toolName.trim()) {
        issues.push({ path: `${path}.toolName`, message: '不能为空' });
        continue;
      }
      const tool = registry?.get(step.toolName);
      if (registry && !tool) {
        issues.push({ path: `${path}.toolName`, message: '工具不存在' });
        continue;
      }
      if (registry && step.toolName === 'getSkills') {
        issues.push({
          path: `${path}.toolName`,
          message: 'getSkills 必须在规划前预检中调用'
        });
      }
      if (step.parameters === undefined) {
        if (registry) {
          issues.push({
            path: `${path}.parameters`,
            message: '必须显式提供参数；动态值使用 $ref'
          });
        }
      } else if (!Array.isArray(step.parameters)) {
        issues.push({ path: `${path}.parameters`, message: '必须是数组' });
      } else if (
        tool &&
        step.parameters !== undefined &&
        !(
          step.toolName === 'active' &&
          step.parameters.length === 0 &&
          step.dependsOn?.length === 1 &&
          ['createPage', 'createBlock'].includes(
            steps.find((candidate) => candidate?.id === step.dependsOn![0])
              ?.toolName || ''
          )
        ) &&
        !validatePlannedToolParameters(step.parameters, tool.parameters)
      ) {
        issues.push({
          path: `${path}.parameters`,
          message: '参数不符合工具定义'
        });
      }
      for (const ref of collectStepRefs(step.parameters)) {
        if (!step.dependsOn?.includes(ref.$ref.stepId)) {
          issues.push({
            path: `${path}.dependsOn`,
            message: `必须依赖被引用步骤 ${ref.$ref.stepId}`
          });
        }
        const sourceIndex = steps.findIndex(
          (candidate) => candidate.id === ref.$ref.stepId
        );
        if (sourceIndex >= index) {
          issues.push({
            path: `${path}.parameters`,
            message: `只能引用前置步骤 ${ref.$ref.stepId}`
          });
        }
      }
      if (
        step.toolName === 'createPage' &&
        /(子页面|子级|父级|作为.+(?:目录|布局).+下)/.test(step.description) &&
        (!step.parameters || step.parameters.length < 2)
      ) {
        issues.push({
          path: `${path}.parameters`,
          message: '创建子页面必须提供 parentId 或步骤结果引用'
        });
      }
      if (tool?.risk === 'destructive' && plan.safety !== 'destructive') {
        issues.push({
          path: 'safety',
          message: '破坏性工具必须标记 destructive'
        });
      }
      if (tool?.risk === 'write' && plan.safety === 'readonly') {
        issues.push({ path: 'safety', message: '写入工具不能标记 readonly' });
      }
    } else if (
      (step.type === 'vue_code' || step.type === 'diff') &&
      plan.safety === 'readonly'
    ) {
      issues.push({ path: 'safety', message: '代码写入不能标记 readonly' });
    }
  }

  const graph = new Map(
    steps.map(
      (step) =>
        [step.id, Array.isArray(step.dependsOn) ? step.dependsOn : []] as const
    )
  );
  for (const [index, step] of steps.entries()) {
    for (const dependency of Array.isArray(step.dependsOn)
      ? step.dependsOn
      : []) {
      if (!ids.has(dependency)) {
        issues.push({
          path: `steps[${index}].dependsOn`,
          message: `引用了不存在的步骤 ${dependency}`
        });
      }
    }
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const hasCycle = (id: string): boolean => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    const cyclic = (graph.get(id) || []).some(
      (dependency) => graph.has(dependency) && hasCycle(dependency)
    );
    visiting.delete(id);
    visited.add(id);
    return cyclic;
  };
  if (steps.some((step) => hasCycle(step.id))) {
    issues.push({ path: 'steps', message: '步骤依赖存在循环' });
  }
  const nestedPageIndexes = steps
    .map((step, index) => ({ step, index }))
    .filter(
      ({ step }) =>
        step.toolName === 'createPage' && (step.parameters?.length || 0) > 1
    );
  if (
    nestedPageIndexes.length &&
    !steps.some(
      (step, index) =>
        step.toolName === 'getPageTreeValidation' &&
        index > nestedPageIndexes[nestedPageIndexes.length - 1].index
    )
  ) {
    issues.push({
      path: 'steps',
      message: '创建嵌套页面后必须调用 getPageTreeValidation 验证页面树'
    });
  }
  return issues;
}

export function parsePlanOutput(
  text: string,
  registry?: ToolRegistry
): PlanOutputParseResult {
  const json = extractJsonObject(text);
  if (!json) return { plan: null };
  let parsed: any;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { plan: null };
  }
  const preflight = parsePreflight(parsed?.needsContext);
  if (preflight) return { plan: null, preflight };
  // 模型自报错误：{"error": "..."} 提取错误说明，而非丢弃后使用通用文案
  if (typeof parsed?.error === 'string' && parsed.error.trim()) {
    return { plan: null, error: parsed.error.trim() };
  }
  let plan: PlanResult | null = null;
  // 直接回答（无步骤）需携带 answer 文本
  if (typeof parsed?.answer === 'string' && parsed.answer.trim()) {
    plan = normalizePlan(parsed, registry);
  }
  // 规划需携带 intent（steps 缺失时回退为直接回答，兼容旧行为）
  if (!plan && typeof parsed?.intent === 'string' && parsed.intent.trim()) {
    plan = normalizePlan(parsed, registry);
  }
  if (!plan) return { plan: null };
  const issues = validatePlan(plan, registry);
  const issueMessages = issues.map(
    (issue) => `${issue.path}: ${issue.message}`
  );
  return issues.length
    ? {
        plan: null,
        issues,
        error: issueMessages.slice(0, 3).join('；'),
        correction: issueMessages.join('；')
      }
    : { plan };
}
