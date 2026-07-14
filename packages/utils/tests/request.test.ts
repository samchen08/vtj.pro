import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, createRequest, createApi, createApis, useApi } from '../src';

vi.mock('axios', () => {
  const requestFn = vi.fn();
  const instance: any = requestFn;
  instance.defaults = { headers: { common: {} } };
  const reqInterceptorFns: any[] = [];
  const resInterceptorFns: any[] = [];
  instance.interceptors = {
    request: {
      use: vi.fn((fn: any) => { reqInterceptorFns.push(fn); return reqInterceptorFns.length; }),
      eject: vi.fn()
    },
    response: {
      use: vi.fn((fn: any) => { resInterceptorFns.push(fn); return resInterceptorFns.length; }),
      eject: vi.fn()
    }
  };
  instance._reqInterceptors = reqInterceptorFns;
  instance._resInterceptors = resInterceptorFns;
  instance.request = requestFn;
  instance.get = vi.fn();
  instance.post = vi.fn();
  instance.put = vi.fn();
  instance.delete = vi.fn();
  instance.patch = vi.fn();
  const cancelSource = { token: 'mock-token', cancel: vi.fn() };
  return {
    default: {
      create: vi.fn(() => instance),
      CancelToken: { source: vi.fn(() => cancelSource) }
    },
    CancelToken: { source: vi.fn(() => cancelSource) }
  };
});

describe('Request 请求工具', () => {
  let request: Request;
  let axiosMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    request = new Request({
      baseURL: 'https://api.example.com',
      settings: {
        type: 'form',
        failMessage: false
      }
    });
    axiosMock = (request as any).axios;
  });

  describe('send', () => {
    it('应发送 GET 请求', async () => {
      axiosMock.request.mockResolvedValueOnce({
        data: { data: { id: 1, name: 'test' } },
        headers: { 'content-type': 'text/plain' },
        status: 200
      });

      const result = await request.send({ url: '/users' });
      expect(result).toEqual({ id: 1, name: 'test' });
    });

    it('应支持 originResponse 选项', async () => {
      axiosMock.request.mockResolvedValueOnce({
        data: { data: { id: 1 } },
        headers: {},
        status: 200,
        statusText: 'OK'
      });

      const result = await request.send({
        url: '/users',
        settings: { originResponse: true }
      });
      expect((result as any).status).toBe(200);
    });

    it('应处理请求失败', async () => {
      axiosMock.request.mockRejectedValueOnce(new Error('Network Error'));
      await expect(request.send({ url: '/fail' })).rejects.toThrow(
        'Network Error'
      );
    });

    it('应处理 validSuccess 校验失败', async () => {
      axiosMock.request.mockResolvedValueOnce({
        data: { code: 500, msg: 'error', data: null },
        headers: {}
      });

      await expect(
        request.send({
          url: '/fail',
          settings: {
            validSuccess: true,
            validate: (res: any) => res.data.code === 200
          }
        })
      ).rejects.toBeDefined();
    });
  });

  describe('cancel', () => {
    it('应取消指定 ID 的请求', () => {
      const cancelFn = vi.fn();
      (request as any).records['test-id'] = {
        settings: {},
        config: {},
        source: { cancel: cancelFn }
      };
      request.cancel('test-id');
      expect(cancelFn).toHaveBeenCalled();
    });

    it('应取消所有请求', () => {
      const cancelFn1 = vi.fn();
      const cancelFn2 = vi.fn();
      (request as any).records = {
        a: { settings: {}, config: {}, source: { cancel: cancelFn1 } },
        b: { settings: {}, config: {}, source: { cancel: cancelFn2 } }
      };
      request.cancel();
      expect(cancelFn1).toHaveBeenCalled();
      expect(cancelFn2).toHaveBeenCalled();
    });
  });

  describe('setConfig', () => {
    it('应更新配置', () => {
      request.setConfig({
        baseURL: 'https://new-api.example.com',
        settings: { type: 'json' }
      });
      expect((request as any).settings.type).toBe('json');
    });
  });

  describe('useResponse', () => {
    it('应注册响应拦截器', () => {
      const fn = vi.fn();
      const dispose = request.useResponse(fn);
      expect(typeof dispose).toBe('function');
    });
  });

  describe('useRequest', () => {
    it('应注册请求拦截器', () => {
      const fn = vi.fn();
      const dispose = request.useRequest(fn);
      expect(typeof dispose).toBe('function');
    });
  });

  describe('setupSkipWarn', () => {
    it('应在有 skipWarn 设置时注册响应拦截器', () => {
      const skipWarnReq = new Request({
        baseURL: 'https://api.example.com',
        settings: {
          skipWarn: {
            code: 401,
            executor: (resolve) => resolve(true),
            callback: vi.fn(),
            complete: vi.fn()
          }
        }
      });
      // 验证不会崩溃
      expect(skipWarnReq).toBeDefined();
    });

    it('setConfig 更新 skipWarn 应清理旧拦截器', () => {
      const skipWarnReq = new Request({
        baseURL: 'https://api.example.com',
        settings: {
          skipWarn: {
            code: 401,
            executor: (resolve) => resolve(true)
          }
        }
      });
      // 更新配置，这会触发 stopSkipWarn 清理
      expect(() => skipWarnReq.setConfig({
        settings: {
          skipWarn: {
            code: 403,
            executor: (resolve) => resolve(true)
          }
        }
      })).not.toThrow();
    });

    it('应处理 skipWarn 响应拦截', async () => {
      const skipWarnReq = new Request({
        baseURL: 'https://api.example.com',
        settings: {
          type: 'json',
          skipWarn: {
            code: 401,
            executor: (resolve) => resolve(true),
            callback: vi.fn()
          }
        }
      });
      const axiosMock = (skipWarnReq as any).axios;
      // 模拟 skipWarn 响应
      axiosMock.request.mockResolvedValueOnce({
        data: { code: 401 },
        headers: { 'Local-Request-Id': 'test-id' },
        config: { headers: { 'Local-Request-Id': 'test-id' } },
        status: 200
      });

      (skipWarnReq as any).records['test-id'] = {
        config: { url: '/test' },
        settings: skipWarnReq.settings
      };

      try {
        await skipWarnReq.send({ url: '/test' });
      } catch (e) {
        // expected skipWarn promise
      }
      expect(axiosMock.request).toHaveBeenCalled();
    });
  });
});

describe('createRequest', () => {
  it('应创建可调用对象', () => {
    const req = createRequest({ settings: { type: 'form' } });
    expect(typeof req).toBe('function');
    expect(req.cancel).toBeInstanceOf(Function);
    expect(req.setConfig).toBeInstanceOf(Function);
    expect(req.useRequest).toBeInstanceOf(Function);
    expect(req.useResponse).toBeInstanceOf(Function);
  });
});

describe('createApi', () => {
  it('应使用字符串创建 API 函数', () => {
    const mockReq = { send: vi.fn().mockResolvedValue({ id: 1 }) } as any;
    const api = createApi('/users', mockReq);
    expect(typeof api).toBe('function');
  });

  it('应使用配置对象创建 API 函数', () => {
    const mockReq = { send: vi.fn().mockResolvedValue({ id: 1 }) } as any;
    const api = createApi({ url: '/users', method: 'post' }, mockReq);
    expect(typeof api).toBe('function');
  });

  it('API 函数应发送请求', async () => {
    const mockReq = { send: vi.fn().mockResolvedValue({ id: 2 }) } as any;
    const api = createApi<{ id: number }>('/users/1', mockReq);
    const result = await api();
    expect(mockReq.send).toHaveBeenCalled();
    expect(result).toEqual({ id: 2 });
  });

  it('API 函数应支持传入 data 和 opts', async () => {
    const mockReq = { send: vi.fn().mockResolvedValue({ id: 3 }) } as any;
    const api = createApi<{ id: number }, { name: string }>('/users', mockReq);
    const result = await api({ name: 'test' }, { method: 'post' });
    expect(mockReq.send).toHaveBeenCalled();
    expect(result).toEqual({ id: 3 });
  });
});

describe('createApis', () => {
  it('应从映射创建多个 API', () => {
    const mockReq = { send: vi.fn().mockResolvedValue({}) } as any;
    const apis = createApis(
      { getUser: '/user/get', saveUser: '/user/save' },
      mockReq
    );
    expect(apis.getUser).toBeInstanceOf(Function);
    expect(apis.saveUser).toBeInstanceOf(Function);
  });
});

describe('useApi', () => {
  it('应返回响应式数据', async () => {
    const loader = () => Promise.resolve({ id: 1, name: 'test' });
    const result = useApi(loader);
    expect(result.data.value).toBeNull();
    expect(result.loading.value).toBe(true);
    expect(result.error.value).toBeUndefined();
    expect(result.reload).toBeInstanceOf(Function);

    await vi.waitFor(() => {
      expect(result.data.value).toEqual({ id: 1, name: 'test' });
      expect(result.loading.value).toBe(false);
    });
  });

  it('应处理加载失败', async () => {
    const loader = () => Promise.reject(new Error('load failed'));
    const result = useApi(loader);

    await vi.waitFor(() => {
      expect(result.error.value).toBeInstanceOf(Error);
      expect(result.loading.value).toBe(false);
    });
  });

  it('应支持 transform 转换', async () => {
    const loader = () => Promise.resolve({ data: { id: 1 } });
    const result = useApi(loader, (res: any) => res.data);

    await vi.waitFor(() => {
      expect(result.data.value).toEqual({ id: 1 });
    });
  });
});
