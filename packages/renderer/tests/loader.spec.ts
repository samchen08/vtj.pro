import { expect, test, describe, vi, beforeEach } from 'vitest';
import {
  getPlugin,
  createLoader,
  clearLoaderCache
} from '../src/render/loader';

// Mock utils
vi.mock('../src/utils', async () => {
  const actual = await vi.importActual('../src/utils');
  return {
    ...actual,
    isJSUrl: (url: string) => url.endsWith('.js'),
    isCSSUrl: (url: string) => url.endsWith('.css'),
    loadCssUrl: vi.fn(),
    loadScriptUrl: vi.fn()
  };
});

describe('getPlugin', () => {
  test('returns null when no library', async () => {
    const result = await getPlugin({ type: 'Plugin', urls: ['/a.js'] });
    expect(result).toBeNull();
  });

  test('returns null when no JS urls', async () => {
    const result = await getPlugin({
      type: 'Plugin',
      urls: ['/a.css'],
      library: 'lib'
    });
    expect(result).toBeNull();
  });

  test('loads CSS urls then JS', async () => {
    const { loadCssUrl, loadScriptUrl } = await import('../src/utils');
    (loadScriptUrl as any).mockResolvedValue({ name: 'MyComponent' });

    const result = await getPlugin({
      type: 'Plugin',
      urls: ['/style.css', '/lib.js'],
      library: 'myLib'
    });

    expect(loadCssUrl).toHaveBeenCalled();
    expect(result).toEqual({ name: 'MyComponent' });
  });

  test('handles script load failure', async () => {
    const { loadScriptUrl } = await import('../src/utils');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (loadScriptUrl as any).mockRejectedValue(new Error('Network error'));

    const result = await getPlugin({
      type: 'Plugin',
      urls: ['/bad.js'],
      library: 'badLib'
    });

    expect(result).toBeNull();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('passes global to load functions', async () => {
    const { loadCssUrl, loadScriptUrl } = await import('../src/utils');
    (loadScriptUrl as any).mockResolvedValue({});

    const customGlobal = { document: {} };
    await getPlugin(
      {
        type: 'Plugin',
        urls: ['/a.css', '/a.js'],
        library: 'lib'
      },
      customGlobal
    );

    expect(loadCssUrl).toHaveBeenCalledWith(['/a.css'], customGlobal);
    expect(loadScriptUrl).toHaveBeenCalledWith(['/a.js'], 'lib', customGlobal);
  });
});

describe('createLoader', () => {
  beforeEach(() => {
    clearLoaderCache();
  });

  test('returns loader function', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    expect(typeof loader).toBe('function');
  });

  test('returns name when no from', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    expect(loader('test-id', 'div')).toBe('div');
  });

  test('returns name when from is string', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    expect(loader('test-id', 'div', 'some-string')).toBe('div');
  });

  test('resets plugins when window option provided', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const winObj = { existing: 'value' };
    createLoader({ getDsl, getDslByUrl, options: { window: winObj } });
    // Window-based plugin cleanup - ensure existing plugin is removed
    // (In this test, no plugins are registered, so just verify no crash)
  });

  test('returns async component for Plugin from', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    const result = loader('test-id', 'div', { type: 'Plugin' } as any);
    // Plugin from without library still creates an async component
    expect(result).toBeDefined();
    expect(result).not.toBe('div');
  });
});

describe('clearLoaderCache', () => {
  test('clears cache without error', () => {
    expect(() => clearLoaderCache()).not.toThrow();
  });
});

test('returns name for unknown from type', () => {
  const getDsl = vi.fn();
  const getDslByUrl = vi.fn();
  const loader = createLoader({ getDsl, getDslByUrl, options: {} });
  const result = loader('test-id', 'custom-tag', {
    type: 'UnknownType'
  } as any);
  expect(result).toBe('custom-tag');
});

test('returns cached plugin result', () => {
  const getDsl = vi.fn();
  const getDslByUrl = vi.fn();
  const loader = createLoader({ getDsl, getDslByUrl, options: {} });

  // First call creates async component
  const result1 = loader('test-id', 'div', {
    type: 'Plugin',
    library: 'test-lib'
  } as any);
  // Second call should return cached result
  const result2 = loader('test-id', 'div', {
    type: 'Plugin',
    library: 'test-lib'
  } as any);

  expect(result1).toBeDefined();
  expect(result2).toBeDefined();
  // Same reference (cached)
  expect(result1).toBe(result2);
});

test('keeps component caches isolated between loaders', () => {
  const getDsl = vi.fn();
  const getDslByUrl = vi.fn();
  const loader1 = createLoader({ getDsl, getDslByUrl, options: {} });
  const loader2 = createLoader({ getDsl, getDslByUrl, options: {} });
  const from = { type: 'Schema', id: 'child' } as any;

  expect(loader1('host', 'Child', from)).not.toBe(
    loader2('host', 'Child', from)
  );
});

test('does not clear plugins owned by another loader', () => {
  const getDsl = vi.fn();
  const getDslByUrl = vi.fn();
  const winObj: any = { existingPlugin: 'value' };

  // First create a loader with no window
  const loader1 = createLoader({ getDsl, getDslByUrl, options: {} });
  loader1('test-id', 'div', {
    type: 'Plugin',
    library: 'existingPlugin'
  } as any);

  // Second create a loader with window - should clean up window plugins
  const loader2 = createLoader({
    getDsl,
    getDslByUrl,
    options: { window: winObj }
  });
  const result = loader2('test-id', 'div', {
    type: 'Plugin',
    library: 'newPlugin'
  } as any);
  expect(result).toBeDefined();

  expect(winObj.existingPlugin).toBe('value');
});
import { expect, test, describe, vi, beforeEach } from 'vitest';
import {
  getPlugin,
  createLoader,
  clearLoaderCache
} from '../src/render/loader';

// Mock utils
vi.mock('../src/utils', async () => {
  const actual = await vi.importActual('../src/utils');
  return {
    ...actual,
    isJSUrl: (url: string) => url.endsWith('.js'),
    isCSSUrl: (url: string) => url.endsWith('.css'),
    loadCssUrl: vi.fn(),
    loadScriptUrl: vi.fn()
  };
});

describe('getPlugin', () => {
  test('returns null when no library', async () => {
    const result = await getPlugin({ type: 'Plugin', urls: ['/a.js'] });
    expect(result).toBeNull();
  });

  test('returns null when no JS urls', async () => {
    const result = await getPlugin({
      type: 'Plugin',
      urls: ['/a.css'],
      library: 'lib'
    });
    expect(result).toBeNull();
  });

  test('loads CSS urls then JS', async () => {
    const { loadCssUrl, loadScriptUrl } = await import('../src/utils');
    (loadScriptUrl as any).mockResolvedValue({ name: 'MyComponent' });

    const result = await getPlugin({
      type: 'Plugin',
      urls: ['/style.css', '/lib.js'],
      library: 'myLib'
    });

    expect(loadCssUrl).toHaveBeenCalled();
    expect(result).toEqual({ name: 'MyComponent' });
  });

  test('handles script load failure', async () => {
    const { loadScriptUrl } = await import('../src/utils');
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (loadScriptUrl as any).mockRejectedValue(new Error('Network error'));

    const result = await getPlugin({
      type: 'Plugin',
      urls: ['/bad.js'],
      library: 'badLib'
    });

    expect(result).toBeNull();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test('passes global to load functions', async () => {
    const { loadCssUrl, loadScriptUrl } = await import('../src/utils');
    (loadScriptUrl as any).mockResolvedValue({});

    const customGlobal = { document: {} };
    await getPlugin(
      {
        type: 'Plugin',
        urls: ['/a.css', '/a.js'],
        library: 'lib'
      },
      customGlobal
    );

    expect(loadCssUrl).toHaveBeenCalledWith(['/a.css'], customGlobal);
    expect(loadScriptUrl).toHaveBeenCalledWith(['/a.js'], 'lib', customGlobal);
  });
});

describe('createLoader', () => {
  beforeEach(() => {
    clearLoaderCache();
  });

  test('returns loader function', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    expect(typeof loader).toBe('function');
  });

  test('returns name when no from', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    expect(loader('test-id', 'div')).toBe('div');
  });

  test('returns name when from is string', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    expect(loader('test-id', 'div', 'some-string')).toBe('div');
  });

  test('resets plugins when window option provided', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const winObj = { existing: 'value' };
    createLoader({ getDsl, getDslByUrl, options: { window: winObj } });
    // Window-based plugin cleanup - ensure existing plugin is removed
    // (In this test, no plugins are registered, so just verify no crash)
  });

  test('returns async component for Plugin from', () => {
    const getDsl = vi.fn();
    const getDslByUrl = vi.fn();
    const loader = createLoader({ getDsl, getDslByUrl, options: {} });
    const result = loader('test-id', 'div', { type: 'Plugin' } as any);
    // Plugin from without library still creates an async component
    expect(result).toBeDefined();
    expect(result).not.toBe('div');
  });
});

describe('clearLoaderCache', () => {
  test('clears cache without error', () => {
    expect(() => clearLoaderCache()).not.toThrow();
  });
});
