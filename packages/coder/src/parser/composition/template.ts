import type { NodeSchema, MaterialDescription } from '@vtj/core';
import { isJSCode } from '../../utils';
import { parseTemplate } from '../template';
import type { GlobalApiConfig } from './globalApi';
import { GLOBAL_API_MAP } from './globalApi';

/**
 * 深度克隆并转换 nodes 中的引用：
 * 1. 全局 API: this.$router.push → router.push
 * 2. ref/computed: this.refName.value → refName（模板内 Vue 自动解包，故去掉 .value）
 */
function transformNodesGlobalApi(
  nodes: NodeSchema[],
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP,
  refs: Set<string> = new Set(),
  computed: Set<string> = new Set()
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
      // 处理全局 API：this.$router → router
      for (const [api, cfg] of apiEntries) {
        const escaped = api.replace(/\$/g, '\\$');
        const regex = new RegExp(`this\\.${escaped}\\b`, 'g');
        v = v.replace(regex, cfg.replace);
      }
      // 处理 ref/computed 的 .value 解包：this.refName.value → refName
      // 模板内 Vue 自动解包 ref/computed，因此去掉 .value 后缀
      v = v.replace(/this\.([A-Za-z_$][\w$]*)\.value\b/g, (match, name) => {
        if (refs.has(name) || computed.has(name)) {
          return name;
        }
        return match;
      });
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
 * - 预处理 nodes：替换全局 API、ref/computed 的 .value 解包
 * - 委托给原 parseTemplate（this. 前缀剥离已能正确处理）
 */
export function parseTemplateComposition(
  children: NodeSchema[],
  componentMap: Map<string, MaterialDescription>,
  computedKeys: string[] = [],
  context: Record<string, Set<string>> = {},
  parent?: NodeSchema,
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP,
  refs: Set<string> = new Set(),
  computed: Set<string> = new Set()
) {
  const transformed = transformNodesGlobalApi(
    children,
    effectiveMap,
    refs,
    computed
  );
  return parseTemplate(
    transformed,
    componentMap,
    computedKeys,
    context,
    parent
  );
}
