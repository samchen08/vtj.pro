import {
  base64,
  storage,
  uuid,
  getClientInfo,
  debounce,
  jsonp
} from '@vtj/utils';
import type { Access, BaseService } from '@vtj/renderer';
import type { Service } from '@vtj/core';
import { REPORT_API, SESSION_ID_KEY } from '../constants';
import { version } from '../version';

export type ReportType = 'init' | 'online' | 'event' | 'error';

export const excludeErrors = [
  '"ResizeObserver loop completed with undelivered notifications."',
  'ResizeObserver loop completed with undelivered notifications.',
  '"ResizeObserver loop completed with undelivered notifications."',
  'ResizeObserver loop limit exceeded'
];

export interface ReportData {
  sessionId?: string;
  userId?: string;
  userName?: string;
  type: ReportType;
  engineVersion?: string;
  host?: string;
  url?: string;
  referrer?: string;
  os?: string;
  osVersion?: string;
  browser?: string;
  browserVersion?: string;
  message?: string;
  stack?: string;
  source?: string;
}

export class Report {
  private api: string;
  private remote: string;
  private debounceSend: (data: ReportData) => void;
  private timer: any = null;
  constructor(
    remote: string | null,
    private access: Access,
    private service?: Service
  ) {
    this.remote = remote || 'https://lcdp.vtj.pro';
    this.api = this.remote + REPORT_API;
    this.debounceSend = debounce(this.send.bind(this), 500);
    this.online();
    this.bindGlobalError();
    if (this.service) {
      this.bindServerError(this.service as BaseService);
    }
  }

  private isVtjUrl(config: any) {
    const { url } = config || {};
    const urls = ['/__vtj__/', 'lcdp.vtj.pro'];
    return urls.some((n) => url?.includes(n));
  }

  private bindServerError(service: BaseService) {
    const request = service.req;
    if (request) {
      request.useResponse(
        (res) => {
          if (res && res.data && res.data.code !== 0) {
            if (this.isVtjUrl(res.config)) {
              const { url, data, params, headers } = res.config;
              this.error(res.data, {
                url,
                data,
                params,
                headers
              });
            }
          }
          return res;
        },
        (e) => {
          if (this.isVtjUrl(e?.config)) {
            this.error(e, {
              type: 'request.error',
              event: e,
              eventString: e.toString()
            });
          }
          return Promise.reject(e);
        }
      );
    }
  }

  private bindGlobalError() {
    window.addEventListener('error', (e) => {
      const evt = e.error || e;
      if (excludeErrors.includes(evt.message)) return;
      this.error(evt, {
        type: 'window.error',
        event: evt,
        eventString: evt.toString()
      });
    });
  }

  private getSessionId() {
    let id = storage.get(SESSION_ID_KEY, { type: 'session' });
    if (!id) {
      id = uuid();
      storage.save(SESSION_ID_KEY, id, { type: 'session' });
    }
    return id;
  }
  private send(data: ReportData) {
    const user = this.access.getData();
    const client = getClientInfo();
    const { href, protocol, host } = location;
    const referrer = document.referrer;
    const postData = Object.assign(
      {
        ...client,
        url: href,
        host: protocol + '//' + host,
        referrer,
        sessionId: this.getSessionId(),
        userId: user?.id,
        userName: user?.name,
        engineVersion: version
      },
      data
    );
    const content = base64(JSON.stringify(postData));
    if (content.length > 1000) {
      const body = new URLSearchParams();
      body.append('data', content);
      window
        .fetch(this.api, {
          method: 'post',
          body
        })
        .catch(() => null);
    } else {
      jsonp(this.api, {
        query: { data: content }
      }).catch(() => null);
    }
  }

  async init() {
    this.debounceSend({
      type: 'init'
    });
  }
  async online() {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        this.online();
      },
      5 * 60 * 1000
    );
    this.debounceSend({
      type: 'online'
    });
  }
  event(message: string) {
    this.debounceSend({
      type: 'event',
      message
    });
  }
  error(e: any, source?: any) {
    const { message, stack, msg } = e || {};
    this.debounceSend({
      type: 'error',
      message: message || msg || (e ? JSON.stringify(e) : 'unknown error'),
      stack,
      source: source ? JSON.stringify(source) : undefined
    });
    console.error(e);
  }
}
