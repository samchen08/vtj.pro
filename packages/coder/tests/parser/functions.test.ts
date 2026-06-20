import { expect, describe, test } from 'vitest';
import { parseFunctionMap } from '../../src/parser/functions';

describe('parseFunctionMap', () => {
  test('should parse a function map entry', () => {
    const result = parseFunctionMap({
      handleClick: {
        type: 'JSFunction',
        value: 'function() { console.log(1) }'
      }
    });
    expect(result[0]).toContain('handleClick() { console.log(1) }');
  });

  test('should handle empty function map', () => {
    expect(parseFunctionMap({})).toEqual([]);
  });

  test('should handle undefined', () => {
    expect(parseFunctionMap(undefined)).toEqual([]);
  });

  test('should handle async function', () => {
    const result = parseFunctionMap({
      fetchData: {
        type: 'JSFunction',
        value: 'async function() { await api.get() }'
      }
    });
    expect(result[0]).toContain('async fetchData() { await api.get() }');
  });

  test('should handle arrow function', () => {
    const result = parseFunctionMap({
      onClick: { type: 'JSFunction', value: '() => { console.log("click") }' }
    });
    expect(result[0]).toContain('onClick()');
    expect(result[0]).toContain('console.log("click")');
  });

  test('should handle function tag replacement', () => {
    const result = parseFunctionMap({
      sayHi: { type: 'JSFunction', value: '(function() { return "hi" })' }
    });
    expect(result[0]).toContain('sayHi');
    expect(result[0]).toContain('return "hi"');
  });
});
