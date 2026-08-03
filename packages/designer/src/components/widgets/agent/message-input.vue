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
      placeholder="描述要创建或修改的内容…（Enter 发送，Shift+Enter 换行）"
      @keydown="onKeydown"
      @update:model-value="$emit('update:message', $event)" />

    <div class="composer-toolbar">
      <el-button
        class="context-button"
        text
        round
        size="small"
        :disabled="running"
        @click="triggerFileUpload">
        ＋ 添加上下文
      </el-button>

      <el-checkbox
        :model-value="autoApprove"
        @update:model-value="$emit('update:autoApprove', !!$event)">
        替我审批
      </el-checkbox>

      <el-select
        class="model-select"
        :model-value="model"
        :disabled="running"
        aria-label="更换模型"
        size="small"
        @update:model-value="$emit('update:model', $event)">
        <el-option label="auto" value="auto" />
        <el-option label="deepseek-v4-flash" value="deepseek-v4-flash" />
        <el-option label="deepseek-v4-pro" value="deepseek-v4-pro" />
      </el-select>
      <span class="toolbar-spacer" />

      <el-button
        v-if="running"
        type="danger"
        round
        size="small"
        @click="$emit('abort')">
        停止
      </el-button>
      <el-button
        v-else
        type="primary"
        round
        size="small"
        :disabled="recognizing || (!message.trim() && !files.length)"
        @click="submit">
        {{ hasTopic ? '发送' : '开始' }} ↑
      </el-button>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    ElInput,
    ElButton,
    ElCheckbox,
    ElSelect,
    ElOption
  } from 'element-plus';
  import type { UploadedFile } from './composables/useFileRecognition';

  const props = defineProps<{
    message: string;
    running: boolean;
    hasTopic: boolean;
    files: UploadedFile[];
    recognizing: boolean;
    autoApprove: boolean;
    model: string;
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
      min-height: 84px !important;
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
</style>
