import { expect, test, describe } from 'vitest';
import { parseTemplate } from '../src/vue/template';

describe('parseTemplate', () => {
  test('should parse basic elements', () => {
    const result = parseTemplate('test-id', 'test.vue', '<div>Hello</div>');
    expect(result.nodes.length).toBe(1);
    expect(result.nodes[0].name).toBe('div');
  });

  test('should parse interpolation expressions', () => {
    const result = parseTemplate('test-id', 'test.vue', '<p>{{ message }}</p>');
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.name).toBe('p');
  });

  test('should parse slot elements', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<slot name="header"></slot>'
    );
    expect(result.slots.length).toBe(1);
    expect(result.slots[0].name).toBe('header');
  });

  test('should parse default slot', () => {
    const result = parseTemplate('test-id', 'test.vue', '<slot></slot>');
    expect(result.slots.length).toBe(1);
    expect(result.slots[0].name).toBe('default');
  });

  test('should handle empty template', () => {
    const result = parseTemplate('test-id', 'test.vue', '');
    expect(result.nodes.length).toBe(0);
    expect(result.slots.length).toBe(0);
  });

  test('should parse component usage with styles', () => {
    const styles = {
      '.mycomp_abc123': { color: 'red' }
    };
    const content =
      '<my-component class="mycomp_abc123 other-class">Content</my-component>';
    const result = parseTemplate('test-id', 'test.vue', content, {
      platform: 'web',
      styles
    });
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.name).toBe('MyComponent');
    expect(node.props!.style).toBeDefined();
  });

  test('should track context for v-for', () => {
    const content = '<div v-for="item in list" :key="item.id">{{ item }}</div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBe(1);
  });

  test('should track context for slots', () => {
    const content = '<slot name="item" v-bind="{ item, index }"></slot>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.slots.length).toBe(1);
    expect(result.slots[0].name).toBe('item');
  });
});
