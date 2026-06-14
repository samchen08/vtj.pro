import {
  GLOBAL_API_MAP,
  UI_GLOBAL_API_MAPS,
  UI_PACKAGES,
  type GlobalApiConfig
} from '@vtj/coder';

export interface ReverseGlobalApiMaps {
  /** 裸标识符映射：{ 变量名: '$xxx' } */
  simple: Record<string, string>;
  /** 成员访问映射：{ 对象名: { 属性名: '$xxx' } } */
  member: Record<string, Record<string, string>>;
}

/**
 * 从 coder 的全局 API 映射构建反向映射
 *
 * 分为两类：
 * - simple: replace 为裸标识符的，如 router → $router
 * - member: replace 为成员访问的，如 __i18n.t → $t, ElMessageBox.confirm → $confirm
 */
export function buildReverseGlobalApiMap(
  uiPackage?: string
): ReverseGlobalApiMaps {
  const simple: Record<string, string> = {};
  const member: Record<string, Record<string, string>> = {};

  // 基础全局 API
  for (const [api, cfg] of Object.entries(GLOBAL_API_MAP)) {
    if (!cfg.replace) continue;
    // 注：$props 现在也纳入反向映射（__props → $props），
    // 因为 reverseTransformer 中 __props.xxx → this.xxx（step 5）
    // 在全局 API 变量映射（step 6）之前执行，不会冲突
    if (cfg.replace.includes('.')) {
      const lastDot = cfg.replace.lastIndexOf('.');
      const obj = cfg.replace.substring(0, lastDot);
      const prop = cfg.replace.substring(lastDot + 1);
      if (!member[obj]) member[obj] = {};
      member[obj][prop] = api;
      // 保留 simple[api] = api 映射，用于模板中直接使用 $t('key') 等裸标识符场景
      // 此映射与 globalApiDestructured 的 t → '$t' 不冲突：
      // - $t 出现在模板表达式（Vue SFC 编译器提取）
      // - t 出现在 <script setup> 解构形式
      simple[api] = api;
    } else {
      simple[cfg.replace] = api;
    }
  }

  // UI 库全局 API
  if (uiPackage) {
    const uiMap = (
      UI_GLOBAL_API_MAPS as Record<string, Record<string, GlobalApiConfig>>
    )[uiPackage];
    if (uiMap) {
      for (const [api, cfg] of Object.entries(uiMap)) {
        if (!cfg.replace) continue;
        if (cfg.replace.includes('.')) {
          const lastDot = cfg.replace.lastIndexOf('.');
          const obj = cfg.replace.substring(0, lastDot);
          const prop = cfg.replace.substring(lastDot + 1);
          if (!member[obj]) member[obj] = {};
          member[obj][prop] = api;
          // 保留 simple[api] = api（同基础 API，用于模板裸标识符场景）
          simple[api] = api;
        } else {
          simple[cfg.replace] = api;
        }
      }
    }
  }

  return { simple, member };
}

/**
 * 从 import 语句列表探测当前使用的 UI 库包名
 */
export function detectUIPackage(
  imports: Array<{ from: string }>
): string | undefined {
  for (const imp of imports) {
    if (UI_PACKAGES.includes(imp.from)) return imp.from;
  }
  return undefined;
}

/**
 * 构建 composable 函数名 → { 解构属性名: DSL API名 } 映射
 *
 * 用于解构形式的全局 API 精确反向映射。
 * 例如：const { t, n } = useI18n() 中，t → '$t'，n → '$n'
 *
 * 产出示例：
 * { useI18n: { t: '$t', n: '$n', d: '$d', rt: '$rt', te: '$te', tm: '$tm' } }
 */
export function buildComposableMemberMap(
  uiPackage?: string
): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {};

  const processMap = (apiMap: Record<string, GlobalApiConfig>) => {
    for (const [api, cfg] of Object.entries(apiMap)) {
      if (!cfg.composable || !cfg.replace || !cfg.replace.includes('.'))
        continue;
      if (!map[cfg.composable]) map[cfg.composable] = {};
      // 从 replace 提取属性名：__i18n.t → t, ElMessageBox.confirm → confirm
      const prop = cfg.replace.substring(cfg.replace.lastIndexOf('.') + 1);
      map[cfg.composable][prop] = api;
    }
  };

  processMap(GLOBAL_API_MAP);

  if (uiPackage) {
    const uiMap = (
      UI_GLOBAL_API_MAPS as Record<string, Record<string, GlobalApiConfig>>
    )[uiPackage];
    if (uiMap) processMap(uiMap);
  }

  return map;
}
