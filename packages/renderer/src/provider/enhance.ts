import type { EnhanceConfig } from '@vtj/core';
import { parseUrls, loadCssUrl, loadScriptUrl } from '../utils';
import type { App } from 'vue';
import type { Provider } from '../provider';

export type LoadEnhanceReturn =
  | ((app: App, provider: Provider) => void)
  | undefined;

export async function loadEnhance(config: EnhanceConfig, base: string = '') {
  const { name, urls = [] } = config || {};
  const _urls = urls.map((n) => base + n);
  const { css, js } = parseUrls(_urls);
  if (css.length) {
    loadCssUrl(css);
  }
  if (js.length) {
    return (await loadScriptUrl(js, name).catch(
      () => undefined
    )) as LoadEnhanceReturn;
  }
}
