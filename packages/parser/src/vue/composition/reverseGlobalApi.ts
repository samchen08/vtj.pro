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
      // 同时添加到 simple 映射，支持模板中直接使用 $t 等裸标识符
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
          // 同时添加到 simple 映射，支持模板中直接使用裸标识符
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
