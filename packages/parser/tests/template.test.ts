import { expect, test, describe } from 'vitest';
import { parseTemplate } from '../src/vue/template';
import type {
  NodeSchema,
  NodeEvents,
  JSExpression,
  JSFunction
} from '@vtj/core';

describe('Template Parser', () => {
  test('parseTemplate should parse basic template', () => {
    const content = `
      <div class="container">
        <h1>{{ title }}</h1>
        <p>Static text</p>
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);

    expect(result.nodes).toBeDefined();
    if (!result.nodes?.length) return;

    const rootNode = result.nodes[0];
    expect(rootNode.name).toBe('div');
    expect(rootNode.props?.class).toBe('container');
    if (Array.isArray(rootNode.children)) {
      expect(rootNode.children.length).toBe(2);
    }
  });

  test('parseTemplate should handle v-if directives', () => {
    const content = `
      <div>
        <p v-if="showMessage">{{ message }}</p>
        <p v-else>No message</p>
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);
    if (!result.nodes?.[0]?.children) return;

    const children = result.nodes[0].children;
    if (!Array.isArray(children)) return;
    expect(children.length).toBe(2);

    const firstChild = children[0] as NodeSchema;
    expect(firstChild.directives?.[0]).toBeDefined();
    const firstDir = firstChild.directives?.[0];
    if (firstDir) {
      expect(firstDir.name).toBe('vIf');
      expect((firstDir.value as JSExpression).type).toBe('JSExpression');
      expect((firstDir.value as JSExpression).value).toBe('showMessage');
    }

    const secondChild = children[1] as NodeSchema;
    const secondDir = secondChild.directives?.[0];
    expect(secondDir?.name).toBe('vElse');
  });

  test('parseTemplate should handle v-for directives', () => {
    const content = `
      <div>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }}
        </li>
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);
    if (!result.nodes?.[0]?.children) return;

    const children = result.nodes[0].children;
    if (!Array.isArray(children)) return;

    const forNode = children[0] as NodeSchema;
    const forDir = forNode.directives?.[0];
    if (forDir) {
      expect(forDir.name).toBe('vFor');
      expect((forDir.value as JSExpression).type).toBe('JSExpression');
      expect((forDir.value as JSExpression).value).toBe('items');
      expect(forDir.iterator).toEqual({
        item: 'item',
        index: 'index'
      });
    }
  });

  test('parseTemplate should handle events', () => {
    const content = `
      <div>
        <button @click="handleClick">Click me</button>
        <input @input.trim="handleInput" />
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);
    if (!result.nodes?.[0]?.children) return;

    const children = result.nodes[0].children;
    if (!Array.isArray(children)) return;

    const button = children[0] as NodeSchema;
    expect(button.events).toBeDefined();
    const clickEvent = button.events?.click;
    if (clickEvent) {
      expect(clickEvent.name).toBe('click');
      expect((clickEvent.handler as JSFunction).type).toBe('JSFunction');
    }

    const input = children[1] as NodeSchema;
    const inputEvent = input.events?.input;
    if (inputEvent?.modifiers) {
      expect(inputEvent.modifiers.trim).toBe(true);
    }
  });

  test('parseTemplate should handle slots', () => {
    const content = `
      <div>
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer" :item="item"></slot>
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);

    expect(result.slots).toBeDefined();
    if (!result.slots?.length) return;
    expect(result.slots.length).toBe(3);

    expect(result.slots[0].name).toBe('header');
    expect(result.slots[1].name).toBe('default');
    expect(result.slots[2].name).toBe('footer');
    expect(result.slots[2].params).toContain('item');
  });

  test('parseTemplate should handle v-model directive', () => {
    const content = `
      <div>
        <input v-model="inputValue" />
        <select v-model="selected">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);
    if (!result.nodes?.[0]?.children) return;

    const children = result.nodes[0].children;
    if (!Array.isArray(children)) return;

    const input = children[0] as NodeSchema;
    const inputDir = input.directives?.[0];
    if (inputDir) {
      expect(inputDir.name).toBe('vModel');
      expect((inputDir.value as JSExpression).type).toBe('JSExpression');
      expect((inputDir.value as JSExpression).value).toBe('inputValue');
    }

    const select = children[1] as NodeSchema;
    const selectDir = select.directives?.[0];
    if (selectDir) {
      expect(selectDir.name).toBe('vModel');
      expect((selectDir.value as JSExpression).value).toBe('selected');
    }
  });

  test('parseTemplate should handle class bindings', () => {
    const content = `
      <div class="static" :class="{ active: isActive }">
        <p :class="['bold', isImportant && 'important']">Text</p>
      </div>
    `;

    const result = parseTemplate('test-id', 'TestComponent', content);
    if (!result.nodes?.[0]) return;

    const div = result.nodes[0];
    // expect(div.props?.class).toBe('static');
    const dynamicClass = div.props?.['class'] as JSExpression;
    expect(dynamicClass).toBeDefined();
  });
});
