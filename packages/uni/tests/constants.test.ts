import { describe, expect, test } from 'vitest';
import {
  APP_LIFE_CYCLE,
  COMPONENT_LIFE_CYCLES_LIST,
  UNI_COMPOSITION_HOOKS_LIST,
  UNI_HOOKS,
  PAGE_LIFE_CYCLES_LIST,
  UNI_PAGE_HOOKS_LIST,
  ROUTE_PAGE_BASE_PATH
} from '../src';

describe('constants', () => {
  test('APP_LIFE_CYCLE 包含 uni-app 应用级生命周期', () => {
    expect(APP_LIFE_CYCLE).toContain('onLaunch');
    expect(APP_LIFE_CYCLE).toContain('onShow');
    expect(APP_LIFE_CYCLE).toContain('onHide');
    expect(APP_LIFE_CYCLE).toContain('onError');
    expect(APP_LIFE_CYCLE).toContain('onExit');
  });

  test('COMPONENT_LIFE_CYCLES_LIST 包含 Vue Options 生命周期', () => {
    expect(COMPONENT_LIFE_CYCLES_LIST).toContain('created');
    expect(COMPONENT_LIFE_CYCLES_LIST).toContain('mounted');
    expect(COMPONENT_LIFE_CYCLES_LIST).toContain('unmounted');
    expect(COMPONENT_LIFE_CYCLES_LIST.length).toBe(8);
  });

  test('UNI_COMPOSITION_HOOKS_LIST 包含 Vue Composition 生命周期钩子', () => {
    expect(UNI_COMPOSITION_HOOKS_LIST).toContain('onMounted');
    expect(UNI_COMPOSITION_HOOKS_LIST).toContain('onUnmounted');
    expect(UNI_COMPOSITION_HOOKS_LIST).toContain('onBeforeUnmount');
    expect(UNI_COMPOSITION_HOOKS_LIST.length).toBe(6);
  });

  test('UNI_HOOKS 包含 uni-app 页面特有钩子', () => {
    expect(UNI_HOOKS).toContain('onLoad');
    expect(UNI_HOOKS).toContain('onShow');
    expect(UNI_HOOKS).toContain('onReady');
    expect(UNI_HOOKS).toContain('onPullDownRefresh');
    expect(UNI_HOOKS).toContain('onReachBottom');
    expect(UNI_HOOKS).toContain('onBackPress');
    expect(UNI_HOOKS).toContain('onPageScroll');
    expect(UNI_HOOKS.length).toBeGreaterThan(10);
  });

  test('PAGE_LIFE_CYCLES_LIST 合并了 UNI_HOOKS 和 COMPONENT_LIFE_CYCLES_LIST', () => {
    expect(PAGE_LIFE_CYCLES_LIST).toEqual([
      ...UNI_HOOKS,
      ...COMPONENT_LIFE_CYCLES_LIST
    ]);
  });

  test('UNI_PAGE_HOOKS_LIST 合并了 UNI_HOOKS 和 UNI_COMPOSITION_HOOKS_LIST', () => {
    expect(UNI_PAGE_HOOKS_LIST).toEqual([
      ...UNI_HOOKS,
      ...UNI_COMPOSITION_HOOKS_LIST
    ]);
  });

  test('ROUTE_PAGE_BASE_PATH 为 /pages', () => {
    expect(ROUTE_PAGE_BASE_PATH).toBe('/pages');
  });
});
