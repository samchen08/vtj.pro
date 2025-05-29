<template>
  <div class="v-ai-widget-input">
    <ElInput
      v-model="value"
      type="textarea"
      :autosize="{ minRows: props.minRows, maxRows: 20 }"
      placeholder="请描述您的需求"
      @change="onChange"></ElInput>
    <div class="v-ai-widget-input__footer">
      <ElSelect
        v-if="props.models.length"
        size="small"
        popper-class="llm-popper"
        v-model="currentModel"
        :disabled="props.lockModel || props.loading">
        <ElOption
          v-for="item of props.models"
          :label="item.label"
          :value="item.value"></ElOption>
      </ElSelect>
      <ElCheckbox
        size="small"
        label="自动"
        border
        :disabled="props.loading"
        v-model="engine.state.autoApply"></ElCheckbox>
      <ElButton
        :icon="Promotion"
        type="primary"
        :disabled="props.disabled"
        round
        @click="onSend"
        :loading="props.loading"
        size="default">
        发送
      </ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue';
  import {
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElCheckbox,
    ElMessage
  } from 'element-plus';
  import { Promotion } from '@vtj/icons';
  import { type Dict, type AISendData } from '../../hooks';
  import { useEngine } from '../../../framework';
  import { message } from '../../../utils';

  export interface Props {
    minRows?: number;
    modelValue?: string;
    models?: Dict[];
    model?: string;
    lockModel?: boolean;
    loading?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    minRows: 2,
    models: () => [],
    lockModel: false,
    loading: false
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    send: [value: AISendData];
  }>();

  const engine = useEngine();
  const value = ref('');
  const currentModel = ref(props.model || engine.state.llm);

  watch(
    () => props.models,
    (v) => {
      currentModel.value = props.model || engine.state.llm || v?.[0]?.value;
    },
    { immediate: true }
  );

  watch(
    () => props.modelValue,
    (v) => {
      value.value = v || '';
    },
    {
      immediate: true
    }
  );

  watch(
    () => engine.state.autoApply,
    (v) => {
      ElMessage.success({
        message: v ? '已开启自动应用到页面功能' : '已经关闭自动应用到页面功能'
      });
    }
  );

  watch(currentModel, (v) => {
    engine.state.llm = v;
  });

  const onChange = (v: string) => {
    emit('update:modelValue', v);
  };

  const onSend = () => {
    if (value.value.trim().length < 3) {
      message('请描述您的需求', 'warning');
      return;
    }
    emit('send', {
      auto: engine.state.autoApply,
      prompt: value.value.trim(),
      model: currentModel.value
    });
    value.value = '';
  };

  defineExpose({
    currentModel
  });
</script>
