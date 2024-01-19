<template>
  <XContainer v-if="current" class="v-settings-region" fit direction="column">
    <XContainer
      v-if="selected"
      flex
      justify="space-between"
      align="center"
      class="v-settings-region__header">
      <XContainer class="v-settings-region__title">
        <VtjIconLayers></VtjIconLayers>
        <span>
          {{ selected?.model.name }}:
          <i>{{ selected?.model.id }}</i>
        </span>
      </XContainer>
      <XContainer v-if="docUrl">
        <XAction
          @click="openDocs"
          :icon="VtjIconHelp"
          mode="text"
          label="帮助"></XAction>
      </XContainer>
    </XContainer>

    <XContainer v-if="selected && !selected.model.locked" grow :padding="false">
      <Tabs
        :items="tabs"
        v-model="currentTab"
        stretch
        :body="{ padding: false }">
        <template v-for="widget in widgets" :key="widget.name">
          <WidgetWrapper
            ref="widgetsRef"
            v-if="currentTab === widget.name"
            :region="region"
            :widget="widget"></WidgetWrapper>
        </template>
      </Tabs>
    </XContainer>

    <ElEmpty v-if="!selected" description="请在左侧画布选中节点"></ElEmpty>

    <ElEmpty
      v-if="selected && selected.model.locked"
      :image-size="1"
      description="节点已被锁定, 禁止编辑"></ElEmpty>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { XContainer, XAction } from '@vtj/ui';
  import { VtjIconLayers, VtjIconHelp } from '@vtj/icons';
  import { ElEmpty } from 'element-plus';

  import {
    RegionType,
    WidgetGroup,
    useEngine,
    type TabWidget
  } from '../../framework';
  import { WidgetWrapper } from '../../wrappers';
  import { Tabs } from '../shared';
  import { useRegion, useCurrent, useSelected } from '../hooks';

  export interface Props {
    region: RegionType;
  }

  const props = defineProps<Props>();
  const engine = useEngine();
  const { current } = useCurrent();
  const { selected, isSelectBlock } = useSelected();

  const group = computed(() =>
    isSelectBlock.value ? WidgetGroup.Block : WidgetGroup.Node
  );

  const { widgets, widgetsRef } = useRegion(props.region, group);

  const tabs = computed(() => {
    return (widgets.value as TabWidget[]).map((n) => {
      return {
        name: n.name,
        label: n.label
      };
    });
  });

  const currentTab = ref('');

  const docUrl = computed(() => {
    const node = selected.value?.model;
    if (node) {
      const desc = engine.assets.componentMap.get(node.name);
      return desc?.doc;
    }
    return null;
  });

  watch(current, (v) => {
    engine.skeleton?.settable(!!v);
  });

  watch(
    group,
    () => {
      currentTab.value = tabs.value[0]?.name;
    },
    { immediate: true }
  );

  const openDocs = () => {
    if (docUrl.value) {
      const region = engine.skeleton?.getRegion('Workspace');
      if (region) {
        region.regionRef.openTab('Docs', {
          url: docUrl.value
        });
      }
    }
  };

  defineOptions({
    name: 'SettingsRegion'
  });

  defineExpose({
    widgets,
    widgetsRef
  });
</script>
