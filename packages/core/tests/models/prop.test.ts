import { expect, test, describe } from 'vitest';
import { PropModel } from '../../src/models';
import type { NodeProps } from '../../src/protocols';

describe('PropModel', () => {
  test('should create with name and value', () => {
    const prop = new PropModel('title', 'hello');
    expect(prop.name).toBe('title');
    expect(prop.value).toBe('hello');
    expect(prop.defaultValue).toBeUndefined();
  });

  test('should create with name, value and defaultValue', () => {
    const prop = new PropModel('count', 5, 0);
    expect(prop.name).toBe('count');
    expect(prop.value).toBe(5);
    expect(prop.defaultValue).toBe(0);
  });

  test('setValue should update value and isUnset', () => {
    const prop = new PropModel('count', 5, 0);
    expect(prop.isUnset).toBe(false);
    prop.setValue(0);
    expect(prop.value).toBe(0);
    expect(prop.isUnset).toBe(true);
  });

  test('isUnset should be true when value equals defaultValue', () => {
    const prop = new PropModel('count', 0, 0);
    expect(prop.isUnset).toBe(true);
  });

  test('getValue should return value if set', () => {
    const prop = new PropModel('title', 'hello', 'default');
    expect(prop.getValue()).toBe('hello');
  });

  test('getValue should return defaultValue if value is undefined', () => {
    const prop = new PropModel('title', undefined, 'default');
    expect(prop.getValue()).toBe('default');
  });

  test('getValue should fallback to defaultValue when value is undefined', () => {
    const prop = new PropModel('count', undefined, 10);
    expect(prop.getValue()).toBe(10);
  });

  describe('toDsl', () => {
    test('should convert props to NodeProps filtering out unset props', () => {
      const props: Record<string, PropModel> = {
        title: new PropModel('title', 'hello'),
        count: new PropModel('count', 0, 0),
        visible: new PropModel('visible', true)
      };
      const result = PropModel.toDsl(props);
      expect(result).toEqual({ title: 'hello', visible: true });
      expect(result).not.toHaveProperty('count');
    });

    test('should return empty object for empty input', () => {
      expect(PropModel.toDsl({})).toEqual({});
    });
  });

  describe('parse', () => {
    test('should parse NodeProps to PropModel record', () => {
      const nodeProps: NodeProps = {
        title: 'hello',
        count: 42,
        visible: true
      };
      const result = PropModel.parse(nodeProps);
      expect(result.title).toBeInstanceOf(PropModel);
      expect(result.title.name).toBe('title');
      expect(result.title.getValue()).toBe('hello');
      expect(result.count.getValue()).toBe(42);
      expect(result.visible.getValue()).toBe(true);
    });

    test('should return empty object for empty input', () => {
      expect(PropModel.parse({})).toEqual({});
    });
  });
});
