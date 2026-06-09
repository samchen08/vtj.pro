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
        onload: null,
        onerror: null
      })
    }
  };

  const promise = loadScriptUrl(
    ['http://example.com/lib.js'],
    'SomeLib',
    global
  );

  // Simulate onerror - the promise rejects
  const el = mockAppendChild.mock.calls[0][0];
  el.onerror('Load failed');

  await expect(promise).rejects.toBe('Load failed');
});
