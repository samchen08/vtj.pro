<template>
  <Panel class="vtj-list-panel" ref="panel">
    <div v-if="props.search" class="vtj-list-panel__search">
      <ElInput
        size="small"
        v-bind="searchComputed"
        v-model="searchKeyword"
        clearable>
        <template v-slot:prefix><i class="vtj-icon-search"></i></template>
      </ElInput>
    </div>
    <ElTabs v-if="props.search && searchKeyword">
      <ElTabPane label="搜索结果">
        <slot name="search" :search="searchKeyword" :span="span"></slot>
      </ElTabPane>
    </ElTabs>
    <ElTabs
      v-show="props.tabs && !searchKeyword"
      v-model="currentTabName"
      class="vtj-list-panel__tabs">
      <ElTabPane
        v-for="tab in props.tabs"
        :key="(tab as ITabItem).name"
        :label="(tab as ITabItem).label"
        :name="(tab as ITabItem).name"
        lazy>
        <slot name="tab" :tab="tab" :span="span">
          <component
            v-if="(tab as ITabItem).component"
            :is="(tab as ITabItem).component"
            :tab="(tab as ITabItem).name"
            :currentTab="currentTabName"
            :search="searchKeyword"
            :span="span"
            v-bind="(tab as ITabItem).props">
          </component>
        </slot>
      </ElTabPane>
    </ElTabs>
    <slot
      :currentTab="currentTabName"
      :search="searchKeyword"
      :span="span"></slot>
  </Panel>
</template>
<script lang="ts" setup>
  import Panel from './Panel.vue';
  import { ElInput, ElTabs, ElTabPane } from 'element-plus';
  import { ref, watch, computed } from 'vue';
  import { useResizeObserver } from '@vueuse/core';

  export interface ITabItem {
    label: string;
    name: string;
    component?: any;
    props?: Record<string, any>;
  }

  export interface Props {
    search?: boolean | Record<string, any>;
    tabs?: ITabItem[];
    columnWidth?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    search: false,
    tabs: undefined,
    columnWidth: 100
  });

  const panel = ref(null);
  const span = ref(6);

  const emit = defineEmits(['search-change']);

  const searchKeyword = ref('');

  const searchComputed = computed(() =>
    typeof props.search === 'boolean' ? {} : props.search
  );

  watch(searchKeyword, () => {
    emit('search-change', searchKeyword.value);
  });

  const currentTabName = ref((props.tabs as ITabItem[])?.[0]?.name);

  useResizeObserver(panel as any, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    const count = Math.min(Math.floor(width / 120), 24);
    span.value = Math.floor(24 / count);
  });
</script>

<style lang="scss">
  .vtj-list-panel {
    &__tabs {
      .el-tabs__item {
        padding: 0 10px;
      }
    }
  }
</style>
