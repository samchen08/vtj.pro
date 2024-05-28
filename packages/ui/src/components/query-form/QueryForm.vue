<template>
  <XForm
    ref="formRef"
    class="x-query-form"
    inline
    :inline-columns="4"
    label-width="120px"
    :submit-text="null"
    :reset-text="null">
    <div
      class="x-query-form__inner"
      :class="collapsedClass"
      :style="collapsedStyle">
      <slot>
        <XField
          v-for="item in props.items"
          v-bind="item"
          :key="`field_${item.name}`"></XField>
      </slot>
    </div>
    <template #action>
      <div v-if="props.collapsible" class="x-query-form__collapsible">
        <XAction
          v-if="collapsed"
          :icon="CaretBottom"
          label="展开"
          mode="text"
          @click="toggleCollapsed"></XAction>
        <XAction
          v-else
          :icon="CaretTop"
          label="收起"
          mode="text"
          @click="toggleCollapsed"></XAction>
      </div>
    </template>
  </XForm>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XForm, XAction, XField } from '../';
  import { CaretBottom, CaretTop } from '@vtj/icons';
  import type { QueryFormEmits } from './types';
  import { queryFormProps } from './props';
  import { useCollapsed } from './hooks';
  defineOptions({
    name: 'XQueryForm'
  });

  const props = defineProps(queryFormProps);
  const emit = defineEmits<QueryFormEmits>();
  const formRef = ref<InstanceType<typeof XForm>>();
  const { collapsed, toggleCollapsed, collapsedClass, collapsedStyle } =
    useCollapsed(props, emit);

  const submit = async () => {
    formRef.value?.submit();
  };

  const reset = (fields?: string[] | string) => {
    formRef.value?.reset(fields);
  };

  defineExpose({
    submit,
    reset,
    formRef
  });
</script>
