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

  test('should filter useProvider composable', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        {
          name: 'provider',
          composable: 'useProvider',
          from: '@/provider'
        }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements).toEqual([]);
  });

  test('should parse composable with args', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        {
          name: 'data',
          composable: 'useFetch',
          from: '@/composables',
          args: ['/api/users']
        }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements[0]).toContain('useFetch');
    expect(result.statements[0]).toContain('/api/users');
  });

  test('should parse composable without name (side effect only)', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        {
          composable: 'useInit',
          from: '@/composables'
        }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements[0]).toContain('useInit()');
  });

  test('should deduplicate composables by name', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        { name: 'router', composable: 'useRouter', from: 'vue-router' },
        { name: 'router', composable: 'useRouter', from: 'vue-router' }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements.length).toBe(1);
  });

  test('should parse composable with JSExpression args', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      composables: [
        {
          name: 'result',
          composable: 'useQuery',
          from: '@/composables',
          args: [{ type: 'JSExpression', value: 'props.id' }]
        }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComposables(dsl.composables, symbols);
    expect(result.statements[0]).toContain('useQuery');
  });
});
