import { expect, test, vi, describe, beforeEach } from 'vitest';
import { Base } from '../../src/models/base';

class TestBase extends Base {
  public triggerReady() {
    super.triggerReady();
  }
}

describe('Base', () => {
  let base: TestBase;

  beforeEach(() => {
    base = new TestBase();
  });

  test('should have isReady default to false', () => {
    expect(base.isReady).toBe(false);
  });

  test('should queue callbacks when not ready', () => {
    const callback = vi.fn();
    base.ready(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  test('should trigger ready callbacks when triggerReady is called', () => {
    const callback = vi.fn();
    base.ready(callback);
    base.triggerReady();
    expect(callback).toHaveBeenCalled();
  });

  test('should set isReady to true after triggerReady', () => {
    base.triggerReady();
    expect(base.isReady).toBe(true);
  });

  test('should call callback immediately if already ready', () => {
    base.triggerReady();
    const callback = vi.fn();
    base.ready(callback);
    expect(callback).toHaveBeenCalled();
  });

  test('should call multiple queued callbacks', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    base.ready(callback1);
    base.ready(callback2);
    base.triggerReady();
    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  test('should clear listeners after triggerReady', () => {
    const callback = vi.fn();
    base.ready(callback);
    base.triggerReady();
    base.resetReady();
    const callback2 = vi.fn();
    base.ready(callback2);
    expect(callback2).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('resetReady should set isReady to false', () => {
    base.triggerReady();
    expect(base.isReady).toBe(true);
    base.resetReady();
    expect(base.isReady).toBe(false);
  });
});
