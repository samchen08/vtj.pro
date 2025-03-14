import { jsonp } from '@vtj/utils';
import type { BlockSchema, PlatformType } from '@vtj/core';
import { useEngine } from '../../framework';

export interface PublishTemplateDto {
  name: string;
  label: string;
  category: string;
  cover: Blob;
  share: boolean;
  version: string;
  platform: string;
  latest?: string;
  dsl: string;
  id?: string;
}

export interface TemplateDto {
  id: string;
  name: string;
  label: string;
  vip: boolean;
  share: boolean;
  cover: string;
  author: string;
  userId: string;
  category: string;
  latest: string;
  platform: string;
}

export function useOpenApi() {
  const engine = useEngine();
  const { access, adapter } = engine || {};
  const { remote } = adapter || {};

  const toRemoteAuth = () => {
    if (remote && access) {
      const redirect = encodeURIComponent(location.href);
      const { auth = '/auth.html' } = access.options;
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
    const token = access?.getData()?.token;
    if (token) {
      const api = `${remote}/api/open/user/${token}`;
      const res = await jsonp(api).catch(() => null);
      if (res && res.data) {
        return true;
      }
      return false;
    }
    return false;
  };

  const getTemplates = async (platform: PlatformType = 'web') => {
    const api = `${remote}/api/open/templates`;
    const token = access?.getData()?.token;
    const res = await jsonp(api, {
      query: token ? { platform, token } : { platform }
    });
    return (res?.data || []) as TemplateDto[];
  };

  const getTemplateById = async (id: string) => {
    const token = access?.getData()?.token;
    const api = `${remote}/api/open/template/${token}`;
    const res = await jsonp(api, { query: { id } });
    return (res?.data || null) as TemplateDto;
  };

  const removeTemplate = async (id: string) => {
    const token = access?.getData()?.token;
    const api = `${remote}/api/open/template/remove/${token}`;
    const res = await jsonp(api, { query: { id } });
    return !!res?.data;
  };

  const getTemplateDsl = async (id: string) => {
    const token = access?.getData()?.token;
    const api = `${remote}/api/open/dsl/${token}`;
    const res = await jsonp(api, { query: { id } });
    if (res?.data) {
      return res.data as BlockSchema;
    }
    return null;
  };

  const getDictOptions = async (code: string) => {
    const api = `${remote}/api/open/dict/${code}`;
    const res = await jsonp(api);
    return res?.data || [];
  };

  const getTemplateCategories = () => getDictOptions('TemplateCategory');

  const publishTemplate = async (dto: PublishTemplateDto) => {
    const token = access?.getData()?.token;
    const api = `${remote}/api/open/template/publish/${token}`;
    const data = new FormData();
    for (const [name, value] of Object.entries(dto)) {
      if (value !== undefined) {
        data.append(name, value);
      }
    }
    return window
      .fetch(api, {
        method: 'post',
        body: data
      })
      .then((res) => res.json());
  };

  return {
    engine,
    access,
    remote,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl,
    getDictOptions,
    getTemplateCategories,
    publishTemplate,
    getTemplateById,
    removeTemplate
  };
}
