import type { BlockSchema } from '@vtj/core';
import { isJSCode } from '../../utils';

/**
 * 全局 API 配置：DSL 中 this.$xxx 形式 → Composition API 等价物
 */
export interface GlobalApiConfig {
  /** 需要 import 的标识符（如 useAttrs），无则为 null */
  composable: string | null;
  /** composable 的来源包（如 'vue'、'vue-router'） */
  from: string;
  /** 顶层声明语句（无则不生成） */
  declare: string | null;
  /** 替换后的名称（this.$attrs → attrs） */
  replace: string;
}

/**
 * 全局 API 映射表
 * 包含 Vue 原生 + 第三方插件通过 this.$xxx 访问的 API
 */
export const GLOBAL_API_MAP: Record<string, GlobalApiConfig> = {
  // ---- Vue 原生 ----
  $emit: {
    composable: null,
    from: 'vue',
    declare: null,
    replace: 'emit'
  },
  $props: {
    composable: null,
    from: 'vue',
    declare: null,
    replace: 'props'
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
    declare: null,
    replace: 'nextTick'
  },
  $watch: {
    composable: 'watch',
    from: 'vue',
    declare: null,
    replace: 'watch'
  },
  $refs: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$refs'
  },
  $el: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$el'
  },
  $root: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$root'
  },
  $parent: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$parent'
  },
  $options: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$options'
  },
  $forceUpdate: {
    composable: 'getCurrentInstance',
    from: 'vue',
    declare: 'const __instance = getCurrentInstance();',
    replace: '__instance.proxy.$forceUpdate'
  },
  // ---- vue-router ----
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
  // ---- vue-i18n ----
  $i18n: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n'
  },
  $t: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n.t'
  },
  $n: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n.n'
  },
  $d: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n.d'
  },
  $rt: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n.rt'
  },
  $te: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n.te'
  },
  $tm: {
    composable: 'useI18n',
    from: 'vue-i18n',
    declare: 'const __i18n = useI18n();',
    replace: '__i18n.tm'
  },
  // ---- @vtj/renderer ----
  // 注：from 使用特殊标记 '__renderer__'，运行时会与 useProvider 合并到同一条 import 语句
  $store: {
    composable: 'useStore',
    from: '__renderer__',
    declare: 'const store = useStore();',
    replace: 'store'
  },
  $pinia: {
    composable: 'usePinia',
    from: '__renderer__',
    declare: 'const pinia = usePinia();',
    replace: 'pinia'
  },
  $request: {
    composable: 'useRequest',
    from: '__renderer__',
    declare: 'const request = useRequest();',
    replace: 'request'
  },
  $libs: {
    composable: 'useLibs',
    from: '__renderer__',
    declare: 'const libs = useLibs();',
    replace: 'libs'
  },
  $access: {
    composable: 'useAccess',
    from: '__renderer__',
    declare: 'const access = useAccess();',
    replace: 'access'
  },
  $apis: {
    composable: 'useApis',
    from: '__renderer__',
    declare: 'const apis = useApis();',
    replace: 'apis'
  },
  // ---- element-plus ----
  $loading: {
    composable: 'ElLoading',
    from: 'element-plus',
    declare: null, // 无需声明变量，直接用命名空间访问
    replace: 'ElLoading.service'
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
 * 收集全局 API 需要导入的标识符，按来源包分组
 */
export function collectGlobalApiImports(
  apis: Set<string>
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const api of apis) {
    const cfg = GLOBAL_API_MAP[api];
    if (cfg && cfg.composable) {
      const items = result[cfg.from] ?? (result[cfg.from] = []);
      if (!items.includes(cfg.composable)) {
        items.push(cfg.composable);
      }
    }
  }
  return result;
}
