import { parseScript, traverseAST } from '../shared';
import type { Identifier, StringLiteral } from '@babel/types';
import type { NodePath } from '@babel/traverse';

interface Replacement {
  start: number;
  end: number;
  text: string;
}

/**
 * 基于 AST 的标识符替换函数，功能与 utils.ts 中的 replacer 完全一致：
 * 1. 字符串中的 key 不替换（但 new RegExp("key") 中的 key 要替换）
 * 2. 对象属性访问 obj.key 不替换（. 前）
 * 3. 变量声明（const/let/var）不替换
 * 4. 函数声明/类声明名称不替换
 * 5. 对象属性名 {key: value} 不替换
 * 6. ES6 简写属性 {key} 展开为 key: to
 * 7. 函数参数不替换
 * 8. 其他情况替换：赋值、函数调用、数组元素、模板表达式等
 */
export function replacer(content: string, key: string, to: string): string {
  if (!content.includes(key)) return content;

  try {
    return replaceViaAST(content, key, to);
  } catch {
    return content;
  }
}

function replaceViaAST(content: string, key: string, to: string): string {
  let ast: ReturnType<typeof parseScript>;
  let offset = 0;

  // 尝试多种解析策略
  try {
    ast = parseScript(content);
  } catch {
    // 裸 return / 对象简写等语法在模块顶层不合法，包裹在箭头函数体重试
    const WRAPPER_PREFIX = '(()=>{';
    const WRAPPER_SUFFIX = '})';
    const wrapped = WRAPPER_PREFIX + content + WRAPPER_SUFFIX;
    ast = parseScript(wrapped);
    offset = WRAPPER_PREFIX.length;
  }

  const replacements: Replacement[] = [];

  traverseAST(ast, {
    Identifier(path: NodePath) {
      const node = path.node as Identifier;
      if (node.name !== key) return;

      // 决定操作：'skip' | 'replace' | 'expand'
      const action = determineAction(path, key);

      if (action === 'skip') return;

      const start = (node.start ?? 0) - offset;
      const end = (node.end ?? 0) - offset;
      if (start < 0 || end > content.length) return;

      const text = action === 'expand' ? `${key}: ${to}` : to;
      // 去重：同位置不重复添加
      if (!replacements.some((r) => r.start === start && r.end === end)) {
        replacements.push({ start, end, text });
      }
    },

    StringLiteral(path: NodePath) {
      handleStringLiteral(path, key, to, offset, content, replacements);
    },

    TemplateLiteral(path: NodePath) {
      handleTemplateLiteral(path, key, to, offset, content, replacements);
    }
  } as any);

  if (replacements.length === 0) return content;

  // 按位置倒序排列，从后往前替换以保持位置不变
  replacements.sort((a, b) => b.start - a.start);

  let result = content;
  for (const { start, end, text } of replacements) {
    result = result.slice(0, start) + text + result.slice(end);
  }

  return result;
}

/**
 * 处理字符串字面量中的 key 替换（仅限 new RegExp("...") 场景）
 */
function handleStringLiteral(
  path: NodePath,
  key: string,
  to: string,
  offset: number,
  content: string,
  replacements: Replacement[]
): void {
  const node = path.node as StringLiteral;
  if (!node.value.includes(key)) return;

  // 仅处理 new RegExp("...key...") 场景
  const parent = path.parent as any;
  if (
    parent?.type !== 'NewExpression' ||
    (parent?.callee as any)?.name !== 'RegExp'
  ) {
    return;
  }

  // 在字符串值中查找所有 key 出现的位置并替换
  const value = node.value;
  let searchPos = 0;
  while (searchPos < value.length) {
    const idx = value.indexOf(key, searchPos);
    if (idx === -1) break;

    const keyStartInNode = 1 + idx; // +1 跳过开引号
    const start = (node.start ?? 0) - offset + keyStartInNode;
    const end = start + key.length;

    if (
      start >= 0 &&
      end <= content.length &&
      !replacements.some((r) => r.start === start && r.end === end)
    ) {
      replacements.push({ start, end, text: to });
    }
    searchPos = idx + key.length;
  }
}

/**
 * 处理模板字面量中的 key 替换
 * new RegExp(`...key...`) 场景中，模板字符串的静态部分（TemplateElement/quasis）也需要替换
 */
function handleTemplateLiteral(
  path: NodePath,
  key: string,
  to: string,
  offset: number,
  content: string,
  replacements: Replacement[]
): void {
  // 仅处理 new RegExp(`...`) 场景
  const parent = path.parent as any;
  if (
    parent?.type !== 'NewExpression' ||
    (parent?.callee as any)?.name !== 'RegExp'
  ) {
    return;
  }

  // TemplateLiteral 的 quasis 部分包含静态字符串内容
  const node = path.node as any;
  const quasis: Array<{
    value: { raw: string; cooked?: string };
    start?: number | null;
    end?: number | null;
  }> = node.quasis ?? [];

  for (const quasi of quasis) {
    const rawValue = quasi.value?.raw ?? '';
    if (!rawValue.includes(key)) continue;

    // 对于模板字符串，字符串内容从 backtick 后开始
    // 但我们需要找到 quasi 在原始内容中的确切起始位置
    let searchPos = 0;
    while (searchPos < rawValue.length) {
      const idx = rawValue.indexOf(key, searchPos);
      if (idx === -1) break;

      // quasi.start 是 TemplateElement 在源码中的起始位置
      const quasiStart = (quasi.start ?? 0) - offset;
      if (quasiStart < 0 || quasiStart > content.length) break;

      const start = quasiStart + idx;
      const end = start + key.length;

      if (
        start >= 0 &&
        end <= content.length &&
        !replacements.some((r) => r.start === start && r.end === end)
      ) {
        replacements.push({ start, end, text: to });
      }
      searchPos = idx + key.length;
    }
  }
}

/**
 * 根据 AST 父节点上下文决定对该 Identifier 的操作
 */
function determineAction(
  path: NodePath,
  _key: string
): 'skip' | 'replace' | 'expand' {
  const parent = path.parent as any;
  const parentType: string = parent?.type ?? '';
  const grandParent = path.parentPath?.parent;

  switch (parentType) {
    // 成员访问 obj.key / obj[key] / obj?.key / obj?.[key]
    case 'MemberExpression':
    case 'OptionalMemberExpression': {
      if (parent.property === path.node) {
        // 标识符是属性部分
        return parent.computed ? 'replace' : 'skip';
      }
      if (parent.object === path.node) {
        // 标识符是对象部分 key.prop → 替换
        return 'replace';
      }
      break;
    }

    // 对象属性 { key: val } / { key } / { [key]: val }
    case 'ObjectProperty': {
      if (parent.key === path.node) {
        if (parent.computed) {
          return 'replace'; // { [key]: val }
        }
        if (parent.shorthand) {
          // { key } → 判断是否在解构模式中
          if (grandParent && (grandParent as any)?.type === 'ObjectPattern') {
            return 'skip'; // const { key } = obj 解构，不展开
          }
          return 'expand'; // ES6 简写属性，展开为 key: to
        }
        return 'skip'; // { key: val } 普通属性名
      }
      if (parent.value === path.node) {
        // 如果外围是 ObjectPattern 解构模式则跳过
        if (grandParent && (grandParent as any)?.type === 'ObjectPattern') {
          return 'skip';
        }
        // { prop: expr } 值部分，替换表达式中的标识符
        return 'replace';
      }
      break;
    }

    // 变量声明 const/let/var key = ...
    case 'VariableDeclarator': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }

    // 函数声明 function key() { }
    case 'FunctionDeclaration': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }

    // 类声明 class key { }
    case 'ClassDeclaration': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }

    // 类表达式 const X = class key { }
    case 'ClassExpression': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }

    // 异常捕获 catch(key) { }
    case 'CatchClause': {
      if (parent.param === path.node) {
        return 'skip';
      }
      break;
    }

    // import key from; import * as key; import { key }
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
    case 'ImportSpecifier': {
      return 'skip';
    }

    // ES6 export 导出名
    case 'ExportSpecifier': {
      return 'skip';
    }

    // 标签语句 key: for(...)
    case 'LabeledStatement': {
      if (parent.label === path.node) {
        return 'skip';
      }
      break;
    }

    // 默认参数 function(key = val)
    case 'AssignmentPattern': {
      if (parent.left === path.node) {
        return 'skip';
      }
      break;
    }

    // 展开运算符 ...key
    case 'SpreadElement': {
      if (parent.argument === path.node) {
        return 'replace';
      }
      break;
    }

    // 对象方法 { key() {} }
    case 'ObjectMethod': {
      if (parent.key === path.node && !parent.computed) {
        return 'skip'; // 方法名不替换
      }
      break;
    }

    // Rest 元素 function(...key)
    case 'RestElement': {
      if (parent.argument === path.node) {
        return 'skip';
      }
      break;
    }

    // 枚举声明 enum key { }
    case 'TSEnumDeclaration': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }

    // 类型别名 type key = ...
    case 'TSTypeAliasDeclaration': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }

    // 接口声明 interface key { }
    case 'TSInterfaceDeclaration': {
      if (parent.id === path.node) {
        return 'skip';
      }
      break;
    }
  }

  // 检查是否为函数参数
  if (isFunctionParameter(path)) {
    return 'skip';
  }

  // 检查是否在解构模式 (ObjectPattern) 中
  if (isInObjectPattern(path)) {
    return 'skip';
  }

  // 默认：替换
  return 'replace';
}

/**
 * 检查当前 Identifier 是否为函数参数
 */
function isFunctionParameter(path: NodePath): boolean {
  let current: NodePath | null = path.parentPath;
  while (current) {
    const node = current.node as any;
    const type: string = node?.type ?? '';
    if (
      type === 'FunctionDeclaration' ||
      type === 'FunctionExpression' ||
      type === 'ArrowFunctionExpression' ||
      type === 'ClassMethod' ||
      type === 'ObjectMethod' ||
      type === 'TSDeclareFunction'
    ) {
      const params = (node.params as any[]) ?? [];
      return params.includes(path.node);
    }
    // 到达顶层或非嵌套作用域时停止
    if (
      type === 'Program' ||
      type === 'BlockStatement' ||
      type === 'ObjectExpression' ||
      type === 'ArrayExpression' ||
      type === 'StaticBlock'
    ) {
      break;
    }
    current = current.parentPath;
  }
  return false;
}

/**
 * 检查当前 Identifier 是否在解构模式 (ObjectPattern) 中
 */
function isInObjectPattern(path: NodePath): boolean {
  let current: NodePath | null = path.parentPath;
  while (current) {
    const type: string = (current.node as any)?.type ?? '';
    if (type === 'ObjectPattern') return true;
    if (
      type === 'FunctionDeclaration' ||
      type === 'FunctionExpression' ||
      type === 'ArrowFunctionExpression' ||
      type === 'Program'
    ) {
      break;
    }
    current = current.parentPath;
  }
  return false;
}
