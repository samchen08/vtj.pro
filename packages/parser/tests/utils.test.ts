import { expect, test, describe } from 'vitest';
import {
  parseSFC,
  parseScript,
  generateCode,
  isJSExpression,
  isJSFunction,
  isJSCode,
  isNodeSchema
} from '../src/shared/utils';

describe('SFC Parser', () => {
  test('parseSFC should parse vue component correctly', () => {
    const source = `
<template>
  <div>Hello World</div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style>
.hello { color: red; }
</style>
    `.trim();

    const result = parseSFC(source);
    
    expect(result.template).toContain('<div>Hello World</div>');
    expect(result.script).toContain('export default');
    expect(result.styles).toHaveLength(1);
    expect(result.styles[0]).toContain('.hello { color: red; }');
  });
});

describe('Script Parser', () => {
  test('parseScript should parse javascript code correctly', () => {
    const script = `
      const x = 1;
      function add(a, b) {
        return a + b;
      }
    `;
    
    const ast = parseScript(script);
    expect(ast.type).toBe('File');
    expect(ast.program.type).toBe('Program');
    expect(ast.program.body).toHaveLength(2);
  });

  test('parseScript should handle typescript code', () => {
    const script = `
      interface Person {
        name: string;
        age: number;
      }
      
      const person: Person = {
        name: 'John',
        age: 30
      };
    `;
    
    const ast = parseScript(script);
    expect(ast.type).toBe('File');
    expect(ast.program.body).toHaveLength(2);
  });
});

describe('Code Generator', () => {
  test('generateCode should generate code from AST', () => {
    const script = 'const x = 1;';
    const ast = parseScript(script);
    const generated = generateCode(ast);
    expect(generated).toBe('const x = 1;');
  });
});

describe('Type Guards', () => {
  test('isJSExpression should identify JSExpression correctly', () => {
    const expr = { type: "JSExpression" as const, value: '1 + 1' };
    const notExpr = { type: "other" as const, value: '1 + 1' };
    
    expect(isJSExpression(expr)).toBe(true);
    expect(isJSExpression(notExpr)).toBe(false);
    expect(isJSExpression(null)).toBe(false);
  });

  test('isJSFunction should identify JSFunction correctly', () => {
    const func = { type: "JSFunction" as const, value: 'function() {}' };
    const notFunc = { type: "other" as const, value: 'function() {}' };
    
    expect(isJSFunction(func)).toBe(true);
    expect(isJSFunction(notFunc)).toBe(false);
    expect(isJSFunction(null)).toBe(false);
  });

  test('isJSCode should identify JSExpression or JSFunction correctly', () => {
    const expr = { type: "JSExpression" as const, value: '1 + 1' };
    const func = { type: "JSFunction" as const, value: 'function() {}' };
    const other = { type: "other" as const, value: 'something' };
    
    expect(isJSCode(expr)).toBe(true);
    expect(isJSCode(func)).toBe(true);
    expect(isJSCode(other)).toBe(false);
    expect(isJSCode(null)).toBe(false);
  });

  test('isNodeSchema should identify NodeSchema correctly', () => {
    const node = { 
      componentName: 'div',
      name: 'TestDiv',
      props: {},
      children: []
    };
    const expr = { type: "JSExpression" as const, value: '1 + 1' };
    const str = 'plain string';
    
    expect(isNodeSchema(node)).toBe(true);
    expect(isNodeSchema(expr)).toBe(false);
    expect(isNodeSchema(str)).toBe(false);
    expect(isNodeSchema(null)).toBe(false);
  });
});
