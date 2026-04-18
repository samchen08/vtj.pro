import { isEqual } from '@vtj/utils';

class NodeCache {
  private __props: Record<string, any> = {};
  private __events: Record<string, any> = {};
  private __nodes: Record<string, any> = {};
  constructor() {}

  setProps(id: string, value: any) {
    this.__props[id] = value;
  }
  getProps(id: string) {
    return this.__props[id];
  }
  loadProps(key: string, value: any) {
    const cache = key ? this.getProps(key) : null;
    if (cache) {
      return cache;
    }
    if (key) {
      this.setProps(key, value);
    }
    return value;
  }

  setEvents(_id: string, _value: any) {
    // todo: 记录事件缓存会导致插槽的事件参数丢失，先取消缓存
    // this.__events[id] = value;
  }
  getEvents(id: string) {
    return this.__events[id];
  }

  loadEvents(key: string, value: any) {
    const cache = key ? this.getEvents(key) : null;
    if (cache) {
      return cache;
    }
    if (key) {
      this.setEvents(key, value);
    }
    return value;
  }

  setNode(id: string, value: any) {
    this.__nodes[id] = value;
  }
  getNode(id: string) {
    return this.__nodes[id];
  }

  loadNode(key: string, value: any) {
    const cache = key ? this.getNode(key) : null;
    if (cache) {
      return cache;
    }
    if (key) {
      this.setNode(key, value);
    }
    return value;
  }

  isEqual(value: any, other: any) {
    return isEqual(value, other);
  }

  clear() {
    this.__props = {};
    this.__events = {};
    this.__nodes = {};
  }
}

const nodeCache = new NodeCache();

export { nodeCache };
