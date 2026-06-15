import { describe, expect, test } from 'vitest';
import {
  version,
  APP_LIFE_CYCLE,
  COMPONENT_LIFE_CYCLES_LIST,
  UNI_COMPOSITION_HOOKS_LIST,
  UNI_HOOKS,
  PAGE_LIFE_CYCLES_LIST,
  UNI_PAGE_HOOKS_LIST,
  ROUTE_PAGE_BASE_PATH,
  MANIFEST_JSON,
  PAGES_JSON,
  toKebabCase,
  mergeOptions,
  getNavigationBar,
  getGobalStyle,
  getFileId,
  loading,
  notify,
  alert,
  injectUniFeatures,
  injectUniConfig,
  injectUniGlobal,
  injectUniCSS,
  injectUniRoutes,
  setupUniApp,
  createUniAppComponent,
  createUniLoader,
  createUniRoutes,
  install
} from '../src';

describe('exports', () => {
  test('version 是字符串', () => {
    expect(typeof version).toBe('string');
  });

  test('默认 JSON 配置可导入', () => {
    expect(MANIFEST_JSON).toBeDefined();
    expect(MANIFEST_JSON.name).toBe('VTJ');
    expect(PAGES_JSON).toBeDefined();
    expect(PAGES_JSON.globalStyle).toBeDefined();
  });

  test('工具函数全部可导入且为函数', () => {
    expect(typeof toKebabCase).toBe('function');
    expect(typeof mergeOptions).toBe('function');
    expect(typeof getNavigationBar).toBe('function');
    expect(typeof getGobalStyle).toBe('function');
    expect(typeof getFileId).toBe('function');
  });

  test('shared 工具可导入', () => {
    expect(typeof loading).toBe('function');
    expect(typeof notify).toBe('function');
    expect(typeof alert).toBe('function');
  });

  test('injects 函数全部可导入', () => {
    expect(typeof injectUniFeatures).toBe('function');
    expect(typeof injectUniConfig).toBe('function');
    expect(typeof injectUniGlobal).toBe('function');
    expect(typeof injectUniCSS).toBe('function');
    expect(typeof injectUniRoutes).toBe('function');
  });

  test('setup 函数全部可导入', () => {
    expect(typeof setupUniApp).toBe('function');
    expect(typeof createUniAppComponent).toBe('function');
    expect(typeof createUniLoader).toBe('function');
    expect(typeof createUniRoutes).toBe('function');
    expect(typeof install).toBe('function');
  });
});
