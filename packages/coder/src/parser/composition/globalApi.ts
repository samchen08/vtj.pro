import type { BlockSchema } from '@vtj/core';
import { isJSCode } from '../../utils';

/**
 * 全局 API 配置：DSL 中 this.$xxx 形式 → Composition API 等价物
 * 仅包含 Vue 原生 Options API 中可用的 this.$xxx
 */
export interface GlobalApiConfig {
  /** 需要 import 的标识符（如 useAttrs），无则为 null */
  composable: string | null;
  /** 顶层声明语句（无则不生成） */
  declare: string | null;
  /** 替换后的名称（this.$attrs → attrs） */
  replace: string;
}

/**
 * Vue 原生全局 API 映射表
 * 仅包含 Vue Options API 中通过 this.$xxx 访问的内置 API
 */
export const GLOBAL_API_MAP: Record<string, GlobalApiConfig> = {
  $emit: {
    // emit 已通过 defineEmits 自动获得
    composable: null,
    declare: null,
    replace: 'emit'
  },
  $props: {
    // props 已通过 defineProps 自动获得
    composable: null,
    declare: null,
    replace: 'props'
  },
  $attrs: {
    composable: 'useAttrs',
    declare: 'const attrs = useAttrs();',
    replace: 'attrs'
  },
  $slots: {
    composable: 'useSlots',
    declare: 'const slots = useSlots();',
    replace: 'slots'
  },
  $nextTick: {
    composable: 'nextTick',
    declare: null, // 直接函数调用，无需声明
    replace: 'nextTick'
  },
  $watch: {
    composable: 'watch',
    declare: null, // 直接函数调用，无需声明
    replace: 'watch'
  },
  $refs: {
    composable: 'getCurrentInstance',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$refs'
  },
  $el: {
    composable: 'getCurrentInstance',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$el'
  },
  $root: {
    composable: 'getCurrentInstance',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$root'
  },
  $parent: {
    composable: 'getCurrentInstance',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$parent'
  },
  $options: {
    composable: 'getCurrentInstance',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$options'
  },
  $forceUpdate: {
    composable: 'getCurrentInstance',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$forceUpdate'
  }
};

/**
 * 全局 API 检测器
 * 走读 DSL 中所有 JSExpression / JSFunction 的 value 字符串
 * 识别使用到的 this.$xxx，返回出现的 API 名集合
 */
export function detectGlobalApis(dsl: BlockSchema): Set<string> {
  const apis = new Set<string>();
  const regex = /this\.\$(\w+)\b/g;

  const visit = (item: unknown) => {
    if (!item) return;
    if (typeof item !== 'object') return;
    if (Array.isArray(item)) {
      for (const it of item) visit(it);
      return;
    }
    // JSExpression / JSFunction
    if (isJSCode(item) && item.value) {
      let match: RegExpExecArray | null;
      regex.lastIndex = 0;
      while ((match = regex.exec(item.value)) !== null) {
        const apiName = '$' + match[1];
        if (apiName in GLOBAL_API_MAP) {
          apis.add(apiName);
        }
      }
      return;
    }
    // 普通对象：递归
    for (const v of Object.values(item as Record<string, any>)) {
      visit(v);
    }
  };

  visit(dsl.refs);
  visit(dsl.reactives);
  visit(dsl.state);
  visit(dsl.computed);
  visit(dsl.methods);
  visit(dsl.watch);
  visit(dsl.lifeCycles);
  visit(dsl.inject);
  visit(dsl.composables);
  visit(dsl.provide);
  visit(dsl.dataSources);
  visit(dsl.setup);
  visit(dsl.nodes);

  return apis;
}

/**
 * 根据检测到的全局 API 生成顶层声明语句
 */
export function generateGlobalApiDeclares(apis: Set<string>): string[] {
  const declares: string[] = [];
  for (const api of apis) {
    const cfg = GLOBAL_API_MAP[api];
    if (cfg && cfg.declare && !declares.includes(cfg.declare)) {
      declares.push(cfg.declare);
    }
  }
  return declares;
}

/**
 * 收集全局 API 需要从 vue 导入的标识符
 */
export function collectGlobalApiVueImports(apis: Set<string>): string[] {
  const result: string[] = [];
  for (const api of apis) {
    const cfg = GLOBAL_API_MAP[api];
    if (cfg && cfg.composable && !result.includes(cfg.composable)) {
      result.push(cfg.composable);
    }
  }
  return result;
}
