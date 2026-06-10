import type { BlockSchema } from '@vtj/core';
import { isJSCode } from '../../utils';

/**
 * 全局 API 配置：DSL 中 this.$xxx 形式 → Composition API 等价物
 * - composable: 需要从 from 包导入的函数（无则为 null）
 * - declare: 是否需要在 setup 顶部生成声明语句
 * - replace: 替换后的标识符名称
 */
export interface GlobalApiConfig {
  /** 需要 import 的标识符（如 useRouter） */
  composable: string | null;
  /** 包来源 */
  from: string | null;
  /** 顶层声明语句（无则不生成） */
  declare: string | null;
  /** 替换后的名称（this.$router → router） */
  replace: string;
}

/**
 * 全局 API 映射表
 */
export const GLOBAL_API_MAP: Record<string, GlobalApiConfig> = {
  $router: {
    composable: 'useRouter',
    from: 'vue-router',
    declare: 'const router = useRouter();',
    replace: 'router'
  },
  $route: {
    composable: 'useRoute',
    from: 'vue-router',
    declare: 'const route = useRoute();',
    replace: 'route'
  },
  $emit: {
    // emit 已通过 defineEmits 自动获得
    composable: null,
    from: null,
    declare: null,
    replace: 'emit'
  },
  $attrs: {
    composable: 'useAttrs',
    from: 'vue',
    declare: 'const attrs = useAttrs();',
    replace: 'attrs'
  },
  $slots: {
    composable: 'useSlots',
    from: 'vue',
    declare: 'const slots = useSlots();',
    replace: 'slots'
  },
  $nextTick: {
    composable: 'nextTick',
    from: 'vue',
    declare: null, // 直接函数调用，无需声明
    replace: 'nextTick'
  },
  $forceUpdate: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$forceUpdate'
  },
  $store: {
    composable: 'useStore',
    from: 'pinia',
    declare: 'const store = useStore();',
    replace: 'store'
  },
  $pinia: {
    composable: 'getActivePinia',
    from: 'pinia',
    declare: 'const pinia = getActivePinia();',
    replace: 'pinia'
  },
  $t: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const { t } = useI18n();',
    replace: 't'
  },
  $i18n: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const i18n = useI18n();',
    replace: 'i18n'
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

  // 走读除 nodes 外的所有顶层字段（nodes 内事件绑定单独处理）
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
 * 特殊处理：$t 和 $i18n 同时存在时合并为一条声明
 */
export function generateGlobalApiDeclares(apis: Set<string>): string[] {
  const declares: string[] = [];

  // 处理 vue-i18n 特殊合并
  const hasT = apis.has('$t');
  const hasI18n = apis.has('$i18n');
  if (hasT && hasI18n) {
    declares.push('const { t, ...i18n } = useI18n();');
  } else if (hasT) {
    declares.push('const { t } = useI18n();');
  } else if (hasI18n) {
    declares.push('const i18n = useI18n();');
  }

  for (const api of apis) {
    if (api === '$t' || api === '$i18n') continue; // 已处理
    const cfg = GLOBAL_API_MAP[api];
    if (cfg && cfg.declare) {
      declares.push(cfg.declare);
    }
  }
  return declares;
}

/**
 * 收集全局 API 需要的 import：返回 { from: [composable, ...] }
 */
export function collectGlobalApiImports(
  apis: Set<string>
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const api of apis) {
    const cfg = GLOBAL_API_MAP[api];
    if (cfg && cfg.composable && cfg.from) {
      const arr = result[cfg.from] ?? (result[cfg.from] = []);
      if (!arr.includes(cfg.composable)) {
        arr.push(cfg.composable);
      }
    }
  }
  return result;
}
