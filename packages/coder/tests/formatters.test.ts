import { expect, describe, test } from 'vitest';
import {
  vueFormatter,
  htmlFormatter,
  tsFormatter,
  jsFormatter,
  cssFormatter
} from '../src/formatters';

describe('vueFormatter', () => {
  test('should format Vue template', async () => {
    const input = `<template><div><p>hello</p></div></template><script lang="ts" setup>const a = 1</script><style scoped>div{color:red}</style>`;
    const result = await vueFormatter(input);
    expect(result).toContain('<template>');
    expect(result).toContain('<script lang="ts" setup>');
    expect(result).toContain('<style scoped>');
    expect(result).toContain('color: red');
    expect(result).toContain('const a = 1');
  });

  test('should return original content when disabled', async () => {
    const input = `  <template>  </template>  `;
    const result = await vueFormatter(input, true);
    expect(result).toBe(input);
  });
});

describe('htmlFormatter', () => {
  test('should format HTML', async () => {
    const input = `<div><p>hello</p></div>`;
    const result = await htmlFormatter(input);
    expect(result).toContain('<div>');
    expect(result).toContain('<p>');
    expect(result).toContain('hello');
  });

  test('should return original content when disabled', async () => {
    const input = `<div>  test  </div>`;
    const result = await htmlFormatter(input, true);
    expect(result).toBe(input);
  });
});

describe('tsFormatter', () => {
  test('should format TypeScript code', async () => {
    const input = `const a:number=1;const b=2;`;
    const result = await tsFormatter(input);
    expect(result).toContain('const a: number = 1');
    expect(result).toContain('const b = 2');
  });

  test('should return original content on error and not throw', async () => {
    const input = `invalid @@ code !!!`;
    const result = await tsFormatter(input);
    expect(result).toBe(input);
  });

  test('should return original content when disabled', async () => {
    const input = `const a =  1`;
    const result = await tsFormatter(input, true);
    expect(result).toBe(input);
  });
});

describe('jsFormatter', () => {
  test('should format JavaScript code', async () => {
    const input = `const a=1;const b=2;`;
    const result = await jsFormatter(input);
    expect(result).toContain('const a = 1');
    expect(result).toContain('const b = 2');
  });

  test('should return original content when disabled', async () => {
    const input = `const a =  1`;
    const result = await jsFormatter(input, true);
    expect(result).toBe(input);
  });
});

describe('cssFormatter', () => {
  test('should format CSS/SCSS', async () => {
    const input = `div{color:red;font-size:14px}`;
    const result = await cssFormatter(input);
    expect(result).toContain('div {');
    expect(result).toContain('color: red');
    expect(result).toContain('font-size: 14px');
  });

  test('should return original content when disabled', async () => {
    const input = `div{color:red}`;
    const result = await cssFormatter(input, true);
    expect(result).toBe(input);
  });
});
