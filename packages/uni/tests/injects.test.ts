import { describe, expect, test } from 'vitest';
import { injectUniFeatures, injectUniConfig } from '../src';

describe('injectUniFeatures', () => {
  test('注入默认功能开关到 global 对象', () => {
    const global: Record<string, any> = {};
    injectUniFeatures(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any
      },
      global
    );
    expect(global.__VUE_OPTIONS_API__).toBe(true);
    expect(global.__VUE_PROD_DEVTOOLS__).toBe(false);
    expect(global.__UNI_FEATURE_TABBAR__).toBe(false);
    expect(global.__UNI_FEATURE_PAGES__).toBe(false);
    expect(global.__UNI_FEATURE_PULL_DOWN_REFRESH__).toBe(false);
    expect(global.__UNI_FEATURE_NAVIGATIONBAR__).toBe(false);
    expect(global.__UNI_FEATURE_ROUTER_MODE__).toBe('hash');
  });

  test('根据 pagesJson 正确设置 TABBAR', () => {
    const global: Record<string, any> = {};
    injectUniFeatures(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any,
        pagesJson: {
          tabBar: {
            list: [{ pagePath: 'pages/index', text: '首页' }]
          }
        }
      },
      global
    );
    expect(global.__UNI_FEATURE_TABBAR__).toBe(true);
  });

  test('根据 pagesJson 正确设置 PAGES', () => {
    const global: Record<string, any> = {};
    injectUniFeatures(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any,
        pagesJson: {
          pages: [{ path: 'pages/index' }]
        }
      },
      global
    );
    expect(global.__UNI_FEATURE_PAGES__).toBe(true);
  });

  test('根据 globalStyle.navigationStyle=custom 检测导航栏隐藏', () => {
    const global: Record<string, any> = {};
    injectUniFeatures(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any,
        pagesJson: {
          globalStyle: { navigationStyle: 'custom' }
        }
      },
      global
    );
    expect(global.__UNI_FEATURE_NAVIGATIONBAR__).toBe(false);
  });

  test('根据 router.mode 正确设置 ROUTER_MODE', () => {
    const global: Record<string, any> = {};
    injectUniFeatures(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any,
        manifestJson: {
          h5: { router: { mode: 'history' } }
        }
      },
      global
    );
    expect(global.__UNI_FEATURE_ROUTER_MODE__).toBe('history');
  });
});

describe('injectUniConfig', () => {
  test('注入默认配置到 global 对象', () => {
    const global: Record<string, any> = {};
    injectUniConfig(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any
      },
      global
    );
    expect(global.__uniConfig).toBeDefined();
    expect(global.__uniConfig.appId).toBe('');
    expect(global.__uniConfig.compilerVersion).toBeTypeOf('string');
    expect(global.__uniConfig.router.mode).toBe('hash');
    expect(global.__uniConfig.tabBar).toBeUndefined();
  });

  test('自定义 manifestJson 能覆盖默认配置', () => {
    const global: Record<string, any> = {};
    injectUniConfig(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any,
        manifestJson: {
          appid: 'test-app-id',
          name: 'TestApp',
          versionName: '2.0.0',
          h5: { router: { mode: 'history', base: '/app/' } }
        }
      },
      global
    );
    expect(global.__uniConfig.appId).toBe('test-app-id');
    expect(global.__uniConfig.appName).toBe('TestApp');
    expect(global.__uniConfig.appVersion).toBe('2.0.0');
    expect(global.__uniConfig.router.mode).toBe('history');
    expect(global.__uniConfig.router.routerBase).toBe('/app/');
  });

  test('tabBar 配置正确注入', () => {
    const global: Record<string, any> = {};
    injectUniConfig(
      {
        Vue: null as any,
        App: null as any,
        UniH5: null as any,
        pagesJson: {
          tabBar: {
            list: [{ pagePath: 'pages/index', text: '首页' }],
            color: '#333333'
          }
        }
      },
      global
    );
    expect(global.__uniConfig.tabBar).toBeDefined();
    expect(global.__uniConfig.tabBar.list).toHaveLength(1);
    expect(global.__uniConfig.tabBar.color).toBe('#333333');
    expect(global.__uniConfig.tabBar.shown).toBe(true);
  });
});
