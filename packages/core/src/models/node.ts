import { uid } from '@vtj/base';
import { emitter } from '../tools';
import type {
  NodeSchema,
  NodeFrom,
  NodeSlot,
  JSExpression,
  JSONValue,
  JSFunction,
  NodeEvent,
  NodeDirective
} from '../protocols';
import { PropModel } from './prop';
import { EventModel } from './event';
import { DirectiveModel } from './directive';

/**
 * 节点发生改变时触发的事件名称
 */
export const EVENT_NODE_CHANGE = 'EVENT_NODE_CHANGE';

/**
 * 节点模型
 */
export class NodeModel {
  /**
   * 标记
   */
  public readonly __VTJ_NODE__: boolean = true;

  /**
   * 锁定
   */
  public locked: boolean = false;

  /**
   * 记录所有节点的实例
   */
  static nodes: Record<string, NodeModel> = {};
  /**
   * 节点唯一标识
   */
  readonly id: string;
  /**
   * 名称，即组件的名称或html的标签名
   */
  readonly name: string;
  /**
   * 组件来源
   */
  readonly from: NodeFrom;
  /**
   * 是否不可见
   */
  public invisible: boolean = false;
  /**
   * 子节点
   */
  public children: NodeModel[] | string | JSExpression = '';

  /**
   * 放置在父组件的插槽
   */
  public slot?: NodeSlot;

  /**
   * 节点属性
   */
  public props: Record<string, PropModel> = {};

  /**
   * 节点事件
   */
  public events: Record<string, EventModel> = {};

  /**
   * 指令
   */
  public directives: DirectiveModel[] = [];

  /**
   * 销毁标识
   */
  public disposed: boolean = false;

  constructor(schema: NodeSchema, public parent: NodeModel | null = null) {
    const { id = uid(), name, from = '' } = schema;
    this.id = id;
    this.name = name;
    this.from = from;
    this.update(schema, true);
    NodeModel.nodes[this.id] = this;
  }
  /**
   * 更新节点属性
   * @param schema
   * @param silent 是否静默，静默更新即不触发事件
   */
  update(schema: Partial<NodeSchema>, silent: boolean = false) {
    const {
      invisible = false,
      locked = false,
      children = [],
      slot,
      props = {},
      events = {},
      directives = []
    } = schema;
    this.invisible = invisible;
    this.locked = locked;
    this.setChildren(children, true);
    this.setSlot(slot, true);
    this.props = PropModel.parse(props);
    this.events = EventModel.parse(events);
    this.directives = DirectiveModel.parse(directives);
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }
  /**
   * 设置子节点
   * @param children
   * @param silent
   */
  setChildren(
    children: NodeSchema[] | string | JSExpression = '',
    silent: boolean = false
  ) {
    if (Array.isArray(children)) {
      this.children = children.map((dsl) => new NodeModel(dsl, this));
    } else {
      this.children = children;
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 设置节点放置的插槽
   * @param slot
   * @param silent
   */
  setSlot(slot?: string | NodeSlot, silent: boolean = false) {
    this.slot = typeof slot === 'string' ? { name: slot, params: [] } : slot;
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 新增或更新属性
   * @param name
   * @param value
   * @param defaultValue
   * @param silent
   */
  setProp(
    name: string,
    value: JSONValue | JSExpression | JSFunction,
    defaultValue?: JSONValue | JSExpression | JSFunction,
    silent: boolean = false
  ) {
    const prop = this.props[name];
    if (prop) {
      prop.setValue(value);
    } else {
      this.props[name] = new PropModel(name, value, defaultValue);
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 删除属性
   * @param name
   * @param silent
   */
  removeProp(name: string, silent: boolean = false) {
    delete this.props[name];
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 获取属性值
   * @param name
   * @returns
   */
  getPropValue(name: string) {
    const prop = this.props[name];
    if (!prop) return undefined;
    return prop.getValue();
  }

  /**
   * 新增或更新事件
   * @param scheam
   * @param silent
   */
  setEvent(scheam: NodeEvent, silent: boolean = false) {
    const event = this.events[scheam.name];
    if (event) {
      event.update(scheam);
    } else {
      this.events[scheam.name] = new EventModel(scheam);
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 删除事件
   * @param name
   * @param silent
   */
  removeEvent(name: string, silent: boolean = false) {
    delete this.events[name];
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 新增或更新指令
   * @param scheam
   * @param silent
   */
  setDirective(scheam: NodeDirective, silent: boolean = false) {
    const index = this.directives.findIndex((n) => n.id === scheam.id);
    if (index >= 0) {
      this.directives.splice(index, 1, new DirectiveModel(scheam));
    } else {
      this.directives.push(new DirectiveModel(scheam));
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 删除指令
   * @param dirctive
   * @param silent
   */
  removeDirective(dirctive: DirectiveModel, silent: boolean = false) {
    const index = this.directives.findIndex(
      (n) => n === dirctive || n.id === dirctive.id
    );
    if (index >= 0) {
      this.directives.splice(index, 1);
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 删除子节点
   * @param node
   * @param silent
   * @returns
   */
  removeChild(node: NodeModel, silent: boolean = false) {
    const { children, disposed } = this;
    if (disposed) return;
    if (!Array.isArray(children)) return;
    const index = children.findIndex((n) => n === node);
    node.parent = null;
    children.splice(index, 1);
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 追加子节点
   * @param node
   * @param silent
   * @returns
   */
  appendChild(node: NodeModel, silent: boolean = false) {
    const { children, disposed } = this;
    if (disposed) return;
    node.parent = this;
    if (!Array.isArray(children)) {
      this.children = [node];
    } else {
      children.push(node);
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  /**
   * 在当前节点的后面插入节点
   * @param node
   * @param silent
   * @returns
   */
  insertAfter(node: NodeModel, silent: boolean = false) {
    if (!this.parent) return;
    const brothers = this.parent.children;
    if (Array.isArray(brothers)) {
      node.parent = this.parent;
      const index = brothers.indexOf(this);
      brothers.splice(index + 1, 0, node);
      if (!silent) {
        emitter.emit(EVENT_NODE_CHANGE, this.parent);
      }
    }
  }

  /**
   * 在当前节点的前面插入节点
   * @param node
   * @param silent
   * @returns
   */
  insertBefore(node: NodeModel, silent: boolean = false) {
    if (!this.parent) return;
    const brothers = this.parent.children;
    if (Array.isArray(brothers)) {
      node.parent = this.parent;
      const index = brothers.indexOf(this);
      brothers.splice(index, 0, node);
      if (!silent) {
        emitter.emit(EVENT_NODE_CHANGE, this.parent);
      }
    }
  }

  movePrev(silent: boolean = false) {
    const parent = this.parent;
    if (!parent) return;
    const children = parent.children;
    if (Array.isArray(children)) {
      const index = children.indexOf(this);
      if (index > 0) {
        children.splice(index, 1);
        children.splice(index - 1, 0, this);
        if (!silent) {
          emitter.emit(EVENT_NODE_CHANGE, parent);
        }
      }
    }
  }
  moveNext(silent: boolean = false) {
    const parent = this.parent;
    if (!parent) return;
    const children = parent.children;
    if (Array.isArray(children)) {
      const index = children.indexOf(this);
      if (index > -1 && index < children.length - 1) {
        children.splice(index, 1);
        children.splice(index + 1, 0, this);
        if (!silent) {
          emitter.emit(EVENT_NODE_CHANGE, parent);
        }
      }
    }
  }

  /**
   * 获取DSL
   * @returns
   */
  toDsl(): NodeSchema {
    const {
      id,
      name,
      from,
      invisible,
      locked,
      slot,
      children,
      props,
      directives,
      events
    } = this;
    const nodes = Array.isArray(children)
      ? children.map((n) => n.toDsl())
      : children;

    return {
      id,
      name,
      from,
      invisible,
      locked,
      slot,
      children: nodes,
      props: PropModel.toDsl(props),
      directives: DirectiveModel.toDsl(directives),
      events: EventModel.toDsl(events)
    };
  }

  /**
   * 销毁
   * @param silent
   * @returns
   */
  dispose(silent: boolean = false) {
    const { children, disposed } = this;
    if (disposed) return;
    if (Array.isArray(children)) {
      children.forEach((node) => node.dispose(true));
    }

    if (this.parent) {
      this.parent.removeChild(this, silent);
    } else {
      if (!silent) {
        emitter.emit(EVENT_NODE_CHANGE, this);
      }
    }

    this.parent = null;
    this.disposed = true;
    delete NodeModel.nodes[this.id];
  }

  lock(silent: boolean = false) {
    this.locked = true;
    if (Array.isArray(this.children)) {
      for (const child of this.children) {
        child.lock(true);
      }
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  unlock(silent: boolean = false) {
    this.locked = false;
    if (Array.isArray(this.children)) {
      for (const child of this.children) {
        child.unlock(true);
      }
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  setVisible(visible: boolean, silent: boolean = false) {
    this.invisible = !visible;
    if (Array.isArray(this.children)) {
      for (const child of this.children) {
        child.setVisible(visible, true);
      }
    }
    if (!silent) {
      emitter.emit(EVENT_NODE_CHANGE, this);
    }
  }

  isChild(node: NodeModel): boolean {
    let match = false;
    if (Array.isArray(this.children)) {
      for (const child of this.children) {
        if (node === child || node.id === child.id) {
          match = true;
          break;
        } else {
          match = child.isChild(node);
          if (match) {
            break;
          }
        }
      }
    }
    return match;
  }
}
