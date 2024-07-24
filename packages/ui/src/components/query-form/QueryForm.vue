<template>
  <XForm
    ref="formRef"
    class="x-query-form"
    inline
    :inline-columns="props.inlineColumns"
    label-width="100px"
    :submit-text="null"
    :reset-text="null"
    :footer="showCollapsible">
    <div
      class="x-query-form__inner"
      :class="collapsedClass"
      :style="collapsedStyle">
      <slot>
        <template v-for="item in props.items">
          <slot v-if="isSlotField(item)" :name="item"></slot>
          <XField v-else v-bind="item" :key="`field_${item.name}`"></XField>
        </template>
      </slot>
    </div>
    <template #action>
      <div v-if="showCollapsible" class="x-query-form__collapsible">
        <XAction
          v-if="collapsed"
          :icon="CaretBottom"
          label="展开"
          mode="text"
          type="primary"
          @click="toggleCollapsed"></XAction>
        <XAction
          v-else
          :icon="CaretTop"
          label="收起"
          mode="text"
          type="primary"
          @click="toggleCollapsed"></XAction>
      </div>
    </template>
  </XForm>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XForm, XAction, XField } from '../';
  import { CaretBottom, CaretTop } from '@vtj/icons';
  import type { QueryFormEmits, QueryFormItem } from './types';
  import { queryFormProps } from './props';
  import { useCollapsed } from './hooks';

  defineOptions({
    name: 'XQueryForm'
  });

  const props = defineProps(queryFormProps);
  const emit = defineEmits<QueryFormEmits>();
  const formRef = ref<InstanceType<typeof XForm>>();
  const {
    collapsed,
    toggleCollapsed,
    collapsedClass,
    collapsedStyle,
    showCollapsible
  } = useCollapsed(props, emit);

  const submit = async () => {
    formRef.value?.submit();
  };

  const validate = async () => {
    return await formRef.value?.validate();
  };

  const reset = (fields?: string[] | string) => {
    formRef.value?.reset(fields);
  };

  const isSlotField = (item: QueryFormItem) => {
    return typeof item === 'string';
  };

  const $vtjDynamicSlots = () => {
    const items = props.items || [];
    return items.map((n) => isSlotField(n));
  };

  defineExpose({
    validate,
    submit,
    reset,
    formRef,
    $vtjDynamicSlots
  });
</script>
