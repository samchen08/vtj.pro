import type { Engine, ToolParameter } from '../../../../framework';
import type { EditorStepResult, PlanStep, StepResultRef } from '../types/agent';

export interface DirectToolCall {
  action: string;
  parameters: unknown[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isStepResultRef(value: unknown): value is StepResultRef {
  if (!isObject(value) || !isObject(value.$ref)) return false;
  if (!hasText(value.$ref.stepId) || !hasText(value.$ref.path)) return false;
  const segments = value.$ref.path.split('.');
  const blocked = new Set(['__proto__', 'prototype', 'constructor']);
  return (
    segments[0] === 'result' &&
    segments.length > 1 &&
    segments
      .slice(1)
      .every(
        (segment) =>
          !blocked.has(segment) &&
          (/^[A-Za-z_$][\w$]*$/.test(segment) || /^\d+$/.test(segment))
      )
  );
}

function getPath(value: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (Array.isArray(current) && /^\d+$/.test(key)) {
      return current[Number(key)];
    }
    return isObject(current) ? current[key] : undefined;
  }, value);
}

function getStepResult(
  stepId: string,
  editorResults: EditorStepResult[]
): unknown {
  const result = [...editorResults]
    .reverse()
    .find((item) => item.step.id === stepId && item.done && !item.error);
  const turn = result
    ? [...result.turns].reverse().find((item) => item.toolResult?.success)
    : undefined;
  return turn?.toolResult?.result;
}

function resolveValue(
  value: unknown,
  editorResults: EditorStepResult[]
): unknown {
  if (isStepResultRef(value)) {
    const resolved = getPath(
      { result: getStepResult(value.$ref.stepId, editorResults) },
      value.$ref.path
    );
    if (resolved === undefined) {
      throw new Error(
        `无法解析步骤结果引用: ${value.$ref.stepId}.${value.$ref.path}`
      );
    }
    return resolved;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, editorResults));
  }
  if (isObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveValue(item, editorResults)
      ])
    );
  }
  return value;
}

/** 将计划中的步骤结果引用解析为真实工具参数。 */
export function resolveStepReferences(
  step: PlanStep,
  editorResults: EditorStepResult[]
): PlanStep {
  if (!step.parameters) return step;
  return {
    ...step,
    parameters: resolveValue(step.parameters, editorResults) as unknown[]
  };
}

function validateValue(
  value: unknown,
  parameter: Omit<ToolParameter, 'name'>
): boolean {
  if (value === undefined) return !parameter.required;

  switch (parameter.type) {
    case 'string':
      return (
        typeof value === 'string' &&
        (!parameter.enum || parameter.enum.includes(value))
      );
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return (
        Array.isArray(value) &&
        (!parameter.items ||
          value.every((item) => validateValue(item, parameter.items!)))
      );
    case 'object':
      return (
        isObject(value) &&
        (!parameter.properties ||
          Object.entries(parameter.properties).every(([key, property]) =>
            validateValue(value[key], property)
          ))
      );
    default:
      return false;
  }
}

export function validateToolParameters(
  values: unknown[],
  parameters: ToolParameter[]
): boolean {
  const restIndex = parameters.findIndex((item) => item.rest);
  if (restIndex >= 0 && restIndex !== parameters.length - 1) return false;
  if (restIndex < 0 && values.length > parameters.length) return false;

  return parameters.every((parameter, index) => {
    if (!parameter.rest) return validateValue(values[index], parameter);
    const rest = values.slice(index);
    return (
      (!parameter.required || rest.length > 0) &&
      rest.every((value) => validateValue(value, parameter))
    );
  });
}

function placeholder(parameter: Omit<ToolParameter, 'name'>): unknown {
  switch (parameter.type) {
    case 'string':
      return parameter.enum?.[0] || 'resolved';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return Object.fromEntries(
        Object.entries(parameter.properties || {}).map(([key, property]) => [
          key,
          placeholder(property)
        ])
      );
  }
}

function replaceReferences(
  value: unknown,
  parameter: Omit<ToolParameter, 'name'>
): unknown {
  if (isStepResultRef(value)) return placeholder(parameter);
  if (parameter.type === 'array' && Array.isArray(value) && parameter.items) {
    return value.map((item) => replaceReferences(item, parameter.items!));
  }
  if (parameter.type === 'object' && isObject(value) && parameter.properties) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        parameter.properties?.[key]
          ? replaceReferences(item, parameter.properties[key])
          : item
      ])
    );
  }
  return value;
}

/** 计划阶段允许以步骤结果引用占据一个符合工具 Schema 的参数位置。 */
export function validatePlannedToolParameters(
  values: unknown[],
  parameters: ToolParameter[]
): boolean {
  return validateToolParameters(
    values.map((value, index) =>
      parameters[index] ? replaceReferences(value, parameters[index]) : value
    ),
    parameters
  );
}

/**
 * 从直接依赖的创建步骤绑定 active 的运行时 ID。
 * 候选不唯一或文件不存在时保持原步骤，由 Editor 推理参数。
 */
export function bindActiveParameters(
  step: PlanStep,
  editorResults: EditorStepResult[],
  engine: Engine | null
): PlanStep {
  if (
    step.toolName !== 'active' ||
    step.parameters?.length ||
    !step.dependsOn?.length ||
    !engine
  ) {
    return step;
  }

  const dependencies = new Set(step.dependsOn);
  const ids = new Set<string>();

  for (const result of editorResults) {
    if (!dependencies.has(result.step.id) || result.error || !result.done) {
      continue;
    }

    const turn = [...result.turns]
      .reverse()
      .find(
        (item) =>
          item.toolResult?.success &&
          (item.toolAction === 'createPage' ||
            item.toolAction === 'createBlock')
      );
    const created = turn?.toolResult?.result;
    const id = isObject(created) ? created.id : undefined;
    if (hasText(id) && engine.project.value?.getFile(id)) {
      ids.add(id);
    }
  }

  return ids.size === 1 ? { ...step, parameters: [...ids] } : step;
}

/**
 * 注册工具具有明确且符合 Schema 的参数时直接执行，否则回退 Editor。
 */
export function getDirectToolCall(
  step: PlanStep,
  engine: Engine | null
): DirectToolCall | null {
  const action = step.toolName;
  if (
    step.type !== 'tool_call' ||
    !action ||
    !engine?.toolRegistry.get(action)
  ) {
    return null;
  }

  const tool = engine.toolRegistry.get(action)!;
  if (!Array.isArray(tool.parameters)) return null;
  const parameters = Array.isArray(step.parameters)
    ? step.parameters
    : tool.parameters.length === 0
      ? []
      : null;
  if (!parameters) return null;
  return validateToolParameters(parameters, tool.parameters)
    ? { action, parameters }
    : null;
}

function stableJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableJson);
  if (!isObject(value)) return value;
  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      result[key] = stableJson(value[key]);
      return result;
    }, {});
}

export function isSameToolCall(
  planned: DirectToolCall,
  action: string,
  parameters: unknown[]
): boolean {
  return (
    planned.action === action &&
    JSON.stringify(stableJson(planned.parameters)) ===
      JSON.stringify(stableJson(parameters))
  );
}
