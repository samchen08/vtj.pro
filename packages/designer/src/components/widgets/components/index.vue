<template>
  <Panel
    class="v-components-widget"
    title="组件库"
    :body="{ flex: true, direction: 'column' }">
    <div class="v-components-widget__search">
      <ElInput
        v-model="searchKey"
        placeholder="搜索组件"
        clearable
        size="small">
        <template v-slot:prefix><VtjIconSearch></VtjIconSearch></template>
      </ElInput>
    </div>
    <div v-if="searchKey" class="v-components-widget__result">
      <ElRow wrap="wrap" :gutter="5">
        <ElCol
          v-for="(desc, index) in searchResult"
          :span="span"
          :key="`${desc.name}_${index}`">
          <Box
            :name="desc.name"
            :title="desc.label || desc.name"
            :icon="desc.icon"
            draggable
            @dragstart="onDragStart(desc)"
            @dragend="onDragEnd"></Box>
        </ElCol>
      </ElRow>
      <ElEmpty v-if="!searchResult.length"></ElEmpty>
    </div>
    <XTabs v-else :items="tabs" v-model="currentTab">
      <template #default>
        <div class="v-components-widget__list">
          <ElCollapse v-if="currentGroup" v-model="model[currentTab]">
            <ElCollapseItem
              v-for="item of currentGroup.children"
              :key="item.name"
              :name="item.name"
              :title="`${item.label} (${item.count})`">
              <ElRow v-if="item.components" wrap="wrap" :gutter="5">
                <ElCol
                  v-for="desc in item.components"
                  :span="span"
                  :key="desc.name">
                  <Box
                    :name="desc.name"
                    :title="desc.label || desc.name"
                    :icon="desc.icon"
                    draggable
                    @dragstart="onDragStart(desc)"
                    @dragend="onDragEnd"></Box>
                </ElCol>
              </ElRow>
            </ElCollapseItem>
          </ElCollapse>
        </div>
      </template>
    </XTabs>
  </Panel>
</template>
<script lang="ts" setup>
  import {
    ElInput,
    ElCollapse,
    ElCollapseItem,
    ElRow,
    ElCol,
    ElEmpty
  } from 'element-plus';
  import { type MaterialDescription } from '@vtj/core';
  import { VtjIconSearch } from '@vtj/icons';
  import { XTabs } from '@vtj/ui';
  import { Panel, Box } from '../../shared';
  import { useColSpan, useAssets } from '../../hooks';
  import { type Designer } from '../../../framework';
  const { span, engine } = useColSpan();
  const { tabs, currentTab, currentGroup, model, searchKey, searchResult } =
    useAssets();

  const onDragStart = (desc: MaterialDescription) => {
    const designer = engine.skeleton?.getWidget('Designer')?.widgetRef
      ?.designer as Designer;
    if (designer) {
      designer.setDragging(desc);
    }
  };

  const onDragEnd = () => {
    const designer = engine.skeleton?.getWidget('Designer')?.widgetRef
      ?.designer as Designer;
    if (designer) {
      designer.setDragging(null);
    }
  };

  defineOptions({
    name: 'ComponentsWidget'
  });
</script>
