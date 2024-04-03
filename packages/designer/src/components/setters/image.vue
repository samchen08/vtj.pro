<template>
  <ElUpload
    class="v-image-setter"
    :class="{ 'v-image-setter--addable': addable }"
    list-type="picture-card"
    :limit="1"
    action="#"
    v-model:file-list="fileList"
    :before-upload="onBeforeUpload"
    :auto-upload="true"
    :on-remove="onRemove"
    v-bind="$attrs">
    <span class="v-image-setter__plus">
      <XIcon :icon="Plus"></XIcon>
    </span>
  </ElUpload>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { ElUpload, ElMessage, type UploadUserFile } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  import { Plus } from '@vtj/icons';
  import { fileToBase64 } from '@vtj/utils';

  export interface Props {
    modelValue?: any;
    limit?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    limit: 1
  });
  const emit = defineEmits(['change', 'update:modelValue']);

  const fileList = ref<UploadUserFile[]>([]);

  const addable = computed(() => {
    return fileList.value.length < props.limit;
  });

  const onBeforeUpload = (rawFile: any) => {
    if (!rawFile.type.includes('image')) {
      ElMessage.error('只能上传图片');
      return false;
    }

    fileToBase64(rawFile).then((base64: any) => {
      fileList.value = [{ name: rawFile.name, url: base64 }];
    });
    return false;
  };

  const onRemove = () => {
    fileList.value = [];
  };

  watch(
    () => props.modelValue,
    (v) => {
      fileList.value = v ? [{ name: '', url: v }] : [];
    },
    {
      immediate: true
    }
  );

  watch(fileList, () => {
    const url = fileList.value[0]?.url;
    emit('change', url);
    emit('update:modelValue', url);
  });

  defineOptions({
    name: 'ImageSetter'
  });
</script>
