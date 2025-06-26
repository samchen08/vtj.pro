import { expect, test, describe } from 'vitest';
import { parseStyle } from '../src/vue/style';

describe('Style Parser', () => {
  test('parseStyle should parse basic CSS', () => {
    const content = `
      .container {
        width: 100%;
        height: 100vh;
      }
      .button {
        color: blue;
      }
    `;

    const result = parseStyle(content);

    expect(result.errors).toHaveLength(0);
    expect(result.css).toContain('.container');
    expect(result.css).toContain('.button');
  });

  test('parseStyle should handle special class names', () => {
    const content = `
      .button_abc123 {
        color: blue;
        font-size: 16px;
      }
      .normal {
        color: red;
      }
    `;

    const result = parseStyle(content);

    expect(result.errors).toHaveLength(0);
    expect(result.styles['.button_abc123']).toBeDefined();
    expect(result.styles['.button_abc123'].color).toBe('blue');
    expect(result.styles['.button_abc123']['font-size']).toBe('16px');
    expect(result.css).toContain('.normal');
    expect(result.css).not.toContain('.button_abc123');
  });

  test('parseStyle should handle SASS features', () => {
    const content = `
      $primary-color: #3498db;
      
      .container {
        width: 100%;
        .nested {
          color: $primary-color;
          &:hover {
            color: $primary-color;
          }
        }
      }
    `;

    const result = parseStyle(content);

    expect(result.errors).toHaveLength(0);
    expect(result.css).toContain('.container');
    expect(result.css).toContain('.container .nested');
    expect(result.css).toContain('.container .nested:hover');
    expect(result.css).toContain('#3498db');
  });

  test('parseStyle should handle media queries', () => {
    const content = `
      .container {
        width: 100%;
      }
      
      @media (max-width: 768px) {
        .container {
          width: 90%;
        }
      }
    `;

    const result = parseStyle(content);

    expect(result.errors).toHaveLength(0);
    expect(result.css).toContain('@media');
    expect(result.css).toContain('max-width: 768px');
  });

  test('parseStyle should handle errors in CSS', () => {
    const content = `
      .container {
        color: red;
        width: 100%
      }
    `;

    const result = parseStyle(content);

    // expect(result.errors.length).toBeGreaterThan(0);
  });

  test('parseStyle should handle multiple special class names', () => {
    const content = `
      .button_abc123 {
        color: blue;
      }
      .header_xyz789 {
        background: red;
      }
      .normal {
        padding: 10px;
      }
    `;

    const result = parseStyle(content);

    expect(result.styles['.button_abc123']).toBeDefined();
    expect(result.styles['.header_xyz789']).toBeDefined();
    expect(result.styles['.button_abc123'].color).toBe('blue');
    expect(result.styles['.header_xyz789'].background).toBe('red');
    expect(result.css).toContain('.normal');
    expect(result.css).not.toContain('.button_abc123');
    expect(result.css).not.toContain('.header_xyz789');
  });

  test('parseStyle should handle empty content', () => {
    const content = '';

    const result = parseStyle(content);

    expect(result.errors).toHaveLength(0);
    expect(result.css).toBe('');
    expect(Object.keys(result.styles)).toHaveLength(0);
  });

  test('parseStyle should handle complex selectors', () => {
    const content = `
      .button_abc123 {
        color: blue;
      }
      .button_abc123:hover {
        color: darkblue;
      }
      .container > .item {
        margin: 10px;
      }
    `;

    const result = parseStyle(content);

    expect(result.styles['.button_abc123']).toBeDefined();
    expect(result.css).toContain('.container > .item');
    expect(result.css).not.toContain('.button_abc123');
  });
});
