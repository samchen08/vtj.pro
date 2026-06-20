import { describe, expect, test } from 'vitest';
import { makeInstaller } from '../src/utils/install';

describe('makeInstaller', () => {
  test('返回包含 install 方法的对象', () => {
    const installer = makeInstaller();
    expect(installer).toBeDefined();
    expect(typeof installer.install).toBe('function');
  });

  test('空组件列表可正常安装', () => {
    const installer = makeInstaller([]);
    expect(typeof installer.install).toBe('function');
  });

  test('安装器具有 plugin 结构', () => {
    const installer = makeInstaller();
    expect(typeof installer.install).toBe('function');
  });
});
