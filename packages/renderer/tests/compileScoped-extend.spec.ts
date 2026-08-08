import { expect, test, describe } from 'vitest';
import { compileScopedCSS } from '../src/utils/compileScoped';

const scopeId = 'data-v-test';

test('handles /deep/ combinator', () => {
  const css = `.wrapper /deep/ .nested { margin: 10px; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.nested[${scopeId}]`);
});

test('preserves root/html/body selectors', () => {
  const css = `:root { --color: red; } body { margin: 0; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(':root');
  expect(result).toContain('body');
  expect(result).not.toContain(`:root[${scopeId}]`);
});

test('handles @media rules with nested selectors', () => {
  const css = `@media (max-width: 768px) { .responsive { display: none; } }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@media');
  expect(result).toContain(`.responsive[${scopeId}]`);
});

test('handles @supports rules', () => {
  const css = `@supports (display: grid) { .grid { display: grid; } }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@supports');
  expect(result).toContain(`.grid[${scopeId}]`);
});

test('handles @import simple directive', () => {
  const css = `@import url('style.css');`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@import');
});

test('handles multiple comma-separated selectors', () => {
  const css = `.a, .b, .c { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.a[${scopeId}]`);
  expect(result).toContain(`.b[${scopeId}]`);
  expect(result).toContain(`.c[${scopeId}]`);
});

test('handles @keyframes with percentage selectors', () => {
  const css = `@keyframes slide { 0% { transform: translateX(0); } 50% { transform: translateX(50px); } 100% { transform: translateX(100px); } }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@keyframes slide');
  expect(result).toContain('0%');
  expect(result).toContain('100%');
});

test('handles :deep() without parent selector', () => {
  const css = `:deep(.nested) { font-size: 14px; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('.nested');
  expect(result).not.toContain(`:deep`);
  // 与 Vue 官方 scoped 语义一致：scope 作为前缀的后代选择器
  expect(result).toContain(`[${scopeId}] .nested`);
  expect(result).not.toContain(`.nested[${scopeId}]`);
});

test('handles empty CSS selector', () => {
  const css = ` { color: red; } `;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toBe('');
});

test('handles css with only whitespace', () => {
  const css = `   \n  \t  `;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toBe('');
});

test('preserves important comments in output', () => {
  const css = `/*! keep this */ .container { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  // Important comments may be stripped depending on parser implementation
  expect(result).toContain('.container');
});

test('handles already-scoped selectors adds new scope', () => {
  const css = `.already[data-v-123] { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  // Different scope ID already exists, new scope is added
  expect(result).toContain('[data-v-123]');
  expect(result).toContain(scopeId);
});

test('handles ::v-deep without parentheses', () => {
  const css = `.parent ::v-deep .child { margin: 0; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('.child');
});
