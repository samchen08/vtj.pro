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

  setEvents(_id: string, _value: any) {
    //todo: 缓存事件会导致插槽事件参数失效，先去掉
    // this.__events[id] = value;
  }
  getEvents(id: string) {
    return this.__events[id];
  }

  setNode(id: string, value: any) {
    this.__nodes[id] = value;
  }
  getNode(id: string) {
    return this.__nodes[id];
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
