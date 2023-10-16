<template>
  <ListPanel
    class="vtj-components"
    title="组件库"
    :search="search"
    :tabs="tabs"
    @search-change="handleSearch">
    <ElEmpty
      v-if="!componentGroups || componentGroups.length === 0"
      description="暂无数据"></ElEmpty>

    <template #search="{ span }">
      <ComponentList :list="searchResult" :span="span"></ComponentList>
    </template>

    <template #tab="{ tab, span }">
      <ComponentList
        v-if="groupComponentMap[tab.name].components"
        :list="groupComponentMap[tab.name].components"
        :span="span"></ComponentList>
      <ElCollapse
        v-if="groupComponentMap[tab.name].children?.length"
        v-model="model[tab.name]">
        <ElCollapseItem
          v-for="(category, index) in groupComponentMap[tab.name].children"
          :key="category.name"
          :title="`${category.label} (${category.count})`"
          :name="index">
          <ComponentList
            :list="category.components"
            :span="span"></ComponentList>
        </ElCollapseItem>
      </ElCollapse>
      <ElEmpty
        v-if="
          !groupComponentMap[tab.name].components &&
          groupComponentMap[tab.name].children?.length === 0
        "
        description="暂无数据"></ElEmpty>
    </template>
  </ListPanel>
</template>
<script lang="ts" setup>
  import { computed, reactive, watchEffect } from 'vue';
  import ListPanel from '../shared/ListPanel.vue';
  import ComponentList from '../shared/ComponentList.vue';
  import { useComponentsSearch, useCore } from '../../hooks';
  import { IComponentGroup, builtInComponents } from '../../core';
  import { ElCollapse, ElCollapseItem, ElEmpty } from 'element-plus';

  const search = {
    placeholder: '搜索组件'
  };

  const { engine } = useCore();

  const { componentGroups, components } = engine.assets || {};

  const groupComponentMap = computed(() => {
    const map: Record<string, IComponentGroup> = {};
    if (componentGroups) {
      componentGroups.forEach((group) => {
        map[group.name] = group;
      });
    }
    return map;
  });

  const tabs = computed(() => {
    if (!componentGroups) return [];
    return componentGroups.map((n) => ({
      label: `${n.label} (${n.count})`,
      name: n.name,
      disabled: !n.children?.length
    }));
  });

  const getDefaultModelValue = (categories: any[] = []) => {
    return categories.map((n, i) => i);
  };

  const model = reactive({} as Record<string, any>);

  watchEffect(() => {
    const result = tabs.value.reduce(
      (res, current) => {
        res[current.name] = getDefaultModelValue(
          groupComponentMap.value[current.name].children
        );
        return res;
      },
      {} as Record<string, any>
    );
    Object.assign(model, result);
  });

  const { searchKey, searchResult } = useComponentsSearch(components);

  const handleSearch = (keyword: any) => {
    searchKey.value = keyword;
  };
</script>

<style lang="scss">
  @use '../../style/vars' as *;

  .vtj-components {
    min-width: 60px;
    .vtj-panel__body {
      display: flex;
      flex-direction: column;
      height: 1px;
    }
    &__search {
      padding-bottom: 5px;
      // padding: 5px 0;
    }
    .vtj-list-panel__tabs {
      flex-grow: 1;
      height: 1px;
      flex-direction: column;
      display: flex;
    }
    .el-tabs__content {
      overflow: auto;
      overflow-x: hidden;
    }
  }

  .vtj-components__item {
    position: relative;
    height: 60px;
    background-color: $vtj-background-color-dark-9;
    margin: 5px 0;
    cursor: move;
    text-align: center;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: $vtj-secondary-color;
    padding: 10px;
    overflow: hidden;
    border: 1px dashed transparent;
    &:hover {
      border-color: $vtj-border-color;
      .vtj-components__footer {
        display: block;
      }
    }
    img {
      max-width: 60px;
      max-height: 40px;
      user-select: none;
      -webkit-user-drag: none;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      width: 100%;
      user-select: none;
    }
  }

  .vtj-components__tabs {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .el-tabs__content {
      flex-grow: 1;
      overflow: auto;
      overflow-x: hidden;
      height: 1px;
    }

    .el-collapse-item__content {
      .el-empty {
        --el-empty-padding: 0;
      }
    }
  }
  .vtj-components__name {
    color: $vtj-primary-color-light-5;
    font-size: 12px;
  }

  .vtj-components__footer {
    height: 18px;
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
    display: none;
    i {
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: $vtj-warning-color;
      }
    }
  }
</style>
