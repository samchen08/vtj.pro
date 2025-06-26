<template>
  <div class="v-apps-region">
    <div class="v-apps-region__header">
      <div class="v-apps-region__top">
        <Icon
          v-for="widget in panelWidgets"
          :key="`icon-${widget.name}`"
          :icon="widget.icon"
          :label="widget.label"
          :active="active?.name === widget.name"
          :open="open?.name === widget.name"
          @click="handleClickItem(widget)"></Icon>
      </div>
      <div class="v-apps-region__bottom">
        <Icon
          v-for="widget in otherWidgets"
          :key="`icon-${widget.name}`"
          :icon="widget.icon"
          :label="widget.label"
          @click="handleClickOtherItem(widget)"></Icon>
      </div>
    </div>
    <div class="v-apps-region__panels">
      <template v-for="widget in panelWidgets" :key="widget.name">
        <KeepAlive>
          <WidgetWrapper
            ref="widgetsRef"
            v-if="active?.name === widget.name"
            :region="region"
            :widget="widget"></WidgetWrapper>
        </KeepAlive>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // @ts-ignore
  import { computed, ref, KeepAlive, watch, h } from 'vue';
  import { createDialog } from '@vtj/ui';
  import { WidgetWrapper } from '../../wrappers';
  import { useEngine, RegionType, type AppWidget } from '../../framework';
  import { Icon } from '../shared';
  import { useRegion, useOpenApi } from '../hooks';

  export interface Props {
    region: RegionType;
    index?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    index: 0
  });
  const engine = useEngine();
  const { isLogined, toRemoteAuth } = useOpenApi();
  const { widgets, widgetsRef } = useRegion(props.region);
  const panelWidgets = computed(() => {
    return (widgets.value as AppWidget[]).filter((n) => {
      return n.openType === 'panel';
    });
  });
  const otherWidgets = computed(() => {
    return (widgets.value as AppWidget[]).filter((n) => {
      return n.openType !== 'panel';
    });
  });

  const defaultWidget = panelWidgets.value[props.index];
  const active = ref<AppWidget | null>(defaultWidget);
  const open = ref<AppWidget | null>(defaultWidget);

  const handleClickItem = (item: AppWidget) => {
    active.value = item;
    open.value = open.value?.name === item.name ? null : item;
  };

  const handleClickOtherItem = (item: AppWidget) => {
    if (item.openType === 'link') {
      if (item.url) {
        window.open(item.url);
      }
    }
    if (item.openType === 'dialog') {
      createDialog({
        title: item.label,
        // icon: item.icon,
        ...item.props,
        content: h(item.component, { engine, isLogined, toRemoteAuth })
      });
    }
  };

  watch(open, (v) => {
    engine.skeleton?.toggleCollapse(!v);
  });

  const setActive = (name: string) => {
    const widget = panelWidgets.value.find((n) => n.name === name) as AppWidget;
    active.value = widget;
    open.value = widget;
  };

  defineOptions({
    name: 'AppsRegion',
    inheritAttrs: false
  });

  defineExpose({
    active,
    widgets,
    widgetsRef,
    setActive
  });
</script>
