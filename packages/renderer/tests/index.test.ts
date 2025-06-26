import { expect, test } from 'vitest';
import * as Renderer from '../src';
import { compileScopedCSS } from '../src';

// 完整测试
const testCSS = `



.container { color: red; }
.item:hover { background: blue; }
.item::after { background: blue; }

/* deep 语法 */
.parent :deep(.child) { font-size: 14px; }
.wrapper >>> .nested { margin: 10px; }

/* keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  50% { opacity: 0.5; }
  to { opacity: 1; transform: translateY(0); }
}

/* media queries */
@media (max-width: 768px) {
  .responsive { display: none; }
  .mobile:focus { outline: 2px solid blue; }
}

/* supports */
@supports (display: grid) {
  .grid { display: grid; }
  .grid-item { grid-area: auto; }
}

/* 全局选择器 */
:root { --color: red; }
body { margin: 0; }
`;

test('index', () => {
  const result = compileScopedCSS(testCSS, 'data-v-1232');

  console.log(result);

  expect(!!Renderer).toEqual(true);
});

// console.log(compileScopedCSS(testCSS, 'data-v-123'));
