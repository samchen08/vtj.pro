import { uid, timestamp, isString } from '@vtj/base';
import { emitter, cloneDsl } from '../tools';
import type {
  BlockSchema,
  BlockInject,
  BlockState,
  JSFunction,
  JSONValue,
  JSExpression,
  BlockWatch,
  BlockProp,
  DataSourceSchema,
  BlockEmit,
  BlockSlot
} from '../protocols';

import { NodeModel } from './node';

/**
 * 节点放置位置
 */
export type DropPosition = 'left' | 'right' | 'top' | 'bottom' | 'inner';

/**
 * 区块发生改变时触发的事件名称
 */
export const EVENT_BLOCK_CHANGE = 'EVENT_BLOCK_CHANGE';

export class BlockModel {
  public readonly __VTJ_BLOCK__: boolean = true;
  public readonly id: string;
  public name: string = '';
  public inject: BlockInject[] = [];
  public state: BlockState = {};
  public lifeCycles: Record<string, JSFunction> = {};
  public methods: Record<string, JSFunction> = {};
  public computed: Record<string, JSFunction> = {};
  public watch: BlockWatch[] = [];
  public css: string = '';
  public props: Array<string | BlockProp> = [];
  public emits: Array<string | BlockEmit> = [];
  public slots: Array<string | BlockSlot> = [];
  public dataSources: Record<string, DataSourceSchema> = {};
  public nodes: NodeModel[] = [];
  public locked: boolean = false;
  public disposed: boolean = false;

  static normalAttrs: string[] = [
    'name',
    'locked',
    'inject',
    'state',
    'lifeCycles',
    'methods',
    'computed',
    'watch',
    'css',
    'props',
    'emits',
    'slots',
    'dataSources',
    '__TEMPLATE_ID__'
  ];

  constructor(schema: BlockSchema) {
    const { id } = schema;
    this.id = id || uid();
    this.update(schema, true);
  }

  update(schema: BlockSchema, silent: boolean = false) {
    for (const key of BlockModel.normalAttrs) {
      const value = schema[key as keyof BlockSchema];
      if (value !== undefined) {
        (this as any)[key] = value;
      }
    }
    const { nodes = [] } = schema;
    if (nodes.length) {
      this.nodes = nodes.map((n) => new NodeModel(n));
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 获取DSL
   * @returns
   */
  toDsl(version?: string): BlockSchema {
    const { __VTJ_BLOCK__, id, nodes } = this;
    const attrs = BlockModel.normalAttrs.reduce(
      (result, current) => {
        result[current] = (this as any)[current];
        return result;
      },
      {} as Record<string, any>
    );

    return {
      ...attrs,
      __VTJ_BLOCK__,
      __VERSION__: version || timestamp().toString(),
      id,
      nodes: nodes.map((n) => n.toDsl())
    } as BlockSchema;
  }

  /**
   * 销毁
   */
  dispose() {
    this.nodes.map((n) => n.dispose(true));
    this.nodes = [];
    this.disposed = true;
  }

  /**
   * 设置通用函数属性
   * @param type
   * @param name
   * @param value
   * @param silent
   */
  setFunction(
    type: 'methods' | 'computed' | 'lifeCycles',
    name: string,
    value: JSFunction,
    silent: boolean = false
  ) {
    this[type][name] = value;
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }
  /**
   * 删除通用函数属性
   * @param type
   * @param name
   * @param silent
   */
  removeFunction(
    type: 'methods' | 'computed' | 'lifeCycles',
    name: string,
    silent: boolean = false
  ) {
    delete this[type][name];
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 设置状态
   * @param name
   * @param value
   * @param silent
   */
  setState(
    name: string,
    value: JSONValue | JSExpression | JSFunction,
    silent: boolean = false
  ) {
    this.state[name] = value;
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }
  /**
   * 删除状态
   * @param name
   * @param silent
   */
  removeState(name: string, silent: boolean = false) {
    delete this.state[name];
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }
  /**
   * 更新CSS
   * @param content
   * @param silent
   */
  setCss(content: string, silent: boolean = false) {
    this.css = content;
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }
  /**
   * 新增或更新 watch
   * @param watch
   * @param silent
   */
  setWatch(watch: BlockWatch, silent: boolean = false) {
    watch.id = watch.id || uid();
    const index = this.watch.findIndex(
      (n) => (n.id && n.id === watch.id) || n === watch
    );
    if (index > -1) {
      this.watch.splice(index, 1, watch);
    } else {
      this.watch.push(watch);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 删除 watch
   * @param watch
   * @param silent
   */
  removeWatch(watch: BlockWatch, silent: boolean = false) {
    const index = this.watch.findIndex(
      (n) => (n.id && n.id === watch.id) || n === watch
    );
    if (index > -1) {
      this.watch.splice(index, 1);
      if (!silent) {
        emitter.emit(EVENT_BLOCK_CHANGE, this);
      }
    }
  }

  /**
   * 定义属性参数
   * @param prop
   * @param silent
   */
  setProp(prop: BlockProp, silent: boolean = false) {
    const index = this.props.findIndex((n) =>
      typeof n === 'string' ? n === prop.name : n.name === prop.name
    );
    if (index > -1) {
      this.props.splice(index, 1, prop);
    } else {
      this.props.push(prop);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 删除属性
   * @param prop
   * @param silent
   */
  removeProp(prop: BlockProp, silent: boolean = false) {
    const index = this.props.findIndex((n) =>
      typeof n === 'string' ? n === prop.name : n.name === prop.name
    );
    if (index > -1) {
      this.props.splice(index, 1);
      if (!silent) {
        emitter.emit(EVENT_BLOCK_CHANGE, this);
      }
    }
  }
  /**
   * 设置事件
   * @param emit
   * @param silent
   */
  setEmit(emit: string | BlockEmit, silent: boolean = false) {
    const item: BlockEmit = isString(emit) ? { name: emit, params: [] } : emit;
    const index = this.emits.findIndex((n) => n === item.name || n === item);
    if (index > -1) {
      this.emits.splice(index, 1, item);
    } else {
      this.emits.push(item);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 删除事件
   * @param emit
   * @param silent
   */
  removeEmit(emit: string, silent: boolean = false) {
    const index = this.emits.findIndex((n) =>
      isString(n) ? n === emit : n.name === emit
    );
    if (index > -1) {
      this.emits.splice(index, 1);
      if (!silent) {
        emitter.emit(EVENT_BLOCK_CHANGE, this);
      }
    }
  }

  /**
   * 设置插槽
   * @param slot
   * @param silent
   */
  setSlot(slot: string | BlockSlot, silent: boolean = false) {
    const item: BlockEmit = isString(slot) ? { name: slot, params: [] } : slot;
    const index = this.slots.findIndex((n) => n === item.name || n === item);
    if (index > -1) {
      this.slots.splice(index, 1, item);
    } else {
      this.slots.push(item);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 删除插槽
   * @param slot
   * @param silent
   */
  removeSlot(slot: string, silent: boolean = false) {
    const index = this.slots.findIndex((n) =>
      isString(n) ? n === slot : n.name === slot
    );
    if (index > -1) {
      this.slots.splice(index, 1);
      if (!silent) {
        emitter.emit(EVENT_BLOCK_CHANGE, this);
      }
    }
  }

  /**
   * 设置注入
   * @param inject
   * @param silent
   */
  setInject(inject: BlockInject, silent: boolean = false) {
    const index = this.inject.findIndex((n) => n.name === inject.name);
    if (index > -1) {
      this.inject.splice(index, 1, inject);
    } else {
      this.inject.push(inject);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }
  /**
   * 删除注入
   * @param inject
   * @param silent
   */
  removeInject(inject: BlockInject, silent: boolean = false) {
    const index = this.inject.findIndex((n) => n.name === inject.name);
    if (index > -1) {
      this.inject.splice(index, 1);
      if (!silent) {
        emitter.emit(EVENT_BLOCK_CHANGE, this);
      }
    }
  }

  /**
   * 设置数据源
   * @param source
   * @param silent
   */
  setDataSource(source: DataSourceSchema, silent: boolean = false) {
    this.dataSources[source.name] = source;
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 删除数据源
   * @param name
   * @param silent
   */
  removeDataSource(name: string, silent: boolean = false) {
    delete this.dataSources[name];
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  private insertAfter(
    node: NodeModel,
    target: NodeModel,
    silent: boolean = false
  ) {
    node.parent = null;
    const index = this.nodes.indexOf(target);
    this.nodes.splice(index + 1, 0, node);
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  private insertBefore(
    node: NodeModel,
    target: NodeModel,
    silent: boolean = false
  ) {
    node.parent = null;
    const index = this.nodes.indexOf(target);
    this.nodes.splice(index, 0, node);
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  private appendNode(node: NodeModel, silent: boolean = false) {
    node.parent = null;
    this.nodes.push(node);
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  /**
   * 添加节点
   * @param node
   * @param target
   * @param position
   * @param silent
   */
  addNode(
    node: NodeModel,
    target?: NodeModel,
    position: DropPosition = 'inner',
    silent: boolean = false
  ) {
    if (target) {
      if (['left', 'top'].includes(position)) {
        target.parent
          ? target.insertAfter(node, silent)
          : this.insertBefore(node, target, silent);
      } else if (['right', 'bottom'].includes(position)) {
        target.parent
          ? target.insertAfter(node, silent)
          : this.insertAfter(node, target, silent);
      } else {
        target.appendChild(node, silent);
      }
    } else {
      this.appendNode(node, silent);
    }
  }

  private __removeNode(node: NodeModel, silent: boolean = false) {
    const index = this.nodes.findIndex((n) => n.id === node.id);
    if (index > -1) {
      this.nodes.splice(index, 1);
      if (!silent) {
        emitter.emit(EVENT_BLOCK_CHANGE, this);
      }
    }
  }

  /**
   * 删除节点
   * @param node
   * @param silent
   */
  removeNode(node: NodeModel, silent: boolean = false) {
    if (node.parent) {
      node.dispose(silent);
    } else {
      node.dispose(true);
      this.__removeNode(node, silent);
    }
  }

  /**
   * 移动节点
   * @param node
   * @param target
   * @param position
   * @param silent
   */
  move(
    node: NodeModel,
    target?: NodeModel,
    position: DropPosition = 'inner',
    silent: boolean = false
  ) {
    if (node.parent) {
      // 这里需要静默处理，由addNode决定是否触发事件
      node.parent.removeChild(node, true);
    } else {
      // 这里需要静默处理，由addNode决定是否触发事件
      this.__removeNode(node, true);
    }
    this.addNode(node, target, position, silent);
  }

  /**
   * 向前交换节点
   * @param node
   * @param silent
   */
  movePrev(node: NodeModel, silent: boolean = false) {
    if (node.parent) {
      node.movePrev(silent);
    } else {
      const nodes = this.nodes;
      const index = nodes.indexOf(node);
      if (index > 0) {
        nodes.splice(index, 1);
        nodes.splice(index - 1, 0, node);
        if (!silent) {
          emitter.emit(EVENT_BLOCK_CHANGE, this);
        }
      }
    }
  }
  /**
   * 向后交换节点
   * @param node
   * @param silent
   */
  moveNext(node: NodeModel, silent: boolean = false) {
    if (node.parent) {
      node.moveNext(silent);
    } else {
      const nodes = this.nodes;
      const index = nodes.indexOf(node);
      if (index > -1 && index < nodes.length - 1) {
        nodes.splice(index, 1);
        nodes.splice(index + 1, 0, node);
        if (!silent) {
          emitter.emit(EVENT_BLOCK_CHANGE, this);
        }
      }
    }
  }
  /**
   * 克隆节点
   * @param target
   * @param silent
   * @returns
   */
  cloneNode(target: NodeModel, silent: boolean = false) {
    const dsl = cloneDsl(target.toDsl());
    const node = new NodeModel(dsl);
    this.addNode(node, target, 'bottom', silent);
    return node;
  }

  lock(silent: boolean = false) {
    this.locked = true;
    for (const child of this.nodes) {
      child.lock(true);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  unlock(silent: boolean = false) {
    this.locked = false;
    for (const child of this.nodes) {
      child.unlock(true);
    }
    if (!silent) {
      emitter.emit(EVENT_BLOCK_CHANGE, this);
    }
  }

  isChild(node: NodeModel): boolean {
    let match = false;
    for (const child of this.nodes) {
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
    return match;
  }
}
