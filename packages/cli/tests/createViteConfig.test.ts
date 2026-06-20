import { describe, expect, test } from 'vitest';
import {
  createViteConfig,
  createUniappViteConfig,
  createPluginViteConfig,
  envPlugin,
  copyPlugin,
  staticPlugin,
  rm,
  copy,
  readJson
} from '../src';
import { loadingPlugin } from '../src/plugins/loading';
import { reloadPlugin } from '../src/plugins/reload';

describe('createViteConfig', () => {
  test('默认配置可生成', () => {
    const config = createViteConfig({ debug: false });
    expect(config).toBeDefined();
    expect(typeof config === 'object' || typeof config === 'function').toBe(
      true
    );
  });

  test('自定义参数可覆盖默认值', () => {
    const config = createViteConfig({
      base: '/test/',
      port: 3000,
      debug: false
    }) as any;
    expect(config.base).toBe('/test/');
    expect(config.server?.port).toBe(3000);
  });

  test('watchModules 会生成 watch.ignored 配置', () => {
    const config = createViteConfig({
      watchModules: ['@vtj/core', '@vtj/ui'],
      debug: false
    }) as any;
    expect(config.server?.watch?.ignored).toBeDefined();
    expect(Array.isArray(config.server?.watch?.ignored)).toBe(true);
    expect(config.server.watch.ignored.length).toBe(2);
  });

  test('lib 模式会生成 lib 构建配置', () => {
    const config = createViteConfig({
      lib: true,
      entry: 'src/index.ts',
      library: 'MyLib',
      formats: ['es', 'umd'],
      debug: false
    }) as any;
    expect(config.build?.lib).toBeDefined();
    expect(config.build.lib.entry).toBe('src/index.ts');
    expect(config.build.lib.name).toBe('MyLib');
    expect(config.build.lib.formats).toEqual(['es', 'umd']);
  });

  test('loading 选项默认开启', () => {
    const config = createViteConfig({ debug: false }) as any;
    const hasLoading = config.plugins?.some(
      (p: any) => p.name === 'vtj-loading-plugin'
    );
    expect(hasLoading).toBe(true);
  });
});

describe('createUniappViteConfig', () => {
  test('默认配置可生成', () => {
    const config = createUniappViteConfig({ debug: false });
    expect(config).toBeDefined();
  });

  test('基础参数可覆盖', () => {
    const config = createUniappViteConfig({
      port: 8080,
      outDir: 'dist/custom',
      debug: false
    }) as any;
    expect(config.server?.port).toBe(8080);
  });
});

describe('createPluginViteConfig', () => {
  test('默认配置可生成', () => {
    const config = createPluginViteConfig({ debug: false });
    expect(config).toBeDefined();
  });
});

describe('loadingPlugin', () => {
  test('在 HTML head 中注入加载样式', () => {
    const plugin = loadingPlugin();
    expect(plugin.name).toBe('vtj-loading-plugin');
    expect(typeof plugin.transformIndexHtml).toBe('function');
  });

  test('transformIndexHtml 注入 style/mask/script', () => {
    const plugin = loadingPlugin();
    const html = '<html><head></head><body></body></html>';
    const result = (plugin.transformIndexHtml as Function)(html);
    expect(result).toContain('<style>');
    expect(result).toContain('vtj-ide-loading');
    expect(result).toContain('<script>');
    expect(result).not.toContain('<head></head>');
    expect(result).not.toContain('<body></body>');
  });
});

describe('reloadPlugin', () => {
  test('在 HTML 中注入热更新脚本', () => {
    const plugin = reloadPlugin();
    expect(plugin.name).toBe('reload-version');
    expect(typeof plugin.transformIndexHtml).toBe('function');
  });

  test('transformIndexHtml 注入 __BUILD_TIME__ 变量', () => {
    const plugin = reloadPlugin();
    const html = '<html><head><title>Test</title></head><body></body></html>';
    const result = (plugin.transformIndexHtml as Function)(html);
    expect(result).toContain('__BUILD_TIME__');
    expect(result).toContain('top.location.reload');
  });
});

describe('envPlugin', () => {
  test('envPlugin 返回 Vite 插件对象', () => {
    const plugin = envPlugin();
    expect(plugin.name).toBe('vtj-env-plugin');
    expect(typeof plugin.config).toBe('function');
  });
});

describe('copyPlugin', () => {
  test('copyPlugin 返回 Vite 插件对象', () => {
    const plugin = copyPlugin();
    expect(plugin.name).toBe('vtj-copy-plugin');
    expect(plugin.apply).toBe('build');
  });

  test('copyPlugin 接受配置选项', () => {
    const plugin = copyPlugin([{ from: 'src/assets', to: 'dist/assets' }]);
    expect(plugin).toBeDefined();
  });
});

describe('staticPlugin', () => {
  test('staticPlugin 返回 Vite 插件对象', () => {
    const plugin = staticPlugin();
    expect(plugin.name).toBe('vtj-static-server');
  });

  test('staticPlugin 接受字符串路径数组', () => {
    const plugin = staticPlugin(['public']);
    expect(plugin).toBeDefined();
  });
});

describe('工具函数', () => {
  test('rm 是函数', () => {
    expect(typeof rm).toBe('function');
  });

  test('copy 是函数', () => {
    expect(typeof copy).toBe('function');
  });

  test('readJson 是函数', () => {
    expect(typeof readJson).toBe('function');
  });
});
