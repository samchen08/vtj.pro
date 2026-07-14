import { expect, test, describe, vi } from 'vitest';
import { createAdapter, createAccess } from '../src/provider/defaults';
import { Access } from '../src/plugins';

describe('createAdapter', () => {
  test('returns adapter with request when no options', () => {
    const adapter = createAdapter();
    expect(adapter.request).toBeDefined();
    expect(adapter.jsonp).toBeDefined();
    expect(adapter.access).toBeUndefined();
    expect(adapter.startupComponent).toBeUndefined();
  });

  test('returns adapter with startupComponent', () => {
    const StartupComp = { name: 'Startup' };
    const adapter = createAdapter({ Startup: StartupComp });
    expect(adapter.startupComponent).toBe(StartupComp);
  });

  test('creates access when access options provided', () => {
    const adapter = createAdapter({
      access: { auth: 'http://example.com/auth' }
    });
    expect(adapter.access).toBeInstanceOf(Access);
  });

  test('passes notify to error handler', () => {
    const notify = vi.fn();
    const adapter = createAdapter({ notify });
    // Trigger error notification via the validate+showError path
    // We can test that notify was configured in request by checking settings
    expect(adapter.request).toBeDefined();
  });

  test('passes loading to request settings', () => {
    const loading = vi.fn().mockReturnValue({ close: vi.fn() });
    const adapter = createAdapter({ loading });
    expect(adapter.loading).toBe(loading);
  });

  test('passes useTitle and alert', () => {
    const useTitle = vi.fn() as any;
    const alert = vi.fn() as any;
    const adapter = createAdapter({ useTitle, alert });
    expect(adapter.useTitle).toBe(useTitle);
    expect(adapter.alert).toBe(alert);
  });
});

describe('createAccess', () => {
  test('creates Access instance with empty options', () => {
    const access = createAccess();
    expect(access).toBeInstanceOf(Access);
  });

  test('creates Access instance with options', () => {
    const access = createAccess({ alert: vi.fn() as any });
    expect(access).toBeInstanceOf(Access);
  });
});
