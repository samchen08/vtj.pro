import { expect, test, describe, vi } from 'vitest';
import { getMock, setupPageSetting } from '../src/utils/util';

describe('getMock', () => {
  test('returns globalThis.Mock when cached', () => {
    const mockFn = vi.fn();
    (globalThis as any).Mock = mockFn;
    const result = getMock();
    expect(result).toBe(mockFn);
    delete (globalThis as any).Mock;
  });

  test('caches Mock from provided global to globalThis', () => {
    const mockFn = vi.fn();
    const global = { Mock: mockFn };
    // 确保 globalThis.Mock 未设置
    delete (globalThis as any).Mock;
    const result = getMock(global);
    expect(result).toBe(mockFn);
    expect((globalThis as any).Mock).toBe(mockFn);
    delete (globalThis as any).Mock;
  });

  test('returns undefined when Mock not available', () => {
    delete (globalThis as any).Mock;
    const result = getMock({});
    expect(result).toBeUndefined();
  });
});

describe('setupPageSetting', () => {
  test('sets page class on app container', () => {
    const app = {
      _container: {
        classList: {
          add: vi.fn()
        }
      }
    };
    const route = { meta: {} };
    const file = { type: 'page' };

    setupPageSetting(app as any, route as any, file as any);
    expect(app._container.classList.add).toHaveBeenCalledWith('is-page');
  });

  test('sets is-pure class for pure pages', () => {
    const app = {
      _container: {
        classList: {
          add: vi.fn()
        }
      }
    };
    const route = { meta: {} };
    const file = { type: 'page', pure: true };

    setupPageSetting(app as any, route as any, file as any);
    expect(app._container.classList.add).toHaveBeenCalledWith('is-page');
    expect(app._container.classList.add).toHaveBeenCalledWith('is-pure');
  });

  test('merges file meta to route meta', () => {
    const app = {
      _container: {
        classList: {
          add: vi.fn()
        }
      }
    };
    const route = { meta: {} };
    const file = { type: 'page', meta: { title: 'Test' } };

    setupPageSetting(app as any, route as any, file as any);
    expect((route.meta as any).title).toBe('Test');
  });

  test('does not add is-page for non-page files', () => {
    const app = {
      _container: {
        classList: {
          add: vi.fn()
        }
      }
    };
    const route = { meta: {} };
    const file = { type: 'block' };

    setupPageSetting(app as any, route as any, file as any);
    expect(app._container.classList.add).not.toHaveBeenCalledWith('is-page');
  });
});
