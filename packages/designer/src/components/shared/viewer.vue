<template>
  <div class="v-context-viewer">
    <ElTree
      v-if="context"
      lazy
      :load="load"
      :expand-on-click-node="false"
      :props="{ isLeaf }">
      <template #default="{ data }">
        <Item
          :title="data.label"
          :subtitle="data.type"
          :subtitle-cls="data.type"
          clickable
          @click="onPick(data)"
          background
          :actions="['copy']"
          @action="onCopy(data)"
          grow
          small>
        </Item>
      </template>
    </ElTree>
  </div>
</template>
<script lang="ts" setup>
  import { toRaw } from 'vue';
  import { ElTree } from 'element-plus';
  import { toRawType } from '@vtj/utils';
  import { type Context } from '@vtj/renderer';
  import Item from './item.vue';
  import { getClassProperties } from '../../utils';

  export interface Props {
    context: Context | null;
  }

  const props = defineProps<Props>();

  const emit = defineEmits(['pick', 'copy']);

  // const context = computed(() => project.current.value?.runtimeContext);

  const excludes = ['$provider', '$apis', '$components', 'context'];

  const isLeaf = (data: any) => {
    const value = data.value;
    const type = toRawType(value);
    if (type === 'Object' || type === 'Module') {
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

      const keys = getClassProperties(obj);
      return keys
        .map((k) => {
          const v = obj[k];
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
      resolve(getChildren(props.context));
    } else {
      const value = toRaw(node.data.value);
      resolve(getChildren(value, node.data.path));
    }
  };

  const onCopy = (item: any) => {
    emit('copy', item.path);
  };

  const onPick = (item: any) => {
    emit('pick', item.path);
  };
</script>
