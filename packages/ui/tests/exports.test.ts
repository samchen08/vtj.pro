import { describe, expect, test } from 'vitest';
import { VTJ_UI_VERSION, components, INSTALLED_KEY } from '../src';

describe('公共导出', () => {
  test('VTJ_UI_VERSION 是字符串', () => {
    expect(VTJ_UI_VERSION).toBeDefined();
    expect(typeof VTJ_UI_VERSION).toBe('string');
  });

  test('components 是数组且不为空', () => {
    expect(Array.isArray(components)).toBe(true);
    expect(components.length).toBeGreaterThan(0);
  });

  test('components 包含所有核心组件', () => {
    const names = components
      .map((c: any) => c.name || c.__name)
      .filter(Boolean);
    expect(names).toContain('XIcon');
    expect(names).toContain('XForm');
    expect(names).toContain('XField');
    expect(names).toContain('XDialog');
    expect(names).toContain('XGrid');
    expect(names).toContain('XContainer');
  });

  test('INSTALLED_KEY 是固定字符串', () => {
    expect(INSTALLED_KEY).toBe('__VTJ_UI_INSTALLED__');
  });
});
