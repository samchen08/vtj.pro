import type { JSFunction } from '@vtj/core';
import { transformExpression, unwrapFunction } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * Options API → Composition API 生命周期名称映射
 */
const OPTIONS_TO_COMPOSITION_MAP: Record<string, string> = {
  beforeMount: 'onBeforeMount',
  mounted: 'onMounted',
  beforeUpdate: 'onBeforeUpdate',
  updated: 'onUpdated',
  beforeUnmount: 'onBeforeUnmount',
  unmounted: 'onUnmounted',
  errorCaptured: 'onErrorCaptured',
  renderTracked: 'onRenderTracked',
  renderTriggered: 'onRenderTriggered',
  activated: 'onActivated',
  deactivated: 'onDeactivated'
};

/**
 * 已知 Composition 生命周期钩子（Vue 提供的 onXxx）
 */
const COMPOSITION_HOOKS = new Set([
  'onBeforeMount',
  'onMounted',
  'onBeforeUpdate',
  'onUpdated',
  'onBeforeUnmount',
  'onUnmounted',
  'onErrorCaptured',
  'onRenderTracked',
  'onRenderTriggered',
  'onActivated',
  'onDeactivated'
]);

export interface LifeCyclesResult {
  /** 顶层 onXxx() 调用语句 */
  statements: string[];
  /** 实际使用到的 Composition 钩子（用于 vue import 收集） */
  usedHooks: Set<string>;
}

/**
 * 解析 lifeCycles 为 Composition 顶层 onXxx() 调用
 *
 * 注意：
 * - created / beforeCreate 不在此处理（由 setupStatements 处理）
 * - mounted 等 Options 命名自动映射为 onMounted
 * - 已是 onXxx 的直接使用
 */
export function parseLifeCycles(
  lifeCycles: Record<string, JSFunction> = {},
  symbols: SymbolTable
): LifeCyclesResult {
  const statements: string[] = [];
  const usedHooks = new Set<string>();

  for (const [name, fn] of Object.entries(lifeCycles)) {
    if (!fn || !fn.value) continue;
    if (name === 'created' || name === 'beforeCreate') continue;

    const hookName = OPTIONS_TO_COMPOSITION_MAP[name] || name;
    if (!COMPOSITION_HOOKS.has(hookName)) continue;

    const transformed = transformExpression(fn.value, symbols, 'script');
    const handler = unwrapFunction(transformed);
    statements.push(`${hookName}(${handler});`);
    usedHooks.add(hookName);
  }

  return { statements, usedHooks };
}
