import type { NodeSchema, MaterialDescription } from '@vtj/core';
import { isJSCode } from '../../utils';
import { parseTemplate } from '../template';
import type { SymbolTable } from './symbolTable';
import { transformExpression } from './transformer';

/**
 * 模板复用脚本的引用解析，ref/computed 由 Vue 自动解包。
 */
function transformNodesGlobalApi(
  nodes: NodeSchema[],
  symbols: SymbolTable
): NodeSchema[] {
  const visit = (item: any): any => {
    if (item === null || item === undefined) return item;
    if (typeof item !== 'object') return item;
    if (Array.isArray(item)) {
      return item.map(visit);
    }
    if (isJSCode(item) && typeof item.value === 'string') {
      return {
        ...item,
        value: transformExpression(item.value, symbols, 'template')
      };
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
 * - 预处理 nodes：局部变量 → 内置 API → 实例代理
 * - 委托给原 parseTemplate
 */
export function parseTemplateComposition(
  children: NodeSchema[],
  componentMap: Map<string, MaterialDescription>,
  symbols: SymbolTable,
  computedKeys: string[] = [],
  context: Record<string, Set<string>> = {},
  parent?: NodeSchema,
  easycomPackages: Set<string> = new Set()
) {
  const transformed = transformNodesGlobalApi(children, symbols);
  return parseTemplate(
    transformed,
    componentMap,
    computedKeys,
    context,
    parent,
    easycomPackages,
    'preserve'
  );
}
