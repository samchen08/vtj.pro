import {
  type Ref,
  type ShallowRef,
  shallowRef,
  ref,
  unref,
  nextTick,
  createApp,
  watch
} from 'vue';
import { type Context, HTML_TAGS } from '@vtj/renderer';
import {
  type Dependencie,
  type DropPosition,
  type MaterialDescription,
  type NodeSchema,
  type MaterialSlot,
  NodeModel,
  BlockModel,
  isBlock,
  emitter,
  EVENT_PROJECT_ACTIVED,
  EVENT_NODE_CHANGE
} from '@vtj/core';
import { cloneDeep, delay, toArray } from '@vtj/utils';
import { SlotsPicker } from '../components';
import { type Engine } from './engine';

export function createSlotsPicker(name: string, slots: MaterialSlot[]) {
  return new Promise<MaterialSlot>((resolve, reject) => {
    const dialog = createApp(SlotsPicker, {
      name,
      slots,
      onClose: () => {
        dialog.unmount();
        reject(null);
      },
      onSubmit: (slot: MaterialSlot) => {
        dialog.unmount();
        resolve(slot);
      }
    });
    dialog.mount(document.createElement('div'));
  });
}

export interface VtjElement extends HTMLElement {
  __vtj__?: string;
  __context__?: Context;
}

export interface DesignHelper {
  model: NodeModel | BlockModel;
  el: VtjElement;
  rect: DOMRect;
  type?: DropPosition;
  path?: Array<NodeModel | BlockModel>;
  indexes?: number[];
}

export interface AddComponentOptions {
  slot?: MaterialSlot;
  isActive?: () => boolean;
}

export class Designer {
  private proxied: Record<string, any> = {};
  public document: Document | null = null;
  public hover: ShallowRef<DesignHelper | null> = shallowRef(null);
  public dropping: ShallowRef<DesignHelper | null> = shallowRef(null);
  public selected: Ref<DesignHelper | null> = ref(null);
  public dragging: MaterialDescription | null = null;
  public draggingNode: NodeModel | null = null;
  public lines: ShallowRef<DOMRect[]> = shallowRef([]);
  constructor(
    public engine: Engine,
    public contentWindow: Window,
    public dependencies: Ref<Dependencie[]>
  ) {
    this.document = this.contentWindow.document;
    this.bindEvents(contentWindow, this.document);
  }

  private bind(func: (...args: any[]) => void, name: string) {
    let proxy = this.proxied[name];
    if (!proxy) {
      proxy = func.bind(this);
      this.proxied[name] = proxy;
    }
    return proxy;
  }

  private bindEvents(cw: Window, doc: Document) {
    doc.addEventListener(
      'mouseover',
      this.bind(this.onMouseOver, 'onMouseOver')
    );
    doc.addEventListener(
      'scroll',
      this.bind(this.onViewChange, 'onViewChange')
    );
    cw.addEventListener('resize', this.bind(this.onViewChange, 'onViewChange'));
    cw.addEventListener('load', this.bind(this.onViewChange, 'onViewChange'));
    doc.addEventListener('mouseleave', this.bind(this.onLeave, 'onLeave'));
    doc.addEventListener('dragleave', this.bind(this.onLeave, 'onLeave'));
    doc.addEventListener('dragover', this.bind(this.onDragOver, 'onDragOver'));
    doc.addEventListener(
      'dragstart',
      this.bind(this.onDragStart, 'onDragStart')
    );
    doc.addEventListener('dragend', this.bind(this.onDragEnd, 'onDragEnd'));
    doc.addEventListener('drop', this.bind(this.onDrop, 'onDrop'));
    doc.addEventListener(
      'click',
      this.bind(this.onSelected, 'onSelected'),
      true
    );
    emitter.on(
      EVENT_PROJECT_ACTIVED,
      this.bind(this.onActiveChange, 'onActiveChange')
    );
    emitter.on(EVENT_NODE_CHANGE, this.bind(this.onViewChange, 'onViewChange'));

    watch(
      () => this.engine.state.outlineEnabled,
      () => {
        this.updateLines();
      }
    );
  }

  private unbindEvents(cw: Window, doc: Document) {
    doc.removeEventListener(
      'mouseover',
      this.bind(this.onMouseOver, 'onMouseOver')
    );
    doc.removeEventListener(
      'scroll',
      this.bind(this.onViewChange, 'onViewChange')
    );
    cw.removeEventListener(
      'resize',
      this.bind(this.onViewChange, 'onViewChange')
    );
    cw.removeEventListener(
      'load',
      this.bind(this.onViewChange, 'onViewChange')
    );
    doc.removeEventListener('mouseleave', this.bind(this.onLeave, 'onLeave'));
    doc.removeEventListener('dragleave', this.bind(this.onLeave, 'onLeave'));
    doc.removeEventListener(
      'dragover',
      this.bind(this.onDragOver, 'onDragOver')
    );
    doc.removeEventListener(
      'dragstart',
      this.bind(this.onDragStart, 'onDragStart')
    );
    doc.removeEventListener('dragend', this.bind(this.onDragEnd, 'onDragEnd'));
    doc.removeEventListener('drop', this.bind(this.onDrop, 'onDrop'));
    doc.removeEventListener('click', this.bind(this.onSelected, 'onSelected'));
    emitter.off(
      EVENT_PROJECT_ACTIVED,
      this.bind(this.onActiveChange, 'onActiveChange')
    );
    emitter.off(
      EVENT_NODE_CHANGE,
      this.bind(this.onViewChange, 'onViewChange')
    );
  }

  private onMouseOver(e: MouseEvent) {
    const hover = this.getHelper(e);
    if (hover && hover?.model.id !== this.selected.value?.model.id) {
      this.hover.value = hover;
    }
  }
  private onViewChange() {
    this.updateRect();
    this.updateLines();
  }

  private onLeave(_e: MouseEvent) {
    this.hover.value = null;
    this.dropping.value = null;
  }

  private onActiveChange() {
    this.hover.value = null;
    this.dropping.value = null;
    this.selected.value = null;
  }

  public async getAvailableSlots(
    to: NodeModel | null
  ): Promise<MaterialSlot[]> {
    if (!to) return [];
    const { engine } = this;
    const instance = toArray(
      engine.simulator.renderer?.context?.__refs?.[to.id] || []
    )[0];
    const vueInstance = instance?._?.exposed || instance;
    const dynamicSlots: string[] = vueInstance?.$vtjDynamicSlots
      ? vueInstance.$vtjDynamicSlots()
      : [];
    return this.resolveSlots(to, dynamicSlots);
  }

  public async getDropSlot(to: NodeModel | null) {
    if (!to) return undefined;
    const { dropping } = this;
    const vueInstance = dropping.value
      ? this.getVueInstance(dropping.value, to.id)
      : null;
    const dynamicSlots: string[] = vueInstance?.$vtjDynamicSlots
      ? vueInstance.$vtjDynamicSlots()
      : [];
    const slots = await this.resolveSlots(to, dynamicSlots);

    if (slots.length === 0) {
      return undefined;
    }
    // 只有一个名为default的插槽，并且无参数，可以省略
    if (slots.length === 1) {
      const { name, params = [] } = slots[0];
      return name === 'default' && !params.length ? undefined : slots[0];
    }
    // 用户没选择插槽，返回null
    const slot = await createSlotsPicker(to.name, slots).catch(() => null);
    /**
     * 当只有一个插槽，名称是default，并且没有任何参数，可以省略不指定插槽名
     * 删除的原因：自定义区块，没有定义params，出码会找不到插槽作用域，需要区块增加插槽参数设置后才能用这个判断
     */
    if (
      slot &&
      slot.name === 'default' &&
      (!slot.params || slot.params?.length === 0)
    ) {
      return undefined;
    }

    return slot;
  }

  // 沿用原有规则合并物料声明和动态插槽，并补齐参数格式。
  private async resolveSlots(
    to: NodeModel,
    dynamicSlots: string[]
  ): Promise<MaterialSlot[]> {
    const assets = this.engine.assets;
    const componentMap = assets.componentMap;
    const targetDesc =
      (await assets.getBlockMaterial(to.from)) || componentMap.get(to.name);

    if (!targetDesc?.slots && dynamicSlots.length === 0) return [];
    const mergeSlots = (targetDesc?.slots || ['default']).concat(dynamicSlots);

    return mergeSlots.map((n) => {
      if (typeof n === 'string') {
        return {
          name: n,
          params: []
        };
      } else {
        return {
          name: n.name,
          params: n.params || []
        };
      }
    });
  }

  public getVueInstance(helper: DesignHelper, id?: string) {
    const { el, model } = helper;
    const refs = el.__context__?.__refs;
    if (!refs) return null;
    const instance = refs[id || model.id];
    return instance?._?.exposed || instance;
  }

  private async onDrop(e: DragEvent) {
    e.preventDefault();
    const { engine, dragging, dropping, draggingNode } = this;
    const current = engine.current.value;
    const helper = this.getHelper(e);
    if (!current || !dragging || !dropping.value || !helper) return;
    const to = helper.model;
    const type = dropping.value.type;
    if (!(await this.allowDrop(to, type))) return;
    let node;
    if (draggingNode) {
      node = draggingNode;
    } else {
      const dsl = this.createNodeDsl(dragging);
      node = new NodeModel(dsl);
    }
    if (isBlock(to)) {
      if (draggingNode) {
        delete node.slot;
        current.move(node, undefined, 'inner');
      } else {
        current.addNode(node, undefined, type);
      }
    } else {
      const slot = await this.getDropSlot(type === 'inner' ? to : to.parent);
      // null 是用户没选任何插槽
      if (slot === null) {
        this.dropping.value = null;
        return;
      }
      node.slot = slot;
      if (draggingNode) {
        current.move(node, to, type);
      } else {
        current.addNode(node, to, type);
      }
    }
    this.dropping.value = null;
    engine.simulator.refresh();
    engine.assets.clearCaches();
  }

  private onSelected(e: MouseEvent) {
    if (!this.engine.state.activeEvent) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setHover(null);
    this.selected.value = this.getHelper(e);
  }

  private async onDragOver(e: DragEvent) {
    const helper = this.getHelper(e);

    if (!helper) return;
    const { model, type } = helper;
    if (model && (await this.allowDrop(model, type))) {
      e.preventDefault();
      this.dropping.value = helper;
    } else {
      this.dropping.value = null;
    }
  }

  private async onDragStart(e: DragEvent) {
    const helper = this.getHelper(e);
    if (!helper) return;
    const { model } = helper;
    let desc = this.engine.assets.componentMap.get(model.name);
    const from = (model as NodeModel).from;
    if (!desc && from) {
      desc = (await this.engine.assets.getBlockMaterial(
        from
      )) as MaterialDescription;
    }
    if (desc) {
      this.setDragging(desc);
    }
    this.setDraggingNode(model as NodeModel);
  }

  private onDragEnd() {
    this.setDraggingNode(null);
    this.setDragging(null);
  }

  private isVtjElement(el: EventTarget | HTMLElement): el is VtjElement {
    const block = this.engine.current.value;
    const hasAttribute = (el as any)?.hasAttribute;
    if (block && hasAttribute) {
      return (
        (el as any).hasAttribute(`data-v-${block.id}`) && !!(el as any).__vtj__
      );
    } else {
      return !!(el as any).__vtj__ && !!(el as any).__context__;
    }
  }

  private findVtjElement(targets: HTMLElement[] | EventTarget[]) {
    return targets.find((el) => this.isVtjElement(el)) as VtjElement | null;
  }

  private getNodeByElement(el: VtjElement): NodeModel | null {
    const id = (el as HTMLElement).getAttribute('data-vtj') || el.__vtj__ || '';
    return NodeModel.nodes[id] || null;
  }

  private getDropType(rect: DOMRect, x: number, y: number) {
    const { left, top, width, height } = rect;
    if (x >= left && x <= left + width * 0.2) {
      return 'left';
    }
    if (x >= left + width * 0.8 && x <= left + width) {
      return 'right';
    }
    if (y >= top && y <= top + height * 0.2) {
      return 'top';
    }
    if (y >= top + height * 0.8 && y <= top + height) {
      return 'bottom';
    }
    return 'inner';
  }

  private getNodePath(
    path: EventTarget[] | HTMLElement[] = []
  ): Array<BlockModel | NodeModel> {
    const elements = path.filter((n) => this.isVtjElement(n));
    const root = this.engine.current.value as BlockModel;
    const nodePath = elements
      .map((n) => this.getNodeByElement(n as VtjElement) as NodeModel)
      .filter((n) => !!n);
    return [...nodePath, root];
  }

  private getNodePathIndex(nodePath: Array<BlockModel | NodeModel>) {
    return nodePath.map((n) => {
      if (isBlock(n)) {
        return 0;
      } else {
        return n.parent?.findChildIndex(n) || 0;
      }
    });
  }

  private setDslFrom(dsl: NodeSchema) {
    const desc = this.engine.assets.componentMap.get(dsl.name);
    dsl.from = dsl.from || desc?.package;
    if (Array.isArray(dsl.children)) {
      for (const child of dsl.children) {
        this.setDslFrom(child);
      }
    }
  }

  private createNodeDsl(desc: MaterialDescription) {
    const { name, snippet = {}, from } = desc;
    const dsl: NodeSchema = {
      ...snippet,
      name,
      from: from || desc.package
    };
    this.setDslFrom(dsl);
    return dsl;
  }

  private getElmenetByModel(model: NodeModel | BlockModel) {
    if (!this.document || !model) return null;
    if (isBlock(model)) return this.document.body;
    // todo: 需要性能优化，从渲染器 refs中获取
    const list: Array<HTMLElement> = Array.from(
      this.document.querySelectorAll('*')
    );
    return list.find(
      (el) =>
        (el as VtjElement).__vtj__ === model.id ||
        (el as any).getAttribute(`data-vtj`) === model.id
    ) as VtjElement;
  }

  private findPathByNode(node: NodeModel): Array<NodeModel | BlockModel> {
    const path: Array<NodeModel | BlockModel> = [node];
    let current: NodeModel = node;
    while (current.parent && current.parent !== current) {
      current = current.parent as NodeModel;
      if (current !== node) {
        path.unshift(current);
      }
    }
    const root = this.engine.current.value as BlockModel;
    path.unshift(root);
    return path.reverse();
  }

  getHelper(e: DragEvent | MouseEvent): DesignHelper | null {
    const targets = e.composedPath() || [];
    const el = this.findVtjElement(targets) || this.document?.body;

    if (!el) return null;
    const model = this.getNodeByElement(el) || this.engine.current.value;

    if (!model) return null;
    const rect = el.getBoundingClientRect();
    const type = this.getDropType(rect, e.clientX, e.clientY);
    const path = this.getNodePath(targets);
    const indexes = this.getNodePathIndex(path);
    return {
      el,
      model,
      rect,
      type,
      path,
      indexes
    };
  }

  cleanHelper() {
    this.setSelected(null);
    this.setHover(null);
    this.setDragging(null);
    this.setDropping(null);
  }

  async updateRect() {
    // 等待元素更新才能获取更新后的 getBoundingClientRect
    await delay(100);
    const selected = unref(this.selected);
    const hover = unref(this.hover);

    if (selected) {
      const rect = selected.el.getBoundingClientRect();
      this.selected.value = {
        ...selected,
        rect
      };
    }

    if (hover) {
      const rect = hover.el.getBoundingClientRect();
      this.hover.value = {
        ...hover,
        rect
      };
    }
  }

  async updateLines() {
    if (!this.engine.state.outlineEnabled) {
      this.lines.value = [];
      return;
    }
    // 需要等待下一帧才能获取到HTML元素
    await delay(100);
    const refs = this.engine.simulator.renderer?.context?.__refs || {};
    const lines: DOMRect[] = [];
    const ids = Object.keys(NodeModel.nodes);
    for (const id of ids) {
      const instance = refs[id];
      const instances = instance ? toArray(instance) : [];
      instances.forEach((item) => {
        const el = item?.$el || item;
        if (el && el.getBoundingClientRect) {
          const rect = el.getBoundingClientRect();
          lines.push(rect);
        }
      });
    }
    this.lines.value = lines;
  }

  setDragging(desc: MaterialDescription | null) {
    this.dragging = desc;
  }

  setDraggingNode(node: NodeModel | null) {
    this.draggingNode = node;
  }

  // 添加能力与插槽解析分开：原生 HTML 容器可以直接追加子节点。
  public async canAddComponent(
    target: NodeModel | BlockModel,
    slots?: MaterialSlot[]
  ): Promise<boolean> {
    if (isBlock(target)) return true;
    const assets = this.engine.assets;
    const desc =
      (await assets.getBlockMaterial(target.from)) ||
      assets.componentMap.get(target.name);
    if (desc?.childIncludes === false) return false;
    if (HTML_TAGS.includes(target.name)) {
      return !/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(
        target.name
      );
    }
    return (slots || (await this.getAvailableSlots(target))).length > 0;
  }

  public async addComponent(
    desc: MaterialDescription,
    target: NodeModel | BlockModel,
    options: AddComponentOptions = {}
  ): Promise<NodeModel | null> {
    const current = this.engine.current.value;
    if (!current) throw new Error('请新建或打开文件');
    const validate = () => {
      if (options.isActive && !options.isActive()) return false;
      if (!current || this.engine.current.value !== current || current.locked) {
        throw new Error('当前文件已切换或锁定，请重新选择插入目标');
      }
      if (isBlock(target)) {
        if (target.id !== current.id) {
          throw new Error('插入目标不属于当前文件');
        }
      } else {
        const contains = (nodes: NodeModel[]): boolean =>
          nodes.some(
            (node) =>
              node.id === target.id ||
              (Array.isArray(node.children) && contains(node.children))
          );
        if (target.disposed || !contains(current.nodes)) {
          throw new Error('插入目标已移除，请重新选择');
        }
        let node: NodeModel | null = target;
        while (node) {
          if (node.locked || node.invisible) {
            throw new Error('目标组件或父组件已锁定或隐藏');
          }
          node = node.parent;
        }
      }
      return true;
    };
    if (!validate()) return null;
    if (!(await this.allowDrop(target, 'inner', desc))) {
      throw new Error(`${desc.label || desc.name}不能放置到该位置`);
    }
    if (!validate()) return null;
    let slot: MaterialSlot | null | undefined;
    if (!isBlock(target)) {
      const slots = await this.getAvailableSlots(target);
      if (!(await this.canAddComponent(target, slots))) {
        throw new Error('目标组件不支持添加子组件');
      }
      if ('slot' in options) {
        const selectedSlot = slots.find(
          (item) => item.name === options.slot?.name
        );
        if ((slots.length || options.slot) && !selectedSlot) {
          throw new Error('请选择有效的目标插槽');
        }
        slot =
          selectedSlot?.name === 'default' && !selectedSlot.params?.length
            ? undefined
            : selectedSlot;
      } else {
        if (slots.length > 1) throw new Error('请选择目标插槽');
        slot = slots[0];
        if (slot?.name === 'default' && !slot.params?.length) slot = undefined;
      }
    }
    if (slot === null || !validate()) return null;
    const dsl = this.createNodeDsl(cloneDeep(desc));
    const resetIds = (schema: NodeSchema) => {
      delete schema.id;
      if (Array.isArray(schema.children)) schema.children.forEach(resetIds);
    };
    resetIds(dsl);
    const node = new NodeModel(dsl);
    node.setSlot(cloneDeep(slot), true);
    current.addNode(node, isBlock(target) ? undefined : target);
    this.engine.simulator.refresh();
    this.engine.assets.clearCaches();
    // Workspace 刷新会重建 Designer，等新实例就绪后再选中节点。
    await nextTick();
    await nextTick();
    this.engine.simulator.ready(() => {
      if (this.engine.current.value === current && !node.disposed) {
        this.engine.simulator.designer.value?.setSelected(node);
      }
    });
    return node;
  }

  async setHover(model: NodeModel | BlockModel | null) {
    await nextTick();
    if (model) {
      const el = this.getElmenetByModel(model);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const path = isBlock(model) ? [] : this.findPathByNode(model);
      this.hover.value = {
        el,
        model,
        rect,
        type: 'inner',
        path
      };
    } else {
      this.hover.value = null;
    }
  }

  async setSelected(model: NodeModel | BlockModel | null) {
    await nextTick();
    if (model) {
      // 当 model 为 slot 特殊元素时，是找不到 Elmenet，需要创建一个临时的Elmenet
      const el =
        this.getElmenetByModel(model) || this.document?.createElement('span');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const path = isBlock(model) ? [] : this.findPathByNode(model);
      this.selected.value = {
        el,
        model,
        rect,
        type: 'inner',
        path
      };
    } else {
      this.selected.value = null;
    }
  }

  async setDropping(
    model: NodeModel | BlockModel | null,
    type: DropPosition = 'inner'
  ) {
    await nextTick();
    if (model) {
      const el = this.getElmenetByModel(model);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const path = isBlock(model) ? [] : this.findPathByNode(model);
      this.dropping.value = {
        el,
        model,
        rect,
        type,
        path
      };
    } else {
      this.dropping.value = null;
    }
  }

  async allowDrop(
    target: NodeModel | BlockModel,
    type: DropPosition = 'inner',
    material?: MaterialDescription
  ) {
    const { engine } = this;
    const dragging = material || this.dragging;
    const draggingNode = material ? null : this.draggingNode;
    const current = engine.current.value;
    if (!dragging || !current) return false;
    if (isBlock(target)) return true;
    // 不能放置自身

    if (draggingNode && target.id === draggingNode.id) {
      return false;
    }
    // 防止无限递归
    if (draggingNode && draggingNode.isChild(target)) {
      return false;
    }
    if (type === 'inner' && HTML_TAGS.includes(target.name)) {
      return true;
    }

    const componentMap = engine.assets.componentMap;
    const node = type !== 'inner' ? target.parent || target : target;
    const targetDesc =
      (await engine.assets.getBlockMaterial(node.from)) ||
      componentMap.get(node.name);

    if (!targetDesc) return false;
    const { parentIncludes = true, name } = dragging;
    const { childIncludes = true } = targetDesc;

    const mathParent =
      parentIncludes === true ||
      (Array.isArray(parentIncludes) && parentIncludes.includes(node.name));

    const matchChild =
      childIncludes === true ||
      (Array.isArray(childIncludes) && childIncludes.includes(name));

    return mathParent && matchChild;
  }

  dispose() {
    const { contentWindow: cw, document: doc } = this;
    this.setSelected(null);
    this.setHover(null);
    this.setDragging(null);
    this.lines.value = [];
    if (cw && doc) {
      this.unbindEvents(cw, doc);
    }
    this.document = null;
  }
}
