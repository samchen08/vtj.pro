<template>
  <ElFormItem
    class="x-field"
    ref="itemRef"
    :label="label"
    :size="computedSize"
    :class="computedClass"
    v-bind="$attrs">
    <slot></slot>
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>

    <template #error="{ error }">
      <slot name="error" :error="error">
        <div
          v-if="props.tooltipMessage"
          class="x-field__info"
          :style="infoStyle">
          <ElTooltip :content="error" v-bind="props.tooltipMessage">
            <XIcon
              class="x-field__trigger"
              :icon="WarningFilled"
              :size="computedSize"></XIcon>
          </ElTooltip>
        </div>
      </slot>
    </template>

    <component
      v-if="editor.name"
      ref="editorRef"
      :is="editor.name"
      v-model="fieldValue"
      v-bind="editor.props"></component>
  </ElFormItem>
</template>
<script lang="ts" setup>
  import { toRef, computed, ref, watch, inject } from 'vue';
  import { ElFormItem, ElTooltip, formContextKey } from 'element-plus';
  import { WarningFilled } from '@element-plus/icons-vue';
  import { XIcon } from '../icon';
  import { fieldProps, FieldEmits } from './types';
  import { useEditor } from './hooks';

  defineOptions({
    name: 'XField'
  });

  const props = defineProps(fieldProps);
  const emit = defineEmits<FieldEmits>();
  const fromContext = inject(formContextKey, null);
  const editor = useEditor(props);
  const fieldValue = ref<any>(props.modelValue);
  const itemRef = ref();
  const editorRef = ref();
  const computedSize = computed(
    () => props.size || fromContext?.size || 'default'
  );

  const computedClass = computed(() => {
    return {
      [`is-tooltip-${props.tooltipPosition}`]: !!props.tooltipPosition
    };
  });

  const infoStyle = computed(() => {
    return {
      right:
        typeof props.tooltipPosition === 'number'
          ? `${props.tooltipPosition}px`
          : undefined
    };
  });

  watch(fieldValue, (val: any) => {
    emit('update:modelValue', val);
    emit('change', val);
  });

  defineExpose({
    fieldValue,
    itemRef,
    editorRef
  });
</script>
