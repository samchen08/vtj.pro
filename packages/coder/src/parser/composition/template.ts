import type { NodeSchema, MaterialDescription } from '@vtj/core';
import { isJSCode } from '../../utils';
import { parseTemplate } from '../template';
import type { GlobalApiConfig } from './globalApi';
import { GLOBAL_API_MAP } from './globalApi';

/**
 * 深度克隆并转换 nodes 中的全局 API 引用：
 * this.$router.push → router.push
 *
 * 模板内不需要 .value 解包（Vue 自动处理），故 props/refs/computed 等
 * 通过原 parseTemplate 的 replaceThis 已正确转换为顶层标识符。
 */
function transformNodesGlobalApi(
  nodes: NodeSchema[],
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP
): NodeSchema[] {
  const apiEntries = Object.entries(effectiveMap);

  const visit = (item: any): any => {
    if (item === null || item === undefined) return item;
    if (typeof item !== 'object') return item;
    if (Array.isArray(item)) {
      return item.map(visit);
    }
    if (isJSCode(item) && typeof item.value === 'string') {
      let v = item.value;
      for (const [api, cfg] of apiEntries) {
        const escaped = api.replace(/\$/g, '\\$');
        const regex = new RegExp(`this\\.${escaped}\\b`, 'g');
        v = v.replace(regex, cfg.replace);
      }
      return { ...item, value: v };
    }
    const cloned: Record<string, any> = {};
    for (const [k, v] of Object.entries(item)) {
      cloned[k] = visit(v);
    }
    return cloned;
  };

  return nodes.map(visit);
}

/**
 * Composition 模式模板解析：
 * - 预处理 nodes，替换全局 API
 * - 委托给原 parseTemplate（this. 前缀剥离已能正确处理）
 */
export function parseTemplateComposition(
  children: NodeSchema[],
  componentMap: Map<string, MaterialDescription>,
  computedKeys: string[] = [],
  context: Record<string, Set<string>> = {},
  parent?: NodeSchema,
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP
) {
  const transformed = transformNodesGlobalApi(children, effectiveMap);
  return parseTemplate(
    transformed,
    componentMap,
    computedKeys,
    context,
    parent
  );
}
