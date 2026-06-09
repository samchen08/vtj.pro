import { expect, test, vi, describe, beforeEach } from 'vitest';
import { emitter } from '../src';
import {
  isBlock,
  isNode,
  isBlockSchema,
  cloneDsl,
  createNodeFrom
} from '../src/tools';
import type { BlockFile, NodeFrom } from '../src/protocols';

// emitter 测试
describe('emitter', () => {
  beforeEach(() => {
    emitter.all.clear();
  });

  test('emitter should exist', () => {
    expect(!!emitter).toBe(true);
  });

  test('should emit and listen for events', () => {
    const listener = vi.fn();
    (emitter as any).on('TEST_EVENT', listener);
    (emitter as any).emit('TEST_EVENT', 'data');
    expect(listener).toHaveBeenCalledWith('data');
  });

  test('should off listener', () => {
    const listener = vi.fn();
    (emitter as any).on('TEST_EVENT', listener);
    (emitter as any).off('TEST_EVENT', listener);
    (emitter as any).emit('TEST_EVENT', 'data');
    expect(listener).not.toHaveBeenCalled();
  });

  test('should support multiple listeners', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    (emitter as any).on('TEST_EVENT', listener1);
    (emitter as any).on('TEST_EVENT', listener2);
    (emitter as any).emit('TEST_EVENT', 'data');
    expect(listener1).toHaveBeenCalledWith('data');
    expect(listener2).toHaveBeenCalledWith('data');
  });

  test('should support all.clear()', () => {
    const listener = vi.fn();
    (emitter as any).on('TEST_EVENT', listener);
    emitter.all.clear();
    (emitter as any).emit('TEST_EVENT', 'data');
    expect(listener).not.toHaveBeenCalled();
  });
});

// util 测试
describe('util', () => {
  describe('isBlock', () => {
    test('should return true for BlockModel instance', async () => {
      const { BlockModel } = await import('../src');
      const block = new BlockModel({ id: 'test', name: 'Test' });
      expect(isBlock(block)).toBe(true);
    });

    test('should return false for non-BlockModel values', () => {
      expect(isBlock({})).toBe(false);
      expect(isBlock(null)).toBe(false);
      expect(isBlock(undefined)).toBe(false);
      expect(isBlock('string')).toBe(false);
    });
  });

  describe('isNode', () => {
    test('should return true for NodeModel instance', async () => {
      const { NodeModel } = await import('../src');
      const node = new NodeModel({ id: 'test', name: 'div' });
      expect(isNode(node)).toBe(true);
    });

    test('should return false for non-NodeModel values', () => {
      expect(isNode({})).toBe(false);
      expect(isNode(null)).toBe(false);
      expect(isNode(undefined)).toBe(false);
    });
  });

  describe('isBlockSchema', () => {
    test('should return true when __VTJ_BLOCK__ is truthy', () => {
      expect(isBlockSchema({ __VTJ_BLOCK__: true })).toBe(true);
    });

    test('should return false when __VTJ_BLOCK__ is falsy or missing', () => {
      expect(isBlockSchema({})).toBe(false);
      expect(isBlockSchema({ __VTJ_BLOCK__: false })).toBe(false);
    });
  });

  describe('cloneDsl', () => {
    test('should clone a simple NodeSchema without id', () => {
      const dsl = { id: '123', name: 'div' };
      const cloned = cloneDsl(dsl as any);
      expect(cloned).toEqual({ name: 'div' });
      expect(cloned).not.toHaveProperty('id');
    });

    test('should clone nested children recursively without ids', () => {
      const dsl = {
        id: '1',
        name: 'div',
        children: [
          { id: '2', name: 'span', children: [{ id: '3', name: 'a' }] }
        ]
      };
      const cloned = cloneDsl(dsl as any);
      expect(cloned).toEqual({
        name: 'div',
        children: [{ name: 'span', children: [{ name: 'a' }] }]
      });
      expect((cloned as any).children[0]).not.toHaveProperty('id');
      expect((cloned as any).children[0].children[0]).not.toHaveProperty('id');
    });

    test('should handle children as string', () => {
      const dsl = { id: '1', name: 'div', children: 'text content' };
      const cloned = cloneDsl(dsl as any);
      expect(cloned).toEqual({ name: 'div', children: 'text content' });
    });

    test('should not mutate original dsl', () => {
      const dsl = { id: '1', name: 'div' };
      const cloned = cloneDsl(dsl as any);
      expect(dsl).toHaveProperty('id');
      expect(cloned).not.toHaveProperty('id');
    });
  });

  describe('createNodeFrom', () => {
    test('should create Schema type from block file with Schema fromType', () => {
      const file: BlockFile = {
        type: 'block',
        id: 'block-1',
        name: 'TestBlock',
        title: 'Test Block',
        fromType: 'Schema'
      };
      const result = createNodeFrom(file);
      expect(result).toEqual({ type: 'Schema', id: 'block-1' });
    });

    test('should create UrlSchema type from block file', () => {
      const file: BlockFile = {
        type: 'block',
        id: 'block-1',
        name: 'TestBlock',
        title: 'Test Block',
        fromType: 'UrlSchema',
        urls: 'https://example.com/schema.json'
      };
      const result = createNodeFrom(file);
      expect(result).toEqual({
        type: 'UrlSchema',
        url: 'https://example.com/schema.json'
      });
    });

    test('should create UrlSchema type with first url from comma-separated list', () => {
      const file: BlockFile = {
        type: 'block',
        id: 'block-1',
        name: 'TestBlock',
        title: 'Test Block',
        fromType: 'UrlSchema',
        urls: 'url1.json,url2.json,url3.json'
      };
      const result = createNodeFrom(file);
      expect(result).toEqual({ type: 'UrlSchema', url: 'url1.json' });
    });

    test('should create Plugin type from block file', () => {
      const file: BlockFile = {
        type: 'block',
        id: 'block-1',
        name: 'TestBlock',
        title: 'Test Block',
        fromType: 'Plugin',
        urls: 'http://example.com/umd.js,http://example.com/style.css',
        library: 'MyLibrary'
      };
      const result = createNodeFrom(file);
      expect(result).toEqual({
        type: 'Plugin',
        urls: ['http://example.com/umd.js', 'http://example.com/style.css'],
        library: 'MyLibrary'
      });
    });

    test('should return empty string for unknown fromType', () => {
      const file: BlockFile = {
        type: 'block',
        id: 'block-1',
        name: 'TestBlock',
        title: 'Test Block',
        fromType: 'UnknownType' as any
      };
      const result = createNodeFrom(file);
      expect(result).toBe('');
    });

    test('should default to Schema when fromType is not provided', () => {
      const file: BlockFile = {
        type: 'block',
        id: 'block-1',
        name: 'TestBlock',
        title: 'Test Block'
      };
      const result = createNodeFrom(file);
      // fromType is undefined, code evaluates 'Schema' !== 'Schema' = false, so we go to the first branch
      expect(result).toEqual({ type: 'Schema', id: 'block-1' });
    });
  });
});
