<template>
  <Tabs
    class="v-workspace-region"
    :items="tabs"
    :menus="menus"
    v-model="currentTab"
    checkable
    @remove="onRemove"
    @command="onCommand"
    @action-click="onActionClick">
    <template v-for="widget in widgets" :key="widget.name">
      <WidgetWrapper
        ref="widgetsRef"
        v-if="currentTab === widget.name"
        :key="computedDesignerKey"
        :region="region"
        :widget="{ ...widget, props: openWidgetProps }"></WidgetWrapper>
    </template>
  </Tabs>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';

  import { Tabs } from '../shared';
  import { RegionType, type TabWidget } from '../../framework';
  import { WidgetWrapper } from '../../wrappers';
  import { useRegion } from '../hooks';
  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();

  const { widgets, widgetsRef } = useRegion(props.region);

  const designerKey = ref(Symbol());

  const items = reactive(
    (widgets.value as TabWidget[]).map((n) => {
      return {
        name: n.name,
        command: n.name,
        label: n.label,
        closable: !!n.closable,
        props: n.props || {},
        checked: !n.closable,
        actions: n.actions as any[]
      };
    })
  );

  const tabs = computed(() => {
    return items?.filter((n) => !n.closable || n.checked);
  });

  const menus = computed(() => {
    return items.map((n) => {
      return {
        ...n,
        disabled: !n.closable
      };
    });
  });

  const currentTab = ref(tabs.value[0]?.name);

  const computedDesignerKey = computed(() => {
    if (currentTab.value === 'Designer') {
      return designerKey.value;
    }
    return;
  });

  const openWidgetProps = computed(() => {
    const item = items.find((n) => n.name === currentTab.value);
    return item?.props || {};
  });

  const onRemove = (name: any) => {
    const item = items.find((n) => n.name === name);
    if (item) {
      item.checked = false;
    }
    if (currentTab.value === name) {
      currentTab.value = tabs.value[0]?.name;
    }
  };
  const onCommand = (e: any) => {
    const item = items.find((n) => n.name === e.name);
    if (item && item.closable) {
      item.checked = !item.checked;
      if (item.checked) {
        currentTab.value = item.name;
      }
      if (!item.checked && currentTab.value === item.name) {
        currentTab.value = tabs.value[0]?.name;
      }
    }
  };

  const openTab = (name: string, props: Record<string, any> = {}) => {
    const item = items.find((n) => n.name === name);
    if (item) {
      item.props = Object.assign({}, item.props, props);
      item.checked = true;
      currentTab.value = item.name;
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

  const reload = () => {
    if (currentTab.value === 'Designer') {
      designerKey.value = Symbol();
    }
  };

  const isDesignerActive = () => {
    return currentTab.value === 'Designer';
  };

  defineOptions({
    name: 'WorkspaceRegion'
  });

  defineExpose({
    currentTab,
    widgets,
    widgetsRef,
    openTab,
    reload,
    isDesignerActive
  });
</script>
