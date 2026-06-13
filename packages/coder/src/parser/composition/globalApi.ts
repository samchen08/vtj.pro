import type { BlockSchema, MaterialDescription } from '@vtj/core';
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
 * 框架无关的基础全局 API 映射表
 * 包含 Vue 原生、vue-router、vue-i18n、@vtj/renderer
 * 不含任何 UI 库（element-plus / ant-design-vue 等）
 */
export const GLOBAL_API_MAP: Record<string, GlobalApiConfig> = {
  state: {
    composable: null,
    from: 'self',
    declare: null,
    replace: '__state'
  },
  $uni: {
    composable: null,
    from: 'self',
    declare: null,
    replace: 'uni'
  },
  $getApp: {
    composable: null,
    from: 'self',
    declare: null,
    replace: 'getApp'
  },
  // ---- Vue 原生 ----
  $emit: {
    composable: null,
    from: 'vue',
    declare: null,
    replace: '__emit'
  },
  $props: {
    composable: null,
    from: 'vue',
    declare: null,
    replace: '__props'
  },
  $attrs: {
    composable: 'useAttrs',
    from: 'vue',
    declare: 'const __attrs = useAttrs();',
    replace: '__attrs'
  },
  $slots: {
    composable: 'useSlots',
    from: 'vue',
    declare: 'const __slots = useSlots();',
    replace: '__slots'
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
    declare: 'const __router = useRouter();',
    replace: '__router'
  },
  $route: {
    composable: 'useRoute',
    from: 'vue-router',
    declare: 'const __route = useRoute();',
    replace: '__route'
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
  $provider: {
    composable: 'useStore',
    from: '__renderer__',
    declare: null,
    replace: '__provider'
  },
  $store: {
    composable: 'useStore',
    from: '__renderer__',
    declare: 'const __store = useStore();',
    replace: '__store'
  },
  $pinia: {
    composable: 'usePinia',
    from: '__renderer__',
    declare: 'const __pinia = usePinia();',
    replace: '__pinia'
  },
  $request: {
    composable: 'useRequest',
    from: '__renderer__',
    declare: 'const __request = useRequest();',
    replace: '__request'
  },
  $libs: {
    composable: 'useLibs',
    from: '__renderer__',
    declare: 'const __libs = useLibs();',
    replace: '__libs'
  },
  $access: {
    composable: 'useAccess',
    from: '__renderer__',
    declare: 'const __access = useAccess();',
    replace: '__access'
  },
  $apis: {
    composable: 'useApis',
    from: '__renderer__',
    declare: 'const __apis = useApis();',
    replace: '__apis'
  }
};

/**
 * UI 库专属全局 API 映射（按包名分组）
 * 同名 key 会在运行时覆盖 GLOBAL_API_MAP 中的同名条目
 */
export const UI_GLOBAL_API_MAPS: Record<
  string,
  Record<string, GlobalApiConfig>
> = {
  'element-plus': {
    $loading: {
      composable: 'ElLoading',
      from: 'element-plus',
      declare: null,
      replace: 'ElLoading.service'
    },
    $message: {
      composable: 'ElMessage',
      from: 'element-plus',
      declare: null,
      replace: 'ElMessage'
    },
    $notify: {
      composable: 'ElNotification',
      from: 'element-plus',
      declare: null,
      replace: 'ElNotification'
    },
    $messageBox: {
      composable: 'ElMessageBox',
      from: 'element-plus',
      declare: null,
      replace: 'ElMessageBox'
    },
    $msgbox: {
      composable: 'ElMessageBox',
      from: 'element-plus',
      declare: null,
      replace: 'ElMessageBox'
    },
    $confirm: {
      composable: 'ElMessageBox',
      from: 'element-plus',
      declare: null,
      replace: 'ElMessageBox.confirm'
    },
    $prompt: {
      composable: 'ElMessageBox',
      from: 'element-plus',
      declare: null,
      replace: 'ElMessageBox.prompt'
    }
  },
  'ant-design-vue': {
    $confirm: {
      composable: 'Modal',
      from: 'ant-design-vue',
      declare: null,
      replace: 'Modal.confirm'
    },
    $message: {
      composable: 'message',
      from: 'ant-design-vue',
      declare: null,
      replace: 'message'
    },
    $notification: {
      composable: 'notification',
      from: 'ant-design-vue',
      declare: null,
      replace: 'notification'
    },
    $info: {
      composable: 'message',
      from: 'ant-design-vue',
      declare: null,
      replace: 'message.info'
    },
    $success: {
      composable: 'message',
      from: 'ant-design-vue',
      declare: null,
      replace: 'message.success'
    },
    $warning: {
      composable: 'message',
      from: 'ant-design-vue',
      declare: null,
      replace: 'message.warning'
    },
    $error: {
      composable: 'message',
      from: 'ant-design-vue',
      declare: null,
      replace: 'message.error'
    }
  }
};

/** 已知 UI 库包名列表 */
export const UI_PACKAGES = Object.keys(UI_GLOBAL_API_MAPS);

/**
 * 从 componentMap 探测当前激活的 UI 库包名
 */
export function detectUIPackage(
  componentMap: Map<string, MaterialDescription>
): string | null {
  for (const [, desc] of componentMap) {
    if (UI_PACKAGES.includes(desc.package as string))
      return desc.package as string;
  }
  return null;
}

/**
 * 构建有效 API 映射：基础 Map + 当前 UI 库 Map（UI 库覆盖同名 key）
 */
export function buildEffectiveApiMap(
  uiPackage: string | null
): Record<string, GlobalApiConfig> {
  const uiMap = uiPackage ? (UI_GLOBAL_API_MAPS[uiPackage] ?? {}) : {};
  return { ...GLOBAL_API_MAP, ...uiMap };
}

/**
 * 全局 API 检测器
 * 走读 DSL 中所有 JSExpression / JSFunction 的 value 字符串
 * 识别使用到的 this.$xxx，返回出现的 API 名集合
 */
export function detectGlobalApis(
  dsl: BlockSchema,
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP
): Set<string> {
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
        if (apiName in effectiveMap) {
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
export function generateGlobalApiDeclares(
  apis: Set<string>,
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP
): string[] {
  const declares: string[] = [];
  for (const api of apis) {
    const cfg = effectiveMap[api];
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
  apis: Set<string>,
  effectiveMap: Record<string, GlobalApiConfig> = GLOBAL_API_MAP
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const api of apis) {
    const cfg = effectiveMap[api];
    if (cfg && cfg.composable) {
      const items = result[cfg.from] ?? (result[cfg.from] = []);
      if (!items.includes(cfg.composable)) {
        items.push(cfg.composable);
      }
    }
  }
  return result;
}
