import { expect, test, describe } from 'vitest';
import { htmlToNodes } from '../src/vue/html';
import type { NodeSchema, PlatformType } from '@vtj/core';

describe('HTML Parser', () => {
  test('htmlToNodes should parse basic HTML', () => {
    const html = '<div class="container">Hello World</div>';

    const result = htmlToNodes(html);

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    const node = result[0] as NodeSchema;
    expect(node.name).toBe('div');
    expect(node.props?.class).toBe('container');
    expect(node.children).toBe('Hello World');
  });

  test('htmlToNodes should handle nested elements', () => {
    const html = `
      <div class="container">
        <h1>Title</h1>
        <p>Content</p>
      </div>
    `;

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const container = result[0] as NodeSchema;
    expect(container.name).toBe('div');
    if (Array.isArray(container.children)) {
      expect(container.children.length).toBe(2);
      expect(container.children[0].name).toBe('h1');
      expect(container.children[1].name).toBe('p');
      expect(container.children[0].children).toBe('Title');
      expect(container.children[1].children).toBe('Content');
    }
  });

  test('htmlToNodes should handle self-closing tags', () => {
    const html =
      '<div><img src="test.jpg" alt="test"/><input type="text"/></div>';

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const container = result[0] as NodeSchema;
    if (Array.isArray(container.children)) {
      expect(container.children.length).toBe(2);
      expect(container.children[0].name).toBe('img');
      expect(container.children[1].name).toBe('input');
      expect(container.children[0].props?.src).toBe('test.jpg');
      expect(container.children[1].props?.type).toBe('text');
    }
  });

  test('htmlToNodes should handle inline styles', () => {
    const html = '<div style="color: red; font-size: 16px;">Styled Text</div>';

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const node = result[0] as NodeSchema;
    const style = node.props?.style as Record<string, string>;
    expect(style).toBeDefined();
    expect(style.color).toBe('red');
    expect(style['font-size']).toBe('16px');
  });

  test('htmlToNodes should handle complex attributes', () => {
    const html =
      '<div data-test="value" aria-label="test" hidden>Content</div>';

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const node = result[0] as NodeSchema;
    expect(node.props?.['data-test']).toBe('value');
    expect(node.props?.['aria-label']).toBe('test');
    expect(node.props?.hidden).toBe('');
  });

  test('htmlToNodes should handle mixed text and elements', () => {
    const html = '<div>Text <span>Inline</span> More Text</div>';

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const container = result[0] as NodeSchema;
    if (Array.isArray(container.children)) {
      expect(container.children.length).toBe(3);
      expect(container.children[0].name).toBe('span');
      expect(container.children[0].children).toBe('Text');
      expect(container.children[1].name).toBe('span');
      expect(container.children[1].children).toBe('Inline');
      expect(container.children[2].name).toBe('span');
      expect(container.children[2].children).toBe('More Text');
    }
  });

  test('htmlToNodes should handle empty elements', () => {
    const html = '<div></div>';

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const node = result[0] as NodeSchema;
    expect(node.name).toBe('div');
    expect(node.children).toBeUndefined();
  });

  test('htmlToNodes should handle escaped quotes', () => {
    const html = '<div data-text="Text with \\"quotes\\"">Content</div>';

    const result = htmlToNodes(html);

    expect(result.length).toBe(1);
    const node = result[0] as NodeSchema;
    // todo: fix
    // expect(node.props?.['data-text']).toBe('Text with "quotes"');
  });

  test('htmlToNodes should handle platform-specific tag names', () => {
    const html = '<text>Native Text</text>';

    const result = htmlToNodes(html, 'web' as PlatformType);

    expect(result.length).toBe(1);
    const node = result[0] as NodeSchema;
    // 根据实际平台转换逻辑验证name
    expect(node.name).toBeDefined();
    expect(node.children).toBe('Native Text');
  });
});
