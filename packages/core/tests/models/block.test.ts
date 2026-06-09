import { expect, test, vi, describe, beforeEach } from 'vitest';
import { BlockModel, emitter, NodeModel } from '../../src';
import type {
  BlockSchema,
  BlockWatch,
  BlockProp,
  BlockComposable,
  BlockInject,
  BlockSlot,
  BlockEmit
} from '../../src/protocols';

describe('BlockModel', () => {
  beforeEach(() => {
    emitter.all.clear();
  });

  describe('constructor', () => {
    test('should create block with id and name', () => {
      const schema: BlockSchema = { id: 'block-1', name: 'TestBlock' };
      const block = new BlockModel(schema);
      expect(block.id).toBe('block-1');
      expect(block.name).toBe('TestBlock');
      expect(block.__VTJ_BLOCK__).toBe(true);
      expect(block.disposed).toBe(false);
    });

    test('should auto-generate id if not provided', () => {
      const block = new BlockModel({ name: 'Test' });
      expect(block.id).toBeDefined();
    });

    test('should set default apiMode', () => {
      const block = new BlockModel({ name: 'Test' });
      expect(block.apiMode).toBe('options');
    });

    test('should parse nodes from schema', () => {
      const schema: BlockSchema = {
        name: 'Test',
        nodes: [{ name: 'div' }, { name: 'span' }]
      };
      const block = new BlockModel(schema);
      expect(block.nodes).toHaveLength(2);
      expect(block.nodes[0]).toBeInstanceOf(NodeModel);
      expect(block.nodes[0].name).toBe('div');
    });
  });

  describe('update', () => {
    test('should update normal attrs', () => {
      const block = new BlockModel({ name: 'Test' });
      block.update({ name: 'Updated', locked: true, apiMode: 'composition' });
      expect(block.name).toBe('Updated');
      expect(block.locked).toBe(true);
      expect(block.apiMode).toBe('composition');
    });

    test('should update nodes', () => {
      const block = new BlockModel({ name: 'Test' });
      block.update({ name: 'Test', nodes: [{ name: 'div' }] });
      expect(block.nodes).toHaveLength(1);
    });

    test('should emit EVENT_BLOCK_CHANGE when not silent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_BLOCK_CHANGE', listener);
      const block = new BlockModel({ name: 'Test' });
      block.update({ name: 'Updated' });
      expect(listener).toHaveBeenCalledWith(block);
    });
  });

  describe('toDsl', () => {
    test('should serialize to BlockSchema', () => {
      const block = new BlockModel({ id: 'b1', name: 'Test' });
      const dsl = block.toDsl();
      expect(dsl.id).toBe('b1');
      expect(dsl.name).toBe('Test');
      expect(dsl.__VTJ_BLOCK__).toBe(true);
      expect(dsl.__VERSION__).toBeDefined();
    });

    test('should include nodes in dsl', () => {
      const block = new BlockModel({
        name: 'Test',
        nodes: [{ name: 'div' }]
      });
      const dsl = block.toDsl();
      expect(dsl.nodes).toHaveLength(1);
      expect(dsl.nodes![0].name).toBe('div');
    });
  });

  describe('dispose', () => {
    test('should dispose all nodes', () => {
      const block = new BlockModel({
        name: 'Test',
        nodes: [{ name: 'div' }, { name: 'span' }]
      });
      const nodeSpy = vi.spyOn(block.nodes[0], 'dispose');
      block.dispose();
      expect(nodeSpy).toHaveBeenCalled();
      expect(block.nodes).toHaveLength(0);
      expect(block.disposed).toBe(true);
    });
  });

  describe('setFunction/removeFunction', () => {
    test('setFunction should set method', () => {
      const block = new BlockModel({ name: 'Test' });
      const fn = { type: 'JSFunction' as const, value: 'function() {}' };
      block.setFunction('methods', 'myMethod', fn);
      expect(block.methods.myMethod).toEqual(fn);
    });

    test('removeFunction should delete method', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setFunction(
        'methods',
        'myMethod',
        { type: 'JSFunction', value: 'function() {}' },
        true
      );
      block.removeFunction('methods', 'myMethod');
      expect(block.methods.myMethod).toBeUndefined();
    });

    test('setFunction should emit event', () => {
      const listener = vi.fn();
      emitter.on('EVENT_BLOCK_CHANGE', listener);
      const block = new BlockModel({ name: 'Test' });
      block.setFunction('lifeCycles', 'mounted', {
        type: 'JSFunction',
        value: 'function() {}'
      });
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('setState/removeState', () => {
    test('setState should set state value', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setState('count', 42);
      expect(block.state.count).toBe(42);
    });

    test('removeState should delete state', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setState('count', 42, true);
      block.removeState('count');
      expect(block.state.count).toBeUndefined();
    });
  });

  describe('setCss', () => {
    test('should set css content', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setCss('.test { color: red; }');
      expect(block.css).toBe('.test { color: red; }');
    });
  });

  describe('setWatch/removeWatch', () => {
    test('setWatch should add new watch', () => {
      const block = new BlockModel({ name: 'Test' });
      const watch: BlockWatch = {
        source: { type: 'JSExpression', value: 'count' },
        handler: { type: 'JSFunction', value: 'function() {}' }
      };
      block.setWatch(watch);
      expect(block.watch).toHaveLength(1);
      expect(block.watch[0].id).toBeDefined();
    });

    test('setWatch should update existing watch by id', () => {
      const block = new BlockModel({ name: 'Test' });
      const watch: BlockWatch = {
        id: 'w1',
        source: { type: 'JSExpression', value: 'count' },
        handler: { type: 'JSFunction', value: 'function() {}' }
      };
      block.setWatch(watch);
      block.setWatch({ ...watch, deep: true });
      expect(block.watch).toHaveLength(1);
      expect(block.watch[0].deep).toBe(true);
    });

    test('removeWatch should remove watch', () => {
      const block = new BlockModel({ name: 'Test' });
      const watch: BlockWatch = {
        source: { type: 'JSExpression', value: 'count' },
        handler: { type: 'JSFunction', value: 'function() {}' }
      };
      block.setWatch(watch, true);
      block.removeWatch(block.watch[0]);
      expect(block.watch).toHaveLength(0);
    });
  });

  describe('setProp/removeProp (block level)', () => {
    test('setProp should add block prop definition', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setProp({ name: 'title', type: 'String', default: 'hello' });
      expect(block.props).toHaveLength(1);
      expect(block.props[0]).toEqual({
        name: 'title',
        type: 'String',
        default: 'hello'
      });
    });

    test('setProp should update existing by name', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setProp({ name: 'title', type: 'String' });
      block.setProp({ name: 'title', type: 'Number', required: true });
      expect(block.props).toHaveLength(1);
      expect((block.props[0] as BlockProp).required).toBe(true);
    });

    test('removeProp should remove block prop', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setProp({ name: 'title', type: 'String' }, true);
      block.removeProp({ name: 'title', type: 'String' });
      expect(block.props).toHaveLength(0);
    });
  });

  describe('setEmit/removeEmit', () => {
    test('setEmit should add emit', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setEmit({ name: 'update', params: ['value'] });
      expect(block.emits).toHaveLength(1);
      expect((block.emits[0] as BlockEmit).name).toBe('update');
    });

    test('setEmit should accept string and convert to object', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setEmit('click');
      expect(block.emits).toHaveLength(1);
      expect((block.emits[0] as any).name).toBe('click');
      expect((block.emits[0] as any).params).toEqual([]);
    });

    test('setEmit should update existing', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setEmit('click', true);
      block.setEmit({ name: 'click', params: ['event'] });
      expect(block.emits).toHaveLength(1);
      expect((block.emits[0] as BlockEmit).params).toEqual(['event']);
    });

    test('removeEmit should remove emit', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setEmit('click', true);
      block.removeEmit('click');
      expect(block.emits).toHaveLength(0);
    });
  });

  describe('setSlot/removeSlot', () => {
    test('setSlot should add slot', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setSlot({ name: 'header', params: [] });
      expect(block.slots).toHaveLength(1);
    });

    test('setSlot should accept string', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setSlot('default');
      expect(block.slots).toHaveLength(1);
      expect((block.slots[0] as BlockSlot).name).toBe('default');
    });

    test('removeSlot should remove slot', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setSlot('default', true);
      block.removeSlot('default');
      expect(block.slots).toHaveLength(0);
    });
  });

  describe('setInject/removeInject', () => {
    test('setInject should add injection', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setInject({ name: 'user', from: 'UserService' });
      expect(block.inject).toHaveLength(1);
    });

    test('setInject should update existing', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setInject({ name: 'user' }, true);
      block.setInject({ name: 'user', from: 'AdminService' });
      expect(block.inject).toHaveLength(1);
      expect(block.inject[0].from).toBe('AdminService');
    });

    test('removeInject should remove injection', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setInject({ name: 'user' }, true);
      block.removeInject({ name: 'user' });
      expect(block.inject).toHaveLength(0);
    });
  });

  describe('dataSource operations', () => {
    test('setDataSource should add data source', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setDataSource({ name: 'list', type: 'api', ref: 'getList' });
      expect(block.dataSources.list).toBeDefined();
    });

    test('removeDataSource should remove data source', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setDataSource({ name: 'list', type: 'api', ref: 'getList' }, true);
      block.removeDataSource('list');
      expect(block.dataSources.list).toBeUndefined();
    });
  });

  describe('setApiMode', () => {
    test('should change api mode', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setApiMode('composition');
      expect(block.apiMode).toBe('composition');
    });
  });

  describe('ref/reactive operations', () => {
    test('setRef should set ref value', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setRef('count', { type: 'JSExpression', value: '0' });
      expect(block.refs.count).toEqual({ type: 'JSExpression', value: '0' });
    });

    test('removeRef should delete ref', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setRef('count', { type: 'JSExpression', value: '0' }, true);
      block.removeRef('count');
      expect(block.refs.count).toBeUndefined();
    });

    test('setReactive should set reactive value', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setReactive('form', {});
      expect(block.reactives.form).toEqual({});
    });

    test('removeReactive should delete reactive', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setReactive('form', {}, true);
      block.removeReactive('form');
      expect(block.reactives.form).toBeUndefined();
    });
  });

  describe('composable operations', () => {
    test('setComposable should add composable', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setComposable({
        name: 'useAuth',
        composable: 'useAuth',
        from: '@vueuse/core'
      });
      expect(block.composables).toHaveLength(1);
    });

    test('setComposable should update existing', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setComposable(
        { name: 'useAuth', composable: 'useAuth', from: '@vueuse/core' },
        true
      );
      block.setComposable({
        name: 'useAuth',
        composable: 'useAuth',
        from: 'vue'
      });
      expect(block.composables).toHaveLength(1);
      expect(block.composables[0].from).toBe('vue');
    });

    test('removeComposable should remove composable', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setComposable({ name: 'useAuth', composable: 'useAuth' }, true);
      block.removeComposable('useAuth');
      expect(block.composables).toHaveLength(0);
    });
  });

  describe('provide operations', () => {
    test('setProvide should set provide value', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setProvide('theme', 'dark');
      expect(block.provide.theme).toBe('dark');
    });

    test('removeProvide should delete provide', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setProvide('theme', 'dark', true);
      block.removeProvide('theme');
      expect(block.provide.theme).toBeUndefined();
    });
  });

  describe('node operations', () => {
    test('addNode should append node without target', () => {
      const block = new BlockModel({ name: 'Test' });
      const node = new NodeModel({ name: 'div' });
      block.addNode(node);
      expect(block.nodes).toContain(node);
    });

    test('addNode should append to target as inner', () => {
      const block = new BlockModel({ name: 'Test' });
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      block.addNode(parent, undefined, 'inner', true);
      block.addNode(child, parent, 'inner');
      expect(parent.children).toHaveLength(1);
      expect((parent.children as NodeModel[])[0]).toBe(child);
    });

    test('addNode should insert after target', () => {
      const block = new BlockModel({ name: 'Test' });
      const node1 = new NodeModel({ id: 'n1', name: 'div' });
      const node2 = new NodeModel({ id: 'n2', name: 'span' });
      block.addNode(node1, undefined, 'inner', true);
      block.addNode(node2, node1, 'bottom');
      expect(block.nodes.indexOf(node2)).toBe(1);
    });

    test('removeNode should dispose child node', () => {
      const block = new BlockModel({ name: 'Test' });
      const node = new NodeModel({ name: 'div' });
      block.addNode(node, undefined, 'inner', true);
      block.removeNode(node);
      expect(node.disposed).toBe(true);
      expect(block.nodes).not.toContain(node);
    });

    test('cloneNode should clone a node', () => {
      const block = new BlockModel({ name: 'Test' });
      const node = new NodeModel({ id: 'original', name: 'div' });
      block.addNode(node, undefined, 'inner', true);
      const cloned = block.cloneNode(node);
      expect(cloned.id).not.toBe('original');
      expect(cloned.name).toBe('div');
      expect(block.nodes).toContain(cloned);
    });

    test('movePrev should move node backward', () => {
      const block = new BlockModel({ name: 'Test' });
      const node1 = new NodeModel({ id: 'n1', name: 'div' });
      const node2 = new NodeModel({ id: 'n2', name: 'span' });
      block.addNode(node1, undefined, 'inner', true);
      block.addNode(node2, undefined, 'inner', true);
      block.movePrev(node2);
      expect(block.nodes.indexOf(node2)).toBe(0);
    });

    test('moveNext should move node forward', () => {
      const block = new BlockModel({ name: 'Test' });
      const node1 = new NodeModel({ id: 'n1', name: 'div' });
      const node2 = new NodeModel({ id: 'n2', name: 'span' });
      block.addNode(node1, undefined, 'inner', true);
      block.addNode(node2, undefined, 'inner', true);
      block.moveNext(node1);
      expect(block.nodes.indexOf(node1)).toBe(1);
    });

    test('move should move node to new parent', () => {
      const block = new BlockModel({ name: 'Test' });
      const parent1 = new NodeModel({ id: 'p1', name: 'div' });
      const parent2 = new NodeModel({ id: 'p2', name: 'span' });
      const child = new NodeModel({ id: 'c1', name: 'a' });
      block.addNode(parent1, undefined, 'inner', true);
      block.addNode(parent2, undefined, 'inner', true);
      parent1.appendChild(child, true);
      block.move(child, parent2, 'inner');
      expect(parent1.children).toHaveLength(0);
      expect(parent2.children).toHaveLength(1);
      expect((parent2.children as NodeModel[])[0]).toBe(child);
    });
  });

  describe('lock/unlock', () => {
    test('lock should set locked on block and nodes', () => {
      const block = new BlockModel({ name: 'Test', nodes: [{ name: 'div' }] });
      block.lock();
      expect(block.locked).toBe(true);
      expect(block.nodes[0].locked).toBe(true);
    });

    test('unlock should set locked to false', () => {
      const block = new BlockModel({ name: 'Test', nodes: [{ name: 'div' }] });
      block.lock(true);
      block.unlock();
      expect(block.locked).toBe(false);
      expect(block.nodes[0].locked).toBe(false);
    });
  });

  describe('isChild', () => {
    test('should return true if node is a direct child', () => {
      const block = new BlockModel({ name: 'Test' });
      const node = new NodeModel({ name: 'div' });
      block.addNode(node, undefined, 'inner', true);
      expect(block.isChild(node)).toBe(true);
    });

    test('should return true if node is a descendant', () => {
      const block = new BlockModel({ name: 'Test' });
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      block.addNode(parent, undefined, 'inner', true);
      expect(block.isChild(child)).toBe(true);
    });

    test('should return false for non-child', () => {
      const block = new BlockModel({ name: 'Test' });
      const unrelated = new NodeModel({ name: 'div' });
      expect(block.isChild(unrelated)).toBe(false);
    });
  });

  describe('setExpose', () => {
    test('should set expose array', () => {
      const block = new BlockModel({ name: 'Test' });
      block.setExpose(['count', 'name']);
      expect(block.expose).toEqual(['count', 'name']);
    });
  });
});
