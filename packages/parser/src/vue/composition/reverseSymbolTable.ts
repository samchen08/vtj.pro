import type { ParseScriptSetupResult } from '../scriptSetup';
import { buildReverseGlobalApiMap, detectUIPackage } from './reverseGlobalApi';

/**
 * 反向符号表：描述 <script setup> 中各类标识符的分类
 * 用于将 Composition API 代码反向转换为 DSL 中的 this.xxx 形态
 *
 * 与 @vtj/coder 的 SymbolTable 形成镜像关系。
 */
export interface ReverseSymbolTable {
  /** ref 声明集 */
  refs: Set<string>;
  /** reactive 声明集（含 state） */
  reactives: Set<string>;
  /** computed 声明集 */
  computed: Set<string>;
  /** methods 声明集 */
  methods: Set<string>;
  /** props 名集 */
  props: Set<string>;
  /** composables 暴露的名集（包含 destructure） */
  composables: Set<string>;
  /** inject 名集 */
  injects: Set<string>;
  /** dataSources 名集 */
  dataSources: Set<string>;
  /** 是否存在 state reactive */
  hasState: boolean;
  /** 裸标识符全局 API 反向映射：{ 变量名: '$xxx' } */
  reverseApiMap: Record<string, string>;
  /** 成员访问全局 API 反向映射：{ 对象名: { 属性名: '$xxx' } } */
  reverseMemberApiMap: Record<string, Record<string, string>>;
}

/**
 * 从 ParseScriptSetupResult 构建反向符号表
 */
export function buildReverseSymbolTable(
  result: ParseScriptSetupResult
): ReverseSymbolTable {
  const uiPackage = detectUIPackage(result.imports || []);
  const { simple: reverseApiMap, member: reverseMemberApiMap } =
    buildReverseGlobalApiMap(uiPackage);

  // composables：收集 name + 所有 destructure 字段
  const composables = new Set<string>();
  for (const c of result.composables || []) {
    if (c.destructure && c.destructure.length > 0) {
      for (const d of c.destructure) composables.add(d);
    } else if (c.name) {
      composables.add(c.name);
    }
  }

  return {
    refs: new Set(Object.keys(result.refs || {})),
    reactives: new Set(Object.keys(result.reactives || {})),
    computed: new Set(Object.keys(result.computed || {})),
    methods: new Set(Object.keys(result.methods || {})),
    props: new Set(
      (result.props || []).map((p) => (typeof p === 'string' ? p : p.name))
    ),
    composables,
    injects: new Set((result.inject || []).map((i) => i.name)),
    dataSources: new Set(Object.keys(result.dataSources || {})),
    hasState: Object.keys(result.state || {}).length > 0,
    reverseApiMap,
    reverseMemberApiMap
  };
}
