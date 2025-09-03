<template>
  <Panel class="v-apis-widget" title="API管理" plus @plus="onPlus">
    <template #pre-actions>
      <ElUpload
        class="import-swagger"
        :show-file-list="false"
        :multiple="false"
        :limit="1"
        accept=".json"
        :before-upload="onBeforeUpload">
        <XAction
          mode="icon"
          label="OpenAPI / Swagger"
          size="small"
          background="always"
          type="info"
          :icon="VtjIconOpenapi"
          title="导入 OpenAPI/Swagger JSON"></XAction>
      </ElUpload>
      <ElDivider direction="vertical"></ElDivider>
    </template>
    <div class="v-apis__search">
      <ElInput
        size="small"
        v-model="keyword"
        :prefix-icon="Search"
        placeholder="搜索API"
        clearable></ElInput>
    </div>
    <ElCollapse v-model="collapseValue">
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
    <Swagger
      v-if="swaggerVisible"
      v-model="swaggerVisible"
      :data="swaggerApis"
      :saveApis="saveApis"></Swagger>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { type ApiSchema } from '@vtj/core';
  import { cloneDeep, groupBy, merge } from '@vtj/utils';
  import { Search, VtjIconOpenapi } from '@vtj/icons';
  import { XAction } from '@vtj/ui';
  import {
    ElEmpty,
    ElInput,
    ElCollapse,
    ElCollapseItem,
    ElUpload,
    ElDivider
  } from 'element-plus';
  import { isJSFunction, parseFunction } from '@vtj/renderer';
  import DialogForm from './form.vue';
  import Swagger from './swagger.vue';
  import { Panel, Item } from '../../shared';
  import { useProject, useSwagger } from '../../hooks';
  defineOptions({
    name: 'ApisWidget'
  });
  const { project } = useProject();
  const { swaggerVisible, onBeforeUpload, swaggerApis, saveApis } =
    useSwagger();
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
  const collapseValue = ref(defaultCollapseValue.value);

  const defaultSettings = computed(() => {
    const axios = project.value?.globals?.axios;
    if (axios && isJSFunction(axios) && axios.value) {
      const func = parseFunction(axios, {}, false, false, true);
      const config = func({});
      return config?.settings || {};
    }
  });

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
        type: 'form',
        ...defaultSettings.value
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
    formModel.value = merge(createEmptyFormModel(), cloneDeep(item));
    visible.value = true;
  };
</script>

<style lang="scss" scoped>
  .import-swagger {
    display: inline-flex;
    margin-right: 5px;
  }
</style>
