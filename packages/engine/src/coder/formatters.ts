/**
 * 代码格式化工具
 */

import prettier from 'prettier';
import htmlParser from 'prettier/parser-html';
import babelParser from 'prettier/parser-babel';
import cssParser from 'prettier/parser-postcss';

const prettierOptions: prettier.Options = {
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

/**
 * 格式化HTMl代码
 * @param {string} content 代码内容
 * @returns {string} 格式化后的内容
 */
export function htmlFormatter(content: string): string {
  return prettier.format(content, {
    parser: 'html',
    ...prettierOptions,
    plugins: [htmlParser]
  });
}

/**
 * 格式化ts代码
 * @param {string} content 代码内容
 * @returns {string} 格式化后的内容
 */
export function tsFormatter(content: string): string {
  return prettier.format(content, {
    parser: 'babel-ts',
    ...prettierOptions,
    plugins: [babelParser]
  });
}

/**
 * 格式化js代码
 * @param {string} content 代码内容
 * @returns {string} 格式化后的内容
 */
export function jsFormatter(content: string): string {
  return prettier.format(content, {
    parser: 'babel',
    ...prettierOptions,
    plugins: [babelParser]
  });
}

/**
 * 格式化css代码
 * @param {string} content 代码内容
 * @returns {string} 格式化后的内容
 */
export function cssFormatter(content: string): string {
  return prettier.format(content, {
    parser: 'scss',
    ...prettierOptions,
    plugins: [cssParser]
  });
}
