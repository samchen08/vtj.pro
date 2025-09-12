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
        <ElOptionGroup label="内置模型">
          <ElOption
            v-for="item of props.models"
            :label="item.label"
            :value="item.value"></ElOption>
        </ElOptionGroup>
        <ElOptionGroup label="自定义模型">
          <ElOption
            v-for="item of engine.state.LLMs"
            :label="item.label"
            :value="item.id || item.model">
            <div class="v-ai-widget-input__llm-item">
              <span class="label">{{ item.label }}</span>
              <span class="actions">
                <XIcon
                  size="small"
                  :icon="EditPen"
                  @click.stop="onEditModel(item)"></XIcon>
                <XIcon
                  size="small"
                  :icon="Delete"
                  @click.stop="onRemoveModel(item)"></XIcon>
              </span>
            </div>
          </ElOption>
        </ElOptionGroup>
        <template #footer>
          <ElButton size="small" :icon="Plus" @click.stop="onAddModel">
            新增模型
          </ElButton>
        </template>
      </ElSelect>
      <ElCheckbox
        size="small"
        label="自动"
        border
        :disabled="props.loading"
        v-model="engine.state.autoApply"></ElCheckbox>
      <ElButton
        v-if="!props.loading"
        :icon="Promotion"
        type="primary"
        :disabled="props.disabled"
        round
        @click="onSend"
        :loading="props.loading"
        size="default">
        发送
      </ElButton>
      <ElButton
        v-else
        :icon="CircleClose"
        type="warning"
        round
        size="default"
        @click="onCancel">
        取消
      </ElButton>
    </div>
    <ModelDialog
      v-if="formVisable"
      v-model="formVisable"
      :item="currentFormModel"
      @save="onSaveModel"></ModelDialog>
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
    ElMessage,
    ElOptionGroup
  } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  import { Promotion, Plus, EditPen, Delete, CircleClose } from '@vtj/icons';
  import { type Dict, type AISendData } from '../../hooks';
  import { useEngine, type LLM } from '../../../framework';
  import { message, confirm } from '../../../utils';
  import ModelDialog from './model-dialog.vue';

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
    cancel: [];
  }>();

  const engine = useEngine();
  const value = ref('');
  const currentModel = ref(props.model || engine.state.llm);
  const currentFormModel = ref<LLM | null | undefined>(null);
  const formVisable = ref(false);

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
      model: currentModel.value,
      llm: engine.state.getLLMById(currentModel.value)
    });
    value.value = '';
  };

  const onCancel = () => {
    emit('cancel');
  };

  const onAddModel = () => {
    currentFormModel.value = null;
    formVisable.value = true;
  };

  const onEditModel = (item: LLM) => {
    currentFormModel.value = item;
    formVisable.value = true;
  };

  const onRemoveModel = async (item: LLM) => {
    const ret = await confirm('确定删除？').catch(() => false);
    if (ret) {
      engine.state.removeLLM(item);
    }
  };

  const onSaveModel = (item: LLM) => {
    engine.state.saveLLM(item);
  };

  defineExpose({
    currentModel
  });
</script>
