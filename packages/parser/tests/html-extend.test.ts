import { expect, test, describe } from 'vitest';
import { htmlToNodes } from '../src/vue/html';

describe('htmlToNodes - edge cases', () => {
  test('should handle text before and after elements', () => {
    const result = htmlToNodes('<div>before<span>middle</span>after</div>');
    expect(result.length).toBe(1);
    const children = result[0].children as any[];
    expect(children.length).toBeGreaterThan(1);
  });

  test('should handle mixed text and elements in non-root', () => {
    const result = htmlToNodes('<div><p>text1<b>bold</b>text2</p></div>');
    expect(result.length).toBe(1);
  });

  test('should handle self-closing tag with text after', () => {
    const result = htmlToNodes('<div><br/>some text</div>');
    expect(result.length).toBe(1);
  });

  test('should handle attributes with empty values', () => {
    const result = htmlToNodes('<div disabled>Content</div>');
    expect(result.length).toBe(1);
    expect(result[0].props!['disabled']).toBe('');
  });

  test('should handle multiple sibling elements', () => {
    const result = htmlToNodes('<li>A</li><li>B</li><li>C</li>');
    expect(result.length).toBe(3);
  });

  test('should parse with uniapp platform', () => {
    const result = htmlToNodes('<view>UniApp</view>', 'uniapp' as any);
    expect(result.length).toBe(1);
    expect(result[0].name).toBeTruthy();
  });

  test('should handle escaped quotes in HTML', () => {
    const result = htmlToNodes('<div title="hello \\"world\\"">Text</div>');
    expect(result.length).toBe(1);
  });
});
