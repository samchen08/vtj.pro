<template>
  <footer class="message-composer">
    <input
      ref="fileInputRef"
      type="file"
      accept="image/jpeg,image/png,image/webp,application/json"
      multiple
      class="hidden-input"
      @change="onFileChange" />

    <div v-if="files.length" class="attachment-list">
      <div v-for="f in files" :key="f.id" class="file-item">
        <img v-if="f.previewUrl" :src="f.previewUrl" class="file-thumb" />
        <span v-else class="file-icon">{ }</span>
        <span class="file-name">{{ f.name }}</span>
        <span v-if="f.recognizing" class="file-state">识别中</span>
        <span v-else-if="f.error" class="file-state error">失败</span>
        <button
          type="button"
          class="remove-file"
          :aria-label="`移除 ${f.name}`"
          @click="$emit('remove-file', f.id)">
          ×
        </button>
      </div>
    </div>

    <el-input
      :model-value="message"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 6 }"
      resize="none"
      placeholder="描述要创建或修改的内容…"
      @keydown="onKeydown"
      @update:model-value="$emit('update:message', $event)" />

    <div class="composer-toolbar">
      <el-button
        class="context-button"
        size="small"
        :disabled="running"
        :icon="Plus"
        @click="triggerFileUpload">
      </el-button>

      <el-checkbox
        border
        :model-value="autoApprove"
        @update:model-value="$emit('update:autoApprove', !!$event)">
        替我审批
      </el-checkbox>

      <el-select
        v-if="models.length || engine.state.LLMs.length"
        class="model-select"
        :model-value="model"
        :disabled="running"
        aria-label="更换模型"
        size="small"
        popper-class="agent-llm-popper"
        @update:model-value="onModelChange">
        <ElOptionGroup label="内置模型">
          <ElOption label="自动" value="auto"></ElOption>
          <ElOption
            v-for="item in models"
            :key="item.value"
            :label="item.label"
            :value="item.value"></ElOption>
        </ElOptionGroup>
        <ElOptionGroup label="自定义模型">
          <ElOption
            v-for="item in engine.state.LLMs"
            :key="item.id || item.model"
            :label="item.label"
            :value="item.id || item.model">
            <div class="llm-item">
              <span>{{ item.label }}</span>
              <span class="llm-actions">
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
      </el-select>
      <span class="toolbar-spacer" />

      <el-button
        v-if="running"
        type="danger"
        round
        size="small"
        :icon="CircleClose"
        @click="$emit('abort')">
        停止
      </el-button>
      <el-button
        v-else
        type="primary"
        round
        size="small"
        :icon="Promotion"
        :disabled="recognizing || (!message.trim() && !files.length)"
        @click="submit">
        {{ hasTopic ? '发送' : '开始' }}
      </el-button>
    </div>
    <ModelDialog
      v-if="formVisible"
      v-model="formVisible"
      :item="currentFormModel"
      @save="onSaveModel"></ModelDialog>
  </footer>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import {
    ElInput,
    ElButton,
    ElCheckbox,
    ElSelect,
    ElOption,
    ElOptionGroup
  } from 'element-plus';
  import { Plus, Promotion, CircleClose, EditPen, Delete } from '@vtj/icons';
  import { XIcon } from '@vtj/ui';
  import { useEngine, type DictOption, type LLM } from '../../../framework';
  import { confirm } from '../../../utils';
  import type { UploadedFile } from './composables/useFileRecognition';
  import ModelDialog from './model-dialog.vue';

  const props = defineProps<{
    message: string;
    running: boolean;
    hasTopic: boolean;
    files: UploadedFile[];
    recognizing: boolean;
    autoApprove: boolean;
    model: string;
    models: DictOption[];
  }>();

  const emit = defineEmits<{
    'update:message': [value: string];
    start: [];
    continue: [];
    abort: [];
    'update:autoApprove': [value: boolean];
    'update:model': [value: string];
    'upload-file': [file: File];
    'remove-file': [fileId: string];
  }>();

  // ── 文件选择 ──

  const fileInputRef = ref<HTMLInputElement>();
  const formVisible = ref(false);
  const currentFormModel = ref<LLM | null>();
  const engine = useEngine();

  watch(
    () => props.model,
    (value) => {
      if (value) engine.state.llm = value;
    }
  );

  onMounted(() => {
    // 挂载时继承全局已配置的模型，避免将 'auto' 覆盖用户保存的 llm 设置
    const llm = engine.state.llm;
    if (typeof llm === 'string' && llm) {
      emit('update:model', llm);
    }
  });

  function onModelChange(value: string) {
    engine.state.llm = value;
    emit('update:model', value);
  }

  function onAddModel() {
    currentFormModel.value = null;
    formVisible.value = true;
  }

  function onEditModel(item: LLM) {
    currentFormModel.value = item;
    formVisible.value = true;
  }

  async function onRemoveModel(item: LLM) {
    const confirmed = await confirm('确定删除？').catch(() => false);
    if (confirmed) engine.state.removeLLM(item);
  }

  function onSaveModel(item: LLM) {
    engine.state.saveLLM(item);
    onModelChange(item.id as string);
  }

  function triggerFileUpload() {
    fileInputRef.value?.click();
  }

  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const selectedFiles = input.files;
    if (!selectedFiles) return;
    for (let i = 0; i < selectedFiles.length; i++) {
      emit('upload-file', selectedFiles[i]);
    }
    // 清空 input，确保下次选择同一文件仍触发 change
    input.value = '';
  }

  function submit() {
    if (props.running || props.recognizing) return;
    if (props.hasTopic) emit('continue');
    else emit('start');
  }

  function onKeydown(event: Event | KeyboardEvent) {
    const e = event as KeyboardEvent;
    if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
    e.preventDefault();
    submit();
  }
</script>

<style lang="scss" scoped>
  .message-composer {
    flex: 0 0 auto;
    padding: 10px;
    background: var(--el-bg-color);

    :deep(.el-textarea__inner) {
      min-height: 60px !important;
      padding: 10px 11px;
      border-radius: var(--el-border-radius-base) var(--el-border-radius-base) 0
        0;
      box-shadow: 0 0 0 1px var(--el-border-color) inset;
      background: var(--el-bg-color);
      font-size: 12px;
      line-height: 1.6;
    }

    &:focus-within :deep(.el-textarea__inner) {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }

  .hidden-input {
    display: none;
  }

  .attachment-list {
    display: flex;
    gap: 6px;
    margin-bottom: 7px;
    padding: 6px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: var(--el-border-radius-base);
    background: var(--el-fill-color-lighter);
    overflow-x: auto;
  }

  .file-item {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    gap: 5px;
    max-width: 210px;
    padding: 4px 6px;
    border: 1px solid var(--el-border-color-light);
    border-radius: var(--el-border-radius-base);
    background: var(--el-bg-color);
    font-size: 12px;

    .file-thumb,
    .file-icon {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border-radius: 3px;
    }

    .file-thumb {
      object-fit: cover;
    }

    .file-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .file-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .file-state {
    flex-shrink: 0;
    white-space: nowrap;
    color: var(--el-color-warning);

    &.error {
      color: var(--el-color-danger);
    }
  }

  .remove-file {
    padding: 0;
    border: 0;
    color: var(--el-text-color-secondary);
    background: transparent;
    cursor: pointer;

    &:hover {
      color: var(--el-color-danger);
    }
  }

  .composer-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: -1px;
    padding: 6px;
    border: 1px solid var(--el-border-color);
    border-radius: 0 0 var(--el-border-radius-base) var(--el-border-radius-base);
    background: var(--el-fill-color-light);
  }

  .toolbar-spacer {
    flex: 1;
  }

  .composer-toolbar :deep(.el-checkbox) {
    height: 24px;
    margin-right: 0;
  }

  .context-button {
    padding: 5px 7px;
    color: var(--el-text-color-secondary);
  }

  .model-select {
    width: 112px;

    :deep(.el-select__wrapper) {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }

    :deep(.el-select__placeholder) {
      color: var(--el-color-primary);
    }
  }

  .llm-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .llm-actions {
    display: inline-flex;
    gap: 8px;
  }

  :global(.agent-llm-popper .el-select-dropdown__item) {
    height: 26px;
    padding: 0 14px;
    line-height: 26px;
  }

  :global(.agent-llm-popper .el-select-group__title) {
    padding: 0 14px;
  }
</style>
