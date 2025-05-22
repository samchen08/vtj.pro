<template>
  <Panel
    class="v-blocks-widget v-templates-widgets"
    title="模板"
    :subtitle="subtitle"
    :body="{ flex: true, direction: 'column' }"
    refresh
    @refresh="refreshTemplates"
    v-loading="loading">
    <div class="v-blocks__search">
      <ElInput
        size="small"
        v-model="keyword"
        :prefix-icon="Search"
        placeholder="搜索模板"
        clearable></ElInput>
    </div>
    <XTabs :items="tabs" v-model="currentTab" class="v-templates-widgets__tab">
      <template #default>
        <ElCollapse v-if="categories.length" v-model="categoriesValue">
          <ElCollapseItem
            v-for="(items, name) in tabModel"
            :name="name"
            :title="`${name} (${items.length})`">
            <ElRow wrap="wrap" :gutter="5">
              <ElCol v-for="item in items" :key="item.id" :span="span">
                <Box
                  class="v-templates-widgets__item"
                  :name="item.name"
                  :title="item.label">
                  <ElTag
                    v-if="item.vip"
                    class="is-vip"
                    type="danger"
                    size="small"
                    effect="light"
                    round>
                    VIP
                  </ElTag>
                  <XAction
                    v-if="isOwner(item)"
                    class="is-delete"
                    :icon="Delete"
                    mode="icon"
                    size="small"
                    type="danger"
                    @click="handleRemove(item)"></XAction>
                  <ElImage :src="item.cover" fit="contain"></ElImage>
                  <div class="v-templates-widgets__title">
                    <span class="v-box__name">{{ item.name }}</span>
                    <span class="v-box__label">{{ item.label }}</span>
                  </div>
                  <div class="use-handle">
                    <ElButton
                      class="v-templates-widgets__download"
                      :icon="Download"
                      type="primary"
                      round
                      @click="download(item)">
                      使用
                    </ElButton>
                  </div>
                </Box>
              </ElCol>
            </ElRow>
          </ElCollapseItem>
        </ElCollapse>
        <ElEmpty v-else description="找不到符合条件的模板"></ElEmpty>
      </template>
    </XTabs>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed, watch, type ComputedRef } from 'vue';
  import {
    ElRow,
    ElCol,
    ElEmpty,
    ElCollapse,
    ElCollapseItem,
    ElInput,
    ElImage,
    ElButton,
    ElMessageBox,
    ElTag,
    vLoading
  } from 'element-plus';
  import { Search, Download, Delete } from '@vtj/icons';
  import { XAction, XTabs, type TabsItem } from '@vtj/ui';
  import { groupBy } from '@vtj/utils';
  import { Panel, Box } from '../../shared';
  import { useColSpan, useTemplates, type TemplateDto } from '../../hooks';

  type Model = {
    [key: string]: TemplateDto[];
  };

  interface TabItem extends TabsItem {
    label: string;
    model: Model;
  }

  const { span } = useColSpan(240);
  const {
    templates,
    toRemoteAuth,
    isLogined,
    installTemplate,
    access,
    refreshTemplates,
    loading,
    removeTemplate
  } = useTemplates();
  const keyword = ref('');
  const currentTab = ref<string>('0');

  const list = computed(() => {
    if (keyword.value) {
      return templates.value.filter((n) => {
        return (
          n.name.includes(keyword.value) || n.label?.includes(keyword.value)
        );
      });
    }
    return templates.value;
  });

  const tabs: ComputedRef<TabItem[]> = computed(() => {
    const userId = access?.getData()?.id;
    const groups = groupBy(list.value, (template: TemplateDto) => {
      return template.userId === userId ? '我的' : '共享';
    });
    // '我的'在第一位
    const tabList = [
      { label: '我的', model: {} },
      { label: '共享', model: {} }
    ];
    tabList.forEach((i) => {
      i.model = groupBy(
        groups[i.label],
        (template: TemplateDto) => template.category
      );
    });
    return tabList;
  });

  const categoriesValue = ref<string[]>([]);

  const categories: ComputedRef<string[]> = computed(() => {
    const current = Number(currentTab.value);
    return Object.keys(tabs.value[current].model) || [];
  });

  watch(categories, (val) => {
    categoriesValue.value = val;
  });

  const tabModel: ComputedRef<Model> = computed(() => {
    const current = Number(currentTab.value);
    return tabs.value[current].model;
  });

  const subtitle = computed(() => {
    return `(共 ${templates.value.length} 个)`;
  });

  const download = async (template: TemplateDto) => {
    if (await isLogined()) {
      await installTemplate(template.id);
    } else {
      const ret = await ElMessageBox.confirm(
        '使用模版需登录，您还没登录或已过期，请重新登录！',
        '提示',
        {
          type: 'info',
          confirmButtonText: '立即登录'
        }
      ).catch(() => false);
      if (ret) {
        toRemoteAuth();
      }
    }
  };

  const isOwner = (item: TemplateDto) => {
    if (item.share) {
      return false;
    }
    return item.userId === access?.getData()?.id;
  };

  const handleRemove = async (item: TemplateDto) => {
    const ret = await ElMessageBox.confirm('确定删除该模版？', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (ret) {
      await removeTemplate(item.id);
      refreshTemplates();
    }
  };

  defineOptions({
    name: 'TemplatesWidget'
  });

  defineExpose({
    refreshTemplates
  });
</script>
<style scoped>
  .v-templates-widgets__tab {
    height: 1px;
    flex-grow: 1;
  }
  :deep(.x-container) {
    overflow-y: hidden;
  }
  :deep(.el-collapse) {
    overflow-y: hidden;
  }
  :deep(.el-tabs__content) {
    overflow-y: scroll;
  }
  :deep(.el-tabs__nav-scroll) {
    border-bottom: 1px solid var(--el-border-color);
  }
</style>
