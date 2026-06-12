import type { BlockSchema, BlockProp, BlockComposable } from '@vtj/core';
import { isString } from '@vtj/base';
import type { GlobalApiConfig } from './globalApi';
import { GLOBAL_API_MAP } from './globalApi';

/**
 * 符号表：标识 DSL 中可识别的 this.xxx 引用属于哪一类
 * Composition 模式出码时根据符号类别决定如何转换
 */
export interface SymbolTable {
  /** ref 声明集（需要 .value 解包）*/
  refs: Set<string>;
  /** reactive 声明集 + state（直接使用） */
  reactives: Set<string>;
  /** computed 声明集（需要 .value 解包） */
  computed: Set<string>;
  /** methods 声明集（顶层函数） */
  methods: Set<string>;
  /** props 名集（通过 props.xxx 访问） */
  props: Set<string>;
  /** composables 暴露的名集（包含 destructure） */
  composables: Set<string>;
  /** inject 名集（顶层变量） */
  injects: Set<string>;
  /** dataSources 名集（顶层函数） */
  dataSources: Set<string>;
  /** 是否生成 state reactive 声明 */
  hasState: boolean;
  /** 有效的全局 API 映射表（基础 Map + 当前 UI 库 Map） */
  effectiveApiMap: Record<string, GlobalApiConfig>;
}

/**
 * 构建符号表
 */
export function buildSymbolTable(
  dsl: BlockSchema,
  effectiveApiMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP
): SymbolTable {
  // refs
  const refs = new Set(Object.keys(dsl.refs ?? {}));

  // reactives + state
  const reactives = new Set(Object.keys(dsl.reactives ?? {}));
  const stateKeys = Object.keys(dsl.state ?? {});
  const hasState = stateKeys.length > 0;
  if (hasState) {
    reactives.add('__state');
  }

  // computed
  const computed = new Set(Object.keys(dsl.computed ?? {}));

  // methods
  const methods = new Set(Object.keys(dsl.methods ?? {}));

  // props
  const props = new Set<string>();
  for (const p of dsl.props ?? []) {
    if (isString(p)) {
      props.add(p);
    } else {
      props.add((p as BlockProp).name);
    }
  }

  // composables：name 字段 + destructure 字段
  const composables = new Set<string>();
  for (const c of (dsl.composables ?? []) as BlockComposable[]) {
    if (c.destructure && c.destructure.length > 0) {
      for (const d of c.destructure) composables.add(d);
    } else if (c.name) {
      composables.add(c.name);
    }
  }

  // injects
  const injects = new Set<string>();
  for (const i of dsl.inject ?? []) {
    if (i.name) injects.add(i.name);
  }

  // dataSources
  const dataSources = new Set<string>();
  for (const [, ds] of Object.entries(dsl.dataSources ?? {})) {
    if (ds.name) dataSources.add(ds.name);
  }

  return {
    refs,
    reactives,
    computed,
    methods,
    props,
    composables,
    injects,
    dataSources,
    hasState,
    effectiveApiMap
  };
}
