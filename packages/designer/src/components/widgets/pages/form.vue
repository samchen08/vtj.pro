<template>
  <XDialogForm
    :title="title"
    width="800px"
    height="500px"
    :form-props="{ tooltipMessage: false }"
    :model="model"
    :submit-method="submit">
    <XField
      name="dir"
      label="类型"
      editor="radio"
      :options="typeOptions"
      :props="{ button: true, size: 'small' }"
      :disabled="!!props.item"
      required></XField>
    <XField
      name="name"
      label="名称"
      required
      @change="onNameChange"
      :rules="{ pattern: NAME_REGEX, message: '名称格式不正确' }"></XField>
    <XField name="title" label="标题" required></XField>
    <XField name="icon" label="菜单图标" editor="none">
      <template #editor>
        <IconSetter v-model="model.icon" size="default"></IconSetter>
      </template>
    </XField>
    <XField
      :visible="{ dir: false }"
      name="mask"
      label="包含母版"
      editor="switch"></XField>
    <XField name="hidden" label="隐藏菜单" editor="switch"></XField>

    <XField
      :visible="{ dir: false }"
      :disabled="!!props.item"
      inline
      name="raw"
      label="源码模式"
      editor="switch"
      tip="页面是非低代码开发，不能在线编辑"></XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { type PageFile } from '@vtj/core';
  import { upperFirstCamelCase } from '@vtj/utils';
  import IconSetter from '../../setters/icon.vue';
  import { NAME_REGEX } from '../../../constants';
  import { useProject } from '../../hooks';
  import { notify } from '../../../utils';

  export interface Props {
    item?: PageFile;
    parentId?: string;
  }

  defineOptions({
    name: 'PageForm'
  });

  const props = defineProps<Props>();
  const { project } = useProject();
  const title = computed(() => (props.item ? '编辑页面' : '新增页面'));
  const createEmptyModel = () => ({
    dir: false,
    name: '',
    title: '',
    icon: '',
    mask: true,
    hidden: false,
    raw: false
  });

  const model = ref(props.item || createEmptyModel());

  const typeOptions = [
    { label: '页面', value: false },
    { label: '目录', value: true }
  ];

  const onNameChange = (val: string) => {
    if (model.value) {
      model.value.name = upperFirstCamelCase(val);
    }
  };

  const submit = async (data: any) => {
    const exist = project.value?.existPageName(data.name, [data.id]);
    if (exist) {
      notify('页面名称已存在，请更换');
      return false;
    }
    if (!!props.item) {
      project.value?.updatePage(data);
    } else {
      project.value?.createPage(data, props.parentId);
    }
    return true;
  };
</script>
