<template>
  <ElFormItem class="v-setter" size="small" label-positon="left">
    <template #label>
      <ElTooltip
        v-if="props.title"
        placement="top-start"
        :content="props.title">
        {{ props.label || props.name }}
      </ElTooltip>
      <span v-else :title="props.name">{{ props.label || props.name }}</span>
    </template>
    <div class="v-setter__content">
      <div v-if="currentSetter" class="v-setter__input">
        <component
          v-if="!isBinding"
          :current="props.current"
          :context="props.context"
          :is="currentSetter.component"
          v-bind="currentSetter.props"
          :options="props.options"
          v-model="modelValue"
          @change="onChange"
          :disabled="isBinding"></component>
        <ElInput
          v-if="isBinding"
          class="v-expression-setter"
          disabled
          model-value="JSExpression">
          <template #prefix>{{ prefix }}</template>
          <template #suffix>{{ suffix }}</template>
        </ElInput>
      </div>
      <div class="v-setter__action">
        <VtjIconVars
          v-if="props.variable"
          @click="openBinder"
          class="v-icon-vars"
          :class="{ 'is-active': isBinding }"
          title="绑定变量"></VtjIconVars>
        <ElDropdown
          v-if="props.setters.length > 1"
          :disabled="isBinding || switchDisabled"
          size="small"
          popper-class="v-setter-switch"
          @command="changeSetter">
          <VtjIconSwitch title="切换设置器"></VtjIconSwitch>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem
                v-for="item in props.setters"
                :command="item"
                :key="item.name">
                <VtjIconCheck
                  :class="{
                    'is-placeholder': item.name !== currentSetter.name
                  }"></VtjIconCheck>
                {{ item.label }}
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
        <VtjIconRemove
          v-if="props.removable"
          @click="onRemove"
          title="删除"></VtjIconRemove>
      </div>
    </div>
    <VariableBinder
      v-if="binderVisible"
      :current="props.current"
      :context="props.context"
      :value="binderValue"
      v-model="binderVisible"
      :submitMethod="onVarsSubmit"
      @unbind="onVarsRemove"></VariableBinder>
  </ElFormItem>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import {
    ElFormItem,
    ElTooltip,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElInput
  } from 'element-plus';
  import { type MaterialSetter } from '@vtj/core';
  import { isJSExpression } from '@vtj/renderer';
  import {
    VtjIconVars,
    VtjIconSwitch,
    VtjIconCheck,
    VtjIconRemove
  } from '@vtj/icons';
  import { type Context } from '@vtj/renderer';
  import { BlockModel } from '@vtj/core';
  import { VariableBinder } from './binders';
  import { expressionValidate, confirm } from '../utils';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
    name: string;
    label?: string;
    title?: string;
    setters: MaterialSetter[];
    variable?: boolean;
    value?: any;
    options?: any[];
    defaultSetter?: string;
    removable?: boolean;
    switchDisabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    label: '',
    options: () => [],
    variable: true
  });

  const emit = defineEmits(['change', 'remove']);

  const binderVisible = ref(false);
  const binderValue = ref('');
  const prefix = `{{`;
  const suffix = `}}`;

  const currentSetter = ref(
    props.setters.find((n: MaterialSetter) => n.name === props.defaultSetter) ||
      props.setters[0]
  );

  const modelValue = ref(props.value);

  const isBinding = computed(() => {
    return !!isJSExpression(modelValue.value);
  });

  const setterValueRecored: Record<string, any> = {
    [currentSetter.value.name]: modelValue.value
  };

  const changeSetter = (setter: MaterialSetter) => {
    setterValueRecored[currentSetter.value.name] = modelValue.value;
    currentSetter.value = setter;
    modelValue.value = setterValueRecored[setter.name as string] ?? undefined;
    onChange(modelValue.value);
  };

  watch(
    () => props.value,
    () => {
      modelValue.value = props.value;
    }
  );
  watch(
    () => props.defaultSetter,
    () => {
      currentSetter.value =
        props.setters.find(
          (n: MaterialSetter) => n.name === props.defaultSetter
        ) || props.setters[0];
    }
  );

  const onChange = (value: any) => {
    emit('change', value);
  };

  const onRemove = () => {
    emit('remove', props.name);
  };

  const openBinder = () => {
    binderVisible.value = true;
    binderValue.value = isJSExpression(modelValue.value)
      ? modelValue.value.value
      : '';
  };

  const closeBinder = () => {
    binderVisible.value = false;
    binderValue.value = '';
  };

  const onVarsSubmit = async (value: any) => {
    if (!expressionValidate(value, props.context, true)) return false;
    setterValueRecored[currentSetter.value.name] = modelValue.value;
    modelValue.value = value;
    emit('change', value);
    return true;
  };

  const onVarsRemove = async () => {
    const ret = await confirm('确定要解除绑定吗？');
    if (ret) {
      closeBinder();
      modelValue.value = undefined;
      emit('change', undefined);
    }
  };
</script>
