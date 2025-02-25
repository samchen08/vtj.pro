import { parse } from '@vue/compiler-sfc';
import { parse as babelParse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type { Node } from '@babel/types';
import type { TraverseOptions } from '@babel/traverse';

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
  return traverse(ast, options);
}

export function generateCode(node: Node) {
  try {
    const generated = generate(node, {
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
