import { describe, expect, test } from 'vitest';
import { sortInitializations } from '../../../src/parser/composition/initialization';

function evaluate(statements: string[], expression: string) {
  const ordered = sortInitializations(statements);
  return new Function(`${ordered.join('\n')}\nreturn ${expression};`)();
}

describe('initialization dependencies', () => {
  test('initializes dependencies across declarations', () => {
    expect(
      evaluate(
        [
          'const result = service.value + state.offset;',
          'const state = { offset: seed };',
          'const service = { value: seed * 2 };',
          'const seed = 2;'
        ],
        'result'
      )
    ).toBe(6);
  });

  test('follows dependencies of immediately invoked methods', () => {
    expect(
      evaluate(
        [
          'const result = read();',
          'const read = () => seed + 1;',
          'const seed = 2;'
        ],
        'result'
      )
    ).toBe(3);
  });

  test('follows default parameters and local helper calls', () => {
    expect(
      evaluate(
        [
          'const result = read();',
          'const read = (value = seed) => { function add() { return value + seed; } return add(); };',
          'const seed = 3;'
        ],
        'result'
      )
    ).toBe(6);
  });

  test('follows computed getter dependencies when reading its value', () => {
    const sorted = sortInitializations([
      'const result = total.value;',
      'const total = computed(() => seed * 2);',
      'const seed = 3;'
    ]);
    const computed = (get: () => unknown) => ({
      get value() {
        return get();
      }
    });
    expect(
      new Function('computed', `${sorted.join('\n')} return result;`)(computed)
    ).toBe(6);
  });

  test('keeps mutually referring functions lazy', () => {
    expect(
      evaluate(
        [
          'const first = () => second();',
          'const second = () => first;',
          'const getter = (() => () => later)();',
          'const later = { get: getter };'
        ],
        'first() === first && later.get() === later'
      )
    ).toBe(true);
  });

  test('does not mistake parameters, locals or property keys for dependencies', () => {
    expect(
      evaluate(
        [
          'const result = (() => { const seed = 2; return { seed }.seed; })();',
          'const seed = result;',
          'const read = (seed) => seed + 1;'
        ],
        'read(result)'
      )
    ).toBe(3);
  });

  test('preserves repeated side effects in composable order', () => {
    const calls: number[] = [];
    const composables = [
      'void start(seed);',
      'void start(seed);',
      'const result = finish();'
    ];
    const sorted = sortInitializations(
      ['const seed = 2;', ...composables],
      composables
    );
    new Function('start', 'finish', sorted.join('\n'))(
      (n: number) => calls.push(n),
      () => calls.push(3)
    );
    expect(calls).toEqual([2, 2, 3]);
  });

  test.each([
    ['const a = b;', 'const b = a;'],
    ['const a = a.value;'],
    ['const result = read();', 'const read = () => result;']
  ])('rejects eager dependency cycles: %s', (...statements) => {
    expect(() => sortInitializations(statements)).toThrow('循环初始化依赖');
  });
});
