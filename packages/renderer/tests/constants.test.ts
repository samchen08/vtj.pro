import { expect, test } from 'vitest';
import {
  ContextMode,
  CONTEXT_HOST,
  LIFE_CYCLES_LIST,
  COMPOSITION_HOOKS_LIST,
  BUILT_IN_DIRECTIVES,
  DATA_TYPES,
  PAGE_ROUTE_NAME,
  HOMEPAGE_ROUTE_NAME,
  HTML_TAGS,
  BUILD_IN_TAGS,
  REMOTE,
  ACCESS
} from '../src';

test('ContextMode enum values', () => {
  expect(ContextMode.Runtime).toBe('Runtime');
  expect(ContextMode.Design).toBe('Design');
  expect(ContextMode.Raw).toBe('Raw');
  expect(ContextMode.VNode).toBe('VNode');
});

test('CONTEXT_HOST contains expected Vue instance properties', () => {
  expect(CONTEXT_HOST).toContain('$el');
  expect(CONTEXT_HOST).toContain('$emit');
  expect(CONTEXT_HOST).toContain('$nextTick');
  expect(CONTEXT_HOST).toContain('$parent');
  expect(CONTEXT_HOST).toContain('$root');
  expect(CONTEXT_HOST).toContain('$attrs');
  expect(CONTEXT_HOST).toContain('$slots');
  expect(CONTEXT_HOST).toContain('$watch');
  expect(CONTEXT_HOST).toContain('$props');
  expect(CONTEXT_HOST).toContain('$options');
  expect(CONTEXT_HOST).toContain('$forceUpdate');
  expect(CONTEXT_HOST).toHaveLength(11);
});

test('LIFE_CYCLES_LIST contains Vue Options API lifecycle hooks', () => {
  expect(LIFE_CYCLES_LIST).toContain('beforeCreate');
  expect(LIFE_CYCLES_LIST).toContain('created');
  expect(LIFE_CYCLES_LIST).toContain('beforeMount');
  expect(LIFE_CYCLES_LIST).toContain('mounted');
  expect(LIFE_CYCLES_LIST).toContain('beforeUpdate');
  expect(LIFE_CYCLES_LIST).toContain('updated');
  expect(LIFE_CYCLES_LIST).toContain('beforeUnmount');
  expect(LIFE_CYCLES_LIST).toContain('unmounted');
  expect(LIFE_CYCLES_LIST).toContain('errorCaptured');
  expect(LIFE_CYCLES_LIST).toContain('renderTracked');
  expect(LIFE_CYCLES_LIST).toContain('renderTriggered');
  expect(LIFE_CYCLES_LIST).toContain('activated');
  expect(LIFE_CYCLES_LIST).toContain('deactivated');
  expect(LIFE_CYCLES_LIST).toHaveLength(13);
});

test('COMPOSITION_HOOKS_LIST contains Vue Composition API lifecycle hooks', () => {
  expect(COMPOSITION_HOOKS_LIST).toContain('onBeforeMount');
  expect(COMPOSITION_HOOKS_LIST).toContain('onMounted');
  expect(COMPOSITION_HOOKS_LIST).toContain('onBeforeUpdate');
  expect(COMPOSITION_HOOKS_LIST).toContain('onUpdated');
  expect(COMPOSITION_HOOKS_LIST).toContain('onBeforeUnmount');
  expect(COMPOSITION_HOOKS_LIST).toContain('onUnmounted');
  expect(COMPOSITION_HOOKS_LIST).toContain('onErrorCaptured');
  expect(COMPOSITION_HOOKS_LIST).toContain('onRenderTracked');
  expect(COMPOSITION_HOOKS_LIST).toContain('onRenderTriggered');
  expect(COMPOSITION_HOOKS_LIST).toContain('onActivated');
  expect(COMPOSITION_HOOKS_LIST).toContain('onDeactivated');
  expect(COMPOSITION_HOOKS_LIST).toHaveLength(11);
});

test('BUILT_IN_DIRECTIVES contains expected directives', () => {
  expect(BUILT_IN_DIRECTIVES).toContain('vIf');
  expect(BUILT_IN_DIRECTIVES).toContain('vElseIf');
  expect(BUILT_IN_DIRECTIVES).toContain('vElse');
  expect(BUILT_IN_DIRECTIVES).toContain('vShow');
  expect(BUILT_IN_DIRECTIVES).toContain('vModel');
  expect(BUILT_IN_DIRECTIVES).toContain('vFor');
  expect(BUILT_IN_DIRECTIVES).toContain('vBind');
  expect(BUILT_IN_DIRECTIVES).toContain('vHtml');
  expect(BUILT_IN_DIRECTIVES).toHaveLength(8);
});

test('DATA_TYPES maps correctly', () => {
  expect(DATA_TYPES.String).toBe(String);
  expect(DATA_TYPES.Number).toBe(Number);
  expect(DATA_TYPES.Boolean).toBe(Boolean);
  expect(DATA_TYPES.Array).toBe(Array);
  expect(DATA_TYPES.Object).toBe(Object);
  expect(DATA_TYPES.Function).toBe(Function);
  expect(DATA_TYPES.Date).toBe(Date);
});

test('route name constants', () => {
  expect(PAGE_ROUTE_NAME).toBe('VtjPage');
  expect(HOMEPAGE_ROUTE_NAME).toBe('VtjHomepage');
});

test('HTML_TAGS contains common HTML elements', () => {
  expect(HTML_TAGS).toContain('div');
  expect(HTML_TAGS).toContain('span');
  expect(HTML_TAGS).toContain('input');
  expect(HTML_TAGS).toContain('button');
  expect(HTML_TAGS).toContain('a');
  expect(HTML_TAGS).toContain('img');
  expect(HTML_TAGS).toContain('table');
  expect(HTML_TAGS).toContain('svg');
  expect(HTML_TAGS).toContain('template');
  expect(HTML_TAGS.includes('html')).toBe(true);
  expect(HTML_TAGS.includes('body')).toBe(true);
});

test('BUILD_IN_TAGS contains built-in template tags', () => {
  expect(BUILD_IN_TAGS).toContain('component');
  expect(BUILD_IN_TAGS).toContain('slot');
  expect(BUILD_IN_TAGS).toHaveLength(2);
});

test('REMOTE is a valid URL', () => {
  expect(REMOTE).toBe('https://app.vtj.pro');
});

test('ACCESS constants', () => {
  expect(ACCESS.auth).toBe('https://app.vtj.pro/auth.html');
  // storageKey is obfuscated, just check it's a non-empty string
  expect(ACCESS.storageKey.length).toBeGreaterThan(0);
  expect(ACCESS.privateKey).toBeTruthy();
  expect(typeof ACCESS.privateKey).toBe('string');
});
