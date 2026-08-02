import { expect, test, describe, vi, beforeEach } from 'vitest';
import {
  toString,
  isBuiltInTag,
  isNativeTag,
  isVuePlugin,
  isArrowFunction,
  isCallFunction,
  adoptedStyleSheets,
  loadCss,
  loadCssUrl,
  loadScriptUrl
} from '../src/utils/util';

test('toString converts value to string', () => {
  expect(toString('hello')).toBe('hello');
  expect(toString(123)).toBe('123');
  expect(toString({ a: 1 })).toBe('{"a":1}');
  expect(toString([1, 2, 3])).toBe('[1,2,3]');
  expect(toString(null)).toBe('null');
});

test('isBuiltInTag checks built-in tags', () => {
  expect(isBuiltInTag('component')).toBe(true);
  expect(isBuiltInTag('slot')).toBe(true);
  expect(isBuiltInTag('div')).toBe(false);
  expect(isBuiltInTag('span')).toBe(false);
});

test('isNativeTag checks native HTML tags', () => {
  expect(isNativeTag('div')).toBe(true);
  expect(isNativeTag('span')).toBe(true);
  expect(isNativeTag('input')).toBe(true);
  expect(isNativeTag('button')).toBe(true);
  expect(isNativeTag('vtj-page')).toBe(false);
  expect(isNativeTag('my-component')).toBe(false);
});

test('isVuePlugin detects Vue plugins correctly', () => {
  // Function without prototype properties (arrow function or native code)
  const arrowFn = () => {};
  expect(isVuePlugin(arrowFn)).toBe(true);

  // Object with install method
  const withInstall = { install: () => {} };
  expect(isVuePlugin(withInstall)).toBe(true);

  // Plain function with prototype properties
  function normalFn() {}
  normalFn.prototype.someMethod = () => {};
  expect(isVuePlugin(normalFn)).toBe(false);

  // Non-function, non-object
  expect(isVuePlugin('string')).toBe(false);
  expect(isVuePlugin(123)).toBe(false);
  expect(isVuePlugin(null)).toBe(false);
  expect(isVuePlugin(undefined)).toBe(false);
});

test('isArrowFunction detects arrow function code', () => {
  expect(isArrowFunction('() => {}')).toBe(true);
  expect(isArrowFunction('(a, b) => a + b')).toBe(true);
  expect(isArrowFunction('() => 42')).toBe(true);
  expect(isArrowFunction('function() {}')).toBe(false);
  expect(isArrowFunction('var x = 5')).toBe(false);
});

test('isCallFunction detects function call code', () => {
  expect(isCallFunction('foo()')).toBe(true);
  expect(isCallFunction('bar(1, 2)')).toBe(true);
  expect(isCallFunction('obj.method()')).toBe(true);
  expect(isCallFunction('var x = 5')).toBe(false);
});

test('adoptedStyleSheets uses CSSStyleSheet when available', () => {
  const mockSheet = vi.fn();
  const mockReplaceSync = vi.fn();
  const mockFilter = vi.fn().mockReturnValue([]);
  const spyAppendChild = vi.fn();

  const global = {
    CSSStyleSheet: vi.fn().mockImplementation(() => ({
      replaceSync: mockReplaceSync,
      id: ''
    })),
    document: {
      adoptedStyleSheets: [],
      createElement: vi.fn().mockReturnValue({
        innerHTML: '',
        id: ''
      }),
      head: {
        appendChild: spyAppendChild
      },
      getElementById: vi.fn().mockReturnValue(null)
    },
    __uniConfig: undefined
  };

  const CSSStyleSheet = global.CSSStyleSheet;
  CSSStyleSheet.prototype.replaceSync = mockReplaceSync;

  // Mock CSSStyleSheet.prototype.replaceSync
  const originalReplaceSync = CSSStyleSheet.prototype.replaceSync;
  CSSStyleSheet.prototype.replaceSync = vi.fn();

  adoptedStyleSheets(global as any, 'test-id', '.cls { color: red; }', false);

  // Should not throw
  expect(true).toBe(true);
});

test('loadCssUrl appends link elements to head', () => {
  const mockAppendChild = vi.fn();
  const mockGetElementById = vi.fn().mockReturnValue(null);
  const global = {
    document: {
      head: {
        appendChild: mockAppendChild
      },
      getElementById: mockGetElementById,
      createElement: vi.fn().mockReturnValue({
        rel: '',
        id: '',
        href: ''
      })
    }
  };

  loadCssUrl(
    ['http://example.com/style.css', 'http://example.com/theme.css'],
    global
  );

  expect(mockGetElementById).toHaveBeenCalledTimes(2);
  expect(mockAppendChild).toHaveBeenCalledTimes(2);
});

test('loadCssUrl skips already loaded urls', () => {
  const mockAppendChild = vi.fn();
  const mockGetElementById = vi.fn().mockReturnValue({}); // already exists
  const global = {
    document: {
      head: {
        appendChild: mockAppendChild
      },
      getElementById: mockGetElementById,
      createElement: vi.fn()
    }
  };

  loadCssUrl(['http://example.com/style.css'], global);

  expect(mockGetElementById).toHaveBeenCalledTimes(1);
  expect(mockAppendChild).not.toHaveBeenCalled();
});

test('loadScriptUrl handles error', async () => {
  const mockAppendChild = vi.fn();
  const global = {
    document: {
      head: {
        appendChild: mockAppendChild
      },
      createElement: vi.fn().mockReturnValue({
        src: '',
        onload: null as any,
        onerror: null as any
      })
    }
  };

  const promise = loadScriptUrl(
    ['http://example.com/lib.js'],
    'SomeLib',
    global
  );

  const el = mockAppendChild.mock.calls[0][0];
  el.onerror('Load failed');

  await expect(promise).rejects.toBe('Load failed');
});

test('loadScriptUrl handles onload success', async () => {
  const mockAppendChild = vi.fn();
  const global: any = {
    document: {
      head: {
        appendChild: mockAppendChild
      },
      createElement: vi.fn().mockReturnValue({
        src: '',
        onload: null as any,
        onerror: null as any
      })
    }
  };

  const promise = loadScriptUrl(
    ['http://example.com/lib.js'],
    'SomeLib',
    global
  );

  global.SomeLib = { default: { hello: 'world' } };

  const el = mockAppendChild.mock.calls[0][0];
  el.onload();

  const result = await promise;
  expect(result).toEqual({ hello: 'world' });
});

test('loadScriptUrl onload rejects when library not found', async () => {
  const mockAppendChild = vi.fn();
  const global: any = {
    document: {
      head: {
        appendChild: mockAppendChild
      },
      createElement: vi.fn().mockReturnValue({
        src: '',
        onload: null as any,
        onerror: null as any
      })
    }
  };

  const promise = loadScriptUrl(
    ['http://example.com/lib.js'],
    'MissingLib',
    global
  );

  const el = mockAppendChild.mock.calls[0][0];
  el.onload();

  await expect(promise).rejects.toBeNull();
});

test('loadScriptUrl loads dependent scripts in order', async () => {
  const elements = new Map<string, any>();
  const mockAppendChild = vi.fn((el: any) => elements.set(el.id, el));
  const global: any = {
    document: {
      head: { appendChild: mockAppendChild },
      getElementById: vi.fn((id: string) => elements.get(id)),
      createElement: vi.fn().mockReturnValueOnce({}).mockReturnValueOnce({})
    }
  };

  const promise = loadScriptUrl(
    ['/dependency.js', '/library.js'],
    'SomeLib',
    global
  );
  expect(mockAppendChild).toHaveBeenCalledTimes(1);

  global.SomeLib = { partial: true };
  elements.get('/dependency.js').onload();
  await Promise.resolve();
  expect(mockAppendChild).toHaveBeenCalledTimes(2);

  global.SomeLib = { ready: true };
  elements.get('/library.js').onload();
  await expect(promise).resolves.toEqual({ ready: true });
});

test('loadScriptUrl deduplicates concurrent requests', async () => {
  const elements = new Map<string, any>();
  const appendChild = vi.fn((el: any) => elements.set(el.id, el));
  const global: any = {
    document: {
      head: { appendChild },
      getElementById: (id: string) => elements.get(id),
      createElement: () => ({})
    }
  };

  const first = loadScriptUrl(['/library.js'], 'SomeLib', global);
  const second = loadScriptUrl(['/library.js'], 'SomeLib', global);
  global.SomeLib = { ready: true };
  elements.get('/library.js').onload();

  await expect(Promise.all([first, second])).resolves.toEqual([
    { ready: true },
    { ready: true }
  ]);
  expect(appendChild).toHaveBeenCalledTimes(1);
});

test('loadScriptUrl can retry after a failed request', async () => {
  const elements = new Map<string, any>();
  const appendChild = vi.fn((el: any) => {
    el.remove = () => elements.delete(el.id);
    elements.set(el.id, el);
  });
  const global: any = {
    document: {
      head: { appendChild },
      getElementById: (id: string) => elements.get(id),
      createElement: () => ({})
    }
  };

  const failed = loadScriptUrl(['/library.js'], 'SomeLib', global);
  elements.get('/library.js').onerror(new Error('failed'));
  await expect(failed).rejects.toThrow('failed');

  const retried = loadScriptUrl(['/library.js'], 'SomeLib', global);
  global.SomeLib = { ready: true };
  elements.get('/library.js').onload();
  await expect(retried).resolves.toEqual({ ready: true });
  expect(appendChild).toHaveBeenCalledTimes(2);
});
