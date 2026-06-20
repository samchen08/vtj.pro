import { isEqual, isFunction } from '@vtj/utils';

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

  /**
   * 比较两个节点缓存是否相等,函数引用变化不触发重渲染,但函数属性的增删会触发
   * 函数引用每次都会重新创建,不应该作为缓存比较的依据
   * 但函数属性的增删表示节点结构变化,需要触发重渲染
   */
  isNodeEqual(value: any, other: any) {
    if (value === other) return true;
    if (!value || !other) return false;

    // 获取函数属性的key集合
    const getFunctionKeys = (obj: any) => {
      if (!obj || typeof obj !== 'object') return [];
      return Object.keys(obj).filter((key) => isFunction(obj[key]));
    };

    // 过滤掉函数类型的属性
    const filterFunctions = (obj: any) => {
      if (!obj || typeof obj !== 'object') return obj;
      const filtered: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const val = obj[key];
          if (!isFunction(val)) {
            filtered[key] = val;
          }
        }
      }
      return filtered;
    };

    const valueFuncKeys = getFunctionKeys(value).sort();
    const otherFuncKeys = getFunctionKeys(other).sort();

    // 先比较函数属性的key集合是否一致
    if (!isEqual(valueFuncKeys, otherFuncKeys)) {
      return false;
    }

    // 再比较非函数属性的值
    return isEqual(filterFunctions(value), filterFunctions(other));
  }

  clear() {
    this.__props = {};
    this.__events = {};
    this.__nodes = {};
  }
}

const nodeCache = new NodeCache();

export { nodeCache };
