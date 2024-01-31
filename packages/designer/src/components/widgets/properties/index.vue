<template>
  <XContainer v-if="current" class="v-properties-widget" direction="column" fit>
    <Setters
      v-if="node"
      title="通用属性"
      :current="current"
      :context="context"
      :node="node"
      :items="commonProps"
      @change="change"></Setters>
    <Setters
      v-if="node && componentProps.length"
      title="组件属性"
      :current="current"
      :context="context"
      :node="node"
      :items="componentProps"
      @change="change"></Setters>
    <Setters
      v-if="node"
      title="自定义属性"
      :current="current"
      :context="context"
      :node="node"
      :items="customProps"
      @change="change"
      removable
      plus
      grow
      @plus="onAdd"
      @remove="onRemove"></Setters>
    <XDialogForm
      v-model="visible"
      title="新增自定义属性"
      width="400px"
      height="150px"
      :submit-method="submit"
      :formProps="{ tooltipMessage: false }"
      :model="model">
      <XField
        name="name"
        label="属性名称"
        required
        :rules="{
          message: '名称格式错误',
          pattern: NAME_REGEX
        }"></XField>
    </XDialogForm>
  </XContainer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { XContainer, XDialogForm, XField } from '@vtj/ui';
  import { useCurrent, useSelected, useNodeProps } from '../../hooks';
  import Setters from './setters.vue';
  import { confirm, notify } from '../../../utils';
  import { NAME_REGEX } from '../../../constants';
  const { current, context } = useCurrent();
  const { selected } = useSelected();
  const {
    node,
    commonProps,
    change,
    componentProps,
    customProps,
    addCustom,
    removeCustom,
    isExist
  } = useNodeProps(selected);

  const visible = ref(false);
  const model = ref();
  const onAdd = () => {
    visible.value = true;
    model.value = {
      name: ''
    };
  };

  const submit = async (data: any) => {
    const keys = Object.keys(node.value?.props || {});
    if (!isExist(data.name) && !keys.includes(data.name)) {
      addCustom(data.name);
      return true;
    }
    notify('已存在该属性名称');
    return false;
  };

  const onRemove = async (name: string) => {
    const ret = await confirm('确定删除？');
    if (ret) {
      removeCustom(name);
    }
  };

  defineOptions({
    name: 'PropertiesWidget'
  });
</script>
