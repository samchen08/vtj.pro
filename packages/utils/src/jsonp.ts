import { append } from './url';
import { template } from './util';

let __count__ = 0;

function noop() {}

const defaultOptions: JSONPOptions = {
  cache: false,
  timeout: 60 * 1000,
  param: 'callback',
  prefix: '__jp',
  name: '',
  script: false
};

export interface JSONPOptions {
  cache?: boolean | string;
  timeout?: number;
  prefix?: string;
  param?: string;
  name?: string;
  // script 为true时，必须要设置name
  script?: boolean;
}

export function jsonp<T>(
  url: string,
  params: Record<string, any> = {},
  options?: JSONPOptions
) {
  const opts = Object.assign({}, defaultOptions, options || {});
  const id: string = opts.name || `${opts.prefix}${++__count__}`;
  const target = document.getElementsByTagName('script')[0] || document.head;
  let script: HTMLScriptElement;
  let timer: any;

  return new Promise<T>((resolve, reject) => {
    const cleanup = () => {
      if (script?.parentNode) {
        script.onload = null;
        script.onerror = null;
        script.parentNode.removeChild(script);
        if (!opts.script) {
          (window as any)[id] = noop;
        }
        if (timer) {
          clearTimeout(timer);
        }
      }
    };
    if (!opts.script) {
      (window as any)[id] = (data: any) => {
        cleanup();
        resolve(data);
      };
    }

    const query = {
      ...params,
      [opts.param as string]: id
    };
    if (!opts.cache) {
      query.__t__ = typeof opts.cache === 'string' ? opts.cache : Date.now();
    }

    if (url.includes('${')) {
      const compiled = template(url);
      url = compiled(query || {});
    }

    const _url = append(url, query);
    script = document.createElement('script');
    script.src = _url;
    if (opts.script) {
      script.onload = () => {
        if (opts.name) {
          const global = window as any;
          cleanup();
          resolve(global[opts.name] as T);
        }
      };
      script.onerror = (e) => {
        cleanup();
        reject(e);
      };
    }
    target.parentNode?.insertBefore(script, target);

    timer = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout'));
    }, opts.timeout);
  });
}
