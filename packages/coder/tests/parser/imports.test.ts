import { expect, describe, test } from 'vitest';
import { parseImports } from '../../src/parser/imports';

describe('parseImports', () => {
  test('should include defineComponent and reactive by default', () => {
    const result = parseImports(new Map(), [], [], {}, 'web');
    const vueImport = result.imports.find((i) => i.includes('vue'));
    expect(vueImport).toContain('defineComponent');
    expect(vueImport).toContain('reactive');
  });

  test('should include importBlocks', () => {
    const result = parseImports(
      new Map(),
      [],
      ["import BlockComp from './block.vue'"],
      {},
      'web'
    );
    expect(result.imports).toContain("import BlockComp from './block.vue'");
  });

  test('should handle uni platform filtering', () => {
    const uniMap = new Map<string, any>([
      ['View', { name: 'View', package: 'uni-h5' }]
    ]);
    const result = parseImports(uniMap, ['View'], [], {}, 'uniapp');
    const uniImport = result.imports.find((i) => i.includes('uni-h5'));
    expect(uniImport).toBeUndefined();
    expect(result.uniComponents).toContain('View');
  });

  test('should generate import for element component via collectImports', () => {
    const collectImports = { 'element-plus': new Set(['ElButton']) };
    const result = parseImports(new Map(), [], [], collectImports, 'web');
    const elImport = result.imports.find((i) => i.includes('element-plus'));
    expect(elImport).toContain('ElButton');
  });
});
