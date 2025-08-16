<template>
  <Tabs
    class="v-workspace-region"
    :items="tabs"
    :menus="menus"
    v-model="activeFileId"
    checkable
    @remove="onCloseTab"
    @action-click="onActionClick">
    <template #menus>
      <XAction
        v-for="item of menus"
        mode="icon"
        size="small"
        :type="menuChecked === item.name ? 'primary' : 'info'"
        background="always"
        :label="item.label"
        @click="onMenuChecked(item)">
      </XAction>
      <ActionMenu :menus="actions" @command="onActionCommand"></ActionMenu>
    </template>
    <template v-for="widget in widgets" :key="widget.name">
      <WidgetWrapper
        ref="widgetsRef"
        v-if="refresh && menuChecked === widget.name"
        :key="`${menuChecked}_${activeFileId}`"
        :region="region"
        :widget="{ ...widget, props: {} }"></WidgetWrapper>
    </template>
  </Tabs>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { XAction } from '@vtj/ui';
  import { Tabs, ActionMenu } from '../shared';
  import { RegionType } from '../../framework';
  import { WidgetWrapper } from '../../wrappers';
  import { useRegion, useWorkspace } from '../hooks';

  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();
  const { widgets, widgetsRef } = useRegion(props.region);
  const {
    tabs,
    menus,
    activeFileId,
    menuChecked,
    onCloseTab,
    onMenuChecked,
    closeAllTabs,
    closeOtherTabs
  } = useWorkspace(widgets);
  const refresh = ref(true);
  const openTab = (_name: string, props: Record<string, any> = {}) => {
    const url = props.url;
    if (url) {
      window.open(url);
    }
  };

  const onActionClick = (e: any) => {
    if (widgetsRef.value) {
      const currentRef = widgetsRef.value[0]?.widgetRef;
      if (!currentRef) return;
      switch (e.name) {
        case 'home':
          currentRef.reload();
          break;
      }
    }
  };

  const reload = async () => {
    refresh.value = false;
    await nextTick();
    refresh.value = true;
  };

  const isDesignerActive = () => {
    return menuChecked.value === 'Designer';
  };

  const actions = [
    {
      label: '关闭其他',
      value: 'other',
      command: 'other'
    },
    {
      label: '关闭全部',
      value: 'all',
      command: 'all'
    }
  ];

  const onActionCommand = (command: string) => {
    if (command === 'all') {
      closeAllTabs();
    } else if (command === 'other') {
      closeOtherTabs();
    }
  };

  defineOptions({
    name: 'WorkspaceRegion'
  });

  defineExpose({
    currentTab: activeFileId,
    widgets,
    widgetsRef,
    openTab,
    reload,
    isDesignerActive
  });
</script>
