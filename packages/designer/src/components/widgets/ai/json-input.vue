<template>
  <div class="v-ai-widget-image-input v-ai-widget-json-input">
    <div v-if="textMode" class="v-ai-widget-json-input-text">
      <ElInput
        ref="textInputRef"
        type="textarea"
        :rows="8"
        placeholder="请粘贴JSON格式元数据"
        v-model="textContent"></ElInput>
      <div class="v-ai-widget-json-input-text__footer">
        <ElButton type="default" size="small" @click="() => changeMode(false)">
          文件上传
        </ElButton>
        <ElButton
          :icon="Promotion"
          type="primary"
          size="default"
          round
          @click="onSubmitText">
          确定
        </ElButton>
      </div>
    </div>
    <ElUpload
      v-else
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

      <div class="el-upload__text">
        拖放 Sketch / Figma / MasterGo 元数据文件
      </div>
      <div class="or">或</div>
      <ElButton size="default">选择文件</ElButton>
      <ElButton size="default" @click.stop="() => changeMode(true)">
        粘贴数据
      </ElButton>
      <ElLink
        class="help-link"
        type="primary"
        href="https://vtj.pro/guide/meta.html"
        target="_blank"
        @click.stop>
        如何获得元数据文件？
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
  import { ref, shallowRef, watch, computed, nextTick } from 'vue';
  import { XIcon } from '@vtj/ui';
  import {
    ElUpload,
    ElButton,
    ElImage,
    ElCheckbox,
    vLoading,
    ElMessage,
    ElLink,
    ElInput,
    type UploadFile
  } from 'element-plus';
  import { UploadFilled, CloseBold, Promotion } from '@vtj/icons';
  import { useEngine } from '../../../framework';
  import { readJsonFile, alert } from '../../../utils';
  import other from '../../../assets/json.png';
  import figma from '../../../assets/figma.png';
  import sketch from '../../../assets/sketch.png';
  import mastergo from '../../../assets/MasterGo.png';

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
  const textMode = ref<boolean>(false);
  const textInputRef = ref();
  const textContent = ref('');
  const textFile = ref();
  const cover = computed(() => {
    const map: Record<string, string> = {
      figma,
      sketch,
      other,
      mastergo,
      group: mastergo,
      frame: mastergo
    };
    if (fileType.value) {
      return map[fileType.value.toLowerCase()] || other;
    }
    return other;
  });
  const uploadRef = ref();
  const content = shallowRef<any>(null);

  const changeMode = async (isText: boolean) => {
    textMode.value = isText;
    if (isText) {
      await nextTick();
      textInputRef.value?.focus();
    } else {
      textContent.value = '';
      textFile.value = null;
    }
  };

  const onChange = async (file: UploadFile) => {
    if (file.status === 'ready' && file.raw) {
      const json = await readJsonFile(file.raw);
      if (json && json.type) {
        fileType.value = json.type;
        fileName.value = file.raw.name;
        content.value = json;
      } else {
        await alert(
          '无法识别文件, 只支持Sketch/Figma/MasterGo插件导出数据文件',
          {
            type: 'warning'
          }
        );
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

  const onSubmitText = async () => {
    const text = textContent.value.trim();
    if (!text) {
      await alert('请输入元数据', {
        type: 'warning'
      });
      textInputRef.value?.focus();
    }
    try {
      const json = JSON.parse(text);
      const jsonString = JSON.stringify(json);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const file = new File([blob], 'data.json', {
        type: 'application/json',
        lastModified: new Date().getTime()
      });
      fileType.value = json.type || 'mastergo';
      fileName.value = file.name;
      content.value = json;
      textFile.value = file;
    } catch (e) {
      await alert('数据格式错误', {
        type: 'warning'
      });
    }
  };

  const onSend = () => {
    if (textFile.value) {
      emit('send', textFile.value, engine.state.autoApply, content.value);
    } else {
      uploadRef.value.submit();
    }
  };
</script>
