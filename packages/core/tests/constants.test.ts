import { expect, test } from 'vitest';
import {
  BUILT_IN_NAME,
  BUILT_IN_VUE,
  BUILT_IN_VUE_ROUTER,
  BUILT_IN_MATERIALS,
  BUILT_IN_LIBRARAY_MAP,
  BUILT_IN_COMPONENTS,
  BUILT_IN_TAGS,
  I18N_LOCALES
} from '../src';

test('BUILT_IN_NAME', () => {
  expect(BUILT_IN_NAME).toBe('BuiltIn');
});

test('BUILT_IN_VUE', () => {
  expect(BUILT_IN_VUE).toBe('VueMaterial');
});

test('BUILT_IN_VUE_ROUTER', () => {
  expect(BUILT_IN_VUE_ROUTER).toBe('VueRouterMaterial');
});

test('BUILT_IN_MATERIALS', () => {
  expect(BUILT_IN_MATERIALS).toEqual(['VueMaterial', 'VueRouterMaterial']);
});

test('BUILT_IN_LIBRARAY_MAP', () => {
  expect(BUILT_IN_LIBRARAY_MAP).toEqual({
    vue: 'Vue',
    'vue-router': 'VueRouter'
  });
});

test('BUILT_IN_COMPONENTS', () => {
  expect(BUILT_IN_COMPONENTS).toHaveProperty('VueMaterial');
  expect(BUILT_IN_COMPONENTS).toHaveProperty('VueRouterMaterial');
  expect(BUILT_IN_COMPONENTS['VueMaterial']).toContain('Transition');
  expect(BUILT_IN_COMPONENTS['VueRouterMaterial']).toContain('RouterView');
});

test('BUILT_IN_TAGS', () => {
  expect(BUILT_IN_TAGS).toContain('div');
  expect(BUILT_IN_TAGS).toContain('slot');
  expect(BUILT_IN_TAGS).toContain('template');
});

test('I18N_LOCALES', () => {
  expect(I18N_LOCALES).toHaveLength(2);
  expect(I18N_LOCALES[0].value).toBe('zh-CN');
  expect(I18N_LOCALES[1].value).toBe('en');
});
