import { adoptedStyleSheets } from '@vtj/renderer';

export function injectUniCSS(
  id: string | number,
  css: any,
  global: any = window
) {
  adoptedStyleSheets(global, String(id), css);
}
