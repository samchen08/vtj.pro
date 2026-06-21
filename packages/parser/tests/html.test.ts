import { expect, test, describe } from 'vitest';
import { htmlToNodes } from '../src/vue/html';

describe('htmlToNodes', () => {
  test('should parse simple HTML tag', () => {
    const result = htmlToNodes('<div>Hello</div>');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('div');
    expect(result[0].children).toBe('Hello');
  });

  test('should parse nested structure', () => {
    const result = htmlToNodes('<div><span>text</span></div>');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('div');
    expect(Array.isArray(result[0].children)).toBe(true);
    const children = result[0].children as any[];
    expect(children.length).toBe(1);
    expect(children[0].name).toBe('span');
    expect(children[0].children).toBe('text');
  });

  test('should parse attributes', () => {
    const result = htmlToNodes(
      '<div class="container" id="main">Content</div>'
    );
    expect(result.length).toBe(1);
    expect(result[0].props).toBeDefined();
    expect(result[0].props!['class']).toBe('container');
    expect(result[0].props!['id']).toBe('main');
  });

  test('should parse self-closing tags', () => {
    const result = htmlToNodes('<br/><img src="test.png"/>');
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('br');
    expect(result[1].name).toBe('img');
    expect(result[1].props!['src']).toBe('test.png');
  });

  test('should convert style attribute to object', () => {
    const result = htmlToNodes(
      '<div style="color: red; font-size: 14px">Text</div>'
    );
    expect(result.length).toBe(1);
    expect(result[0].props!.style).toEqual({
      color: 'red',
      'font-size': '14px'
    });
  });

  test('should handle text nodes', () => {
    const result = htmlToNodes('<p>Hello <strong>world</strong></p>');
    expect(result.length).toBe(1);
    const children = result[0].children as any[];
    expect(children.length).toBeGreaterThan(0);
    const strongChild = children.find(
      (c: any) => c.name === 'strong' || c.name === 'Strong'
    );
    expect(strongChild).toBeDefined();
  });

  test('should parse complex HTML', () => {
    const html = `<div class="wrapper">
  <header id="header">
    <nav><a href="/">Home</a></nav>
  </header>
  <main>
    <section class="content">
      <h1>Title</h1>
      <p>Description</p>
    </section>
  </main>
</div>`;
    const result = htmlToNodes(html);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe('div');
  });

  test('should return empty array for empty string', () => {
    const result = htmlToNodes('');
    expect(result).toEqual([]);
  });
});
