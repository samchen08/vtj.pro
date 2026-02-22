import { parse, compileTemplate } from '@vue/compiler-sfc';
import { parse as babelParse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type { Node } from '@babel/types';
import type { TraverseOptions, Visitor } from '@babel/traverse';
import type { JSExpression, JSFunction, NodeSchema } from '@vtj/core';

export function parseSFC(source: string) {
  const { descriptor, errors } = parse(source);
  const template = descriptor.template?.content || '';
  const script = (descriptor.scriptSetup || descriptor.script)?.content || '';
  const styles = descriptor.styles.map((s) => s.content);
  return {
    template,
    script,
    styles,
    errors
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
  return !!data && data.type === 'JSExpression';
}

export function isJSFunction(x: any): x is JSFunction {
  return typeof x === 'object' && !!x && x.type === 'JSFunction';
}

export function isJSCode(data: unknown): data is JSExpression | JSFunction {
  return !!isJSExpression(data) || !!isJSFunction(data);
}

export function isNodeSchema(
  node: NodeSchema | JSExpression | string | null
): node is NodeSchema {
  return !!node && !isJSExpression(node) && typeof node !== 'string';
}

export function transformScript(script: string, visitor: Visitor) {
  try {
    const ast = parseScript(script);
    traverseAST(ast, visitor);
    const code = generateCode(ast);
    return code || '';
  } catch (e) {
    return '';
  }
}

export function compileValidator(
  source: string,
  filename: string
): string[] | null {
  const errors: string[] = [];

  // 1. 检查 Vue SFC 基本结构
  try {
    const { descriptor, errors: sfcErrors } = parse(source);

    // 添加 Vue 编译器的错误
    if (sfcErrors && sfcErrors.length > 0) {
      sfcErrors.forEach((error) => {
        // 处理不同类型的错误对象
        const errorMessage = error.message || String(error);
        const loc = (error as any).loc;
        if (loc && loc.start) {
          errors.push(
            `Vue SFC 错误: ${errorMessage} (位置: ${loc.start.line}:${loc.start.column})`
          );
        } else {
          errors.push(`Vue SFC 错误: ${errorMessage}`);
        }
      });
    }

    // 2. 检查模板编译错误
    if (descriptor.template) {
      try {
        const templateResult = compileTemplate({
          id: 'validation',
          filename,
          source: descriptor.template.content,
          isProd: false
        });

        if (templateResult.errors && templateResult.errors.length > 0) {
          templateResult.errors.forEach((error) => {
            // 处理不同类型的错误对象
            const errorMessage =
              typeof error === 'string' ? error : error.message;
            const loc = typeof error === 'string' ? null : (error as any).loc;
            if (loc && loc.start) {
              errors.push(
                `模板编译错误: ${errorMessage} (位置: ${loc.start.line}:${loc.start.column})`
              );
            } else {
              errors.push(`模板编译错误: ${errorMessage}`);
            }
          });
        }
      } catch (templateError: any) {
        errors.push(`模板编译错误: ${templateError.message}`);
      }
    }

    // 3. 检查脚本语法错误
    const scriptContent = (descriptor.scriptSetup || descriptor.script)
      ?.content;
    if (scriptContent) {
      try {
        // 使用现有的 parseScript 函数检查语法
        parseScript(scriptContent);
      } catch (scriptError: any) {
        errors.push(`脚本语法错误: ${scriptError.message}`);
      }
    }

    // 4. 检查样式语法错误
    // 暂不实现样式校验
  } catch (parseError: any) {
    errors.push(`Vue SFC 解析错误: ${parseError.message}`);
  }

  // 返回结果
  return errors.length > 0 ? errors : null;
}
