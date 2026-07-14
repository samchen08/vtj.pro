import { expect, test, describe, vi, beforeEach } from 'vitest';
import { initI18n } from '../src/provider/i18n';
import { loadEnhance } from '../src/provider/enhance';

vi.mock('../src/utils', async () => {
  const actual = await vi.importActual('../src/utils');
  return {
    ...actual,
    parseUrls: (urls: string[]) => {
      const css = urls.filter((u: string) => u.endsWith('.css'));
      const js = urls.filter((u: string) => u.endsWith('.js'));
      return { css, js };
    },
    loadCssUrl: vi.fn(),
    loadScriptUrl: vi.fn()
  };
});

describe('initI18n', () => {
  test('returns early when params missing', () => {
    const app = { use: vi.fn() } as any;
    expect(() => initI18n(null as any, {}, {} as any)).not.toThrow();
    expect(() => initI18n(app, null as any, {} as any)).not.toThrow();
    expect(() => initI18n(app, {}, null as any)).not.toThrow();
    expect(() => initI18n(app, {}, undefined)).not.toThrow();
  });

  test('returns early when VueI18n not in libs', () => {
    const app = { use: vi.fn() } as any;
    initI18n(
      app,
      {},
      { locale: 'zh-CN', fallbackLocale: 'zh-CN', messages: [] }
    );
    expect(app.use).not.toHaveBeenCalled();
  });

  test('initializes VueI18n when available', () => {
    const useSpy = vi.fn();
    const app = { use: useSpy } as any;
    const createI18nSpy = vi.fn().mockReturnValue({ install: vi.fn() });
    const VueI18n = { createI18n: createI18nSpy };
    const libs = { VueI18n };

    const i18n: any = {
      locale: 'en',
      fallbackLocale: 'en',
      messages: [
        { key: 'hello', en: 'Hello', 'zh-CN': '你好' },
        { key: 'bye', en: 'Bye', 'zh-CN': '再见' }
      ]
    };

    initI18n(app, libs, i18n);
    expect(createI18nSpy).toHaveBeenCalled();
    expect(app.use).toHaveBeenCalled();
  });

  test('properly builds messages structure', () => {
    const useSpy = vi.fn();
    const app = { use: useSpy } as any;
    const createI18nSpy = vi.fn().mockReturnValue({ install: vi.fn() });
    const VueI18n = { createI18n: createI18nSpy };
    const libs = { VueI18n };

    const i18n: any = {
      locale: 'zh-CN',
      fallbackLocale: 'zh-CN',
      messages: [{ key: 'hello', en: 'Hello', 'zh-CN': '你好' }]
    };

    initI18n(app, libs, i18n);
    const callArg = createI18nSpy.mock.calls[0][0];
    expect(callArg.messages).toEqual({
      en: { hello: 'Hello' },
      'zh-CN': { hello: '你好' }
    });
  });
});

describe('loadEnhance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('handles empty/undefined config', async () => {
    const result = await loadEnhance(undefined as any);
    expect(result).toBeUndefined();
  });

  test('loads only css urls', async () => {
    const result = await loadEnhance({
      name: 'lib',
      urls: ['/style.css']
    });
    expect(result).toBeUndefined();
  });

  test('loads js urls and returns enhance function', async () => {
    const { loadScriptUrl } = await import('../src/utils');
    const mockFn = vi.fn();
    (loadScriptUrl as any).mockResolvedValue(mockFn);

    const result = await loadEnhance({
      name: 'myLib',
      urls: ['/lib.js']
    });

    expect(result).toBe(mockFn);
  });

  test('handles js load failure', async () => {
    const { loadScriptUrl } = await import('../src/utils');
    (loadScriptUrl as any).mockRejectedValue(new Error('Failed'));

    const result = await loadEnhance({
      name: 'badLib',
      urls: ['/bad.js']
    });

    expect(result).toBeUndefined();
  });

  test('prepends base path to urls', async () => {
    const { loadScriptUrl } = await import('../src/utils');
    (loadScriptUrl as any).mockResolvedValue(() => {});

    await loadEnhance(
      {
        name: 'lib',
        urls: ['/script.js']
      },
      '/base'
    );

    expect(loadScriptUrl).toHaveBeenCalledWith(['/base/script.js'], 'lib');
  });
});
