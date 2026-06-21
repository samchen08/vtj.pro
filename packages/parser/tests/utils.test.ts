import { expect, test, describe } from 'vitest';
import {
  getJSExpression,
  getJSFunction,
  formatTagName,
  styleToJson,
  mergeClass,
  extractDataSource,
  patchCode,
  replacer
} from '../src/vue/utils';

describe('getJSExpression', () => {
  test('should create JSExpression object', () => {
    const result = getJSExpression('a + b');
    expect(result).toEqual({
      type: 'JSExpression',
      value: 'a + b'
    });
  });

  test('should wrap object expressions in parentheses', () => {
    const result = getJSExpression('{a: 1, b: 2}');
    expect(result.value).toBe('({a: 1, b: 2})');
  });
});

describe('getJSFunction', () => {
  test('should create JSFunction object', () => {
    const result = getJSFunction('() => {}');
    expect(result).toEqual({
      type: 'JSFunction',
      value: '() => {}'
    });
  });
});

describe('formatTagName', () => {
  test('should keep HTML tags as-is', () => {
    expect(formatTagName('div')).toBe('div');
    expect(formatTagName('span')).toBe('span');
    expect(formatTagName('button')).toBe('button');
  });

  test('should convert custom tags to PascalCase', () => {
    expect(formatTagName('my-component')).toBe('MyComponent');
    expect(formatTagName('van-icon')).toBe('VanIcon');
  });

  test('should handle uniapp tags', () => {
    expect(formatTagName('view', 'uniapp')).toBe('View');
    expect(formatTagName('text', 'uniapp')).toBe('Text');
  });

  test('should convert uniapp custom tags', () => {
    expect(formatTagName('my-view', 'uniapp')).toBe('MyView');
  });
});

describe('styleToJson', () => {
  test('should convert style string to object', () => {
    const result = styleToJson('color: red; font-size: 14px');
    expect(result).toEqual({
      color: 'red',
      'font-size': '14px'
    });
  });

  test('should handle empty string', () => {
    const result = styleToJson('');
    expect(result).toEqual({});
  });

  test('should handle leading/trailing spaces', () => {
    const result = styleToJson('  color: red;  ');
    expect(result).toEqual({ color: 'red' });
  });
});

describe('mergeClass', () => {
  test('should merge static class with ObjectExpression', () => {
    const result = mergeClass('foo bar', '{ baz: true }', 'ObjectExpression');
    expect(result).toContain("'foo'");
    expect(result).toContain("'bar'");
    expect(result).toContain('{ baz: true }');
  });

  test('should merge static class with ArrayExpression', () => {
    const result = mergeClass('foo bar', "['baz']", 'ArrayExpression');
    expect(result).toContain("'foo'");
    expect(result).toContain("'bar'");
    expect(result).toContain("'baz'");
  });
});

describe('extractDataSource', () => {
  test('should parse DataSource from comment', () => {
    const comment = ' DataSource: eyJ0ZXN0IjogInZhbHVlIn0= ';
    const result = extractDataSource(comment);
    expect(result).toEqual({ test: 'value' });
  });

  test('should return null for empty comment', () => {
    const result = extractDataSource('');
    expect(result).toBeNull();
  });

  test('should return null for non-DataSource comment', () => {
    const result = extractDataSource(' some random comment ');
    expect(result).toBeNull();
  });
});

describe('replacer (re-exported)', () => {
  test('should be the replacer function from replacer module', () => {
    const result = replacer('var x = foo', 'foo', 'bar');
    expect(result).toBe('var x = bar');
  });
});

describe('patchCode', () => {
  const baseOptions = {
    platform: 'web' as const,
    context: {},
    computed: [],
    libs: {},
    members: [],
    props: []
  };

  test('should replace context keys', () => {
    const options = {
      ...baseOptions,
      context: { node_123: new Set(['item']) }
    };
    const result = patchCode('item + 1', 'node_123', options);
    expect(result).toContain('this.context.item');
  });

  test('should replace computed keys', () => {
    const options = {
      ...baseOptions,
      computed: ['doubleCount']
    };
    const result = patchCode('doubleCount', '', options);
    expect(result).toContain('this.doubleCount.value');
  });

  test('should replace props keys', () => {
    const options = {
      ...baseOptions,
      props: ['title']
    };
    const result = patchCode('title', '', options);
    expect(result).toContain('this.title');
  });

  test('should replace libs keys', () => {
    const options = {
      ...baseOptions,
      libs: { ElButton: 'ElementPlus' }
    };
    const result = patchCode('ElButton', '', options);
    expect(result).toContain('this.$libs.ElementPlus.ElButton');
  });

  test('should replace members keys', () => {
    const options = {
      ...baseOptions,
      members: ['myMethod']
    };
    const result = patchCode('myMethod()', '', options);
    expect(result).toContain('this.myMethod()');
  });

  test('should handle uniapp platform', () => {
    const options = {
      ...baseOptions,
      platform: 'uniapp' as const
    };
    const result = patchCode(' uni.getSystemInfo', '', options);
    expect(result).toContain('this.$libs.UniH5.uni.');
  });

  test('should cleanup double this.this.', () => {
    const options = {
      ...baseOptions,
      members: ['foo']
    };
    const result = patchCode('this.foo', '', options);
    expect(result).not.toContain('this.this.');
  });
});
