import type { JSFunction } from '@vtj/core';
import { transformExpression } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 提取函数体内容（用于 setup 顶层执行场景）
 *
 * 输入: 'async function() { console.log("init"); await foo(); }'
 * 输出: 'console.log("init"); await foo();'
 *
 * 输入: '() => doSomething()'
 * 输出: 'doSomething();'
 *
 * 输入: '() => { return foo(); }'
 * 输出: 'return foo();' （由调用方决定是否需要包装）
 */
export function extractFunctionBody(code: string): string {
  let src = code.trim().replace(/;$/, '');
  // 去除外层括号
  if (/^\((\(|async|function)/.test(src)) {
    src = src.substring(1, src.length - 1).trim();
  }
  // 箭头函数：() => expr 或 () => { ... }
  const arrowMatch = src.match(/^(?:async\s+)?\([^)]*\)\s*=>\s*([\s\S]+)$/);
  if (arrowMatch) {
    let body = arrowMatch[1].trim();
    if (body.startsWith('{') && body.endsWith('}')) {
      body = body.slice(1, -1).trim();
    } else {
      // 表达式形式：() => expr → expr;
      body = body.replace(/;$/, '') + ';';
    }
    return body;
  }
  // function 声明：(async )?function name?() { body }
  const fnMatch = src.match(
    /^(?:async\s+)?function\s*\w*\s*\([^)]*\)\s*\{([\s\S]*)\}$/
  );
  if (fnMatch) {
    return fnMatch[1].trim();
  }
  return src;
}

/**
 * 解析 setup 字段为顶层语句
 */
export function parseSetupStatements(
  setup: JSFunction | undefined,
  symbols: SymbolTable
): string {
  if (!setup || !setup.value) return '';
  const transformed = transformExpression(setup.value, symbols, 'script');
  return extractFunctionBody(transformed);
}

/**
 * 解析 created/beforeCreate 为顶层立即执行语句
 * 二者均映射为 setup 阶段同步执行
 */
export function parseCreatedStatements(
  lifeCycles: Record<string, JSFunction> = {},
  symbols: SymbolTable
): string {
  const blocks: string[] = [];
  for (const name of ['beforeCreate', 'created']) {
    const fn = lifeCycles[name];
    if (fn && fn.value) {
      const transformed = transformExpression(fn.value, symbols, 'script');
      const body = extractFunctionBody(transformed);
      if (body) blocks.push(`// ${name}\n${body}`);
    }
  }
  return blocks.join('\n');
}
