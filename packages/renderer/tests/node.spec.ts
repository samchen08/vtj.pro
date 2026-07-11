import { expect, test, describe, vi, beforeEach, beforeAll } from 'vitest';
import { Context } from '../src/render/context';
import { ContextMode } from '../src/constants';
import { nodeCache } from '../src/render/cache';

describe('node - getModifiers', () => {
  // 动态 import getModifiers from node module
  let getModifiers: Function;
  beforeAll(async () => {
    const mod = await import('../src/render/node');
    getModifiers = mod.getModifiers;
  });

  test('returns array of modifier keys', () => {
    const result = getModifiers({ prevent: true, stop: true });
    expect(result).toEqual(['prevent', 'stop']);
  });

  test('returns string representation with dot prefix', () => {
    const result = getModifiers({ prevent: true, capture: true }, true);
    expect(result).toEqual(['.prevent', '.capture']);
  });

  test('handles empty modifiers', () => {
    expect(getModifiers({})).toEqual([]);
    expect(getModifiers(undefined)).toEqual([]);
  });
});

describe('node - ContextMode VNode bypasses ref', () => {
  test('__ref returns undefined in VNode mode', () => {
    const ctx = new Context({ mode: ContextMode.VNode });
    expect(ctx.__ref('some-id')).toBeUndefined();
  });
});

describe('node - nodeCache integration', () => {
  beforeEach(() => {
    nodeCache.clear();
  });

  test('loadNode stores and retrieves node cache', () => {
    const key = 'test-node-key';
    const value = { tag: 'div', props: { class: 'foo' } };
    const result = nodeCache.loadNode(key, value);
    expect(result).toEqual(value);
    expect(nodeCache.getNode(key)).toEqual(value);
  });

  test('isNodeEqual treats functions as equal regardless of reference', () => {
    const a = { tag: 'div', onClick: () => {} };
    const b = { tag: 'div', onClick: () => {} };
    expect(nodeCache.isNodeEqual(a, b)).toBe(true);
  });

  test('isNodeEqual detects missing function keys', () => {
    const a = { tag: 'div', onClick: () => {} };
    const b = { tag: 'div' };
    expect(nodeCache.isNodeEqual(a, b)).toBe(false);
  });
});
