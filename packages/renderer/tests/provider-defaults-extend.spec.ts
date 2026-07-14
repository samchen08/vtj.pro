import { expect, test, describe, vi } from 'vitest';

// Capture the settings passed to createRequest
let capturedSettings: any = null;

vi.mock('@vtj/utils', async () => {
  const actual = await vi.importActual('@vtj/utils');
  return {
    ...(actual as any),
    createRequest: vi.fn((config: any) => {
      capturedSettings = config.settings;
      return {
        send: vi.fn(),
        setConfig: vi.fn(),
        useRequest: vi.fn().mockReturnValue(vi.fn()),
        useResponse: vi.fn().mockReturnValue(vi.fn())
      };
    })
  };
});

import { createAdapter } from '../src/provider/defaults';

describe('createAdapter settings callbacks', () => {
  test('validate returns true when res.data.code is 0', () => {
    createAdapter();
    expect(capturedSettings).toBeDefined();
    const result = capturedSettings.validate({ data: { code: 0 } });
    expect(result).toBe(true);
  });

  test('validate returns true when res.data.success is truthy', () => {
    createAdapter();
    const result = capturedSettings.validate({ data: { success: true } });
    expect(result).toBe(true);
  });

  test('validate returns false when res.data.code is not 0 and no success', () => {
    createAdapter();
    const result = capturedSettings.validate({ data: { code: 1 } });
    expect(result).toBe(false);
  });

  test('validate handles missing data', () => {
    createAdapter();
    const result = capturedSettings.validate({});
    expect(result).toBe(false);
  });

  test('showError calls notify with message', () => {
    const notify = vi.fn();
    createAdapter({ notify });
    capturedSettings.showError('test error');
    expect(notify).toHaveBeenCalledWith('test error');
  });

  test('showError calls notify with default message', () => {
    const notify = vi.fn();
    createAdapter({ notify });
    capturedSettings.showError('');
    expect(notify).toHaveBeenCalledWith('未知错误');
  });

  test('showError does not throw when no notify', () => {
    createAdapter();
    expect(() => capturedSettings.showError('error')).not.toThrow();
  });

  test('showLoading calls loading function', () => {
    const closeSpy = vi.fn();
    const loading = vi.fn().mockReturnValue({ close: closeSpy });
    createAdapter({ loading });
    capturedSettings.showLoading();
    expect(loading).toHaveBeenCalled();
  });

  test('showLoading closes existing loading before creating new one', () => {
    const close1 = vi.fn();
    const close2 = vi.fn();
    const loading = vi
      .fn()
      .mockReturnValueOnce({ close: close1 })
      .mockReturnValueOnce({ close: close2 });
    createAdapter({ loading });
    capturedSettings.showLoading();
    capturedSettings.showLoading();
    expect(close1).toHaveBeenCalled();
  });

  test('hideLoading closes current loading', () => {
    const closeSpy = vi.fn();
    const loading = vi.fn().mockReturnValue({ close: closeSpy });
    createAdapter({ loading });
    capturedSettings.showLoading();
    capturedSettings.hideLoading();
    expect(closeSpy).toHaveBeenCalled();
  });

  test('hideLoading does not throw when no loading', () => {
    createAdapter();
    expect(() => capturedSettings.hideLoading()).not.toThrow();
  });
});
