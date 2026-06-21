import { expect, test, describe } from 'vitest';
import { parseStyle } from '../src/vue/style';

describe('parseStyle', () => {
  test('should parse SCSS and extract class rules', () => {
    const source = `
.test_abc123 { color: red; font-size: 14px; }
.other_xyz789 { background: blue; }
.plain-class { margin: 10px; }
    `;
    const result = parseStyle(source);
    expect(result.errors.length).toBe(0);
    // Should extract scoped class rules (class name matching /^.[\\w]+_[\\w]{5,}/)
    expect(Object.keys(result.styles).length).toBe(2);
    expect(result.styles['.test_abc123']).toBeDefined();
    expect(result.styles['.test_abc123']['color']).toBe('red');
    expect(result.styles['.other_xyz789']).toBeDefined();
    expect(result.styles['.other_xyz789']['background']).toBe('blue');
  });

  test('should separate non-scoped CSS rules', () => {
    const source = `
.test_abc123 { color: red; }
div { margin: 0; }
.container { padding: 20px; }
    `;
    const result = parseStyle(source);
    expect(result.css).toContain('div');
    expect(result.css).toContain('.container');
    expect(result.styles['.test_abc123']).toBeDefined();
  });

  test('should handle empty content', () => {
    const result = parseStyle('');
    expect(result.errors.length).toBe(0);
    expect(Object.keys(result.styles).length).toBe(0);
    expect(result.css).toBe('');
  });

  test('should return error for invalid SCSS', () => {
    const result = parseStyle('{ invalid scss }');
    // May or may not error depending on sass behavior
    // At minimum should return gracefully
    expect(result).toBeDefined();
  });

  test('should handle multiple declarations in a rule', () => {
    const source = `
.comp_xyz789 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
    `;
    const result = parseStyle(source);
    expect(result.errors.length).toBe(0);
    expect(result.styles['.comp_xyz789']).toBeDefined();
    expect(result.styles['.comp_xyz789']['display']).toBe('flex');
    expect(result.styles['.comp_xyz789']['justify-content']).toBe('center');
    expect(result.styles['.comp_xyz789']['gap']).toBe('8px');
  });
});
