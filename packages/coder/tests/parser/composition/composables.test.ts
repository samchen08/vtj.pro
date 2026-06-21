import { expect, describe, test } from 'vitest';
import { parseComposables } from '../../../src/parser/composition/composables';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseComposables', () => {
  test('should parse composable with destructure', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        {
          composable: 'useUserStore',
          from: '@/store/user',
          destructure: ['user', 'login']
        }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements[0]).toContain(
      'const { user, login } = useUserStore()'
    );
  });

  test('should parse composable without destructure', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        { name: 'mouse', composable: 'useMouse', from: '@vueuse/core' }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements[0]).toContain('const mouse = useMouse()');
  });

  test('should handle empty composables', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    const result = parseComposables([], symbols);
    expect(result.statements).toEqual([]);
  });
});
