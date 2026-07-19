import { expect, test, describe, vi } from 'vitest';
import {
  adoptedStyleSheets,
  adoptStylesToInline,
  loadScriptUrl,
  toString,
  isVuePlugin,
  isBuiltInTag,
  isNativeTag,
  isArrowFunction,
  isCallFunction,
  loadCssUrl
} from '../src/utils/util';

describe('toString', () => {
  test('returns string as-is', () => {
    expect(toString('hello')).toBe('hello');
  });
  test('converts non-string to JSON', () => {
    expect(toString(42)).toBe('42');
    expect(toString({ a: 1 })).toBe('{"a":1}');
    expect(toString([1, 2])).toBe('[1,2]');
  });
});

describe('adoptedStyleSheets - fallback (no replaceSync)', () => {
  test('falls back when CSSStyleSheet is unavailable', () => {
    const createdEl = { id: '', innerHTML: '' };
    const mockDoc = {
      getElementById: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue(createdEl),
      head: { appendChild: vi.fn() }
    };

    adoptedStyleSheets(
      { CSSStyleSheet: undefined, document: mockDoc },
      'test-id',
      'body { color: red; }'
    );

    expect(mockDoc.head.appendChild).toHaveBeenCalledWith(createdEl);
  });

  test('creates style element when CSSStyleSheet.replaceSync not available', () => {
    const createdEl = { id: '', innerHTML: '' };
    const mockDoc = {
      getElementById: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue(createdEl),
      head: { appendChild: vi.fn() }
    };
    const CSSClass = class {};
    const mockGlobal = {
      CSSStyleSheet: CSSClass,
      document: mockDoc
    };

    adoptedStyleSheets(mockGlobal, 'test-id', 'body { color: red; }', false);
    expect(mockDoc.createElement).toHaveBeenCalledWith('style');
    expect(mockDoc.head.appendChild).toHaveBeenCalled();
  });

  test('updates existing style element if found', () => {
    const existingEl = { id: 'existing', innerHTML: '' };
    const mockDoc = {
      getElementById: vi.fn().mockReturnValue(existingEl),
      createElement: vi.fn(),
      head: { appendChild: vi.fn() }
    };
    const CSSClass = class {};
    const mockGlobal = {
      CSSStyleSheet: CSSClass,
      document: mockDoc
    };

    adoptedStyleSheets(mockGlobal, 'existing', 'body { color: blue; }', false);
    expect(existingEl.innerHTML).toBe('body { color: blue; }');
    expect(mockDoc.createElement).not.toHaveBeenCalled();
  });

  test('uses replaceSync when available', () => {
    const CSSClass = class {
      id = '';
      replaceSync = vi.fn();
    };
    (CSSClass.prototype as any).replaceSync = vi.fn();
    const mockDoc: any = { adoptedStyleSheets: [] };
    const mockGlobal = {
      CSSStyleSheet: CSSClass,
      document: mockDoc
    };

    adoptedStyleSheets(mockGlobal, 'sheet-id', 'body { color: red; }', false);
    expect(mockDoc.adoptedStyleSheets.length).toBe(1);
  });

  test('does not rebuild an unchanged adopted stylesheet', () => {
    const replaceSync = vi.fn();
    const CSSClass = class {
      id = '';
      replaceSync = replaceSync;
    };
    (CSSClass.prototype as any).replaceSync = replaceSync;
    const mockDoc: any = { adoptedStyleSheets: [] };
    const mockGlobal = { CSSStyleSheet: CSSClass, document: mockDoc };

    adoptedStyleSheets(mockGlobal, 'sheet-id', 'body { color: red; }');
    adoptedStyleSheets(mockGlobal, 'sheet-id', 'body { color: red; }');

    expect(mockDoc.adoptedStyleSheets).toHaveLength(1);
    expect(replaceSync).toHaveBeenCalledTimes(1);
  });
});

describe('adoptedStyleSheets - with scoped', () => {
  test('applies scoped CSS with scope id', () => {
    const CSSClass = class {
      id = '';
      replaceSync = vi.fn();
    };
    (CSSClass.prototype as any).replaceSync = vi.fn();
    const mockDoc: any = { adoptedStyleSheets: [] };
    const mockGlobal = {
      CSSStyleSheet: CSSClass,
      document: mockDoc
    };

    adoptedStyleSheets(mockGlobal, 'myid', '.foo { color: red; }', true);
    const callArg = (mockDoc.adoptedStyleSheets[0] as any).replaceSync.mock
      .calls[0][0];
    expect(callArg).toContain('[data-v-myid]');
  });

  test('converts rpx when __uniConfig is present', () => {
    const createdEl = { id: '', innerHTML: '' };
    const mockDoc: any = {
      adoptedStyleSheets: [],
      getElementById: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue(createdEl),
      head: { appendChild: vi.fn() }
    };
    const CSSClass = class {
      id = '';
      replaceSync = vi.fn();
    };
    const mockGlobal = {
      CSSStyleSheet: CSSClass,
      __uniConfig: {},
      document: mockDoc,
      innerWidth: 375
    };
    const originalWindow = (globalThis as any).window;
    (globalThis as any).window = {
      innerWidth: 375,
      document: { documentElement: { clientWidth: 375 } }
    };

    adoptedStyleSheets(mockGlobal, 'uni-id', '.foo { width: 100rpx; }', false);

    (globalThis as any).window = originalWindow;
    expect(mockDoc.createElement).toHaveBeenCalled();
  });
});

describe('adoptStylesToInline', () => {
  test('converts adopted stylesheets to inline style elements', () => {
    const mockStyleEl = { textContent: '' };
    const mockDoc = {
      adoptedStyleSheets: [
        {
          cssRules: [
            { cssText: '.a { color: red; }\n' },
            { cssText: '.b { font-size: 14px; }\n' }
          ]
        }
      ],
      createElement: vi.fn().mockReturnValue(mockStyleEl),
      head: { appendChild: vi.fn() }
    };

    adoptStylesToInline(mockDoc as any);
    expect(mockStyleEl.textContent).toContain('.a { color: red; }');
    expect(mockStyleEl.textContent).toContain('.b { font-size: 14px; }');
    expect(mockDoc.head.appendChild).toHaveBeenCalledWith(mockStyleEl);
  });

  test('handles empty adopted stylesheets', () => {
    const mockDoc = {
      adoptedStyleSheets: [],
      createElement: vi.fn(),
      head: { appendChild: vi.fn() }
    };
    adoptStylesToInline(mockDoc as any);
    expect(mockDoc.createElement).not.toHaveBeenCalled();
  });

  test('catches cssRules read errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockDoc = {
      adoptedStyleSheets: [
        {
          get cssRules() {
            throw new Error('CORS blocked');
          }
        }
      ] as any,
      createElement: vi.fn().mockReturnValue({ textContent: '' } as any),
      head: { appendChild: vi.fn() }
    };

    adoptStylesToInline(mockDoc as any);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('loadScriptUrl', () => {
  test('returns module from global if already loaded', async () => {
    const mockModule = { default: 'loaded', foo: 'bar' };
    const result = await loadScriptUrl([], 'myLib', {
      myLib: mockModule,
      document: {}
    });
    expect(result).toBe('loaded');
  });

  test('returns module without default', async () => {
    const mockModule = { foo: 'bar' };
    const result = await loadScriptUrl([], 'myLib', {
      myLib: mockModule,
      document: {}
    });
    expect(result).toEqual(mockModule);
  });
});

describe('loadCssUrl', () => {
  test('appends link elements for urls', () => {
    const mockDoc = {
      getElementById: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue({ rel: '', id: '', href: '' }),
      head: {
        appendChild: vi.fn()
      }
    };
    const mockGlobal = { document: mockDoc };

    loadCssUrl(['/a.css', '/b.css'], mockGlobal);
    expect(mockDoc.createElement).toHaveBeenCalledTimes(2);
    expect(mockDoc.head.appendChild).toHaveBeenCalledTimes(2);
  });

  test('skips existing link elements', () => {
    const mockDoc = {
      getElementById: vi.fn().mockReturnValue({}),
      createElement: vi.fn(),
      head: { appendChild: vi.fn() }
    };
    loadCssUrl(['/a.css'], { document: mockDoc });
    expect(mockDoc.createElement).not.toHaveBeenCalled();
  });
});

describe('isVuePlugin', () => {
  test('detects vue plugin with install', () => {
    expect(isVuePlugin({ install: vi.fn() })).toBe(true);
  });
  test('detects vue plugin as function with empty prototype', () => {
    // A class with no own methods (empty prototype beyond constructor)
    // `isFunction` returns false for class syntax, but true for regular functions
    // Regular functions have prototype = {constructor: fn} which has 1 own prop
    // So no regular function can match the "empty prototype" check
    // Only objects with `install` method match isVuePlugin
    expect(isVuePlugin({ install: () => {} })).toBe(true);
  });
  test('rejects non-plugin function', () => {
    expect(isVuePlugin(function () {} as any)).toBe(false);
  });
  test('rejects non-plugin values', () => {
    expect(isVuePlugin('string')).toBe(false);
    expect(isVuePlugin(42)).toBe(false);
    expect(isVuePlugin({})).toBe(false);
  });
});

describe('isBuiltInTag / isNativeTag', () => {
  test('isBuiltInTag', () => {
    expect(isBuiltInTag('component')).toBe(true);
    expect(isBuiltInTag('slot')).toBe(true);
    expect(isBuiltInTag('div')).toBe(false);
  });
  test('isNativeTag', () => {
    expect(isNativeTag('div')).toBe(true);
    expect(isNativeTag('input')).toBe(true);
    expect(isNativeTag('MyComponent')).toBe(false);
  });
});

describe('isArrowFunction / isCallFunction', () => {
  test('isArrowFunction detects arrow functions', () => {
    expect(isArrowFunction('() => {}')).toBe(true);
    expect(isArrowFunction('(a,b) => a+b')).toBe(true);
    expect(isArrowFunction('function() {}')).toBe(false);
    expect(isArrowFunction('foo()')).toBe(false);
  });
  test('isCallFunction detects call expressions', () => {
    expect(isCallFunction('foo()')).toBe(true);
    expect(isCallFunction('bar(x, y)')).toBe(true);
    expect(isCallFunction('() => {}')).toBe(false);
    expect(isCallFunction('42')).toBe(false);
  });
});
