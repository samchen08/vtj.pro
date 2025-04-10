<template>
  <Panel class="v-apis-widget" title="API管理" plus @plus="onPlus">
    <div class="v-apis__search">
      <ElInput
        size="small"
        v-model="keyword"
        :prefix-icon="Search"
        placeholder="搜索API"
        clearable></ElInput>
    </div>
    <ElCollapse :model-value="defaultCollapseValue">
      <ElCollapseItem
        v-for="(items, name) in groups"
        :name="name"
        :title="`${name} (${items.length})`">
        <Item
          v-for="item in items"
          :key="item.id"
          small
          :title="item.name"
          :subtitle="item.label"
          :model-value="item"
          :tag="item.method?.toUpperCase()"
          :tag-type="(tagTypeMap as any)[item.method || 'get']"
          background
          :actions="['edit', 'remove']"
          @click="onEdit(item)"
          @action="onAction"></Item>
      </ElCollapseItem>
    </ElCollapse>

    <ElEmpty v-if="list.length === 0" :image-size="50"></ElEmpty>
    <DialogForm
      v-model="visible"
      :model="formModel"
      :project="project"
      :categories="categories"></DialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { type ApiSchema } from '@vtj/core';
  import { cloneDeep, groupBy } from '@vtj/utils';
  import { Search } from '@vtj/icons';
  import { ElEmpty, ElInput, ElCollapse, ElCollapseItem } from 'element-plus';

  import DialogForm from './form.vue';
  import { Panel, Item } from '../../shared';
  import { useProject } from '../../hooks';
  defineOptions({
    name: 'ApisWidget'
  });
  const { project } = useProject();
  const visible = ref(false);
  const formModel = ref<any>(null);
  const keyword = ref('');
  const isEdit = ref(false);
  const list = computed(() => {
    const apis = project.value?.apis || [];
    if (keyword.value) {
      return apis.filter((n) => {
        return (
          n.name.includes(keyword.value) ||
          n.label?.includes(keyword.value) ||
          n.url.includes(keyword.value)
        );
      });
    }
    return apis;
  });

  const groups = computed(() =>
    groupBy(list.value, (api) => api.category || '默认分组')
  );

  const categories = computed(() => Object.keys(groups.value));

  const defaultCollapseValue = computed(() => categories.value[0]);

  const createEmptyFormModel = () => {
    return {
      id: '',
      method: 'get',
      name: '',
      label: '',
      url: '',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form'
      },
      headers: {
        type: 'JSExpression',
        value: '({})'
      },
      jsonpOptions: {},
      mock: false,
      mockTemplate: {
        type: 'JSFunction',
        value: `(req) => {
    return {
      code: 0,
      data: null
    }
  }`
      }
    } as ApiSchema;
  };

  const onPlus = () => {
    visible.value = true;
    isEdit.value = false;
    formModel.value = createEmptyFormModel();
  };

  const tagTypeMap = {
    get: 'success',
    post: 'primary',
    put: 'warning',
    delete: 'danger',
    patch: 'warning',
    jsonp: 'info'
  };

  const onAction = (action: any) => {
    if (action.name === 'edit') {
      onEdit(action.modelValue);
    }
    if (action.name === 'remove') {
      project.value?.removeApi(action.modelValue.name);
    }
  };

  const onEdit = (item: any) => {
    isEdit.value = true;
    formModel.value = cloneDeep(item);
    visible.value = true;
  };
</script>
