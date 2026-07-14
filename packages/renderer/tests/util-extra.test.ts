import { expect, test, describe, vi } from 'vitest';
import { getMock, setupPageSetting, loadCss } from '../src/utils/util';

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
    const app = { _container: { classList: { add: vi.fn() } } };
    const route = { meta: {} };
    const file = { type: 'page' };
    setupPageSetting(app as any, route as any, file as any);
    expect(app._container.classList.add).toHaveBeenCalledWith('is-page');
  });

  test('sets is-pure class for pure pages', () => {
    const app = { _container: { classList: { add: vi.fn() } } };
    const route = { meta: {} };
    const file = { type: 'page', pure: true };
    setupPageSetting(app as any, route as any, file as any);
    expect(app._container.classList.add).toHaveBeenCalledWith('is-page');
    expect(app._container.classList.add).toHaveBeenCalledWith('is-pure');
  });

  test('merges file meta to route meta', () => {
    const app = { _container: { classList: { add: vi.fn() } } };
    const route = { meta: {} };
    const file = { type: 'page', meta: { title: 'Test' } };
    setupPageSetting(app as any, route as any, file as any);
    expect((route.meta as any).title).toBe('Test');
  });

  test('does not add is-page for non-page files', () => {
    const app = { _container: { classList: { add: vi.fn() } } };
    const route = { meta: {} };
    const file = { type: 'block' };
    setupPageSetting(app as any, route as any, file as any);
    expect(app._container.classList.add).not.toHaveBeenCalledWith('is-page');
  });
});

describe('loadCss', () => {
  test('fetches css and applies it', async () => {
    const mockReplaceSync = vi.fn();
    const mockFetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve('.test { color: red; }')
    });
    const origFetch = globalThis.fetch;
    (globalThis as any).fetch = mockFetch;

    const origCSS = (globalThis as any).CSSStyleSheet;
    (globalThis as any).CSSStyleSheet = class {
      id = '';
      replaceSync = mockReplaceSync;
    };

    const origDoc = (globalThis as any).document;
    (globalThis as any).document = {
      adoptedStyleSheets: [],
      head: { appendChild: vi.fn() },
      getElementById: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue({ id: '', innerHTML: '' })
    };

    await loadCss('test-css', 'http://example.com/style.css');
    expect(mockFetch).toHaveBeenCalledWith('http://example.com/style.css');

    (globalThis as any).fetch = origFetch;
    (globalThis as any).CSSStyleSheet = origCSS;
    (globalThis as any).document = origDoc;
  });

  test('handles fetch error gracefully', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
    const origFetch = globalThis.fetch;
    (globalThis as any).fetch = mockFetch;

    await expect(loadCss('test-css', 'http://example.com/style.css')).resolves
      .toBeUndefined();

    (globalThis as any).fetch = origFetch;
  });
});
