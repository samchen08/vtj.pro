import { describe, expect, test } from 'vitest';
import {
  VTJ_ICONS_VERSION,
  icons,
  IconsPlugin,
  VtjIconSetting,
  VtjIconSave,
  VtjIconClose,
  Setting
} from '../src';

describe('exports', () => {
  test('VTJ_ICONS_VERSION 是字符串', () => {
    expect(typeof VTJ_ICONS_VERSION).toBe('string');
  });

  test('IconsPlugin 是函数', () => {
    expect(typeof IconsPlugin).toBe('function');
  });
});

describe('icons 对象', () => {
  test('包含 Vtj 自研图标', () => {
    expect(icons.VtjIconSetting).toBeDefined();
    expect(icons.VtjIconSave).toBeDefined();
    expect(icons.VtjIconClose).toBeDefined();
  });

  test('包含 ElementPlus 图标', () => {
    expect(icons.Setting).toBeDefined();
    expect(icons.Edit).toBeDefined();
    expect(icons.Delete).toBeDefined();
  });

  test('图标组件数量大于 100', () => {
    expect(Object.keys(icons).length).toBeGreaterThan(100);
  });
});

describe('具名导出图标组件', () => {
  test('Vtj 图标组件具名导出存在', () => {
    expect(VtjIconSetting).toBeDefined();
    expect(VtjIconSetting.name).toBe('VtjIconSetting');
    expect(VtjIconSave).toBeDefined();
    expect(VtjIconClose).toBeDefined();
  });

  test('ElementPlus 图标组件具名导出存在', () => {
    expect(Setting).toBeDefined();
    expect(Setting.name).toBe('Setting');
  });
});
