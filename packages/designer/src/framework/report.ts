import {
  base64,
  storage,
  uuid,
  getClientInfo,
  delay,
  debounce
} from '@vtj/utils';
import type { Access, BaseService } from '@vtj/renderer';
import type { Service } from '@vtj/core';
import { REPORT_API, SESSION_ID_KEY } from '../constants';
import { version } from '../version';

export type ReportType = 'init' | 'online' | 'event' | 'error';

export const excludeErrors = [
  'ResizeObserver loop completed with undelivered notifications.',
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
  private debounceSend: (data: ReportData) => void;
  constructor(
    private remote: string,
    private access: Access,
    private service?: Service
  ) {
    this.api = this.remote + REPORT_API;
    this.debounceSend = debounce(this.send.bind(this), 500);
    this.online();
    this.bindGlobalError();
    if (this.service) {
      this.bindServerError(this.service as BaseService);
    }
  }

  private bindServerError(service: BaseService) {
    const request = service.req;
    if (request) {
      request.useResponse(
        (res) => {
          if (res && res.data && res.data.code !== 0) {
            const { url, data, params, headers } = res.config;
            this.error(res.data, {
              url,
              data,
              params,
              headers
            });
          }
          return res;
        },
        (e) => {
          this.error(e, {
            type: 'request.error',
            event: e,
            eventString: e.toString()
          });
          return e;
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
    const body = new URLSearchParams();
    body.append('data', content);
    window.fetch(this.api, {
      method: 'post',
      body
    });
  }

  async init() {
    this.debounceSend({
      type: 'init'
    });
  }
  async online() {
    await delay(5 * 60 * 1000);
    this.debounceSend({
      type: 'online'
    });
    this.online();
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
