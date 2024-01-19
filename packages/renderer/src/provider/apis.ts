import { type ApiSchema } from '@vtj/core';
import { type IRequestConfig, merge } from '@vtj/utils';
import { parseExpression } from '../utils';

import { type ProvideAdapter } from './provider';
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
    return (data: any, opts?: IRequestConfig) =>
      request.send(merge(config, opts || {}, { data }));
  }
}

export function createSchemaApis(
  schema: ApiSchema[] = [],
  adapter: ProvideAdapter
) {
  return schema.reduce((apis, api) => {
    apis[api.id] = createSchemaApi(api, adapter);
    return apis;
  }, {} as Record<string, any>);
}
