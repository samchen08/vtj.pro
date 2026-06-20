import { expect, test, describe } from 'vitest';
import {
  parseSFC,
  parseScript,
  traverseAST,
  generateCode,
  isJSExpression,
  isJSFunction,
  isJSCode,
  isNodeSchema,
  transformScript,
  compileValidator
} from '../src/shared';

const basicSFC = `
<template>
  <div>Hello</div>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style scoped>
.test { color: red; }
</style>
`;

const scriptSetupSFC = `
<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const msg = ref('hello');
</script>
`;

const noStyleSFC = `
<template>
  <div>No Style</div>
</template>

<script>
export default {}
</script>
`;

describe('parseSFC', () => {
  test('should parse basic SFC with template, script, style', () => {
    const result = parseSFC(basicSFC);
    expect(result.template).toContain('<div>Hello</div>');
    expect(result.script).toContain('export default');
    expect(result.styles.length).toBe(1);
    expect(result.styles[0]).toContain('.test');
    expect(result.isScriptSetup).toBe(false);
    expect(result.errors.length).toBe(0);
  });

  test('should detect script setup', () => {
    const result = parseSFC(scriptSetupSFC);
    expect(result.isScriptSetup).toBe(true);
    expect(result.script).toContain('const msg');
  });

  test('should handle SFC without style', () => {
    const result = parseSFC(noStyleSFC);
    expect(result.styles.length).toBe(0);
    expect(result.template).toBeDefined();
    expect(result.script).toBeDefined();
  });

  test('should return empty strings for missing sections', () => {
    const result = parseSFC('<template><div/></template>');
    expect(result.template).toBeDefined();
    expect(result.script).toBe('');
    expect(result.styles).toEqual([]);
  });
});

describe('parseScript', () => {
  test('should parse TypeScript code', () => {
    const ast = parseScript('const x: number = 1;');
    expect(ast).toBeDefined();
    expect(ast.program.body.length).toBeGreaterThan(0);
  });

  test('should throw on invalid syntax', () => {
    expect(() => parseScript('const x = ;')).toThrow();
  });
});

describe('traverseAST', () => {
  test('should traverse AST nodes', () => {
    const ast = parseScript('const x = 1;');
    const variables: string[] = [];
    traverseAST(ast, {
      VariableDeclarator(path: any) {
        variables.push(path.node.id.name);
      }
    });
    expect(variables).toContain('x');
  });
});

describe('generateCode', () => {
  test('should generate code from AST node', () => {
    const ast = parseScript('const x = 42;');
    const decl = ast.program.body[0] as any;
    const code = generateCode(decl.declarations[0].init);
    expect(code).toBe('42');
  });

  test('should return empty string for null input', () => {
    expect(generateCode(null as any)).toBe('');
  });
});

describe('type guards', () => {
  test('isJSExpression', () => {
    expect(isJSExpression({ type: 'JSExpression', value: 'a + b' })).toBe(true);
    expect(isJSExpression({ type: 'JSFunction', value: '() => {}' })).toBe(
      false
    );
    expect(isJSExpression(null)).toBe(false);
    expect(isJSExpression(undefined)).toBe(false);
  });

  test('isJSFunction', () => {
    expect(isJSFunction({ type: 'JSFunction', value: '() => {}' })).toBe(true);
    expect(isJSFunction({ type: 'JSExpression', value: 'a' })).toBe(false);
    expect(isJSFunction(null)).toBe(false);
  });

  test('isJSCode', () => {
    expect(isJSCode({ type: 'JSExpression', value: 'a' })).toBe(true);
    expect(isJSCode({ type: 'JSFunction', value: '() => {}' })).toBe(true);
    expect(isJSCode({ name: 'div' })).toBe(false);
    expect(isJSCode(null)).toBe(false);
  });

  test('isNodeSchema', () => {
    expect(isNodeSchema({ name: 'div', id: '123' })).toBe(true);
    expect(isNodeSchema({ type: 'JSExpression', value: 'a' })).toBe(false);
    expect(isNodeSchema('string')).toBe(false);
    expect(isNodeSchema(null)).toBe(false);
  });
});

describe('transformScript', () => {
  test('should transform script with visitor', () => {
    const result = transformScript('export default { name: "Test" }', {
      ExportDefaultDeclaration(path: any) {
        const obj = path.node.declaration;
        if (obj.type === 'ObjectExpression') {
          obj.properties.push({
            type: 'ObjectProperty',
            key: { type: 'Identifier', name: 'version' },
            value: { type: 'StringLiteral', value: '1.0' }
          });
        }
      }
    });
    expect(result).toContain('version');
    expect(result).toContain('1.0');
  });

  test('should return empty string on invalid script', () => {
    const result = transformScript('invalid {{{ syntax', {});
    expect(result).toBe('');
  });
});

describe('compileValidator', () => {
  test('should return null for valid SFC', () => {
    const result = compileValidator(basicSFC, 'test.vue');
    expect(result).toBeNull();
  });

  test('should return errors for invalid template', () => {
    const invalid = `<template><div>Missing close</template>
<script>export default {}</script>`;
    const result = compileValidator(invalid, 'bad.vue');
    // May or may not have template errors depending on Vue compiler strictness
    expect(result).not.toBeNull();
  });

  test('should return errors for script syntax error', () => {
    const invalid = `<template><div/></template>
<script>export default { invalid syntax !! }</script>`;
    const result = compileValidator(invalid, 'bad.vue');
    expect(result).not.toBeNull();
    expect(result!.some((e) => e.includes('脚本语法错误'))).toBe(true);
  });

  test('should handle parse error gracefully', () => {
    const result = compileValidator('not even a valid SFC', 'bad.vue');
    expect(result).not.toBeNull();
  });
});
