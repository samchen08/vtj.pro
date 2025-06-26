import { parse } from '@vue/compiler-sfc';
import { parse as babelParse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type { Node } from '@babel/types';
import type { TraverseOptions } from '@babel/traverse';

import type { JSExpression, JSFunction, NodeSchema } from '@vtj/core';

export function parseSFC(source: string) {
  const { descriptor } = parse(source);
  const template = descriptor.template?.content || '';
  const script = (descriptor.scriptSetup || descriptor.script)?.content || '';
  const styles = descriptor.styles.map((s) => s.content);
  return {
    template,
    script,
    styles
  };
}

export function parseScript(script: string) {
  return babelParse(script, { sourceType: 'module', plugins: ['typescript'] });
}

export function traverseAST(
  ast: ReturnType<typeof parseScript>,
  options: TraverseOptions
) {
  const func = (traverse as any).default || traverse;
  return func(ast, options);
}

export function generateCode(node: Node) {
  try {
    const func = (generate as any).default || generate;
    const generated = func(node, {
      comments: false,
      concise: true,
      retainLines: false,
      jsescOption: {
        minimal: true
      }
    }).code;

    return generated;
  } catch (e) {
    console.error('代码生成错误', e);
    return '';
  }
}

export function isJSExpression(data: any): data is JSExpression {
  return data && data.type === 'JSExpression';
}

export function isJSFunction(x: any): x is JSFunction {
  return typeof x === 'object' && x && x.type === 'JSFunction';
}

export function isJSCode(data: unknown): data is JSExpression | JSFunction {
  return isJSExpression(data) || isJSFunction(data);
}

export function isNodeSchema(
  node: NodeSchema | JSExpression | string | null
): node is NodeSchema {
  return !!node && !isJSExpression(node) && typeof node !== 'string';
}
