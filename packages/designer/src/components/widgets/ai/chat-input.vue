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
        v-model="auto"></ElCheckbox>
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
  import { storage } from '@vtj/utils';
  import { type Dict, type AISendData } from '../../hooks';
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

  const autoCacheKey = 'CHAT_INPUT_AUTO';
  const autoCache = storage.get(autoCacheKey, { type: 'local' }) ?? true;
  const value = ref('');
  const auto = ref<boolean>(autoCache);

  const currentModel = ref(props.model || '');

  watch(
    () => props.models,
    (v) => {
      currentModel.value = props.model || v?.[0]?.value;
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

  watch(auto, (v) => {
    storage.save(autoCacheKey, v, { type: 'local' });
    ElMessage.success({
      message: v
        ? '您已开启自动应用到页面功能，当AI生成代码后将会自动更改当前低代码页面。'
        : '您已经关闭自动应用到页面功能，您可以通过手动的方式更改当前低代码页面'
    });
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
      auto: auto.value,
      prompt: value.value.trim(),
      model: currentModel.value
    });
    value.value = '';
  };

  defineExpose({
    auto,
    currentModel
  });
</script>
