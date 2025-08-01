<template>
  <Panel
    class="v-pages-widget"
    title="页面管理"
    plus
    :subtitle="subtitle"
    @plus="onPlus">
    <ElTree
      :data="pages"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      :allow-drop="allowDrop"
      @node-drop="onNodeDrop">
      <template #default="{ data, node }">
        <Item
          class="v-pages-widget__item"
          :class="{ 'is-layout': data.layout }"
          :icon="icons[data.icon]"
          :title="data.title"
          :subtitle="data.name"
          :model-value="{ data, node }"
          :actions="createActions(data)"
          @action="onAction"
          @click="onClick(data)"
          :active="current?.id === data.id"
          grow
          small
          background
          hover
          action-in-more
          :text-tags="createTextTags(data)"></Item>
      </template>
    </ElTree>
    <PageForm
      v-if="visible"
      v-model="visible"
      :item="item"
      :parent-id="parentId"></PageForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed, toValue } from 'vue';
  import { ElTree } from 'element-plus';
  import { icons } from '@vtj/icons';
  import { type PageFile } from '@vtj/core';
  import { cloneDeep } from '@vtj/utils';
  import PageForm from './form.vue';
  import { Panel, Item } from '../../shared';
  import { useProject, useCurrent } from '../../hooks';
  import { message, notify } from '../../../utils';

  defineOptions({
    name: 'PagesWidget'
  });

  const { project, engine } = useProject();
  const pages = computed(() => project.value?.pages || []);
  const { current } = useCurrent();
  const visible = ref(false);
  const item = ref();
  const parentId = ref();

  const subtitle = computed(() => {
    return `(共 ${pages.value.length} 项)`;
  });

  const isUniapp = computed(() => {
    const { platform = 'web' } = project.value || {};
    return platform === 'uniapp';
  });

  const createTextTags = (page: PageFile) => {
    const tags: string[] = [];
    if (page.layout) return tags;
    if (project.value?.homepage === page.id) {
      tags.push('主');
    }
    if (!isUniapp.value && page.mask) {
      tags.push('母');
    }
    if (!isUniapp.value && page.cache) {
      tags.push('缓');
    }
    if (!isUniapp.value && page.hidden) {
      tags.push('隐');
    }
    if (!isUniapp.value && page.pure) {
      tags.push('纯');
    }
    if (page.raw) {
      tags.push('源');
    }
    return tags;
  };

  const createActions = (data: PageFile) => {
    const actions =
      data.dir || data.layout
        ? ['add', 'edit', 'remove']
        : data.raw
          ? ['home', 'edit', 'remove']
          : ['home', 'edit', 'copy', 'remove', 'saveToBlock'];
    return actions as any[];
  };

  const onPlus = () => {
    parentId.value = undefined;
    item.value = undefined;
    visible.value = true;
  };

  const onAction = async (action: any) => {
    const { name, modelValue } = action;
    const { data, node } = modelValue;
    if (name === 'add') {
      item.value = undefined;
      parentId.value = data.id;
      visible.value = true;
    }

    if (name === 'edit') {
      item.value = cloneDeep(data);
      parentId.value = undefined;
      visible.value = true;
    }
    if (name === 'remove') {
      if (data.dir || data.layout) {
        const page = project.value?.getPage(data.id);
        if (page && page.children?.length) {
          notify('请先删除子页面');
          return;
        }
      }
      project.value?.removePage(data.id);
    }

    if (name === 'copy') {
      const parentId = node.parent?.data.id;
      project.value?.clonePage(data, parentId);
    }

    if (name === 'home') {
      project.value?.setHomepage(data.id);
      message('设置主页成功', 'success');
    }
    if (name === 'saveToBlock') {
      await project.value?.saveToBlock(data);
      message('已保存到区块', 'success');
    }
  };

  const onClick = async (file: PageFile) => {
    if (file.raw) {
      message('这是源码模式页面，不能在设计器中打开', 'warning');
    }
    if (file.dir || file.raw) {
      engine.project.value?.deactivate();
    } else {
      engine.project.value?.active(file);
      const region = engine.skeleton?.getRegion('Workspace');
      if (region) {
        region.regionRef.openTab('Designer');
      }
    }
  };

  const allowDrop = (_draggingNode: any, dropNode: any, type: string) => {
    if (type === 'inner') {
      return !!dropNode.data.dir || !!dropNode.data.layout;
    }
    return true;
  };

  const onNodeDrop = () => {
    project.value?.update({
      pages: toValue(pages)
    });
  };
</script>
