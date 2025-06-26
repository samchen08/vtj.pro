// 导入类型和工具函数
import type { EnhanceConfig } from '@vtj/core';
import { parseUrls, loadCssUrl, loadScriptUrl } from '../utils';
import type { App } from 'vue';
import type { Provider } from '../provider';

/**
 * 定义增强函数的返回类型
 * 可以是一个接收Vue应用和Provider的函数，或者undefined
 */
export type LoadEnhanceReturn =
  | ((app: App, provider: Provider) => void)
  | undefined;

/**
 * 异步加载增强配置
 * @param config - 增强配置对象
 * @param base - URL基础路径，默认为空字符串
 * @returns 返回一个增强函数或undefined
 */
export async function loadEnhance(config: EnhanceConfig, base: string = '') {
  // 从配置中解构出名称和URL数组
  const { name, urls = [] } = config || {};

  // 为所有URL添加基础路径前缀
  const _urls = urls.map((n) => base + n);

  // 解析URL为CSS和JS两类
  const { css, js } = parseUrls(_urls);

  // 如果有CSS URL，加载CSS资源
  if (css.length) {
    loadCssUrl(css);
  }

  // 如果有JS URL，异步加载JS资源
  if (js.length) {
    return (await loadScriptUrl(js, name).catch(
      () => undefined
    )) as LoadEnhanceReturn;
  }
}
