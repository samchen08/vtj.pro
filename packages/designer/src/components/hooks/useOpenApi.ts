import { jsonp } from '@vtj/utils';
import type { BlockSchema, PlatformType } from '@vtj/core';
import {
  useEngine,
  type PublishTemplateDto,
  type TemplateDto,
  type TopicDto,
  type ChatDto,
  type Settings,
  type CompletionChunk
} from '../../framework';
import { alert } from '../../utils';

export type { TemplateDto, PublishTemplateDto, TopicDto, ChatDto };

const REFRESH_WINDOW = 5 * 60 * 1000;
const refreshTasks = new WeakMap<object, Promise<string | undefined>>();

export function useOpenApi() {
  const engine = useEngine();
  const { access, remote, openApi } = engine || {};

  const refreshToken = () => {
    if (!access || !remote) return Promise.resolve(undefined);
    const current = refreshTasks.get(access);
    if (current) return current;

    const task = fetch(`${remote}/api/users/refresh`, {
      method: 'post',
      credentials: 'include'
    })
      .then(async (response) => {
        if (!response.ok) return undefined;
        const result = await response.json();
        access.login(result?.data || result);
        return access.getToken();
      })
      .finally(() => refreshTasks.delete(access));
    refreshTasks.set(access, task);
    return task;
  };

  const ensureToken = async (force = false) => {
    const data = access?.getData();
    const expiresAt = Number(data?.expiresAt || 0);
    if (
      force ||
      (data?.token && expiresAt > 0 && expiresAt - Date.now() < REFRESH_WINDOW)
    ) {
      return await refreshToken();
    }
    return data?.token;
  };

  const authFetch = async (
    createUrl: (token?: string) => string,
    init?: RequestInit
  ) => {
    let response = await fetch(createUrl(await ensureToken()), init);
    if (response.status === 401) {
      response = await fetch(createUrl(await ensureToken(true)), init);
    }
    return response;
  };

  const authJsonp = async <T>(request: (token?: string) => Promise<T>) => {
    const status = (value: unknown) => {
      const result = value as {
        code?: number;
        status?: number;
        response?: { status?: number };
      };
      return result?.status || result?.code || result?.response?.status;
    };
    try {
      const result = await request(await ensureToken());
      return status(result) === 401
        ? await request(await ensureToken(true))
        : result;
    } catch (error) {
      if (status(error) !== 401) throw error;
      return await request(await ensureToken(true));
    }
  };

  const getImage = (path?: string) => {
    if (openApi?.getImage) {
      return openApi?.getImage(path);
    }
    return path ? `${remote}/api/oss/file/${path}` : undefined;
  };

  const getOssFile = (path?: string) => {
    if (openApi?.getOssFile) {
      return openApi?.getOssFile(path);
    }
    return path ? `${remote}/api/oss/file/${path}` : undefined;
  };

  const loginBySign = async () => {
    const { auth } = engine.options;
    if (!access) return;

    if (openApi?.loginBySign) {
      const data = await openApi.loginBySign(auth).catch(() => null);
      if (data) {
        access?.login(data);
      }
      return;
    }
    if (!remote || !auth) return;
    if (typeof auth === 'string') {
      const api = `${remote}/api/open/auth/${auth}`;
      let res = await fetch(api, { credentials: 'include' })
        .then((response) => response.json())
        .catch(() => null);
      if (!Array.isArray(res) && !res?.data) {
        res = await jsonp(api).catch(() => null);
      }
      if (res && Array.isArray(res)) {
        access.login(res);
      } else if (res && res.data) {
        access.login(res.data);
      }
    } else if (typeof auth === 'function') {
      const res = await auth().catch(() => null);
      if (res && res.data) {
        access.login(res.data);
      }
    }
  };

  const toRemoteAuth = () => {
    if (remote && access) {
      const redirect = encodeURIComponent(location.href);
      const { auth = '/login' } = access.options;
      const { protocol, host, pathname } = location;
      const clientUrl = `${protocol}//${host}${pathname}#/auth?redirect=${redirect}`;
      if (typeof auth === 'string') {
        const href = auth.startsWith('/') ? `${remote}${auth}` : auth;
        location.href = `${href}?r=${encodeURIComponent(clientUrl)}`;
      } else {
        auth(location.search);
      }
    }
  };

  const isLogined = async () => {
    const token = await ensureToken();
    if (token) {
      if (openApi?.isLogined) {
        const data = await openApi.isLogined().catch(() => null);
        return !!data;
      }
      const res = await authJsonp((current) =>
        jsonp(`${remote}/api/open/user/${current}`)
      ).catch(() => null);
      if (res && Array.isArray(res)) {
        access?.login(res);
        return true;
      } else if (res && res.data) {
        access?.login(res.data);
        return true;
      }
      return false;
    }
    return false;
  };

  const getTemplates = async (platform: PlatformType = 'web') => {
    if (openApi?.getTemplates) {
      return await openApi?.getTemplates(platform);
    }
    const res = await authJsonp((current) =>
      jsonp(`${remote}/api/open/templates`, {
        query: current ? { platform, token: current } : { platform }
      })
    );
    return (res?.data || []) as TemplateDto[];
  };

  const getTemplateById = async (id: string) => {
    if (openApi?.getTemplateById) {
      return await openApi?.getTemplateById(id);
    }
    const res = await authJsonp((token) =>
      jsonp(`${remote}/api/open/template/${token}`, { query: { id } })
    );
    return (res?.data || res || null) as TemplateDto;
  };

  const removeTemplate = async (id: string) => {
    if (openApi?.removeTemplate) {
      return await openApi?.removeTemplate(id);
    }
    const res = await authJsonp((token) =>
      jsonp(`${remote}/api/open/template/remove/${token}`, { query: { id } })
    );
    return !!res?.data;
  };

  const getTemplateDsl = async (id: string) => {
    if (openApi?.getTemplateDsl) {
      return await openApi?.getTemplateDsl(id);
    }
    const res = await authJsonp((token) =>
      jsonp(`${remote}/api/open/dsl/${token}`, { query: { id } })
    );
    if (res?.data) {
      return res.data as BlockSchema;
    }
    return null;
  };

  const getDictOptions = async (code: string) => {
    if (openApi?.getDictOptions) {
      return await openApi?.getDictOptions(code);
    }
    const api = `${remote}/api/open/dict/${code}`;
    const res = await jsonp(api).catch(() => null);
    return res?.data || [];
  };

  const getTemplateCategories = () => getDictOptions('TemplateCategory');

  const publishTemplate = async (dto: PublishTemplateDto) => {
    if (openApi?.publishTemplate) {
      return await openApi?.publishTemplate(dto);
    }
    const data = new FormData();
    for (const [name, value] of Object.entries(dto)) {
      if (value !== undefined) {
        data.append(name, value);
      }
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/template/publish/${token}`,
      {
        method: 'post',
        body: data
      }
    )
      .then((res) => res.json())
      .catch(() => null);

    return new Promise((resolve, reject) => {
      return res?.success ? resolve(res.data) : reject(res);
    });
  };

  const postTopic = async (dto: TopicDto) => {
    if (openApi?.postTopic) {
      return await openApi?.postTopic(dto);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/topic/post/${token}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    if (!res?.success) {
      await alert(res.message || '未知错误');
    }
    return res;
  };

  const postImageTopic = async (dto: TopicDto) => {
    if (openApi?.postImageTopic) {
      return await openApi?.postImageTopic(dto);
    }
    const data = new FormData();
    Object.entries(dto).forEach(([name, value]) => {
      data.append(name, value);
    });
    const res = await authFetch(
      (token) => `${remote}/api/open/topic/image/${token}`,
      {
        method: 'post',
        body: data
      }
    )
      .then((res) => res.json())
      .catch((e) => e);
    if (!res?.success) {
      await alert(res.message || '未知错误');
    }
    return res;
  };

  const postJsonTopic = async (dto: TopicDto) => {
    if (openApi?.postJsonTopic) {
      return await openApi?.postJsonTopic(dto);
    }
    const data = new FormData();
    Object.entries(dto).forEach(([name, value]) => {
      data.append(name, value);
    });
    const res = await authFetch(
      (token) => `${remote}/api/open/topic/json/${token}`,
      {
        method: 'post',
        body: data
      }
    )
      .then((res) => res.json())
      .catch((e) => e);
    if (!res?.success) {
      await alert(res.message || '未知错误');
    }
    return res;
  };

  const getChats = async (topicId: string) => {
    if (openApi?.getChats) {
      return await openApi?.getChats(topicId);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/chat/list/${token}?id=${topicId}`,
      { method: 'get' }
    );
    return await res.json();
  };

  const getTopics = async (fileId: string) => {
    if (openApi?.getTopics) {
      return await openApi?.getTopics(fileId);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/topic/list/${token}?id=${fileId}`,
      { method: 'get' }
    );
    return await res.json();
  };

  const postChat = async (dto: ChatDto) => {
    if (openApi?.postChat) {
      return await openApi?.postChat(dto);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/chat/post/${token}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
      }
    )
      .then((res) => res.json())
      .catch(() => null);
    if (!res?.success) {
      await alert(res.message || '未知错误');
    }
    return res;
  };

  const saveChat = async (chat: any) => {
    if (openApi?.saveChat) {
      return await openApi?.saveChat(chat);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/chat/save/${token}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chat)
      }
    );
    return await res.json();
  };

  const cancelChat = async (chat: any) => {
    if (openApi?.cancelChat) {
      return await openApi.cancelChat(chat);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/chat/cancel/${token}?id=${chat.id}`,
      { method: 'get' }
    );
    return await res.json();
  };

  const removeTopic = async (topicId: string) => {
    if (openApi?.removeTopic) {
      return await openApi?.removeTopic(topicId);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/topic/remove/${token}?id=${topicId}`,
      { method: 'get' }
    );
    return await res.json();
  };

  const updateTopic = async (topic: any) => {
    if (openApi?.updateTopic) {
      return await openApi.updateTopic(topic);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/topic/update/${token}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topic)
      }
    );
    return await res.json();
  };

  const saveTrace = async (trace: any) => {
    if (openApi?.saveTrace) {
      return await openApi.saveTrace(trace);
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/trace/${token}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trace)
      }
    );
    return await res.json();
  };

  const getHotTopics = async (platform: string = '') => {
    if (openApi?.getHotTopics) {
      return await openApi?.getHotTopics(platform);
    }
    const api = `${remote}/api/open/topic/hot?platform=${platform}`;
    return await window
      .fetch(api, {
        method: 'get'
      })
      .then((res) => res.json())
      .catch(() => null);
  };

  const chatCompletions = async (
    topicId: string,
    chatId: string,
    callback?: (data: CompletionChunk | null, done?: boolean) => void,
    error?: (err: Error, cancel?: boolean) => void
  ) => {
    if (openApi?.chatCompletions) {
      return await openApi?.chatCompletions(topicId, chatId, callback, error);
    }

    const controller = new AbortController();
    const signal = controller.signal;
    const request = async (force = false) => {
      const token = await ensureToken(force);
      const api = `${remote}/api/open/completions/${token}?tid=${topicId}&id=${chatId}`;
      return await fetch(api, { method: 'get', signal });
    };

    const toCompletionError = (
      message: string,
      status?: number,
      retryAfter?: string | number | null
    ) => {
      const waitSeconds = Math.ceil(Number(retryAfter));
      const text =
        status === 429
          ? `模型服务繁忙（速率限制），请${waitSeconds > 0 ? `等待 ${waitSeconds} 秒后` : '稍后'}重试`
          : message || `模型服务请求失败${status ? `（${status}）` : ''}`;
      return Object.assign(new Error(text), {
        status,
        retryAfter: waitSeconds > 0 ? waitSeconds : undefined
      });
    };

    // 新增：行处理函数
    const processLine = (line: string) => {
      if (!line.startsWith('data: ')) return;

      const content = line.slice(6).trim();
      if (!content) return; // 忽略空消息

      try {
        const data = JSON.parse(content);
        if (data?.error) {
          error?.(
            toCompletionError(
              data.message,
              Number(data.statusCode || data.status),
              data.retryAfter
            )
          );
          controller.abort();
          return;
        }
        callback?.(data, false);
      } catch (e) {
        error?.(new Error(content));
        controller.abort();
      }
    };

    // 新增：统一错误处理
    const handleError = (err: unknown) => {
      const isAbort = err instanceof Error && err.name === 'AbortError';
      const errorObj = err instanceof Error ? err : new Error(String(err));
      if (!isAbort) {
        error?.(errorObj, isAbort);
        controller.abort();
      }
    };

    // 新增：行缓冲区
    let buffer = '';
    const decoder = new TextDecoder();

    request()
      .then((response) => (response.status === 401 ? request(true) : response))
      .then(async (res) => {
        if (!res.ok) {
          const content = await res.text();
          let data: any = null;
          try {
            data = JSON.parse(content);
          } catch {
            // 非 JSON 响应直接使用原文
          }
          throw toCompletionError(
            data?.message || content || res.statusText,
            res.status,
            res.headers.get('retry-after')
          );
        }
        const reader = res.body?.getReader();
        if (!reader) return;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // 处理缓冲区剩余内容
              if (buffer) {
                processLine(buffer);
              }
              callback?.(null, true);
              break;
            }

            // 解码并追加到缓冲区
            buffer += decoder.decode(value, { stream: true });

            // 按行分割并处理完整行
            const lines = buffer.split('\n');
            // 保留最后一行（可能不完整）
            buffer = lines.pop() || '';

            for (const line of lines) {
              processLine(line);
              if (signal.aborted) return;
            }
          }
        } catch (e) {
          handleError(e);
        }
      })
      .catch(handleError);

    return () => controller.abort();
  };

  const getSettings = async () => {
    if (openApi?.getSettings) {
      return await openApi?.getSettings();
    }
    const token = await ensureToken();
    if (!token) return undefined;
    const res = await authFetch(
      (current) => `${remote}/api/open/settings/${current}`,
      { method: 'get' }
    )
      .then((res) => res.json())
      .catch(() => null);
    return res?.data as Settings;
  };

  const createOrder = async () => {
    if (openApi?.createOrder) {
      return await openApi?.createOrder();
    }
    const res = await authFetch(
      (token) => `${remote}/api/open/order/${token}`,
      { method: 'post' }
    )
      .then((res) => res.json())
      .catch(() => null);
    if (!res?.success) {
      await alert(res.message || '未知错误');
    }
    return res;
  };

  const cancelOrder = async (id: string) => {
    if (openApi?.cancelOrder) {
      return await openApi?.cancelOrder(id);
    }
    return await authFetch(
      (token) => `${remote}/api/open/order/cancel/${token}?id=${id}`,
      { method: 'get' }
    )
      .then((res) => res.json())
      .catch(() => null);
  };

  const getOrder = async (id: string) => {
    if (openApi?.getOrder) {
      return await openApi?.getOrder(id);
    }
    return await authFetch(
      (token) => `${remote}/api/open/order/${token}?id=${id}`,
      { method: 'get' }
    )
      .then((res) => res.json())
      .catch(() => null);
  };

  const getSkills = async (ids: string[]) => {
    const platform = engine.project.value?.platform || 'web';
    if (openApi?.getSkills) {
      return await openApi.getSkills(platform, ids);
    }
    const api = `${remote}/api/open/skills/${platform}`;
    const res = await window.fetch(api, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ids)
    });
    const result = await res.json();
    return result?.data || '';
  };

  const recognitionFile = async (file: File) => {
    if (openApi?.recognitionFile) {
      return await openApi?.recognitionFile(file);
    }
    const data = new FormData();
    Object.entries({ file }).forEach(([name, value]) => {
      data.append(name, value);
    });
    const res = await authFetch(
      (token) => `${remote}/api/open/recognition/post/${token}`,
      {
        method: 'post',
        body: data
      }
    )
      .then((res) => res.json())
      .catch((e) => e);
    if (!res?.success) {
      await alert(res.message || '未知错误');
    }
    return res;
  };

  return {
    engine,
    access,
    remote,
    loginBySign,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl,
    getDictOptions,
    getTemplateCategories,
    publishTemplate,
    getTemplateById,
    removeTemplate,
    postTopic,
    getChats,
    getTopics,
    postChat,
    removeTopic,
    updateTopic,
    saveTrace,
    chatCompletions,
    saveChat,
    getHotTopics,
    getSettings,
    createOrder,
    cancelOrder,
    getOrder,
    getImage,
    getOssFile,
    postImageTopic,
    postJsonTopic,
    cancelChat,
    getSkills,
    recognitionFile
  };
}
