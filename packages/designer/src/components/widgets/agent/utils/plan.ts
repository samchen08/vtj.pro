/**
 * 大模型计划输出解析（Architect / Editor 共用）
 * 识别三种情况：
 * 1. 有效计划（含 answer 直接回答，或含 intent 规划）→ 返回 plan
 * 2. 模型自报错误（{"error": "..."}）→ 返回 error，最终失败时反馈给用户
 * 3. 无效输出（空白 / 非 JSON / 仅有碎片）→ plan 与 error 均为空
 */
import type { PlanResult } from '../types/agent';
import { extractJsonObject } from './json';

export interface PlanOutputParseResult {
  plan: PlanResult | null;
  /** 大模型明确输出的错误说明（如缺少关键信息），最终失败时反馈给用户 */
  error?: string;
}

/**
 * 归一化计划：服务端协议步骤类型 'code' 统一为前端执行类型 'vue_code'（其余字段透传保留）
 */
function normalizePlan(plan: any): PlanResult {
  const steps = Array.isArray(plan.steps)
    ? plan.steps.map((s: any) => ({
        ...s,
        type: s.type === 'code' ? 'vue_code' : s.type
      }))
    : plan.steps;
  return { ...plan, steps };
}

export function parsePlanOutput(text: string): PlanOutputParseResult {
  const json = extractJsonObject(text);
  if (!json) return { plan: null };
  let parsed: any;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { plan: null };
  }
  // 模型自报错误：{"error": "..."} 提取错误说明，而非丢弃后使用通用文案
  if (typeof parsed?.error === 'string' && parsed.error.trim()) {
    return { plan: null, error: parsed.error.trim() };
  }
  // 直接回答（无步骤）需携带 answer 文本
  if (typeof parsed?.answer === 'string' && parsed.answer.trim()) {
    return { plan: normalizePlan(parsed) };
  }
  // 规划需携带 intent（steps 缺失时回退为直接回答，兼容旧行为）
  if (typeof parsed?.intent === 'string' && parsed.intent.trim()) {
    return { plan: normalizePlan(parsed) };
  }
  return { plan: null };
}
