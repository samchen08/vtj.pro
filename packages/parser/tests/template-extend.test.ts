import { expect, test, describe } from 'vitest';
import { parseTemplate } from '../src/vue/template';

describe('parseTemplate - v-if/v-else-if/v-else', () => {
  test('should parse v-if on element', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-if="show">Content</div>'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives).toBeDefined();
    expect(node.directives!.some((d) => d.name === 'vIf')).toBe(true);
  });

  test('should parse v-else-if and v-else chains', () => {
    const content = `
<div v-if="type === 1">A</div>
<div v-else-if="type === 2">B</div>
<div v-else>C</div>`;
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThan(0);
  });

  test('should parse template v-if', () => {
    const content = `
<template v-if="visible">
  <div>Content A</div>
</template>
<template v-else>
  <div>Content B</div>
</template>`;
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBe(2);
  });
});

describe('parseTemplate - v-for', () => {
  test('should parse v-for on element', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-for="(item, idx) in items" :key="idx">{{ item }}</div>'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives!.some((d) => d.name === 'vFor')).toBe(true);
  });

  test('should parse v-for with range', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<span v-for="n in 10" :key="n">{{ n }}</span>'
    );
    expect(result.nodes.length).toBe(1);
  });
});

describe('parseTemplate - v-model', () => {
  test('should parse v-model on input', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<input v-model="name" />'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives!.some((d) => d.name === 'vModel')).toBe(true);
  });

  test('should parse v-model with modifiers', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<input v-model.trim="name" />'
    );
    expect(result.nodes.length).toBe(1);
  });
});

describe('parseTemplate - event handlers', () => {
  test('should parse @click event', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<button @click="handleClick">Click</button>'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.events).toBeDefined();
    expect(node.events!['click']).toBeDefined();
  });

  test('should parse @click with modifiers', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<button @click.stop.prevent="handleClick">Click</button>'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.events).toBeDefined();
  });
});

describe('parseTemplate - dynamic bindings', () => {
  test('should parse :class binding', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div :class="{ active: isActive }">Dynamic</div>'
    );
    expect(result.nodes.length).toBe(1);
  });

  test('should parse :style binding', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div :style="{ color: textColor }">Styled</div>'
    );
    expect(result.nodes.length).toBe(1);
  });

  test('should parse v-bind object', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-bind="attrs">Bound</div>'
    );
    expect(result.nodes.length).toBe(1);
  });
});

describe('parseTemplate - v-show', () => {
  test('should parse v-show', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-show="visible">Shown</div>'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives!.some((d) => d.name === 'vShow')).toBe(true);
  });
});

describe('parseTemplate - v-html', () => {
  test('should parse v-html', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-html="rawHtml"></div>'
    );
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives!.some((d) => d.name === 'vHtml')).toBe(true);
  });
});

describe('parseTemplate - text interpolation', () => {
  test('should parse text-only content', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<span>Hello World</span>'
    );
    expect(result.nodes.length).toBe(1);
  });

  test('should parse nested elements', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div><span>Nested</span></div>'
    );
    expect(result.nodes.length).toBe(1);
    expect(result.nodes[0].children).toBeDefined();
  });
});

describe('parseTemplate - custom directives', () => {
  test('should parse custom directive', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-focus="focused">Focus</div>'
    );
    expect(result.nodes.length).toBe(1);
  });
});

describe('parseTemplate - with options', () => {
  test('should parse with platform option', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<view>Uni</view>',
      { platform: 'uniapp' as any }
    );
    expect(result.nodes.length).toBe(1);
  });

  test('should parse with directives option', () => {
    const result = parseTemplate(
      'test-id',
      'test.vue',
      '<div v-custom="value">Custom</div>',
      {
        platform: 'web' as any,
        directives: {
          custom: { type: 'JSExpression', value: 'someDirective' }
        }
      }
    );
    expect(result.nodes.length).toBe(1);
  });
});
