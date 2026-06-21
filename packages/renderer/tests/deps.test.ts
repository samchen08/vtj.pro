import { expect, test, describe, vi } from 'vitest';
import {
  fillBasePath,
  isCSSUrl,
  isJSUrl,
  isJSON,
  createAssetScripts,
  createAssetsCss,
  removeProdFlag,
  parseDeps,
  getRawComponent,
  parseUrls
} from '../src/utils/deps';

test('fillBasePath fills base path for relative URLs', () => {
  const urls = ['a.js', 'b.css', 'c.json'];
  const result = fillBasePath(urls, 'https://cdn.example.com/');
  expect(result).toEqual([
    'https://cdn.example.com/a.js',
    'https://cdn.example.com/b.css',
    'https://cdn.example.com/c.json'
  ]);
});

test('fillBasePath does not modify absolute URLs', () => {
  const urls = ['/lib.js', 'https://cdn.example.com/lib.js'];
  const result = fillBasePath(urls, './');
  expect(result).toEqual([urls[0], urls[1]]);
});

test('isCSSUrl checks CSS URLs', () => {
  expect(isCSSUrl('style.css')).toBe(true);
  expect(isCSSUrl('style.min.css')).toBe(true);
  expect(isCSSUrl('script.js')).toBe(false);
  expect(isCSSUrl('data.json')).toBe(false);
});

test('isJSUrl checks JS URLs', () => {
  expect(isJSUrl('script.js')).toBe(true);
  expect(isJSUrl('bundle.min.js')).toBe(true);
  expect(isJSUrl('style.css')).toBe(false);
  expect(isJSUrl('data.json')).toBe(false);
});

test('isJSON checks JSON URLs', () => {
  expect(isJSON('data.json')).toBe(true);
  expect(isJSON('config.json')).toBe(true);
  expect(isJSON('script.js')).toBe(false);
  expect(isJSON('style.css')).toBe(false);
});

test('createAssetScripts generates script tags', () => {
  const result = createAssetScripts(['a.js', 'b.js']);
  expect(result).toContain('<script src=');
  expect(result).toContain('a.js');
  expect(result).toContain('b.js');
  expect(result).toContain('v=');
});

test('createAssetsCss generates link tags', () => {
  const result = createAssetsCss(['a.css', 'b.css']);
  expect(result).toContain('<link rel="stylesheet" href=');
  expect(result).toContain('a.css');
  expect(result).toContain('b.css');
  expect(result).toContain('v=');
});

test('createAssetsCss handles empty array', () => {
  expect(createAssetsCss([])).toBe('');
});

test('removeProdFlag removes .prod.js in dev mode', () => {
  expect(removeProdFlag('lib.prod.js', true)).toBe('lib.js');
  expect(removeProdFlag('lib.prod.js', false)).toBe('lib.prod.js');
  expect(removeProdFlag('lib.dev.js', true)).toBe('lib.dev.js');
});

test('parseDeps parses dependencies correctly', () => {
  const deps = [
    {
      enabled: true,
      urls: ['vue.js', 'vue.css'],
      library: 'Vue',
      assetsUrl: 'assets.json',
      assetsLibrary: 'VueAssets',
      localeLibrary: 'VueLocale'
    },
    {
      enabled: true,
      urls: ['element-ui.js', 'element-ui.css'],
      library: 'ElementUI'
    },
    {
      enabled: false,
      urls: ['unused.js'],
      library: 'Unused'
    }
  ];

  const result = (parseDeps as any)(deps, './lib/', false);

  expect(result.scripts).toContain('./lib/vue.js');
  expect(result.scripts).toContain('./lib/element-ui.js');
  expect(result.css).toContain('./lib/vue.css');
  expect(result.css).toContain('./lib/element-ui.css');
  expect(result.libraryExports).toEqual(['Vue', 'ElementUI']);
  expect(result.materialExports).toContain('VueAssets');
  expect(result.materials).toContain('./lib/assets.json');
  expect(result.libraryMap).toHaveProperty('Vue');
  expect(result.libraryLocaleMap).toHaveProperty('Vue', 'VueLocale');
  expect(result.materialMapLibrary).toHaveProperty('VueAssets', 'Vue');
});

test('parseDeps removes prod flag in dev mode', () => {
  const deps = [
    {
      enabled: true,
      urls: ['lib.prod.js'],
      library: 'Lib'
    }
  ];

  const result = (parseDeps as any)(deps, './', true);
  expect(result.scripts).toContain('./lib.js');
});

test('getRawComponent gets component from library', () => {
  const lib: any = {
    Parent: {
      Child: vi.fn()
    },
    Direct: vi.fn()
  };

  // With parent
  expect(
    getRawComponent({ name: 'Child', parent: 'Parent', alias: '' }, lib)
  ).toBe(lib.Parent.Child);

  // Without parent
  expect(getRawComponent({ name: 'Direct', parent: '', alias: '' }, lib)).toBe(
    lib.Direct
  );

  // With alias
  lib.Parent.Renamed = vi.fn();
  expect(
    getRawComponent({ name: 'Child', parent: 'Parent', alias: 'Renamed' }, lib)
  ).toBe(lib.Parent.Renamed);
});

test('parseUrls separates CSS and JS URLs', () => {
  const urls = ['a.js', 'b.css', 'c.js', 'd.css'];
  const result = parseUrls(urls);
  expect(result.css).toEqual(['b.css', 'd.css']);
  expect(result.js).toEqual(['a.js', 'c.js']);
});

test('parseUrls handles empty input', () => {
  const result = parseUrls([]);
  expect(result.css).toEqual([]);
  expect(result.js).toEqual([]);
});
