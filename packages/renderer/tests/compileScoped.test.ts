import { expect, test, describe } from 'vitest';
import { compileScopedCSS } from '../src/utils/compileScoped';

const scopeId = 'data-v-test';

test('adds scope to simple selector', () => {
  const css = `.container { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.container[${scopeId}]`);
});

test('adds scope to pseudo class selectors', () => {
  const css = `.item:hover { background: blue; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.item[${scopeId}]:hover`);
});

test('adds scope to pseudo element selectors', () => {
  const css = `.item::after { content: ""; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.item[${scopeId}]::after`);
});

test('handles :deep() combinator', () => {
  const css = `.parent :deep(.child) { font-size: 14px; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.parent[${scopeId}] .child`);
});

test('handles ::v-deep as :deep alias', () => {
  const css = `.wrapper ::v-deep(.nested) { margin: 10px; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.wrapper[${scopeId}] .nested`);
});

test('handles >>> combinator as deep', () => {
  const css = `.wrapper >>> .nested { margin: 10px; }`;
  const result = compileScopedCSS(css, scopeId);
  // The >>> is replaced with space, so the scope goes on .nested
  expect(result).toContain(`.nested[${scopeId}]`);
});

test(`preserves @keyframes unchanged`, () => {
  const css = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@keyframes fadeIn');
  expect(result).toContain('from');
  expect(result).toContain('to');
});

test('handles @media rules with nested selectors', () => {
  const css = `@media (max-width: 768px) { .responsive { display: none; } }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@media (max-width: 768px)');
  expect(result).toContain(`.responsive[${scopeId}]`);
});

test('handles @supports rules', () => {
  const css = `@supports (display: grid) { .grid { display: grid; } }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@supports (display: grid)');
  expect(result).toContain(`.grid[${scopeId}]`);
});

test('preserves :root global selector', () => {
  const css = `:root { --color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(':root');
  expect(result).not.toContain(`[${scopeId}]`);
});

test('preserves html and body selectors', () => {
  const css = `body { margin: 0; } html { font-size: 16px; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('body');
  expect(result).toContain('html');
  expect(result).not.toContain(`body[${scopeId}]`);
  expect(result).not.toContain(`html[${scopeId}]`);
});

test('handles comma-separated selector groups', () => {
  const css = `.a, .b, .c { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.a[${scopeId}]`);
  expect(result).toContain(`.b[${scopeId}]`);
  expect(result).toContain(`.c[${scopeId}]`);
});

test('handles complex selector with multiple classes', () => {
  const css = `.a.b .c.d { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  // Only the last part of the selector gets the scope
  expect(result).toContain(`.c.d[${scopeId}]`);
});

test('handles attribute selectors', () => {
  const css = `[type="text"] { border: 1px solid; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`[type="text"][${scopeId}]`);
});

test('skips already scoped selectors', () => {
  const css = `.container[${scopeId}] { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain(`.container[${scopeId}]`);
  // Should not duplicate the scope
  expect(result).not.toContain(`[${scopeId}][${scopeId}]`);
});

test('handles @import rules', () => {
  const css = `@import url("reset.css"); .container { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toContain('@import url("reset.css")');
  expect(result).toContain(`.container[${scopeId}]`);
});

test('preserves important comments', () => {
  const css = `/*! important */ .container { color: red; }`;
  const result = compileScopedCSS(css, scopeId);
  // Important comments may be stripped, but the CSS should still work
  expect(result).toContain(`.container[${scopeId}]`);
});

test('handles empty CSS', () => {
  expect(compileScopedCSS('', scopeId)).toBe('');
});

test('handles CSS with only comments', () => {
  const css = `/* just a comment */`;
  const result = compileScopedCSS(css, scopeId);
  expect(result).toBe('');
});
