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
import { type Context } from '@vtj/renderer';
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
import { delay, toArray } from '@vtj/utils';
import { SlotsPicker } from '../components';
import { type Engine } from './engine';
import { type DevTools } from './devtools';

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
    public dependencies: Ref<Dependencie[]>,
    public devtools: DevTools
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
      this.devtools.isOpen,
      (open) => {
        if (open) {
          this.cleanHelper();
        }
      },
      { immediate: true }
    );
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
    if (this.devtools.isOpen.value) return;
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

  public async getDropSlot(to: NodeModel | null) {
    if (!to) return undefined;
    const { engine, dropping } = this;
    const vueInstance = dropping.value
      ? this.getVueInstance(dropping.value, to.id)
      : null;
    const dynamicSlots: string[] = vueInstance?.$vtjDynamicSlots
      ? vueInstance.$vtjDynamicSlots()
      : [];
    const assets = engine.assets;
    const componentMap = assets.componentMap;
    const targetDesc =
      (await assets.getBlockMaterial(to.from)) || componentMap.get(to.name);

    // 物料没有定义插槽，组件也没有动态插槽
    if (!targetDesc?.slots && dynamicSlots.length === 0) return undefined;
    const mergeSlots = (targetDesc?.slots || ['default']).concat(dynamicSlots);

    const slots: MaterialSlot[] = mergeSlots.map((n) => {
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
    if (this.devtools.isOpen.value) return;
    // 与 vue-devtools 冲突，不能阻止冒泡
    if (!this.engine.state.activeEvent) {
      e.stopPropagation();
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
    return !!(el as any).__vtj__ && !!(el as any).__context__;
  }

  private findVtjElement(targets: HTMLElement[] | EventTarget[]) {
    return targets.find((el) => this.isVtjElement(el)) as VtjElement | null;
  }

  private getNodeByElement(el: VtjElement): NodeModel | null {
    const id = el.__vtj__ ?? '';
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
      (el) => (el as VtjElement).__vtj__ === model.id
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
    return {
      el,
      model,
      rect,
      type,
      path
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
    type: DropPosition = 'inner'
  ) {
    const { dragging, engine, draggingNode } = this;
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
