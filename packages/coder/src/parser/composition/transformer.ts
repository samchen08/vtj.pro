import type { JSExpression, JSFunction } from '@vtj/core';
import type { ParserOptions } from 'prettier';
import { parsers } from 'prettier/plugins/babel';
import { isJSCode } from '../../utils';
import type { SymbolTable } from './symbolTable';

/**
 * 转换上下文：影响 ref/computed 的 .value 解包行为
 * - script: 解包，输出 xxx.value
 * - template: 不解包，Vue 模板自动解包
 * - computed: 与 script 相同，get/set 绑定组件上下文
 */
export type TransformContext = 'script' | 'template' | 'computed';

/**
 * 转换 DSL 中的 this.xxx 引用为 Composition API 顶层标识符
 *
 * 转换规则：
 * - this.refsName → script: refsName.value, template: refsName
 * - this.reactiveName → reactiveName（包含 state）
 * - this.computedName → script: computedName.value, template: computedName
 * - this.methodName → methodName
 * - this.propName (props) → script: props.propName, template: propName
 * - this.composableName → composableName
 * - this.injectName → injectName
 * - this.dataSourceName → dataSourceName
 * - this.$router 等内置 API → 替换为 __router 等
 * - 未识别的 this.xxx → __instance.proxy.xxx
 */
export function transformExpression(
  code: string,
  symbols: SymbolTable,
  context: TransformContext = 'script'
): string {
  if (!code || !/(?:\b(?:this|__self)|\$scope)\b/.test(code)) return code;
  const positions = new Set<number>();
  let ast: unknown;
  let offset = 2;
  try {
    ast = parsers['babel-ts'].parse(
      `(\n${code.replace(/;\s*$/, '')}\n)`,
      {} as ParserOptions
    );
  } catch {
    offset = 0;
    ast = parsers['babel-ts'].parse(code, {} as ParserOptions);
  }
  const bindingNames = (node: unknown): string[] => {
    if (!node || typeof node !== 'object') return [];
    const item = node as Record<string, unknown>;
    if (item.type === 'Identifier') return [item.name as string];
    if (item.type === 'ObjectProperty') return bindingNames(item.value);
    if (item.type === 'AssignmentPattern') return bindingNames(item.left);
    return Object.values(item).flatMap((value) =>
      Array.isArray(value) ? value.flatMap(bindingNames) : bindingNames(value)
    );
  };
  const visit = (
    node: unknown,
    componentThis = true,
    root = true,
    bound = new Set<string>(),
    parent?: Record<string, unknown>
  ) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, componentThis, root, bound, parent));
      return;
    }
    const item = node as Record<string, unknown>;
    if (
      (item.type === 'ThisExpression' ||
        (item.type === 'Identifier' &&
          ['__self', '$scope'].includes(item.name as string) &&
          !bound.has(item.name as string) &&
          !(parent?.property === item && !parent.computed) &&
          !(parent?.key === item && !parent.computed))) &&
      typeof item.start === 'number'
    ) {
      if (item.type === 'ThisExpression' && !componentThis) return;
      positions.add(item.start - offset);
      return;
    }
    const ownsThis = [
      'FunctionExpression',
      'FunctionDeclaration',
      'ObjectMethod',
      'ClassMethod',
      'ClassPrivateMethod',
      'ClassProperty',
      'ClassPrivateProperty',
      'StaticBlock'
    ].includes(item.type as string);
    if (Array.isArray(item.params) || item.type === 'BlockStatement') {
      bound = new Set(bound);
      for (const name of [
        ...bindingNames(item.id),
        ...(Array.isArray(item.params) ? item.params.flatMap(bindingNames) : [])
      ])
        bound.add(name);
      if (Array.isArray(item.body)) {
        for (const statement of item.body as Record<string, unknown>[]) {
          if (
            statement.type === 'FunctionDeclaration' ||
            statement.type === 'ClassDeclaration'
          ) {
            for (const name of bindingNames(statement.id)) bound.add(name);
          }
          if (statement.type === 'VariableDeclaration') {
            for (const declaration of statement.declarations as Record<
              string,
              unknown
            >[]) {
              for (const name of bindingNames(declaration.id)) bound.add(name);
            }
          }
        }
      }
    }
    const methodKey = item.key as
      | { name?: string; value?: unknown }
      | undefined;
    const computedMethod =
      context === 'computed' &&
      root &&
      ['get', 'set'].includes(
        methodKey?.name ||
          (typeof methodKey?.value === 'string' ? methodKey.value : '')
      );
    const rootContainer =
      [
        'File',
        'Program',
        'ExpressionStatement',
        'ParenthesizedExpression',
        'TSAsExpression',
        'TSNonNullExpression'
      ].includes(item.type as string) ||
      (context === 'computed' && root && item.type === 'ObjectExpression') ||
      (computedMethod && item.type === 'ObjectProperty');
    for (const [key, value] of Object.entries(item)) {
      // 计算属性名在外层求值，方法体与类字段使用自己的 this。
      const childThis =
        ownsThis &&
        !(root && item.type === 'FunctionExpression') &&
        !(computedMethod && item.type === 'ObjectMethod') &&
        !(key === 'key' && item.computed)
          ? false
          : componentThis;
      visit(value, childThis, root && rootContainer, bound, item);
    }
  };
  visit(ast);
  // shortcut: 仅转换 this.xxx，需要 this[key] 时扩展成员访问解析。
  return code.replace(
    /(?:\b(?:this|__self)|\$scope)(?:\.([A-Za-z_$][\w$]*)(\.value(?![\w$]))?(\??\.)?)?/g,
    (match, name: string, value = '', access = '', index: number) => {
      if (!positions.has(index)) return match;
      if (!name) {
        if (/^\s*(?:\.|\[)/.test(code.slice(index + match.length)))
          return match;
        symbols.usesInstance = true;
        return '__instance.proxy';
      }
      if (context === 'template' && name === 'context' && (value || access)) {
        return value ? value.slice(1) + access : '';
      }
      if (symbols.refs.has(name) || symbols.computed.has(name)) {
        return (context === 'template' ? name : `${name}.value`) + access;
      }
      if (
        symbols.reactives.has(name) ||
        symbols.methods.has(name) ||
        symbols.composables.has(name) ||
        symbols.injects.has(name) ||
        symbols.dataSources.has(name)
      ) {
        return name + value + access;
      }
      if (symbols.props.has(name)) {
        return (
          (context === 'template' ? name : `__props.${name}`) + value + access
        );
      }
      if (Object.prototype.hasOwnProperty.call(symbols.effectiveApiMap, name)) {
        symbols.globalApis.add(name);
        return symbols.effectiveApiMap[name].replace + value + access;
      }
      symbols.usesInstance = true;
      return `__instance.proxy.${name}${value}${access}`;
    }
  );
}

/**
 * 转换 JSExpression / JSFunction，返回纯字符串
 */
export function transformCode(
  code: JSExpression | JSFunction | undefined,
  symbols: SymbolTable,
  context: TransformContext = 'script'
): string {
  if (!code) return '';
  if (!isJSCode(code)) return '';
  return transformExpression(code.value || '', symbols, context);
}

/**
 * 仅替换 this 前缀，不依赖符号表（兜底转换）
 * 用于无法识别的场景：直接去掉 this. 前缀
 */
export function stripThisPrefix(code: string): string {
  return code.replace(/this\./g, '');
}

/**
 * 移除外层括号包装：( fn ) → fn
 * 与 utils.ts 的 replaceFunctionTag 类似但更宽松
 */
export function unwrapFunction(code: string): string {
  let handler = code.trim().replace(/;$/, '');
  const bracketRegex = /^\((\(|async|function)/;
  if (bracketRegex.test(handler)) {
    handler = handler.substring(1, handler.length - 1).trim();
  }
  return handler;
}
