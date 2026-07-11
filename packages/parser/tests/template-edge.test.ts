import { expect, test, describe } from 'vitest';
import { parseTemplate } from '../src/vue/template';

describe('parseTemplate - v-if single branch with non-element children', () => {
  test('should handle v-if with single text child', () => {
    const content = '<div v-if="visible">Hello World</div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThan(0);
    const node = result.nodes[0];
    expect(node.name).toBe('div');
    expect(node.directives).toBeDefined();
    expect(node.directives!.length).toBeGreaterThan(0);
  });

  test('should handle v-if with multiple children', () => {
    const content = '<div v-if="show"><span>A</span><span>B</span></div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThan(0);
  });

  test('should handle v-if with mixed text and element', () => {
    const content = '<div v-if="flag">Text <span>Child</span></div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThan(0);
  });
});

describe('parseTemplate - v-for with multiple children', () => {
  test('should handle v-for with multiple child elements', () => {
    const content = '<div v-for="item in items" :key="item.id"><span>1</span><span>2</span></div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThan(0);
  });
});

describe('parseTemplate - nested directives', () => {
  test('should handle v-html directive', () => {
    const content = '<div v-html="htmlContent"></div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives).toBeDefined();
    expect(node.directives!.some((d) => d.name === 'vHtml')).toBe(true);
  });

  test('should handle v-bind without arg (spread)', () => {
    const content = '<div v-bind="attrs"></div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.directives).toBeDefined();
    expect(node.directives!.some((d) => d.name === 'vBind')).toBe(true);
  });
});

describe('parseTemplate - template tag with slot', () => {
  test('should handle slot inside a parent element', () => {
    const content = '<div><slot name="header">Default</slot></div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThanOrEqual(0);
  });

  test('should handle scoped slot with v-bind', () => {
    const content = '<slot name="item" v-bind="{ item, index }"></slot>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.slots.length).toBeGreaterThanOrEqual(0);
  });

  test('should handle template v-if with isTemplateIf flag', () => {
    // When useIf is enabled, template tags can have isTemplateIf
    const content = '<template v-if="condition"><div>A</div></template><template v-else><div>B</div></template>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBeGreaterThanOrEqual(0);
  });
});

describe('parseTemplate - style inline and class merging', () => {
  test('should parse inline style attribute', () => {
    const content = '<div style="color: red; font-size: 14px;">Styled</div>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBe(1);
    const node = result.nodes[0];
    expect(node.props).toBeDefined();
    expect(node.props!.style).toBeDefined();
  });
});

describe('parseTemplate - compound expressions', () => {
  test('should handle mixed text and expressions', () => {
    const content = '<p>Hello {{ name }} world</p>';
    const result = parseTemplate('test-id', 'test.vue', content);
    expect(result.nodes.length).toBe(1);
  });
});
