<template>
  <ElInput
    class="v-expression-setter"
    v-model="textValue"
    @change="handleChange">
    <template #prefix>{{ prefix }}</template>
    <template #suffix>{{ suffix }}</template>
  </ElInput>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { ElInput } from 'element-plus';
  import { type JSExpression } from '@vtj/core';
  import { isJSExpression } from '@vtj/renderer';
  import { type Context } from '@vtj/renderer';
  import { expressionValidate } from '../../utils';

  export interface Props {
    modelValue?: JSExpression | string;
    context?: Context;
  }

  const prefix = `{{`;
  const suffix = `}}`;

  const createValue = (value: JSExpression | string = '') => {
    return {
      type: 'JSExpression',
      value: isJSExpression(value) ? value.value : value
    } as JSExpression;
  };

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits(['change']);

  const validate = (value: JSExpression) => {
    return expressionValidate(value, props.context, true);
  };

  const textValue = ref(createValue(props.modelValue).value);

  watch(
    () => props.modelValue,
    (v) => {
      textValue.value = createValue(v).value;
    },
    {
      immediate: true
    }
  );

  const handleChange = (value: string) => {
    const expression: JSExpression = {
      type: 'JSExpression',
      value
    };
    if (validate(expression)) {
      emit('change', expression);
    }
  };

  defineOptions({
    name: 'ExpressionSetter'
  });
</script>
