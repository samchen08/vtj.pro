import postcss from 'postcss';
import * as sass from 'sass';
export type CSSRules = Record<string, Record<string, string>>;

export interface ParseStyleResult {
  styles: CSSRules;
  css: string;
}
export function parseStyle(content: string) {
  const errors: string[] = [];
  const styles: CSSRules = {};
  const css: string[] = [];

  try {
    const cssContent = sass.compileString(content)?.css || '';
    const root = postcss.parse(cssContent);
    const classRegex = /^.[\w]+_[\w]{5,}/;
    for (const rule of root.nodes) {
      if (rule.type === 'rule') {
        const style: Record<string, string> = {};
        if (classRegex.test(rule.selector)) {
          rule.nodes.forEach((decl) => {
            if (decl.type === 'decl') {
              style[decl.prop] = decl.value;
            }
          });
          styles[rule.selector] = style;
        } else {
          css.push(rule.toString());
        }
      }
    }
  } catch (e: any) {
    errors.push(`css解析出错了，错误信息：[ ${e.message} ]\n`);
  }
  return {
    errors,
    styles,
    css: css.join('\n')
  };
}
