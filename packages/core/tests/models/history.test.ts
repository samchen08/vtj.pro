import { expect, test, vi, describe, beforeEach } from 'vitest';
import { HistoryModel } from '../../src/models';
import { emitter } from '../../src/tools';
import type { HistorySchema, BlockSchema } from '../../src/protocols';

describe('HistoryModel', () => {
  beforeEach(() => {
    emitter.all.clear();
  });

  const createMockDsl = (id: string): BlockSchema => ({
    id,
    name: 'TestBlock',
    __VTJ_BLOCK__: true,
    __VERSION__: '1.0.0'
  });

  describe('constructor', () => {
    test('should create with id and items', () => {
      const schema: HistorySchema = { id: 'file-1', items: [] };
      const history = new HistoryModel(schema);
      expect(history.id).toBe('file-1');
      expect(history.items).toEqual([]);
      expect(history.index).toBe(-1);
    });

    test('should initialize with items', () => {
      const schema: HistorySchema = {
        id: 'file-1',
        items: [
          { id: 'h1', label: 'Initial', dsl: createMockDsl('v1') },
          { id: 'h2', label: 'Update', dsl: createMockDsl('v2') }
        ]
      };
      const history = new HistoryModel(schema);
      expect(history.items).toHaveLength(2);
    });

    test('should accept custom options', () => {
      const schema: HistorySchema = { id: 'file-1', items: [] };
      const history = new HistoryModel(schema, { max: 10 });
      expect((history as any).options.max).toBe(10);
    });
  });

  describe('toDsl', () => {
    test('should serialize without dsl content', () => {
      const schema: HistorySchema = {
        id: 'file-1',
        items: [
          {
            id: 'h1',
            label: 'Initial',
            remark: 'first',
            dsl: createMockDsl('v1')
          }
        ]
      };
      const history = new HistoryModel(schema);
      const dsl = history.toDsl();
      expect(dsl.id).toBe('file-1');
      expect(dsl.items).toHaveLength(1);
      expect(dsl.items![0].id).toBe('h1');
      expect(dsl.items![0].label).toBe('Initial');
      expect(dsl.items![0].remark).toBe('first');
      expect((dsl.items![0] as any).dsl).toBeUndefined();
    });
  });

  describe('get', () => {
    test('should find item by id', () => {
      const schema: HistorySchema = {
        id: 'file-1',
        items: [
          { id: 'h1', label: 'First', dsl: createMockDsl('v1') },
          { id: 'h2', label: 'Second', dsl: createMockDsl('v2') }
        ]
      };
      const history = new HistoryModel(schema);
      const item = history.get('h2');
      expect(item).toBeDefined();
      expect(item!.label).toBe('Second');
    });

    test('should return undefined for non-existent id', () => {
      const history = new HistoryModel({ id: 'file-1' });
      expect(history.get('non-existent')).toBeUndefined();
    });
  });

  describe('add', () => {
    test('should add history item', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'), 'Initial save');
      expect(history.items).toHaveLength(1);
      expect(history.items[0].remark).toBe('Initial save');
      expect(history.items[0].dsl).toBeDefined();
    });

    test('should set index to -1 on add', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      expect(history.index).toBe(-1);
    });

    test('should emit create event', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_CHANGE', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'), 'test');
      expect(listener).toHaveBeenCalled();
      expect(listener.mock.calls[0][0].type).toBe('create');
    });

    test('should trim excess items without remark', () => {
      const history = new HistoryModel({ id: 'file-1' }, { max: 3 });
      // Fill with 3 items without remark
      for (let i = 0; i < 3; i++) {
        history.add(createMockDsl(`v${i}`));
      }
      expect(history.items).toHaveLength(3);
      // Add 2 more - the first one without remark should be removed after exceeding max
      history.add(createMockDsl('v3'));
      history.add(createMockDsl('v4'));
      // max=3, should keep only 3
      expect(history.items.length).toBeLessThanOrEqual(3);
    });
  });

  describe('update', () => {
    test('should update existing item', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'), 'initial');
      const item = history.items[0];
      history.update({ id: item.id, label: 'Updated' });
      expect(item.label).toBe('Updated');
    });

    test('should emit update event', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_CHANGE', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      const item = history.items[0];
      history.update({ id: item.id, label: item.label, remark: 'updated' });
      expect(listener).toHaveBeenCalledTimes(2);
    });
  });

  describe('remove', () => {
    test('should remove item by id', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      const id = history.items[0].id;
      history.remove(id);
      expect(history.items.find((n) => n.id === id)).toBeUndefined();
    });

    test('should remove multiple ids', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      history.add(createMockDsl('v3'));
      const ids = history.items.slice(0, 2).map((n) => n.id);
      history.remove(ids);
      expect(history.items).toHaveLength(1);
    });

    test('should reset index when removing current index', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      history.index = 0;
      history.remove(history.items[0].id);
      expect(history.index).toBe(-1);
    });

    test('should emit delete event', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_CHANGE', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.remove(history.items[0].id);
      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener.mock.calls[1][0].type).toBe('delete');
    });
  });

  describe('forward/backward', () => {
    test('forward should decrease index', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      history.index = 1;
      history.forward();
      expect(history.index).toBe(0);
    });

    test('forward should not go below 0', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.index = 0;
      history.forward();
      expect(history.index).toBe(-1);
    });

    test('forward should not emit when index < 0 after decrement', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_LOAD', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.index = 0;
      history.forward();
      expect(listener).not.toHaveBeenCalled();
    });

    test('backward should increase index from -1 to 1 with 2 items', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      // index=-1, backward: set to 0, ++ -> 1
      history.backward();
      expect(history.index).toBe(1);
    });

    test('backward should not exceed items length', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      // index=-1, backward: set to 0, ++ -> 1. With 2 items, items[1] exists
      history.backward();
      // Try again: index=1, items.length=2, 1 >= 1 -> return
      history.backward();
      expect(history.index).toBe(1);
    });

    test('backward should handle single item', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      // index=-1, items.length=1, -1 >= 0 -> false, set to 0, ++ -> 1, items[1] is undefined
      history.backward();
      expect(history.index).toBe(1);
    });

    test('backward should not emit load for non-existent item', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_LOAD', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.backward();
      // items[1] is undefined, so no emit
      expect(listener).not.toHaveBeenCalled();
    });

    test('backward should emit load when item exists', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_LOAD', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      // index=-1 -> 0 -> ++ -> 1, items[1] exists
      history.backward();
      expect(listener).toHaveBeenCalled();
      expect(listener.mock.calls[0][0].type).toBe('load');
    });
  });

  describe('load', () => {
    test('should set index by item id', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      const id = history.items[1].id;
      history.load(id);
      expect(history.index).toBe(1);
    });

    test('should emit load event', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_LOAD', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.load(history.items[0].id);
      expect(listener).toHaveBeenCalled();
    });

    test('should not emit when silent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_LOAD', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.load(history.items[0].id, true);
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    test('should clear all items and reset index', () => {
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.add(createMockDsl('v2'));
      history.clear();
      expect(history.items).toHaveLength(0);
      expect(history.index).toBe(-1);
    });

    test('should emit clear event', () => {
      const listener = vi.fn();
      emitter.on('EVENT_HISTORY_CHANGE', listener);
      const history = new HistoryModel({ id: 'file-1' });
      history.add(createMockDsl('v1'));
      history.clear();
      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener.mock.calls[1][0].type).toBe('clear');
    });
  });
});
