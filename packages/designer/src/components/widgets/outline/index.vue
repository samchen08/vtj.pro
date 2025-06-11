<template>
  <Panel class="v-outline-widget" title="大纲树">
    <ElTree
      :key="engine.changed.value"
      :data="tree"
      node-key="id"
      default-expand-all
      draggable
      empty-text="请新建或打开文件"
      :current-node-key="currentNodeKey"
      :highlight-current="true"
      :expand-on-click-node="false"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @current-change="handleCurrentChange"
      @node-drop="handleDrop"
      @node-drag-start="handleDragStart"
      @node-drag-end="handleDragEnd">
      <template #default="{ data, node }">
        <Item
          class="v-outline-widget__item"
          :class="{
            'is-locked': data.model.locked,
            'is-invisible': data.model.invisible,
            'is-dragging': data.dragging,
            'is-slot': data.type === 'slot'
          }"
          :active="
            !data.model.invisible && node.isCurrent && data.type !== 'slot'
          "
          grow
          small
          background
          hover
          :model-value="data.model"
          :icon="
            data.model.locked
              ? VtjIconLock
              : data.model.invisible
                ? VtjIconInvisible
                : undefined
          "
          :title="data.label"
          :subtitle="data.type"
          :actions="getActions(data.model, data.type)"
          @action="onAction"
          @mouseenter="onMouseEnter(data)"
          @mouseleave="onMouseLeave">
        </Item>
      </template>
    </ElTree>
  </Panel>
</template>
<script lang="ts" setup>
  import { computed, watch, ref, nextTick, type Ref } from 'vue';
  import { ElTree, ElMessage } from 'element-plus';
  import {
    type NodeModel,
    type BlockModel,
    type DropPosition,
    type MaterialDescription,
    isBlock
  } from '@vtj/core';
  import { VtjIconLock, VtjIconInvisible } from '@vtj/icons';
  import { Panel, Item } from '../../shared';
  import { useSelected, useCurrent } from '../../hooks';

  export interface TreeNodeData {
    id: string;
    label: string;
    type: string;
    model: NodeModel;
    children?: TreeNodeData[];
    dragging?: boolean;
    disabled?: boolean;
  }

  export interface TreeRootData {
    id: string;
    label: string;
    type: string;
    model: BlockModel;
    children: TreeNodeData[];
  }

  defineOptions({
    name: 'OutlineWidget'
  });

  const { engine, designer, selected } = useSelected();
  const { current } = useCurrent();
  const tree: Ref<TreeRootData[]> = ref([]);

  const getActions = (node: BlockModel | NodeModel, type: string): any[] => {
    if (type === 'slot') return [];
    if (isBlock(node)) {
      return node.locked ? ['unlock'] : ['lock'];
    }
    const parent = node.parent;
    if (parent && (parent.locked || parent.invisible)) {
      return [];
    } else {
      if (current.value?.locked) {
        return [];
      }
    }

    if (node.locked) {
      return ['unlock'];
    }
    if (node.invisible) {
      return ['visible'];
    }

    return ['lock', 'invisible', 'copy', 'remove'];
  };

  const groupBySlots = (children: NodeModel[], parent: NodeModel) => {
    const slots: Record<string, NodeModel[]> = {};
    const hasSlot = children.some((child) => child.slot);
    if (!hasSlot) return toTree(children);
    for (const child of children) {
      const slotName = child.slot?.name || 'default';
      if (!slots[slotName]) {
        slots[slotName] = [];
      }
      slots[slotName].push(child);
    }
    const result: TreeNodeData[] = [];
    for (const [name, nodes] of Object.entries(slots)) {
      result.push({
        id: `${parent.id}-${name}`,
        label: `#${name}`,
        type: 'slot',
        model: parent,
        disabled: true,
        children: toTree(nodes)
      });
    }
    return result;
  };

  const toTree = (models: NodeModel[]) => {
    const items: TreeNodeData[] = [];
    models.forEach((model) => {
      const item: TreeNodeData = {
        id: model.id,
        label: model.name,
        type: model.id, //getNodeType(model),
        model
      };
      if (Array.isArray(model.children)) {
        item.children = groupBySlots(model.children, model);
      }
      items.push(item);
    });
    return items;
  };

  const createTree = (): TreeRootData[] => {
    if (!current.value) return [];
    const { id, name, nodes } = current.value;
    const root: TreeRootData[] = [
      {
        id,
        label: name,
        type: id,
        model: current.value,
        children: toTree(nodes)
      }
    ];
    return root;
  };

  const refreshTree = async () => {
    tree.value = createTree();
    if (selected.value?.model) {
      await nextTick();
      designer.value?.setSelected(selected.value.model);
    }
  };

  const currentNodeKey = computed(() => {
    return selected.value?.model.id;
  });

  const allowDrag = async (node: any) => {
    const item: TreeRootData | TreeNodeData = node.data;
    if (item.type === 'slot') return false;
    // 页面不能拖
    if (isBlock(item.model)) return false;
    // 锁定的节点不能更改
    if (item.model.locked) return false;
    // 插槽模板不能拖
    if (item.model.name === 'template') {
      return false;
    }

    let desc = engine.assets.componentMap.get(item.model.name);
    const from = (item.model as NodeModel).from;
    if (!desc && from) {
      desc = (await engine.assets.getBlockMaterial(
        from
      )) as MaterialDescription;
    }

    if (desc) {
      designer.value?.setDragging(desc);
      return true;
    }
    return false;
  };

  // todo: ElTree 不支持异步判断，需要改造该方法
  const allowDrop = async (_dragging: any, drop: any, type: any) => {
    const data: TreeRootData | TreeNodeData = drop.data;
    const typeMap: Record<string, string> = {
      prev: 'top',
      next: 'bottom',
      inner: 'inner'
    };
    const dropType = typeMap[type] as DropPosition;
    let ret = false;
    // 不能放置Block同级
    if (isBlock(data.model)) {
      ret = type === 'inner';
      designer.value?.setDropping(ret ? data.model : null, 'inner');
    } else {
      const node: NodeModel = data.model;
      ret = !!(await designer.value?.allowDrop(node, dropType));
      designer.value?.setDropping(ret ? node : null, 'inner');
    }
    return ret;
  };

  const handleCurrentChange = (cur: any) => {
    const node = cur?.model;
    if (!node || node.invisible || cur.type === 'slot') {
      designer.value?.setSelected(null);
      designer.value?.setHover(null);
      return;
    }
    designer.value?.setSelected(node);
    designer.value?.setHover(null);
  };

  const handleDrop = async (dragging: any, drop: any, type: any) => {
    const item: TreeNodeData = dragging.data;
    const target: TreeRootData | TreeNodeData = drop.data;
    if (isBlock(target.model)) {
      const node = item.model as NodeModel;
      delete node.slot;
      current.value?.move(node, undefined, 'inner');
      designer.value?.setDropping(null);
      designer.value?.setDragging(null);
      return;
    }
    const targetNode: NodeModel = target.model;
    const dropType =
      { before: 'left', after: 'right' }[type as string] || 'inner';
    const ret = await designer.value?.allowDrop(
      targetNode,
      dropType as DropPosition
    );

    if (!ret) {
      designer.value?.setDropping(null);
      refreshTree();
      ElMessage.warning({
        message: `${item.model.name}不能放置到该位置`
      });
      designer.value?.setDragging(null);
      return;
    }

    const slot = await designer.value?.getDropSlot(
      type === 'inner' ? targetNode : targetNode.parent
    );

    if (slot !== null) {
      const node = item.model as NodeModel;
      node.slot = slot;
      current.value?.move(node, targetNode, dropType as DropPosition);
    } else {
      // 用户不选择插槽，还原树
      refreshTree();
    }
    designer.value?.setDropping(null);
    designer.value?.setDragging(null);
    engine.simulator.refresh();
  };

  const onMouseEnter = (data: TreeNodeData | TreeRootData) => {
    if (data.type === 'slot') {
      designer.value?.setHover(null);
      return;
    }
    if (isBlock(data.model)) {
      designer.value?.setHover(data.model);
    } else {
      designer.value?.setHover(data.model);

      if (data.model.invisible) {
        designer.value?.setHover(null);
      }

      if (data.model.name === 'slot') {
        designer.value?.setHover(null);
      }
    }
  };

  const onMouseLeave = () => {
    designer.value?.setHover(null);
  };

  const handleDragStart = (node: any) => {
    const data: TreeNodeData = node.data;
    data.dragging = true;
    const desc = engine.assets.componentMap.get(data.model.name);
    if (desc) {
      designer.value?.setDragging(desc);
    }
  };

  const handleDragEnd = async (node: any) => {
    const data: TreeNodeData = node.data;
    data.dragging = false;
    // designer.value?.setDragging(null);
  };

  const cleanHelper = (
    selectedNode: BlockModel | NodeModel | undefined,
    model: NodeModel
  ) => {
    if (!selectedNode) return;
    if (
      selectedNode.id === model.id ||
      (!isBlock(selectedNode) && model.isChild(selectedNode))
    ) {
      designer.value?.setSelected(null);
    }
    designer.value?.setHover(null);
  };

  const onAction = (action: any) => {
    const { name, modelValue: model } = action;
    const selectedNode = selected.value?.model;
    switch (name) {
      case 'lock':
        cleanHelper(selectedNode, model);
        model.lock();
        break;
      case 'unlock':
        cleanHelper(selectedNode, model);
        model.unlock();
        break;
      case 'invisible':
        cleanHelper(selectedNode, model);
        model.setVisible(false);
        break;
      case 'visible':
        model.setVisible(true);
        break;
      case 'copy':
        const node = current.value?.cloneNode(model);
        if (node) {
          designer.value?.setSelected(node);
        }
        break;
      case 'remove':
        cleanHelper(selectedNode, model);
        current.value?.removeNode(model);

        break;
    }
  };

  watch(engine.changed, refreshTree, { immediate: true });
</script>
