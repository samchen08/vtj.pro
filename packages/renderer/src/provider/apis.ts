import {
  type ApiSchema,
  type MetaSchema,
  type DataSourceSchema
} from '@vtj/core';
import {
  type IRequestConfig,
  merge,
  pathToRegexp,
  pathToRegexpMatch,
  url as urlUtil,
  formDataToJson,
  logger
} from '@vtj/utils';
import {
  parseExpression,
  isJSFunction,
  parseFunction,
  getMock
} from '../utils';
import { type ProvideAdapter } from './defaults';

export function createSchemaApi(schema: ApiSchema, adapter: ProvideAdapter) {
  const { jsonp, request } = adapter;
  if (schema.method === 'jsonp') {
    return (query: Record<string, any> = {}) =>
      jsonp(schema.url, {
        ...schema.jsonpOptions,
        query
      });
  } else {
    const headers = schema.headers
      ? parseExpression(schema.headers, {}, true)
      : undefined;
    const config: IRequestConfig = {
      url: schema.url,
      method: schema.method,
      settings: {
        ...schema.settings,
        headers
      }
    };
    return (data: any, opts?: IRequestConfig) => {
      delete config.data;
      return request.send(merge(config, opts || {}, { data }));
    };
  }
}

export function createMetaApi(meta: MetaSchema, adapter: ProvideAdapter) {
  const { metaQuery } = adapter;
  if (!metaQuery) return undefined;
  const { code, queryCode } = meta;
  return (data: any, opts?: IRequestConfig) => {
    if (!metaQuery) {
      console.warn('adapter.metaQuery is not defined!');
      return;
    }
    return metaQuery(code, queryCode, data, opts);
  };
}

export function createSchemaApis(
  apis: ApiSchema[] = [],
  meta: MetaSchema[] = [],
  adapter: ProvideAdapter
) {
  const result: Record<string, any> = {};
  for (const api of apis) {
    result[api.id] = createSchemaApi(api, adapter);
  }
  for (const item of meta) {
    result[item.id] = createMetaApi(item, adapter);
  }
  return result;
}

export async function mockApis(
  schemas: ApiSchema[] = [],
  global: any = window
) {
  const Mock = getMock(global);
  if (Mock) {
    mockCleanup(global);
    schemas.forEach((n) => mockApi(Mock, n));
  }
}

export function createMock(source: DataSourceSchema, global: any = window) {
  const mockTemplate =
    isJSFunction(source.mockTemplate) && source.mockTemplate.value
      ? parseFunction(source.mockTemplate, {}, true)
      : undefined;
  const Mock = getMock(global);
  return async (...args: any[]) => {
    let template = {};
    if (mockTemplate) {
      try {
        template = await mockTemplate.apply(mockTemplate, args);
      } catch (e) {
        logger.warn('模拟数据模版异常', e);
      }
    }
    return Mock?.mock(template);
  };
}

export interface MockCallbackOptions {
  /**
   * 请求url
   */
  url: string;
  /**
   * 请求方法类型
   */
  type: string;
  /**
   * 发送数据 playload
   */
  body: string | FormData;
  /**
   * url路径参数，/api/:id  =>  {id}
   */
  query?: Record<string, any>;
  /**
   * url 查询参数，/api/332?name=abc => {name:'abc}
   */
  params?: Record<string, any>;

  /**
   * 发送数据， body 转 json
   */
  data?: any;
}

export function mockApi(Mock: any, schema: ApiSchema) {
  if (!schema.mock) return;
  const { url, mockTemplate } = schema;
  if (url && mockTemplate) {
    const regexp = pathToRegexp(`${url}(.*)`);
    const match = pathToRegexpMatch(url, { decode: decodeURIComponent });
    const handler = parseExpression(mockTemplate, {}, true);
    Mock.mock(regexp, (options: MockCallbackOptions) => {
      const params = urlUtil.parse(options.url) || {};
      const data =
        options.body instanceof FormData
          ? formDataToJson(options.body)
          : options.body;
      const query = (match(options.url) as any)?.params;
      Object.assign(options, { data, params, query });
      return Mock.mock(handler(options));
    });
  }
}

export function mockCleanup(global: any = window) {
  // 清除已设置的模拟数据配置
  const Mock = getMock(global);
  if (Mock) {
    (Mock as any)._mocked = {};
  }
}
