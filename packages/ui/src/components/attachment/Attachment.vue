<template>
  <div class="x-attachment" :class="classes">
    <ElUpload
      ref="elUploadRef"
      v-model:file-list="fileList"
      :on-exceed="onExceed"
      :on-change="onChange"
      :http-request="httpRequest"
      v-bind="uploadProps">
      <div class="x-attachment__upload">
        <slot name="upload">
          <ElIcon><Plus /></ElIcon>
        </slot>
      </div>
      <template #file="{ file }">
        <div
          class="x-attachment__item"
          :class="{ 'is-selected': isSelected(file) }"
          v-loading="loadings[file.uid]"
          @click="onClick(file)">
          <div class="x-attachment__wrapper">
            <img
              class="el-upload-list__item-thumbnail"
              :class="{ 'is-icon': !isImage(file as AttachmentFile) }"
              :src="createFileThumbnail(file)" />
            <div
              v-if="props.listType !== 'card' || file.name"
              class="el-upload-list__item-name"
              :title="file.url">
              <span v-if="file.name" class="x-attachment__item-name">
                {{ file.name }}</span
              >
              <span class="el-upload-list__item-url">
                {{ file.url }}
              </span>
            </div>
          </div>
          <div v-if="hasAction" class="el-upload-list__item-actions">
            <span
              v-if="props.previewable"
              @click.stop="openImagePreviewer(file as AttachmentFile)"
              class="el-upload-list__item-preview">
              <el-icon><ZoomIn /></el-icon>
            </span>
            <span
              v-if="props.downloadable"
              @click.stop="download(file as AttachmentFile)"
              class="el-upload-list__item-delete">
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="props.removable && !props.disabled"
              @click.stop="remove(file as AttachmentFile)"
              class="el-upload-list__item-delete">
              <el-icon><Delete /></el-icon>
            </span>
          </div>
        </div>
      </template>

      <template #tip>
        <slot name="tip"></slot>
      </template>
    </ElUpload>
    <ElImageViewer
      v-if="props.previewable && imagePreviewerVisible"
      hide-on-click-modal
      teleported
      :url-list="imageList"
      :initial-index="imageInitialIndex"
      @close="onImageViewerClose"></ElImageViewer>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, watch, type Ref } from 'vue';
  import {
    ElUpload,
    ElIcon,
    ElMessage,
    vLoading,
    ElMessageBox,
    ElImageViewer,
    type UploadUserFile,
    type UploadRequestOptions,
    type UploadFile,
    type UploadFiles
  } from 'element-plus';
  import { Plus, ZoomIn, Download, Delete } from '@vtj/icons';
  import { cloneDeep, downloadUrl, downloadRemoteFile } from '@vtj/utils';
  import { type AttachmentEmits, type AttachmentFile } from './types';
  import { useAdapter } from '../../adapter';
  import { attachmentProps } from './props';
  import { getFileType, isImage, toAttachmentFile } from './util';
  import { icons } from './icons';

  defineOptions({
    name: 'XAttachment'
  });

  const adapter = useAdapter();
  const props = defineProps(attachmentProps);
  const emit = defineEmits<AttachmentEmits>();
  const loadings: Record<string, boolean> = {};
  const elUploadRef = ref();
  const refreshKey = ref(Symbol());
  const imagePreviewerVisible = ref(false);
  const imageInitialIndex = ref(0);
  const selections = ref<AttachmentFile[]>([]);

  const classes = computed(() => {
    return {
      [`x-attachment--${props.listType}`]: !!props.listType,
      ['is-disabled']: !!props.disabled,
      ['is-pointer']: !!props.clickable || !!props.selectable,
      ['is-not-add']:
        !props.addable || (props.limit && props.limit <= fileList.value.length),
      [`is-${props.size}`]: !!props.size
    };
  });

  const fileList: Ref<UploadUserFile[]> = ref([] as UploadUserFile[]);

  const imageList = computed(() => {
    return fileList.value
      .filter((n) => isImage(n as AttachmentFile))
      .map((n) => n.url as string);
  });

  const hasAction = computed(
    () => props.removable || props.previewable || props.downloadable
  );

  const createFileThumbnail = (file: any) => {
    const type = getFileType(file);
    if (type === 'img') {
      return props.thumbnail && !file.url.startsWith('blob:')
        ? props.thumbnail(file)
        : file.url;
    }
    return icons[type];
  };

  const uploadProps = computed(() => {
    return {
      limit: props.limit,
      disabled: props.disabled,
      multiple: props.multiple,
      accept: props.accept,
      listType: { card: 'picture-card', list: 'picture' }[
        props.listType
      ] as any,
      beforeUpload: props.beforeUpload as any,
      autoUpload: props.autoUpload
    };
  });

  watch(
    () => props.modelValue,
    async (v) => {
      const copy = cloneDeep(v || []);
      fileList.value = props.formatter
        ? await props.formatter(copy)
        : (copy as UploadUserFile[]);
    },
    {
      immediate: true
    }
  );

  watch(
    () => props.selectValue,
    (v) => {
      selections.value = [].concat(
        cloneDeep(v || []) as any
      ) as AttachmentFile[];
    },
    {
      immediate: true
    }
  );

  const onExceed = (_files: File[], _uploadFiles: UploadUserFile[]) => {
    ElMessage.warning({
      message: `您选择的文件数量超过了限制，只允许上传${props.limit}个文件。`
    });
  };

  const valueFormat = async (files: any[] = []) => {
    return props.valueFormatter ? await props.valueFormatter(files) : files;
  };

  const validateLimitSize = (file: File) => {
    if (!props.limitSize) return true;
    const limitSize = props.limitSize.toUpperCase();
    const value = Number.parseFloat(limitSize) || 0;
    if (value) {
      if (limitSize.endsWith('M')) {
        return file.size < value * 1024 ** 2;
      } else {
        return file.size < value * 1024;
      }
    }
    return true;
  };

  const clean = (file: UploadUserFile) => {
    const index = fileList.value.findIndex((n) => n.uid === file.uid);
    if (index > -1) {
      fileList.value.splice(index, 1);
    }
  };

  const httpRequest = async (options: UploadRequestOptions) => {
    const uploader = props.uploader || adapter.uploader;
    if (uploader) {
      const file = options.file;
      const valid = validateLimitSize(file);
      if (!valid) {
        clean(file as UploadUserFile);
        ElMessage.error({
          message: `上传文件体积不可超过${props.limitSize}`
        });
        return;
      }
      loadings[file.uid] = true;
      const res = await uploader(file).catch(() => null);
      loadings[file.uid] = false;
      if (!res) {
        clean(file as UploadUserFile);
        ElMessage.error({
          message: `文件${file.name}上传失败。`
        });
        return;
      }
      return typeof res === 'string' ? { url: res } : res;
    }
  };

  const toggleSelected = (file: UploadUserFile) => {
    const index = selections.value.findIndex((n: any) => n.url === file.url);
    if (index > -1) {
      if (props.multiple) {
        selections.value.splice(index, 1);
      } else {
        selections.value = [];
      }
    } else {
      if (props.multiple) {
        selections.value.push(toAttachmentFile(file));
      } else {
        selections.value = [toAttachmentFile(file)];
      }
    }
    emit('select', selections.value);
    emit(
      'update:selectValue',
      props.multiple ? selections.value : selections.value[0]
    );
  };

  const unSelect = (file: UploadUserFile | AttachmentFile) => {
    const index = selections.value.findIndex((n: any) => n.url === file.url);
    if (index > -1) {
      selections.value.splice(index, 1);
    }
  };

  const isSelected = (file: UploadUserFile) => {
    return !!selections.value.find((n: any) => n.url === file.url);
  };

  const onClick = (file: UploadUserFile) => {
    if (props.clickable) {
      emit('click', toAttachmentFile(file));
    }
    if (props.selectable) {
      toggleSelected(file);
    }
  };

  const onChange = async (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    const isAllSuccess = uploadFiles.every((n) => n.status === 'success');
    if (isAllSuccess && uploadFiles.length === fileList.value.length) {
      const files: AttachmentFile[] = fileList.value.map((n) => {
        return toAttachmentFile(n);
      });
      emit('change', files);
      emit('update:modelValue', await valueFormat(files));
      if (uploadFile?.response) {
        refreshKey.value = Symbol();
      }
    }
  };

  const remove = async (file: AttachmentFile) => {
    const ret = await ElMessageBox.confirm('确定删除文件?', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (!ret) return;
    const files = fileList.value
      .filter((n) => {
        return n.uid !== (file as UploadUserFile).uid || n.url !== file.url;
      })
      .map((n) => {
        return toAttachmentFile(n);
      });
    fileList.value = files;
    emit('remove', file);
    emit('change', files);
    emit('update:modelValue', await valueFormat(files));
    unSelect(file);
    if (!file?.raw) {
      refreshKey.value = Symbol();
    }
  };

  const download = (file: AttachmentFile) => {
    if (props.downloader) {
      props.downloader(file);
    } else {
      downloadRemoteFile(file.url, file.name).catch(() => {
        downloadUrl(file.url, file.name);
      });
    }
    emit('download', file);
  };

  const openImagePreviewer = (file: AttachmentFile) => {
    if (isImage(file)) {
      imageInitialIndex.value = imageList.value.findIndex(
        (n) => n === file.url
      );
      imagePreviewerVisible.value = true;
    } else {
      if (props.previewer) {
        props.previewer(file);
      } else {
        window.open(file.url);
      }
    }

    emit('preview', file);
  };

  const onImageViewerClose = () => {
    imagePreviewerVisible.value = false;
  };

  const upload = () => {
    elUploadRef.value?.submit();
  };

  defineExpose({
    elUploadRef,
    remove,
    download,
    selections,
    fileList,
    upload
  });
</script>
