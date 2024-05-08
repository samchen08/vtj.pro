<template>
  <XContainer class="v-data-sources-widget" direction="column" fit>
    <Panel
      title="请求方法"
      class="v-sub-panel"
      size="small"
      plus
      @plus="onPlus">
      <Item
        v-for="item in apiDataSources"
        border
        :title="item.name"
        :subtitle="item.label"
        :model-value="item"
        :actions="['edit', 'remove']"
        :tag="item.type.toUpperCase()"
        :tag-type="getTagType(item.type)"
        @action="onAction"
        @click="onEdit(item)"></Item>
      <ElEmpty v-if="!apiDataSources.length" :image-size="50"></ElEmpty>
    </Panel>
    <DialogForm
      v-if="visible"
      v-model="visible"
      :current="current"
      :context="context"
      :item="currentApi"></DialogForm>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElEmpty } from 'element-plus';
  import { XContainer } from '@vtj/ui';
  import DialogForm from './form.vue';
  import { Panel, Item } from '../../shared';
  import { useCurrent } from '../../hooks';

  defineOptions({
    name: 'DataSourcesWidget'
  });

  const { current, context } = useCurrent();

  const visible = ref(false);
  const currentApi = ref();

  const apiDataSources = computed(() => {
    return Object.values(current.value?.dataSources || {}).filter((item) =>
      ['meta', 'api'].includes(item.type)
    );
  });

  const getTagType = (type: string) => {
    const map: Record<string, string> = {
      api: 'primary',
      meta: 'success',
      cube: 'warning'
    };
    return map[type] as any;
  };

  const onPlus = () => {
    currentApi.value = undefined;
    visible.value = true;
  };

  const onEdit = (item: any) => {
    currentApi.value = item;
    visible.value = true;
  };

  const onAction = (action: any) => {
    const { name, modelValue } = action;
    if (name === 'edit') {
      onEdit(modelValue);
    }
    if (name === 'remove') {
      current.value?.removeDataSource(modelValue.name);
    }
  };
</script>
