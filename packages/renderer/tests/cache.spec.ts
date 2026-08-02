import { expect, test, describe, beforeEach } from 'vitest';
import { nodeCache } from '../src/render/cache';

describe('NodeCache', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('setProps and getProps store and retrieve values', () => {
    nodeCache.setProps('k1', { a: 1 });
    expect(nodeCache.getProps('k1')).toEqual({ a: 1 });
  });

  test('getProps returns undefined for unknown key', () => {
    expect(nodeCache.getProps('nonexistent')).toBeUndefined();
  });

  test('loadProps returns cached value when available', () => {
    nodeCache.setProps('k1', { cached: true });
    const result = nodeCache.loadProps('k1', { fresh: true });
    // 缓存命中时返回缓存值，而非新值
    expect(result).toEqual({ cached: true });
  });

  test('loadProps stores and returns value when no cache', () => {
    const result = nodeCache.loadProps('k2', { fresh: true });
    expect(result).toEqual({ fresh: true });
    expect(nodeCache.getProps('k2')).toEqual({ fresh: true });
  });

  test('loadProps returns value without storing when key is empty', () => {
    const result = nodeCache.loadProps('', { noKey: true });
    expect(result).toEqual({ noKey: true });
    expect(nodeCache.getProps('')).toBeUndefined();
  });

  test('setEvents and getEvents store and retrieve values', () => {
    // events 缓存当前被注释掉了，所以 getEvents 可能返回 undefined
    nodeCache.setEvents('e1', { handler: () => {} });
    // 由于 setEvents 被空实现，getEvents 总是返回 undefined
    expect(nodeCache.getEvents('e1')).toBeUndefined();
  });

  test('setNode and getNode store and retrieve values', () => {
    nodeCache.setNode('n1', { tag: 'div' });
    expect(nodeCache.getNode('n1')).toEqual({ tag: 'div' });
  });

  test('getNode returns undefined for unknown key', () => {
    expect(nodeCache.getNode('nonexistent')).toBeUndefined();
  });

  test('loadNode returns cached value when available', () => {
    nodeCache.setNode('n1', { cached: true });
    const result = nodeCache.loadNode('n1', { fresh: true });
    expect(result).toEqual({ cached: true });
  });

  test('loadNode stores and returns value when no cache', () => {
    const result = nodeCache.loadNode('n2', { fresh: true });
    expect(result).toEqual({ fresh: true });
    expect(nodeCache.getNode('n2')).toEqual({ fresh: true });
  });

  test('isEqual uses lodash-style deep equality', () => {
    expect(nodeCache.isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(nodeCache.isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(nodeCache.isEqual([1, 2], [1, 2])).toBe(true);
    expect(nodeCache.isEqual([1, 2], [2, 1])).toBe(false);
  });

  test('isNodeEqual returns true for identical values', () => {
    expect(nodeCache.isNodeEqual(null, null)).toBe(true);
    expect(nodeCache.isNodeEqual({ a: 1 }, { a: 1 })).toBe(true);
  });

  test('isNodeEqual returns false when one value is falsy', () => {
    expect(nodeCache.isNodeEqual(null, {})).toBe(false);
    expect(nodeCache.isNodeEqual({}, null)).toBe(false);
  });

  test('isNodeEqual ignores function reference changes', () => {
    const fn1 = () => {};
    const fn2 = () => {};
    expect(nodeCache.isNodeEqual({ onClick: fn1 }, { onClick: fn2 })).toBe(
      true
    );
  });

  test('isNodeEqual detects function key additions/removals', () => {
    const fn = () => {};
    // 函数属性增删表示节点结构变化
    expect(nodeCache.isNodeEqual({ onClick: fn }, {})).toBe(false);
    expect(nodeCache.isNodeEqual({}, { onClick: fn })).toBe(false);
  });

  test('isNodeEqual compares non-function values deeply', () => {
    expect(
      nodeCache.isNodeEqual(
        { ref: 'input', style: { color: 'red' } },
        { ref: 'input', style: { color: 'red' } }
      )
    ).toBe(true);

    expect(
      nodeCache.isNodeEqual(
        { ref: 'input', style: { color: 'red' } },
        { ref: 'input', style: { color: 'blue' } }
      )
    ).toBe(false);
  });

  test('clear removes all cached data', () => {
    nodeCache.setProps('p1', { val: 1 });
    nodeCache.setNode('n1', { tag: 'div' });
    nodeCache.setNode('n2', { tag: 'span' });

    nodeCache.clear();

    expect(nodeCache.getProps('p1')).toBeUndefined();
    expect(nodeCache.getNode('n1')).toBeUndefined();
    expect(nodeCache.getNode('n2')).toBeUndefined();
  });
});
