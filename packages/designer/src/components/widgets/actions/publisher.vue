<template>
  <XDialogForm
    width="600px"
    height="760px"
    :icon="VtjIconTemplate"
    title="发布到模板"
    :model="model"
    :submit-method="submit">
    <XField label="截图">
      <template #editor>
        <div class="v-actions-widget__cover">
          <ElImage :src="imageDataUrl" fit="contain"></ElImage>
        </div>
      </template>
    </XField>
    <XField
      label="名称"
      name="name"
      required
      :rules="{
        pattern: NAME_REGEX,
        message: '名称格式不正确，要求英文字母大写驼峰格式'
      }"></XField>
    <XField label="标题" name="label" required></XField>
    <XField
      label="分类"
      name="category"
      editor="select"
      :options="getTemplateCategories"
      required></XField>
    <XField
      label="版本号"
      name="version"
      required
      :rules="{
        pattern: VERSION_REGEX,
        message: '版本号格式不正确，示例: 0.1.0'
      }"></XField>
    <XField
      label="公开"
      name="share"
      editor="switch"
      tip="非公共的模版即仅自己可以使用, 公开模版后不允许删除"
      required>
    </XField>
    <XField
      label="更新日志"
      name="changelog"
      :props="{ type: 'textarea' }"></XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { ElImage, ElMessage, ElMessageBox } from 'element-plus';
  import { VtjIconTemplate } from '@vtj/icons';
  import { dataURLtoBlob } from '@vtj/utils';
  import { useOpenApi } from '../../hooks';
  import { type PublishTemplateDto } from '../../../framework';
  import { NAME_REGEX, VERSION_REGEX } from '../../../constants';
  export interface Props {
    id?: string;
    canvas: any;
    name: string;
    label: string;
    dsl: any;
  }
  const props = defineProps<Props>();

  const { getTemplateCategories, publishTemplate, getTemplateById, engine } =
    useOpenApi();

  const model = reactive({
    name: props.name,
    label: props.label,
    share: false
  });

  const isOwner = ref(false);

  if (props.id) {
    getTemplateById(props.id).then((res) => {
      if (res) {
        Object.assign(model, {
          category: res.category,
          version: res.latest
        });
      }
      isOwner.value = !!res;
    });
  }

  const imageDataUrl = computed(() => {
    if (props.canvas) {
      return props.canvas.toDataURL('image/png');
    }
    return null;
  });

  const submit = async () => {
    if (!imageDataUrl.value) {
      await ElMessageBox.alert('截图失败，无法完成发布', {
        title: '提示',
        type: 'error'
      });
      return false;
    }
    const cover = dataURLtoBlob(imageDataUrl.value);
    const { dsl, id } = props;
    let templateId;
    if (isOwner.value) {
      const ret = await ElMessageBox.confirm(
        '该模板已存在，请确认您的操作是更新模板还是新建',
        {
          type: 'warning',
          title: '提示',
          confirmButtonText: '更新',
          cancelButtonText: '新建',
          showClose: false
        }
      ).catch(() => false);
      templateId = ret ? id : undefined;
    }
    const platform = engine.project.value?.platform || 'web';
    const dto: PublishTemplateDto = {
      id: templateId,
      dsl: JSON.stringify(dsl),
      cover,
      category: '',
      version: '',
      platform,
      ...model
    };
    const ret = await publishTemplate(dto).catch((e: any) => {
      ElMessage.error({
        message: e.message || e || '未知错误'
      });
      return false;
    });
    if (ret) {
      ElMessage.success({
        message: '发布模板成功！'
      });

      const widget = engine.skeleton?.getWidget('Templates');
      widget?.widgetRef.refreshTemplates();
    }
    return !!ret;
  };
</script>

<style lang="scss" scoped>
  .v-actions-widget__cover {
    width: 100%;
    height: 300px;
    background-color: var(--el-fill-color-dark);
    border: 1px solid var(--el-border-color);
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
</style>
