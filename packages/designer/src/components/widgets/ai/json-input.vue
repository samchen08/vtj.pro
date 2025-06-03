<template>
  <div class="v-ai-widget-image-input v-ai-widget-json-input">
    <ElUpload
      ref="uploadRef"
      drag
      :auto-upload="false"
      :multiple="false"
      :show-file-list="false"
      accept=".json"
      :on-change="onChange"
      :http-request="upload">
      <XIcon
        :icon="UploadFilled"
        :size="60"
        color="var(--el-text-color-secondary)">
      </XIcon>

      <div class="el-upload__text">拖放 Sketch、Figma 元数据文件(.json)</div>
      <div class="or">或</div>
      <ElButton size="default">选择文件</ElButton>
      <ElLink
        class="help-link"
        type="primary"
        href="https://vtj.pro/guide/meta.html"
        target="_blank"
        @click.stop>
        如何生成元数据文件？
      </ElLink>
    </ElUpload>
    <div
      v-if="fileName"
      class="v-ai-widget-image-input__preview"
      v-loading="props.loading"
      element-loading-text="正在分析...">
      <ElImage :src="cover" fit="cover"> </ElImage>
      <div class="json-name">{{ fileName }}</div>
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
  import { ref, shallowRef, watch, computed } from 'vue';
  import { XIcon } from '@vtj/ui';
  import {
    ElUpload,
    ElButton,
    ElImage,
    ElCheckbox,
    vLoading,
    ElMessage,
    ElLink,
    type UploadFile
  } from 'element-plus';
  import { UploadFilled, CloseBold, Promotion } from '@vtj/icons';
  import { useEngine } from '../../../framework';
  import { readJsonFile, alert } from '../../../utils';
  import other from '../../../assets/json.png';
  import figma from '../../../assets/figma.png';
  import sketch from '../../../assets/sketch.png';

  export interface Props {
    loading?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    send: [file: File, auto: boolean, content: any];
  }>();
  const engine = useEngine();
  const fileName = ref<string | null>(null);
  const fileType = ref<string | null>(null);
  const cover = computed(() => {
    const map: Record<string, string> = {
      figma,
      sketch,
      other
    };
    if (fileType.value) {
      return map[fileType.value.toLowerCase()] || other;
    }
    return other;
  });
  const uploadRef = ref();
  const content = shallowRef<any>(null);

  const onChange = async (file: UploadFile) => {
    if (file.status === 'ready' && file.raw) {
      const json = await readJsonFile(file.raw);
      if (json && json.type) {
        fileType.value = json.type;
        fileName.value = file.raw.name;
        content.value = json;
      } else {
        await alert('无法识别文件, 只支持Sketch/Figma插件导出数据文件', {
          type: 'warning'
        });
        fileType.value = null;
        fileName.value = null;
        content.value = null;
      }
    }
  };

  const onRemove = () => {
    fileName.value = null;
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
      emit('send', options.file, engine.state.autoApply, content.value);
    }
  };

  const onSend = () => {
    uploadRef.value.submit();
  };
</script>
