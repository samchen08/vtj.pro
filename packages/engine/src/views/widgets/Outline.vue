<template>
  <Panel title="大纲树" class="vtj-outline">
    <ElTree
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
      @mouseover="handleMouseOver">
      <template #default="{ data }">
        <div :key="data.node.id" class="vtj-outline__item">
          <span>
            {{ data.label }}:
            <i :class="`is-${data.nodeType}`">{{ data.nodeType }}</i>
          </span>
          <span v-if="!isRoot(data.node)" class="vtj-outline__actions">
            <i
              v-if="!data.node.lock"
              @click.stop="setLock(data.node, true)"
              class="vtj-icon-lock"
              title="锁定"></i>
            <i
              v-if="data.node.lock"
              @click.stop="setLock(data.node, false)"
              class="vtj-icon-unlock"
              title="解锁"></i>
            <i
              v-if="!data.node.invisible && !data.node.lock"
              @click.stop="setInvisible(data.node, true)"
              class="vtj-icon-invisible"
              title="设置隐藏"></i>
            <i
              v-if="data.node.invisible && !data.node.lock"
              @click.stop="setInvisible(data.node, false)"
              class="vtj-icon-visible"
              title="设置显示"></i>
            <i
              v-if="data.node.root !== data.node && !data.node.lock"
              @click="handleCopy(data.node)"
              class="vtj-icon-copy"
              title="复制"></i>
            <i
              v-if="data.node.root !== data.node && !data.node.lock"
              @click.stop="handleRemove(data.node)"
              class="vtj-icon-remove"
              title="删除"></i>
          </span>
          <span class="vtj-outline__status">
            <i
              v-if="data.node.invisible"
              class="vtj-icon-invisible"
              title="不可见"></i>
            <i v-if="data.node.lock" class="vtj-icon-lock" title="已锁定"></i>
          </span>
        </div>
      </template>
    </ElTree>
  </Panel>
</template>
<script lang="ts" setup>
  import Panel from '../shared/Panel.vue';
  import { ElTree, ElMessageBox } from 'element-plus';
  import { computed, watch, ref, Ref, onUnmounted } from 'vue';
  import { Node, Block } from '../../models';
  import { useCore } from '../../hooks';
  import { Designer } from '../../core';
  import {
    emitter,
    EVENT_NODE_CHANGE,
    EVENT_OUTLINE_SELECTED,
    EVENT_OUTLINE_HOVER,
    EVENT_OUTLINE_CHANGE,
    DropHelperType
  } from '../../core';
  import { isBlock } from '../../utils';

  export interface ITreeItem {
    id: string;
    label: string;
    nodeType: string;
    node: Block | Node;
    children: ITreeItem[];
  }

  const { engine, project, assets } = useCore();

  const designer = computed<Designer>(
    () => engine.skeleton.widgetInstances['designer']?.designer
  );

  const currentNodeKey = computed(() => {
    return designer.value.selected?.value?.node.id;
  });

  const isRoot = (node: Block | Node) => {
    return node.root === null;
  };

  const tree: Ref<ITreeItem[]> = ref([]);

  function getNodeType(node: Block | Node) {
    if (isBlock(node)) {
      return 'Block';
    } else {
      if (node.slot && node.slot.name) {
        return `#${node.slot.name}`;
      }
      return 'Node';
    }
  }

  function toTree(nodes: Array<Block | Node>) {
    const tree: ITreeItem[] = [];

    nodes.forEach((node) => {
      const item: ITreeItem = {
        id: node.id,
        label: node.name,
        nodeType: getNodeType(node),
        node,
        children: []
      };
      if (Array.isArray(node.children)) {
        item.children = toTree(node.children);
      }

      tree.push(item);
    });

    return tree;
  }

  function refreshTree() {
    tree.value = project.current.value ? toTree([project.current.value]) : [];
  }

  watch(project.current, refreshTree, { immediate: true });

  emitter.on(EVENT_NODE_CHANGE, refreshTree);
  onUnmounted(() => {
    emitter.off(EVENT_NODE_CHANGE, refreshTree);
  });

  // const tree = computed(() => {
  //   if (project.current.value) {
  //     return toTree([project.current.value]);
  //   }
  //   return [];
  // });

  const handleDrop = async (dragging: any, drop: any, type: any) => {
    const item: ITreeItem = dragging.data;
    const target: ITreeItem = drop.data;
    const targetNode = target.node;
    const current = project.current.value;
    if (!current || !designer.value || !targetNode) return;
    const node = item.node as Node;
    node.slot = await designer.value.getDropSlot(
      type === 'inner' ? targetNode : targetNode.parent
    );
    const dropType =
      { before: 'left', after: 'right' }[type as string] || 'inner';

    current.move(node, targetNode, dropType as DropHelperType);
    emitter.emit(EVENT_OUTLINE_CHANGE, node);
  };

  const allowDrag = (node: any) => {
    const item: ITreeItem = node.data;
    // 页面不能拖
    if (isBlock(item.node)) return false;
    // 锁定的节点不能更改
    if (item.node.lock) return false;

    // 插槽模板不能拖
    return item.node.name !== 'template';
  };

  const allowDrop = (dragging: any, drop: any, type: any) => {
    const dragItem: ITreeItem = dragging.data;
    const dropItem: ITreeItem = drop.data;
    // 锁定的节点不能更改
    if (dropItem.node.lock) return false;

    // 不能放到和根结点同级
    if (isBlock(dropItem.node) && ['prev', 'next'].includes(type)) {
      return false;
    }

    const current = project.current.value;
    if (!current) return false;

    const desc = assets.componentMap[dragItem.node.name];
    if (type === 'inner') {
      return current.allowDrop(desc, dropItem.node, assets);
    } else {
      const node = (dropItem.node as Node).parent;
      return node && current.allowDrop(desc, node, assets);
    }
  };

  const setInvisible = (node: Node, ivisible: boolean) => {
    node.invisible = ivisible;
    emitter.emit(EVENT_NODE_CHANGE, node);
    emitter.emit(EVENT_OUTLINE_CHANGE, node);
  };

  const setLock = (node: Node, lock: boolean) => {
    node.lock = lock;
    emitter.emit(EVENT_NODE_CHANGE, node);
    emitter.emit(EVENT_OUTLINE_CHANGE, node);
  };

  const handleCurrentChange = (current: any) => {
    const node = current?.node;
    if (!node || node.invisible) return;
    emitter.emit(EVENT_OUTLINE_SELECTED, node);
  };

  const handleMouseOver = (e: any) => {
    const vm = e.target?.__vueParentComponent;
    if (!vm) return;
    const item: ITreeItem = vm.ctx?.node?.data;
    if (!item) return;
    if (!item.node.invisible) {
      emitter.emit(EVENT_OUTLINE_HOVER, item.node);
    }
  };

  const handleCopy = (node: Node) => {
    node.copy();
    emitter.emit(EVENT_OUTLINE_CHANGE, node);
  };

  const handleRemove = (node: Node) => {
    ElMessageBox.confirm('确定删除吗？', '提示', {
      type: 'warning'
    }).then(() => {
      node.dispose();
      emitter.emit(EVENT_OUTLINE_CHANGE, node);
    });
  };
</script>

<style lang="scss">
  @use '../../style/vars' as *;

  .vtj-outline {
    .el-tree-node__label {
      width: 100%;
    }
    &__item {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      &:hover {
        .vtj-outline__actions {
          i {
            color: $vtj-color;
            display: inline;
          }
        }
        .vtj-outline__status {
          display: none;
        }
      }
      i[class^='is-#'] {
        font-size: 12px;
        color: $vtj-danger-color;
      }
    }
    &__status {
      i {
        padding: 3px 5px;
      }
      .vtj-icon-invisible {
        color: $vtj-warning-color;
      }
      .vtj-icon-lock {
        color: $vtj-warning-color;
      }
    }

    &__actions {
      i {
        padding: 3px 5px;
        display: none;
        &:hover {
          background-color: $vtj-primary-color-light-9;
          border-radius: 4px;
          color: $vtj-primary-color;
        }
      }
    }

    &__id {
      font-size: 12px;
      color: #999;
    }

    .is-drop-inner .is-drop-inner {
      background: $vtj-primary-color-light-9;
    }
    .vtj-panel__body {
      height: 1px;
    }
  }
</style>
