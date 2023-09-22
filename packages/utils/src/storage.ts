import { isClient } from './util';

export interface StorageOptions {
  /**
   * 存储类型
   */
  type: 'cache' | 'local' | 'session';
  /**
   * 在多少毫秒后失效, 0为永不过期
   */
  expired: number;
  /**
   * key前缀
   */
  prefix: string;
}

export interface StorageTypes {
  local: any;
  session: any;
  cache: any;
}

export class Storage {
  options: StorageOptions = {
    type: 'cache',
    expired: 0,
    prefix: '__VTJ_'
  };
  private caches: Record<string, any> = {};
  private types: StorageTypes;
  constructor(options: Partial<StorageOptions> = {}) {
    this.types = {
      local: isClient ? window.localStorage : this.caches,
      session: isClient ? window.sessionStorage : this.caches,
      cache: this.caches
    };
    this.config(options);
  }
  config(options: Partial<StorageOptions> = {}) {
    this.options = Object.assign(this.options, options);
  }
  save(key: string, value: any, opts: Partial<StorageOptions> = {}) {
    const { type, expired, prefix } = { ...this.options, ...opts };
    const timestamp = Date.now();
    const realKey = prefix + key;
    const storage = this.types[type] || this.caches;
    const info = {
      value,
      timestamp,
      expired
    };
    if (storage === this.caches) {
      storage[realKey] = info;
    } else {
      storage.setItem(realKey, JSON.stringify(info));
    }
  }
  get(key: string, opts: Partial<StorageOptions> = {}) {
    const { type, prefix } = { ...this.options, ...opts };
    const realKey = prefix + key;
    const storage = this.types[type] || this.caches;
    let info;
    if (storage === this.caches) {
      info = storage[realKey];
    } else {
      const content = storage.getItem(realKey);
      if (content) {
        info = JSON.parse(content);
      }
    }
    // 不存在缓存
    if (!info) return null;
    const { value, timestamp, expired } = info;
    // 缓存是否过期
    const isExpired = expired > 0 && timestamp + expired < Date.now();
    // 过期清空缓存，返回null
    if (isExpired) {
      this.remove(key, opts);
      return null;
    }
    return value;
  }

  remove(key: string, opts: Partial<StorageOptions> = {}) {
    const { type, prefix } = { ...this.options, ...opts };
    const storage = this.types[type] || this.caches;
    const realKey = prefix + key;
    if (storage === this.caches) {
      delete storage[realKey];
    } else {
      storage.removeItem(realKey);
    }
  }
  clear(opts: Partial<StorageOptions> = {}) {
    const { type } = { ...this.options, ...opts };
    const storage = this.types[type] || this.caches;
    if (storage === this.caches) {
      this.caches = {};
    } else {
      storage.clear();
    }
  }
}

export const storage = new Storage();
