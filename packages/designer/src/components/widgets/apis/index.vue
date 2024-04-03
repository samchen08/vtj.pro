<template>
  <Panel class="v-apis-widget" title="API管理" plus @plus="onPlus">
    <Item
      v-for="item in list"
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
    <ElEmpty v-if="list.length === 0" :image-size="50"></ElEmpty>
    <DialogForm
      v-model="visible"
      :model="formModel"
      :project="project"></DialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { type ApiSchema } from '@vtj/core';
  import { cloneDeep } from '@vtj/utils';
  import { ElEmpty } from 'element-plus';
  import DialogForm from './form.vue';
  import { Panel, Item } from '../../shared';
  import { useProject } from '../../hooks';
  defineOptions({
    name: 'ApisWidget'
  });

  const visible = ref(false);
  const formModel = ref<any>(null);
  const isEdit = ref(false);
  const list = computed(() => {
    return project.value?.apis || [];
  });

  const { project } = useProject();

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
