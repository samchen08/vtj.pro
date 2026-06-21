import { expect, describe, test } from 'vitest';
import {
  isJSExpression,
  isJSFunction,
  isJSCode,
  JSCodeToString,
  replaceThis,
  replaceContext,
  parseValue,
  replaceComputedValue,
  replaceFunctionTag,
  parsePlainObjectValue,
  getModifiers,
  jsonToStyle,
  skipUniComponents,
  encodeDataSource,
  decodeDataSource
} from '../src/utils';

describe('isJSExpression', () => {
  test('should return true for valid JSExpression', () => {
    expect(isJSExpression({ type: 'JSExpression', value: '1 + 1' })).toBe(true);
  });

  test('should return falsy for null', () => {
    expect(isJSExpression(null)).toBeFalsy();
    expect(isJSExpression(undefined)).toBeFalsy();
  });

  test('should return false for plain objects', () => {
    expect(isJSExpression({})).toBe(false);
    expect(isJSExpression({ type: 'other' })).toBe(false);
  });
});

describe('isJSFunction', () => {
  test('should return true for valid JSFunction', () => {
    expect(isJSFunction({ type: 'JSFunction', value: '() => {}' })).toBe(true);
  });

  test('should return falsy for null', () => {
    expect(isJSFunction(null)).toBeFalsy();
    expect(isJSFunction(undefined)).toBeFalsy();
  });
});

describe('isJSCode', () => {
  test('should return true for JSExpression or JSFunction', () => {
    expect(isJSCode({ type: 'JSExpression', value: '' })).toBe(true);
    expect(isJSCode({ type: 'JSFunction', value: '' })).toBe(true);
  });

  test('should return falsy for null', () => {
    expect(isJSCode(null)).toBeFalsy();
    expect(isJSCode('string')).toBe(false);
    expect(isJSCode(123)).toBe(false);
  });
});

describe('JSCodeToString', () => {
  test('should return value for JS code types', () => {
    expect(JSCodeToString({ type: 'JSExpression', value: 'a + b' })).toBe(
      'a + b'
    );
    expect(JSCodeToString({ type: 'JSFunction', value: '() => {}' })).toBe(
      '() => {}'
    );
  });

  test('should stringify plain values', () => {
    expect(JSCodeToString(42)).toBe('42');
    expect(JSCodeToString('hello')).toBe('"hello"');
    expect(JSCodeToString({ key: 'val' })).toBe('{"key":"val"}');
    expect(JSCodeToString([1, 2])).toBe('[1,2]');
  });
});

describe('replaceThis', () => {
  test('should replace this. with empty string', () => {
    expect(replaceThis('this.count')).toBe('count');
    expect(replaceThis('this.state.foo')).toBe('state.foo');
  });

  test('should replace multiple occurrences', () => {
    expect(replaceThis('this.a + this.b')).toBe('a + b');
  });

  test('should handle empty string', () => {
    expect(replaceThis('')).toBe('');
  });
});

describe('replaceContext', () => {
  test('should replace this.context?. with empty string', () => {
    expect(replaceContext('this.context?.item')).toBe('item');
    expect(replaceContext('this.context?.item.title')).toBe('item.title');
  });

  test('should handle this.context. without optional chaining', () => {
    expect(replaceContext('this.context.item')).toBe('item');
  });

  test('should not affect other this. references', () => {
    const result = replaceContext('this.state.foo + this.context?.item');
    expect(result).toBe('this.state.foo + item');
  });
});

describe('parseValue', () => {
  const computedKeys = ['total'];

  test('should parse JSExpression value', () => {
    const result = parseValue({
      type: 'JSExpression',
      value: 'this.count + 1'
    });
    expect(result).toBe('count + 1');
  });

  test('should parse JSFunction value', () => {
    const result = parseValue({ type: 'JSFunction', value: '() => {}' });
    expect(result).toBe('() => {}');
  });

  test('should replace double quotes with single quotes for JS code when quote=true', () => {
    const result = parseValue({
      type: 'JSExpression',
      value: '"hello world"'
    });
    expect(result).toBe("'hello world'");
  });

  test('should stringify plain values', () => {
    expect(parseValue(42)).toBe('42');
    expect(parseValue('hello')).toBe('"hello"');
  });

  test('should stringify as plain string when stringify=false for non-JS string', () => {
    const result = parseValue(42, true);
    expect(result).toBe('42');
  });

  test('should keep this. when noThis=false', () => {
    const result = parseValue(
      { type: 'JSExpression', value: 'this.count' },
      true,
      false
    );
    expect(result).toBe('this.count');
  });

  test('should replace computed .value references', () => {
    const result = parseValue(
      { type: 'JSExpression', value: 'this.total.value' },
      true,
      true,
      computedKeys
    );
    expect(result).toBe('total');
  });

  test('should trim trailing semicolon', () => {
    const result = parseValue({ type: 'JSExpression', value: 'count + 1;' });
    expect(result).toBe('count + 1');
  });

  test('should not quote when quote=false', () => {
    const result = parseValue(
      { type: 'JSExpression', value: '"hello"' },
      true,
      true,
      [],
      false
    );
    expect(result).toBe('"hello"');
  });
});

describe('replaceComputedValue', () => {
  const keys = ['total', 'count'];

  test('should replace this.key.value with this.key', () => {
    const result = replaceComputedValue('this.total.value + 1', keys);
    expect(result).toBe('this.total + 1');
  });

  test('should replace multiple computed keys', () => {
    const result = replaceComputedValue(
      'this.total.value + this.count.value',
      keys
    );
    expect(result).toBe('this.total + this.count');
  });

  test('should handle empty content', () => {
    expect(replaceComputedValue('', keys)).toBe('');
  });
});

describe('replaceFunctionTag', () => {
  test('should handle bracket-wrapped async function', () => {
    const result = replaceFunctionTag('(async function() { return 1 })');
    expect(result).toBe('async() { return 1 }');
  });

  test('should handle bracket-wrapped function', () => {
    const result = replaceFunctionTag('(function() { return 1 })');
    expect(result).toBe('() { return 1 }');
  });

  test('should handle arrow function in brackets', () => {
    const result = replaceFunctionTag('(() => { return 1 })');
    expect(result).toBe('()  { return 1 }');
  });

  test('should handle async arrow function in brackets', () => {
    const result = replaceFunctionTag('(async () => { return 1 })');
    expect(result).toBe('async ()  { return 1 }');
  });

  test('should handle expression-bodied arrow function', () => {
    const result = replaceFunctionTag('(() => 1)');
    expect(result).toBe('()  { return 1 }');
  });

  test('should return handler starting with { as-is', () => {
    const result = replaceFunctionTag('{ console.log("test") }');
    expect(result).toBe('{ console.log("test") }');
  });
});

describe('parsePlainObjectValue', () => {
  test('should parse object entries', () => {
    const result = parsePlainObjectValue({
      name: { type: 'JSExpression', value: 'this.getName()' },
      age: 18
    });
    expect(result).toContain('"name": getName()');
    expect(result).toContain('"age": 18');
  });

  test('should handle empty object', () => {
    expect(parsePlainObjectValue({})).toEqual([]);
  });
});

describe('getModifiers', () => {
  test('should return modifier keys', () => {
    expect(getModifiers({ prevent: true, stop: true })).toEqual([
      'prevent',
      'stop'
    ]);
  });

  test('should return string modifiers with dots', () => {
    expect(getModifiers({ prevent: true, stop: true }, true)).toEqual([
      '.prevent',
      '.stop'
    ]);
  });

  test('should handle empty modifiers', () => {
    expect(getModifiers({})).toEqual([]);
  });
});

describe('jsonToStyle', () => {
  test('should convert JSON to CSS string', () => {
    const result = jsonToStyle({ color: 'red', 'font-size': '14px' });
    expect(result).toBe('color: red;font-size: 14px;');
  });

  test('should handle empty object', () => {
    expect(jsonToStyle({})).toBe('');
  });
});

describe('skipUniComponents', () => {
  test('should filter out uni components', () => {
    const components = ['div', 'span', 'View', 'Text'];
    const uniComponents = ['View', 'Text', 'ScrollView'];
    const result = skipUniComponents(components, uniComponents);
    expect(result).toEqual(['div', 'span']);
  });

  test('should return all if no uni components', () => {
    expect(skipUniComponents(['div', 'span'], [])).toEqual(['div', 'span']);
  });
});

describe('encodeDataSource / decodeDataSource', () => {
  test('should encode and decode data source', () => {
    const schema = { type: 'api', url: '/test', method: 'GET' };
    const encoded = encodeDataSource(schema as any);
    expect(typeof encoded).toBe('string');

    const decoded = decodeDataSource(encoded);
    expect(decoded).toEqual(schema);
  });

  test('should return null for invalid encoded data', () => {
    expect(decodeDataSource('invalid-base64!!!')).toBeNull();
  });
});
