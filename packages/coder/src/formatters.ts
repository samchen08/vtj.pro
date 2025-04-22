/**
 * 代码格式化工具
 */

import { format } from 'prettier/standalone';
import type { Options } from 'prettier';
import * as htmlParser from 'prettier/plugins/html';
import * as babelParser from 'prettier/plugins/babel';
import * as cssParser from 'prettier/plugins/postcss';
import * as estree from 'prettier/plugins/estree';

const prettierOptions: Options = {
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxBracketSameLine: true,
  jsxSingleQuote: true,
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: true
};

export async function vueFormatter(content: string, disabled?: boolean) {
  if (disabled) return content;
  return await format(content, {
    parser: 'vue',
    ...prettierOptions,
    plugins: [htmlParser, babelParser, estree as any, cssParser]
  });
}

/**
 * 格式化HTMl代码
 */
export async function htmlFormatter(content: string, disabled?: boolean) {
  if (disabled) return content;
  return await format(content, {
    parser: 'html',
    ...prettierOptions,
    plugins: [htmlParser]
  });
}

/**
 * 格式化ts代码
 */
export async function tsFormatter(content: string, disabled?: boolean) {
  if (disabled) return content;
  try {
    const code = await format(content, {
      parser: 'babel-ts',
      ...prettierOptions,
      plugins: [babelParser, estree as any]
    });
    return code.replace(/;\n$/gi, '');
  } catch (e) {
    console.warn(e);
    return content;
  }
}

/**
 * 格式化js代码s
 */
export async function jsFormatter(content: string, disabled?: boolean) {
  if (disabled) return content;
  return await format(content, {
    parser: 'babel',
    ...prettierOptions,
    plugins: [babelParser, estree as any]
  });
}

/**
 * 格式化css代码
 */
export async function cssFormatter(content: string, disabled?: boolean) {
  if (disabled) return content;
  return format(content, {
    parser: 'scss',
    ...prettierOptions,
    plugins: [cssParser]
  });
}
