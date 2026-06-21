import { describe, it, expect } from 'vitest';
import { VTJ_UTILS_VERSION } from '../src';

describe('version', () => {
  it('应导出版本号', () => {
    expect(VTJ_UTILS_VERSION).toBe('0.17.8');
  });
});
