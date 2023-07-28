<template>
  <div class="vtj-context-viewer">
    <ElTree
      v-if="context"
      lazy
      :load="load"
      :expand-on-click-node="false"
      :props="{ isLeaf }">
      <template #default="{ data }">
        <DataItem :title="data.label" clickable @click="onPick(data)">
          <template #action>
            <i
              class="vtj-icon-copy"
              title="复制"
              @click.stop="onCopy(data)"></i>
          </template>
        </DataItem>
      </template>
    </ElTree>
  </div>
</template>
<script lang="ts" setup>
  import { computed, toRaw } from 'vue';
  import { ElTree, ElMessage } from 'element-plus';
  import { useCore } from '../../hooks';
  import { toRawType } from '../../utils';
  import { DataItem } from '../shared';
  import { useClipboard } from '@vueuse/core';

  const emit = defineEmits(['pick']);

  const { copy } = useClipboard({});
  const { project } = useCore();
  const context = computed(() => project.current.value?.runtimeContext);

  const excludes = ['$provider', '$apis', '$components', 'context'];

  const isLeaf = (data: any) => {
    const value = data.value;
    const type = toRawType(value);
    if (type === 'Object') {
      return Object.keys(value || {}).length === 0;
    }
    if (type === 'Array') {
      return value.length === 0;
    }
    return true;
  };

  const getChildren = (obj: any, parent = 'this') => {
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map((n, i) => {
          const label = `[${i}]`;
          return {
            label,
            value: n,
            type: toRawType(n),
            path: `${parent}${label}`
          };
        });
      }
      return Object.entries(obj)
        .map(([k, v]) => {
          return {
            label: k,
            value: v,
            type: toRawType(v),
            path: `${parent}.${k}`
          };
        })
        .filter(
          (n) => !n.label.startsWith('__') && !excludes.includes(n.label)
        );
    }
    return [];
  };

  const load = (node: any, resolve: any) => {
    if (node.level === 0) {
      resolve(getChildren(context.value));
    } else {
      const value = toRaw(node.data.value);
      resolve(getChildren(value, node.data.path));
    }
  };

  const onCopy = (item: any) => {
    copy(item.path);
    ElMessage.success({
      message: '已经复制到粘贴板'
    });
  };

  const onPick = (item: any) => {
    emit('pick', item.path);
  };
</script>
<style lang="scss">
  .vtj-context-viewer {
    padding: 10px;
    height: 100%;
    background-color: #ffff;
    overflow: auto;
    .el-tree {
      --el-tree-node-hover-bg-color: transparent;
    }
    .el-tree-node__content {
      height: 30px;
    }
  }
</style>
