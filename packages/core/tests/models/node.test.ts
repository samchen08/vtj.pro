import { expect, test, vi, describe, beforeEach } from 'vitest';
import { NodeModel, emitter } from '../../src';
import type { NodeSchema, NodeDirective } from '../../src/protocols';

describe('NodeModel', () => {
  beforeEach(() => {
    emitter.all.clear();
  });

  describe('constructor', () => {
    test('should create node with id, name and from', () => {
      const schema: NodeSchema = { id: 'node-1', name: 'div', from: 'BuiltIn' };
      const node = new NodeModel(schema);
      expect(node.id).toBe('node-1');
      expect(node.name).toBe('div');
      expect(node.from).toBe('BuiltIn');
      expect(node.disposed).toBe(false);
      expect(node.locked).toBe(false);
    });

    test('should auto-generate id if not provided', () => {
      const node = new NodeModel({ name: 'div' });
      expect(node.id).toBeDefined();
      expect(node.id.length).toBeGreaterThan(0);
    });

    test('should register node in static nodes record', () => {
      const node = new NodeModel({ id: 'node-1', name: 'div' });
      expect(NodeModel.nodes['node-1']).toBe(node);
    });

    test('should set parent reference', () => {
      const parent = new NodeModel({ id: 'parent', name: 'div' });
      const child = new NodeModel({ id: 'child', name: 'span' }, parent);
      expect(child.parent).toBe(parent);
    });

    test('should set __VTJ_NODE__ flag', () => {
      const node = new NodeModel({ name: 'div' });
      expect(node.__VTJ_NODE__).toBe(true);
    });
  });

  describe('update', () => {
    test('should update node properties', () => {
      const node = new NodeModel({ name: 'div' });
      node.update({ invisible: true, locked: true });
      expect(node.invisible).toBe(true);
      expect(node.locked).toBe(true);
    });

    test('should parse children as NodeSchema array', () => {
      const node = new NodeModel({ name: 'div' });
      node.setChildren([{ name: 'span' }, { name: 'a' }], true);
      expect(Array.isArray(node.children)).toBe(true);
      expect(node.children as NodeModel[]).toHaveLength(2);
      expect((node.children as NodeModel[])[0]).toBeInstanceOf(NodeModel);
    });

    test('should set children as string', () => {
      const node = new NodeModel({ name: 'div' });
      node.setChildren('text content', true);
      expect(node.children).toBe('text content');
    });

    test('should emit EVENT_NODE_CHANGE when not silent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_NODE_CHANGE', listener);
      const node = new NodeModel({ name: 'div' });
      node.update({ invisible: true });
      expect(listener).toHaveBeenCalledWith(node);
    });

    test('should not emit event when silent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_NODE_CHANGE', listener);
      const node = new NodeModel({ name: 'div' });
      node.update({ invisible: true }, true);
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('setChildren', () => {
    test('should set array children', () => {
      const node = new NodeModel({ name: 'div' });
      node.setChildren([{ name: 'span' }]);
      expect(Array.isArray(node.children)).toBe(true);
    });

    test('should set string children', () => {
      const node = new NodeModel({ name: 'div' });
      node.setChildren('text');
      expect(node.children).toBe('text');
    });

    test('should set JSExpression children', () => {
      const node = new NodeModel({ name: 'div' });
      const expr = { type: 'JSExpression' as const, value: 'items' };
      node.setChildren(expr);
      expect(node.children).toEqual(expr);
    });

    test('should emit event when not silent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_NODE_CHANGE', listener);
      const node = new NodeModel({ name: 'div' });
      node.setChildren([{ name: 'span' }]);
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('setSlot', () => {
    test('should set slot from string', () => {
      const node = new NodeModel({ name: 'div' });
      node.setSlot('default');
      expect(node.slot).toEqual({ name: 'default', params: [] });
    });

    test('should set slot from object', () => {
      const node = new NodeModel({ name: 'div' });
      node.setSlot({ name: 'header', params: ['item'] });
      expect(node.slot).toEqual({ name: 'header', params: ['item'] });
    });

    test('should emit event when not silent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_NODE_CHANGE', listener);
      const node = new NodeModel({ name: 'div' });
      node.setSlot('default');
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('props operations', () => {
    test('setProp should add new prop', () => {
      const node = new NodeModel({ name: 'div' });
      node.setProp('title', 'hello');
      expect(node.props.title).toBeDefined();
      expect(node.props.title.getValue()).toBe('hello');
    });

    test('setProp should update existing prop', () => {
      const node = new NodeModel({ name: 'div', props: { title: 'old' } });
      node.setProp('title', 'new');
      expect(node.props.title.getValue()).toBe('new');
    });

    test('removeProp should delete prop', () => {
      const node = new NodeModel({ name: 'div', props: { title: 'hello' } });
      node.removeProp('title');
      expect(node.props.title).toBeUndefined();
    });

    test('getPropValue should return prop value', () => {
      const node = new NodeModel({ name: 'div', props: { title: 'hello' } });
      expect(node.getPropValue('title')).toBe('hello');
    });

    test('getPropValue should return undefined for missing prop', () => {
      const node = new NodeModel({ name: 'div' });
      expect(node.getPropValue('nonexistent')).toBeUndefined();
    });
  });

  describe('events operations', () => {
    test('setEvent should add new event', () => {
      const node = new NodeModel({ name: 'div' });
      node.setEvent({
        name: 'click',
        handler: { type: 'JSFunction', value: 'function() {}' }
      });
      expect(node.events.click).toBeDefined();
      expect(node.events.click.name).toBe('click');
    });

    test('setEvent should update existing event', () => {
      const node = new NodeModel({ name: 'div' });
      node.setEvent({
        name: 'click',
        handler: { type: 'JSFunction', value: 'function() {}' }
      });
      node.setEvent({
        name: 'click',
        handler: { type: 'JSFunction', value: 'function() { alert(1) }' }
      });
      expect(node.events.click.handler.value).toBe('function() { alert(1) }');
    });

    test('removeEvent should delete event', () => {
      const node = new NodeModel({ name: 'div' });
      node.setEvent({
        name: 'click',
        handler: { type: 'JSFunction', value: 'function() {}' }
      });
      node.removeEvent('click');
      expect(node.events.click).toBeUndefined();
    });
  });

  describe('directives operations', () => {
    test('setDirective should add new directive', () => {
      const node = new NodeModel({ name: 'div' });
      node.setDirective({
        name: 'show',
        value: { type: 'JSExpression', value: 'visible' }
      });
      expect(node.directives).toHaveLength(1);
      expect(node.directives[0].name).toBe('show');
    });

    test('setDirective should update existing directive by id', () => {
      const node = new NodeModel({ name: 'div' });
      node.setDirective({
        id: 'dir-1',
        name: 'show',
        value: { type: 'JSExpression', value: 'visible' }
      });
      node.setDirective({
        id: 'dir-1',
        name: 'if',
        value: { type: 'JSExpression', value: 'condition' }
      });
      expect(node.directives).toHaveLength(1);
      expect(node.directives[0].name).toBe('if');
    });

    test('removeDirective should remove directive', () => {
      const node = new NodeModel({ name: 'div' });
      node.setDirective({
        id: 'dir-1',
        name: 'show',
        value: { type: 'JSExpression', value: 'visible' }
      });
      node.removeDirective(node.directives[0]);
      expect(node.directives).toHaveLength(0);
    });
  });

  describe('children manipulation', () => {
    test('appendChild should add child at end', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child);
      expect(parent.children).toHaveLength(1);
      expect((parent.children as NodeModel[])[0]).toBe(child);
      expect(child.parent).toBe(parent);
    });

    test('appendChild should convert string children to array', () => {
      const parent = new NodeModel({ name: 'div' });
      (parent as any).children = 'text';
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child);
      expect(Array.isArray(parent.children)).toBe(true);
      expect(parent.children as NodeModel[]).toContain(child);
    });

    test('removeChild should remove child', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      parent.removeChild(child);
      expect(parent.children as NodeModel[]).not.toContain(child);
      expect(child.parent).toBeNull();
    });

    test('insertAfter should insert after current node', () => {
      const parent = new NodeModel({ name: 'div' });
      const child1 = new NodeModel({ id: 'c1', name: 'span' });
      const child2 = new NodeModel({ id: 'c2', name: 'span' });
      const child3 = new NodeModel({ id: 'c3', name: 'span' });
      parent.appendChild(child1, true);
      parent.appendChild(child2, true);
      child1.insertAfter(child3);
      const children = parent.children as NodeModel[];
      expect(children.indexOf(child3)).toBe(1);
    });

    test('insertBefore should insert before current node', () => {
      const parent = new NodeModel({ name: 'div' });
      const child1 = new NodeModel({ id: 'c1', name: 'span' });
      const child2 = new NodeModel({ id: 'c2', name: 'span' });
      const child3 = new NodeModel({ id: 'c3', name: 'span' });
      parent.appendChild(child1, true);
      parent.appendChild(child2, true);
      child2.insertBefore(child3);
      const children = parent.children as NodeModel[];
      expect(children.indexOf(child3)).toBe(1);
    });

    test('movePrev should move node backward', () => {
      const parent = new NodeModel({ name: 'div' });
      const child1 = new NodeModel({ id: 'c1', name: 'span' });
      const child2 = new NodeModel({ id: 'c2', name: 'span' });
      parent.appendChild(child1, true);
      parent.appendChild(child2, true);
      child2.movePrev();
      const children = parent.children as NodeModel[];
      expect(children.indexOf(child2)).toBe(0);
    });

    test('moveNext should move node forward', () => {
      const parent = new NodeModel({ name: 'div' });
      const child1 = new NodeModel({ id: 'c1', name: 'span' });
      const child2 = new NodeModel({ id: 'c2', name: 'span' });
      parent.appendChild(child1, true);
      parent.appendChild(child2, true);
      child1.moveNext();
      const children = parent.children as NodeModel[];
      expect(children.indexOf(child1)).toBe(1);
    });
  });

  describe('toDsl', () => {
    test('should serialize to NodeSchema', () => {
      const child = new NodeModel({ id: 'child', name: 'span' });
      const parent = new NodeModel({ id: 'parent', name: 'div', children: [] });
      parent.appendChild(child, true);
      const dsl = parent.toDsl();
      expect(dsl.id).toBe('parent');
      expect(dsl.name).toBe('div');
      expect(dsl.children).toHaveLength(1);
      expect((dsl.children as any[])[0].id).toBe('child');
    });

    test('should include props, events and directives', () => {
      const node = new NodeModel({ id: 'n1', name: 'div' });
      node.setProp('title', 'hello', undefined, true);
      node.setEvent(
        {
          name: 'click',
          handler: { type: 'JSFunction', value: 'function() {}' }
        },
        true
      );
      node.setDirective(
        {
          name: 'show',
          value: { type: 'JSExpression', value: 'visible' }
        },
        true
      );
      const dsl = node.toDsl();
      expect(dsl.props).toEqual({ title: 'hello' });
      expect(dsl.events).toBeDefined();
      expect(dsl.directives).toBeDefined();
    });
  });

  describe('dispose', () => {
    test('should dispose node and remove from parent', () => {
      const listener = vi.fn();
      emitter.on('EVENT_NODE_CHANGE', listener);

      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      child.dispose();
      expect(child.disposed).toBe(true);
      expect(child.parent).toBeNull();
      expect(parent.children as NodeModel[]).not.toContain(child);
      expect(listener).toHaveBeenCalled();
    });

    test('should recursively dispose children', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      const grandchild = new NodeModel({ name: 'a' });
      child.appendChild(grandchild, true);
      parent.appendChild(child, true);
      parent.dispose(true);
      expect(parent.disposed).toBe(true);
      expect(child.disposed).toBe(true);
      expect(grandchild.disposed).toBe(true);
    });

    test('should remove from static nodes record', () => {
      const node = new NodeModel({ id: 'dispose-me', name: 'div' });
      expect(NodeModel.nodes['dispose-me']).toBe(node);
      node.dispose(true);
      expect(NodeModel.nodes['dispose-me']).toBeUndefined();
    });

    test('disposed node should not process further operations', () => {
      const node = new NodeModel({ name: 'div' });
      node.dispose(true);
      const child = new NodeModel({ name: 'span' });
      node.appendChild(child);
      expect(node.children as NodeModel[]).not.toContain(child);
    });
  });

  describe('lock/unlock', () => {
    test('lock should set locked on node and children', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      parent.lock();
      expect(parent.locked).toBe(true);
      expect(child.locked).toBe(true);
    });

    test('unlock should set locked to false on node and children', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      parent.lock(true);
      parent.unlock();
      expect(parent.locked).toBe(false);
      expect(child.locked).toBe(false);
    });
  });

  describe('setVisible', () => {
    test('should set invisible on node and children', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      parent.setVisible(false);
      expect(parent.invisible).toBe(true);
      expect(child.invisible).toBe(true);
    });

    test('should set visible on node and children', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      parent.invisible = true;
      child.invisible = true;
      parent.setVisible(true);
      expect(parent.invisible).toBe(false);
      expect(child.invisible).toBe(false);
    });
  });

  describe('isChild', () => {
    test('should return true if node is a direct child', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      parent.appendChild(child, true);
      expect(parent.isChild(child)).toBe(true);
    });

    test('should return true if node is a descendant', () => {
      const parent = new NodeModel({ name: 'div' });
      const child = new NodeModel({ name: 'span' });
      const grandchild = new NodeModel({ name: 'a' });
      child.appendChild(grandchild, true);
      parent.appendChild(child, true);
      expect(parent.isChild(grandchild)).toBe(true);
    });

    test('should return false for non-child', () => {
      const parent = new NodeModel({ name: 'div' });
      const unrelated = new NodeModel({ name: 'span' });
      expect(parent.isChild(unrelated)).toBe(false);
    });
  });

  describe('findChildIndex', () => {
    test('should return index of child', () => {
      const parent = new NodeModel({ name: 'div' });
      const child1 = new NodeModel({ id: 'c1', name: 'span' });
      const child2 = new NodeModel({ id: 'c2', name: 'span' });
      parent.appendChild(child1, true);
      parent.appendChild(child2, true);
      expect(parent.findChildIndex(child2)).toBe(1);
    });

    test('should return -1 for non-child', () => {
      const parent = new NodeModel({ name: 'div' });
      const unrelated = new NodeModel({ name: 'span' });
      expect(parent.findChildIndex(unrelated)).toBe(-1);
    });
  });
});
