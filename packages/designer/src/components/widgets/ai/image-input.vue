<template>
  <div class="v-ai-widget-image-input">
    <ElUpload
      ref="uploadRef"
      drag
      :auto-upload="false"
      :multiple="false"
      :show-file-list="false"
      accept=".png,.jpg,.jpeg"
      :on-change="onChange"
      :http-request="upload">
      <XIcon
        :icon="UploadFilled"
        :size="60"
        color="var(--el-text-color-secondary)">
      </XIcon>
      <div class="el-upload__text">拖放设计稿、网页截图</div>
      <div class="or">或</div>
      <ElButton size="default">选择图片</ElButton>
    </ElUpload>
    <div
      v-if="blobUrl"
      class="v-ai-widget-image-input__preview"
      v-loading="props.loading"
      element-loading-text="正在分析...">
      <ElImage :src="blobUrl" fit="cover"></ElImage>
      <ElButton
        class="v-ai-widget-image-input__remove"
        type="danger"
        :icon="CloseBold"
        circle
        size="small"
        @click="onRemove"></ElButton>
      <div class="v-ai-widget-input__footer">
        <ElCheckbox
          size="small"
          label="自动"
          border
          :disabled="props.loading"
          v-model="engine.state.autoApply"></ElCheckbox>
        <ElButton
          :icon="Promotion"
          type="primary"
          round
          size="default"
          @click="onSend">
          发送
        </ElButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { XIcon } from '@vtj/ui';
  import {
    ElUpload,
    ElButton,
    ElImage,
    ElCheckbox,
    vLoading,
    ElMessage,
    type UploadFile
  } from 'element-plus';
  import { UploadFilled, CloseBold, Promotion } from '@vtj/icons';
  import { useEngine } from '../../../framework';

  export interface Props {
    loading?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    send: [file: File, auto: boolean];
  }>();
  const engine = useEngine();
  const blobUrl = ref<string | null>(null);

  const uploadRef = ref();

  const onChange = (file: UploadFile) => {
    if (file.status === 'ready' && file.raw) {
      blobUrl.value = URL.createObjectURL(file.raw);
    }
  };

  const onRemove = () => {
    blobUrl.value = null;
  };

  watch(
    () => engine.state.autoApply,
    (v) => {
      ElMessage.success({
        message: v ? '已开启自动应用到页面功能' : '已经关闭自动应用到页面功能'
      });
    }
  );

  const upload = async (options: any) => {
    if (options.file) {
      emit('send', options.file, engine.state.autoApply);
    }
  };

  const onSend = () => {
    uploadRef.value.submit();
  };
</script>
