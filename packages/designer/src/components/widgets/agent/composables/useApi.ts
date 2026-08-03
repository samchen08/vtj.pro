/**
 * API 请求封装
 * 处理统一响应包装 { code, message, data } 的解包
 */
import { ref } from 'vue';

export function useApi(token: () => string, remote: () => string) {
  const apiError = ref('');

  async function apiPost<T = any>(url: string, body: any): Promise<T> {
    apiError.value = '';
    const t = token();
    const fullUrl = `${remote().replace(/\/$/, '')}${url.replace(':token', t)}`;
    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const wrapper = await res.json();
    if (!res.ok) {
      throw new Error(wrapper.message || `HTTP ${res.status}`);
    }
    // 后端 ResponseInterceptor 统一包装: { code: 0, message: '成功', data: {...} }
    if (wrapper.code !== undefined) {
      if (wrapper.code !== 0) {
        const msg = wrapper.message || `API Error code=${wrapper.code}`;
        apiError.value = msg;
        throw new Error(msg);
      }
      return wrapper.data as T;
    }
    // 直接返回（无包装）
    return wrapper as T;
  }

  async function apiGet<T = any>(
    url: string,
    params?: Record<string, string>
  ): Promise<T> {
    apiError.value = '';
    const t = token();
    if (!t) {
      const msg = '缺少 Token，请先获取 Token';
      apiError.value = msg;
      throw new Error(msg);
    }
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const fullUrl = `${remote().replace(/\/$/, '')}${url.replace(':token', t)}${query}`;
    const res = await fetch(fullUrl, { method: 'GET' });
    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try {
        const errBody = await res.json();
        const detail =
          errBody.message || (errBody.code ? JSON.stringify(errBody) : '');
        if (detail) errMsg = `${errMsg}: ${detail}`;
      } catch {
        /* 非 JSON 响应忽略 */
      }
      apiError.value = errMsg;
      throw new Error(errMsg);
    }
    const wrapper = await res.json();
    if (wrapper.code !== undefined) {
      if (wrapper.code !== 0) {
        const msg = wrapper.message || `API Error code=${wrapper.code}`;
        apiError.value = msg;
        throw new Error(msg);
      }
      return wrapper.data as T;
    }
    return wrapper as T;
  }

  return { apiPost, apiGet, apiError };
}
