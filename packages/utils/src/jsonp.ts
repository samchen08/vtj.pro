import fetchJsonp from 'fetch-jsonp';
import { append } from './url';
import { template } from '@vtj/base';

export interface FetchJsonpOptions extends fetchJsonp.Options {
  /*
 interface Options {
    timeout?: number;
    jsonpCallback?: string;
    jsonpCallbackFunction?: string;
    nonce?: string;
    crossorigin?: boolean;
    referrerPolicy?: ReferrerPolicy;
    charset?: string;
  }
   */
  query?: Record<string, any>;
}

export async function jsonp<T = any>(
  url: string,
  options: FetchJsonpOptions = {}
): Promise<T> {
  const { query = {} } = options;
  if (url.includes('${')) {
    const compiled = template(url);
    url = compiled(query || {});
  }

  const _url = append(url, query);
  const res = await fetchJsonp(_url, options);
  return await (res.json() as Promise<T>);
}

export type Jsonp = typeof jsonp;
