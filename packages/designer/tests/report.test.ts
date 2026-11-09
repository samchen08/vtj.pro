import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Access } from '@vtj/renderer';
import type { Service } from '@vtj/core';
import { Report } from '../src/framework/report';

const { jsonp } = vi.hoisted(() => ({
  jsonp: vi.fn().mockResolvedValue(undefined)
}));
vi.mock('@vtj/utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vtj/utils')>()),
  jsonp
}));

describe('遥测上报开关', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    jsonp.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('关闭时不注册监听、不启动心跳且所有上报入口均不发送请求', async () => {
    const access = new Access();
    const getData = vi.spyOn(access, 'getData');
    const useResponse = vi.fn();
    const service = { req: { useResponse } } as unknown as Service;
    const listener = vi.spyOn(window, 'addEventListener');
    const fetch = vi.spyOn(window, 'fetch');
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const report = new Report(null, access, service, false);

    expect(listener).not.toHaveBeenCalled();
    expect(useResponse).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);

    await report.init();
    await report.online();
    report.event('测试事件');
    const error = new Error('测试错误');
    report.error(error);
    await vi.advanceTimersByTimeAsync(10 * 60 * 1000);

    expect(vi.getTimerCount()).toBe(0);
    expect(fetch).not.toHaveBeenCalled();
    expect(jsonp).not.toHaveBeenCalled();
    expect(getData).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  it('默认开启时保留在线心跳和初始化上报', async () => {
    const listener = vi
      .spyOn(window, 'addEventListener')
      .mockImplementation(() => {});
    vi.spyOn(window, 'fetch').mockResolvedValue(new Response(''));
    const report = new Report(null, new Access());

    expect(listener).toHaveBeenCalledWith('error', expect.any(Function));
    await vi.advanceTimersByTimeAsync(500);
    expect(jsonp).toHaveBeenCalledTimes(1);
    await report.init();
    await vi.advanceTimersByTimeAsync(500);
    expect(jsonp).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(5 * 60 * 1000);
    expect(jsonp).toHaveBeenCalledTimes(3);
  });
});
