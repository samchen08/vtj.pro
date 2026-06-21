import { expect, test, describe, vi, beforeEach } from 'vitest';
import { Access } from '../src/plugins/access';
import { ContextMode } from '../src/constants';

test('Access constructor sets default options', () => {
  const access = new Access({});
  expect(access.options.authKey).toBe('Authorization');
  expect(access.options.session).toBe(false);
  expect(access.options.unauthorizedCode).toBe(401);
});

test('Access constructor merges custom options', () => {
  const access = new Access({ authKey: 'Custom-Auth', session: true });
  expect(access.options.authKey).toBe('Custom-Auth');
  expect(access.options.session).toBe(true);
});

test('Access.login stores access data', () => {
  const access = new Access({});
  access.login({ token: 'abc123', permissions: { page1: true } });
  expect(access.getToken()).toBe('abc123');
  expect(access.isLogined()).toBe(true);
});

test('Access.login handles string data', () => {
  const access = new Access({});
  access.login('{"token":"xyz","permissions":{}}');
  expect(access.getToken()).toBe('xyz');
});

test('Access.clear removes access data', () => {
  const access = new Access({});
  access.login({ token: 'abc', permissions: {} });
  expect(access.isLogined()).toBe(true);
  access.clear();
  expect(access.isLogined()).toBe(false);
});

test('Access.logout clears data and redirects', () => {
  const access = new Access({ auth: undefined }); // no auth redirect
  access.login({ token: 'abc', permissions: {} });
  access.logout();
  expect(access.isLogined()).toBe(false);
});

test('Access.can checks single permission', () => {
  const access = new Access({});
  access.login({ token: 'abc', permissions: { 'page.edit': true } });
  expect(access.can('page.edit')).toBe(true);
  expect(access.can('page.delete')).toBe(false);
});

test('Access.can checks multiple permissions with AND', () => {
  const access = new Access({});
  access.login({
    token: 'abc',
    permissions: { 'page.edit': true, 'page.view': true }
  });
  expect(access.can(['page.edit', 'page.view'])).toBe(true);
  expect(access.can(['page.edit', 'page.delete'])).toBe(false);
});

test('Access.can checks with appName prefix', () => {
  const access = new Access({ appName: 'myapp' });
  access.login({ token: 'abc', permissions: { 'myapp.page.edit': true } });
  expect(access.can('page.edit')).toBe(true);
});

test('Access.can handles function predicate', () => {
  const access = new Access({});
  access.login({ token: 'abc', permissions: { admin: true } });
  expect(access.can((p) => p.admin === true)).toBe(true);
  expect(access.can((p) => p.admin === false)).toBe(false);
});

test('Access.some checks permissions with OR logic', () => {
  const access = new Access({});
  access.login({
    token: 'abc',
    permissions: { 'page.edit': true, 'page.delete': false }
  });
  expect(access.some(['page.edit', 'page.delete'])).toBe(true);
  expect(access.some(['page.delete', 'page.create'])).toBe(false);
});

test('Access.connect sets guard and request interceptors', () => {
  const access = new Access({});
  const mockRouter = { beforeEach: vi.fn() };
  const mockRequest = {
    useRequest: vi.fn(),
    useResponse: vi.fn()
  };
  access.connect({ router: mockRouter as any, request: mockRequest as any });
  expect(mockRouter.beforeEach).toHaveBeenCalled();
  expect(mockRequest.useRequest).toHaveBeenCalled();
  expect(mockRequest.useResponse).toHaveBeenCalled();
});

test('Access.enableIntercept and disableIntercept', () => {
  const access = new Access({});
  access.disableIntercept();
  expect((access as any).interceptResponse).toBe(false);
  access.enableIntercept();
  expect((access as any).interceptResponse).toBe(true);
});

test('Access.getData returns null when not logged in', () => {
  // Create a fresh access instance with a unique storage key to avoid state leakage
  const access = new Access({ storageKey: 'UNIQUE_KEY_' + Date.now() });
  expect(access.getData()).toBeNull();
});

test('Access.isLogined returns false when not logged in', () => {
  // The Access constructor calls loadData which may find data from previous tests in localStorage
  // Use a unique key to isolate this test
  const access = new Access({ storageKey: 'UNIQUE_KEY_' + Date.now() });
  expect(access.isLogined()).toBe(false);
});

test('Access.connect does not set guard in Design mode', () => {
  const access = new Access({});
  const mockRouter = { beforeEach: vi.fn() };
  access.connect({
    router: mockRouter as any,
    mode: ContextMode.Design
  });
  expect(mockRouter.beforeEach).not.toHaveBeenCalled();
});
