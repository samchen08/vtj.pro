<template>
  <ElFormItem
    v-if="fieldVisible"
    class="x-field"
    ref="itemRef"
    :prop="props.name"
    :label="label"
    :size="computedSize"
    :class="computedClass"
    :style="computedStyle"
    v-bind="$attrs">
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>

    <template #error="{ error }">
      <slot name="error" :error="error">
        <div
          v-if="props.tooltipMessage"
          class="x-field__info"
          :style="infoStyle">
          <ElTooltip :content="error" v-bind="tooltipMessageComputed">
            <XIcon
              class="x-field__trigger"
              :icon="WarningFilled"
              :size="computedSize"></XIcon>
          </ElTooltip>
        </div>
      </slot>
    </template>

    <div class="x-field__editor_wrap">
      <slot name="editor" :editor="slotProps">
        <component
          v-if="editor.component"
          class="x-field__editor"
          ref="editorRef"
          :is="editor.component"
          v-model="fieldValue"
          v-bind="editor.props">
          <template v-if="$slots.option" #option="{ option }">
            <slot name="option" :option="option"></slot>
          </template>
        </component>
      </slot>
    </div>
    <slot></slot>
  </ElFormItem>
</template>
<script lang="ts" setup>
  import { computed, ref, watch, inject } from 'vue';
  import { ElFormItem, ElTooltip, formContextKey } from 'element-plus';
  import { WarningFilled } from '@element-plus/icons-vue';
  import { isEqual, isObject, set } from '@vtj/utils';
  import { XIcon } from '../icon';
  import { fieldProps, FieldEmits, FieldEditorProps } from './types';
  import {
    formInstanceKey,
    FormInstance,
    formModelKey,
    getSizeValue
  } from '../../';
  import { useEditor } from './hooks';

  defineOptions({
    name: 'XField'
  });

  const props = defineProps(fieldProps);
  const emit = defineEmits<FieldEmits>();
  const formInstance = inject(formInstanceKey, null);
  const formContext = inject(formContextKey, null);
  const formModel = inject(formModelKey, null);
  const fieldVisible = computed<boolean>(() => {
    const proxy = formInstance?.proxy as FormInstance;
    if (!proxy || !formModel) return props.visible;
    if (typeof props.visible === 'function') {
      return props.visible(formModel);
    } else if (isObject(props.visible)) {
      return Object.entries(props.visible).every(([k, v]) => {
        return formModel[k] === v;
      });
    } else {
      return props.visible;
    }
  });

  const initFieldValue = () => {
    const proxy = formInstance?.proxy as FormInstance;
    if (proxy && formModel && props.name) {
      return formModel[props.name] ?? props.modelValue;
    } else {
      return props.modelValue;
    }
  };

  const fieldValue = ref<any>(initFieldValue());
  const { editor } = useEditor(
    props,
    emit,
    fieldVisible,
    formInstance,
    formModel
  );
  const itemRef = ref();
  const editorRef = ref();
  const computedSize = computed(
    () => props.size || formContext?.size || 'default'
  );

  const tooltipMessageComputed = computed(() => {
    return Object.assign(
      {},
      typeof props.tooltipMessage === 'boolean' ? {} : props.tooltipMessage
    );
  });

  const computedClass = computed(() => {
    return {
      [`is-tooltip-${props.tooltipPosition}`]: !!props.tooltipPosition
    };
  });

  const computedStyle = computed(() => {
    const proxy = formInstance?.proxy as FormInstance;
    const width = props.width
      ? getSizeValue(props.width)
      : proxy
      ? proxy.inline && proxy.inlineColumns
        ? `${100 / proxy.inlineColumns}%`
        : null
      : null;
    return {
      width
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

  const slotProps = computed<FieldEditorProps>(() => {
    return {
      ...editor.value.props,
      modelValue: fieldValue.value,
      'onUpdate:modelValue': (v: any) => {
        fieldValue.value = v;
      }
    };
  });

  watch(fieldValue, (val: any, old: any) => {
    if (fieldVisible.value && !isEqual(val, old)) {
      emit('update:modelValue', val);
      const proxy = formInstance?.proxy as FormInstance;
      if (proxy && formModel && props.name) {
        set(formModel, props.name, val);
      }
    }
  });

  watch(
    () => {
      const proxy = formInstance?.proxy as FormInstance;
      if (!proxy || !props.name || !formModel) return props.modelValue;
      return formModel[props.name] ?? props.modelValue;
    },
    (v) => {
      if (fieldVisible.value) {
        fieldValue.value = v;
      }
    },
    {
      immediate: true
    }
  );

  watch(
    fieldVisible,
    (v: boolean) => {
      const proxy = formInstance?.proxy as FormInstance;
      if (proxy && formModel && props.name) {
        if (v) {
          fieldValue.value = initFieldValue();
          set(formModel, props.name, fieldValue.value);
        } else {
          fieldValue.value = undefined;
          delete formModel[props.name];
        }
      }
    },
    {
      immediate: true
    }
  );

  const focus = () => {
    if (editorRef.value?.focus) {
      editorRef.value.focus();
    }
  };

  const blur = () => {
    if (editorRef.value?.foucs) {
      editorRef.value.blur();
    }
  };

  defineExpose({
    fieldValue,
    itemRef,
    editorRef,
    focus,
    blur
  });
</script>
