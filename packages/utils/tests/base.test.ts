import { describe, it, expect } from 'vitest';
import { uid, VTJ_UTILS_VERSION } from '../src';

describe('base (re-export from @vtj/base)', () => {
  it('uid 应生成唯一 ID', () => {
    expect(!!uid()).toBeTruthy();
    expect(uid()).not.toBe(uid());
  });

  it('VTJ_UTILS_VERSION 应存在', () => {
    expect(VTJ_UTILS_VERSION).toBeDefined();
  });
});
