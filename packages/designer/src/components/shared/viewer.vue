<template>
  <div class="v-context-viewer">
    <div class='v-context-viewer__body'>
      <ElInput
        v-model="filterText"
        size="small"
        clearable
        :prefix-icon="Search"
        placeholder="筛选可用项"></ElInput>
      <div class='v-context-viewer__tree'>
        <ElTree
          ref="treeRef"
          v-if="context"
          lazy
          :load="load"
          :expand-on-click-node="false"
          :props="{ isLeaf }"
          :filter-node-method="filterNode"
        >
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
          <template #empty>
            <ElEmpty class='empty-wrapper'></ElEmpty>
          </template>
        </ElTree>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { toRaw, ref, watch } from 'vue';
  import { ElTree, ElInput, ElEmpty } from 'element-plus';
  import { toRawType } from '@vtj/utils';
  import { type Context } from '@vtj/renderer';
  import Item from './item.vue';
  import { getClassProperties } from '../../utils';
  import { Search } from '@vtj/icons';

  export interface Props {
    context: Context | null;
  }

  interface Tree {
    [key: string]: any
  }

  const props = defineProps<Props>();

  const emit = defineEmits(['pick', 'copy']);

  // const context = computed(() => project.current.value?.runtimeContext);

  const excludes = ['$provider', '$apis', '$components', 'context'];

  const filterText = ref('');
  const treeRef = ref<InstanceType<typeof ElTree>>()

  watch(filterText, (val) => {
    treeRef.value!.filter(val);
  });

  const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.label.includes(value)
  };

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

<style scoped lang='scss'>
  .v-context-viewer {
    height: 100%;
    .v-context-viewer__body {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      .v-context-viewer__tree {
        flex-grow: 1;
        overflow-y: scroll;
      }
    }
  }
  .empty-wrapper {
    padding-left: 6px;
  }
</style>
