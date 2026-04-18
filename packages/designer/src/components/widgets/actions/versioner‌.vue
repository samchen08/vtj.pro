<template>
  <XDialogForm
    v-if="visible"
    v-model="visible"
    title="发布应用"
    :icon="Share"
    width="600px"
    height="650px"
    :form-props="{ labelWidth: '100px' }"
    :model="model"
    :rules="rules"
    :submit-method="submit">
    <XField label="截图">
      <template #editor>
        <div class="v-actions-widget__cover">
          <ElImage :src="imageDataUrl" fit="cover"></ElImage>
          <ElUpload
            class="v-actions-widget__upload"
            @change="onFileChange"
            :auto-upload="false"
            :show-file-list="false"
            accept="image/*">
            <template #trigger>
              <ElButton round :icon="Upload" type="warning" size="small">
                更换图片
              </ElButton>
            </template>
          </ElUpload>
        </div>
      </template>
    </XField>
    <XField label="线上版本号" name="prodVersion" editor="none">
      <template #editor>
        <span>{{ model.prodVersion }}</span>
        <ElTag v-if="model.status === 'unpublished'" size="small" type="info">
          未上线
        </ElTag>
      </template>
    </XField>
    <XField
      label="更新类型"
      name="type"
      required
      editor="radio"
      :options="typeOptions"
      :props="{ button: true }"
      @change="handleTypeChange"></XField>
    <XField label="版本号" name="version" required></XField>
    <XField
      label="版本备注"
      name="changelog"
      editor="textarea"
      :props="{ rows: 5 }"
      @keyup.stop></XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import {
    ElMessageBox,
    ElTag,
    ElMessage,
    ElUpload,
    ElImage,
    ElButton,
    type UploadFile
  } from 'element-plus';
  import { Share, Upload } from '@vtj/icons';
  import { dataURLtoBlob, fileToBase64 } from '@vtj/utils';
  import { XDialogForm, XField } from '@vtj/ui';
  import { useEngine } from '../../../framework';
  import { upgradeVersion } from '../../../utils';

  export interface Props {
    canvas: any;
    getAppsInit?: any;
    postAppsVersions?: any;
    postDslDevPublish?: any;
    putAppsCurrentVersion?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    appMode: true,
    getAppsInit: () => {
      return async () => {};
    },
    postAppsVersions: () => {
      return async () => {};
    },
    postDslDevPublish: () => {
      return async () => {};
    },
    putAppsCurrentVersion: () => {
      return async () => {};
    }
  });

  const engine = useEngine();
  const visible = ref(false);
  const userFile = ref();
  const imageDataUrl = computed(() => {
    if (userFile.value) {
      return userFile.value;
    }
    if (props.canvas) {
      return props.canvas.toDataURL('image/png');
    }
    return null;
  });

  const onFileChange = async (uploadFile: UploadFile) => {
    if (uploadFile.raw) {
      userFile.value = await fileToBase64(uploadFile.raw);
    } else {
      userFile.value = '';
    }
  };

  const model = ref({
    appId: '',
    appCode: '',
    status: 'unpublished',
    prodVersion: '',
    type: 'patch',
    version: upgradeVersion('patch'),
    changelog: ''
  });

  const rules = {
    version: [
      {
        pattern: /^\d+\.\d+\.\d+$/,
        message: '版本号格式不正确',
        trigger: 'blur'
      }
    ]
  };

  const typeOptions = [
    {
      label: '版本升级',
      value: 'major'
    },
    {
      label: '特性更新',
      value: 'minor'
    },
    {
      label: '修订补丁',
      value: 'patch'
    }
  ];

  const handleTypeChange = (type: any) => {
    model.value.version = upgradeVersion(type, model.value.prodVersion);
  };

  const submit = async (data: any) => {
    const { appId, appCode, changelog, version } = data;
    const cover = dataURLtoBlob(imageDataUrl.value);
    const versionInfo = await props
      .postAppsVersions({
        appId,
        changelog,
        version
      })
      .catch(() => null);
    if (!versionInfo) return false;

    const res = await props.postDslDevPublish({
      app: appCode,
      appVersionId: versionInfo.id
    });

    if (!res) return false;

    visible.value = false;

    const ret = await ElMessageBox.confirm(
      '应用版本已创建成功，是否更新线上版本？',
      {
        type: 'warning',
        title: '确认发布',
        confirmButtonText: '立即更新',
        cancelButtonText: '稍后更新',
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }
    ).catch(() => false);

    if (ret) {
      const result = await props
        .putAppsCurrentVersion(
          { cover },
          {
            params: { appId, versionId: versionInfo.id }
          }
        )
        .catch(() => null);
      if (result) {
        ElMessage.success({ message: '已成功更新线上版本' });
      }

      return !!result;
    }

    return true;
  };

  const openDialog = async () => {
    const code = engine.project.value?.id;
    if (!code) return;

    const app = await props
      .getAppsInit(null, {
        params: { code, mode: 'dev' }
      })
      .catch(() => null);
    if (app) {
      model.value.appId = app.id;
      model.value.appCode = app.code;
      model.value.prodVersion = (app as any).currentVersion?.version || '';
      model.value.status = app.status;
      model.value.version = upgradeVersion('patch', model.value.prodVersion);
      model.value.changelog = '';
    }
    visible.value = true;
  };

  defineExpose({
    openDialog
  });

  defineOptions({
    name: 'Versioner',
    inheritAttrs: false
  });
</script>

<style lang="scss" scoped>
  .v-actions-widget__cover {
    position: relative;
    width: 100%;
    height: 250px;
    background-color: var(--el-fill-color-dark);
    border: 1px solid var(--el-border-color);
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .v-actions-widget__upload {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
