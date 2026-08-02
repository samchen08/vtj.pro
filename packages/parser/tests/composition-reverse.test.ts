import { expect, test, describe } from 'vitest';
import { reverseTransformExpression } from '../src/vue/composition/reverseTransformer';
import type { ReverseSymbolTable } from '../src/vue/composition/reverseSymbolTable';

const emptySymbols: ReverseSymbolTable = {
  refs: new Set([]),
  reactives: new Set([]),
  computed: new Set([]),
  methods: new Set([]),
  props: new Set([]),
  composables: new Set([]),
  injects: new Set([]),
  dataSources: new Set([]),
  hasState: false,
  reverseApiMap: {},
  reverseMemberApiMap: {}
};

describe('reverseTransformExpression', () => {
  test('should return empty string for empty input', () => {
    expect(reverseTransformExpression('', emptySymbols)).toBe('');
  });

  test('should return original code when no symbols match', () => {
    expect(reverseTransformExpression('x + y', emptySymbols)).toBe('x + y');
  });

  test('should transform ref identifiers', () => {
    const symbols: ReverseSymbolTable = {
      ...emptySymbols,
      refs: new Set(['count', 'name'])
    };
    const result = reverseTransformExpression('count + name', symbols);
    expect(result).toBeDefined();
  });

  test('should transform reactives', () => {
    const symbols: ReverseSymbolTable = {
      ...emptySymbols,
      reactives: new Set(['form'])
    };
    const result = reverseTransformExpression('form.name', symbols);
    expect(result).toBeDefined();
  });

  test('should transform methods', () => {
    const symbols: ReverseSymbolTable = {
      ...emptySymbols,
      methods: new Set(['handleClick', 'reset'])
    };
    const result = reverseTransformExpression('handleClick()', symbols);
    expect(result).toBeDefined();
  });
});
