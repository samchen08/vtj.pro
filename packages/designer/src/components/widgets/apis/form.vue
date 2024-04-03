<template>
  <XDialog ref="dialogRef" :title="title" width="1000px" height="600px">
    <XContainer fit>
      <XContainer width="100px" :shrink="false">
        <XTabs
          v-model="currentTab"
          :items="tabs"
          tab-position="left"
          border
          fit></XTabs>
      </XContainer>
      <XPanel
        :header="null"
        :border="false"
        overflow="auto"
        grow
        :shrink="true"
        fit>
        <XForm
          ref="formRef"
          :footer="false"
          labelPosition="top"
          :tooltipMessage="false"
          :model="currentModel"
          :submitMethod="submitMethod">
          <BaseInfo v-show="currentTab === 'base'"></BaseInfo>

          <div v-if="currentTab === 'settings'">
            <JsonpOptions v-if="isJsonp"></JsonpOptions>
            <RequestSettins v-else></RequestSettins>
          </div>
          <MockTemplate v-if="currentTab === 'mock'"></MockTemplate>
        </XForm>

        <template #footer>
          <XContainer justify="space-between">
            <div>
              <ElButton
                v-if="currentTab === 'mock'"
                :disabled="!props.project?.config?.mock"
                type="warning"
                @click="onPreview">
                预览
              </ElButton>
            </div>
            <div>
              <ElButton @click="onCancel">取消</ElButton>
              <ElButton type="primary" @click="onSubmit">保存</ElButton>
            </div>
          </XContainer>
        </template>
      </XPanel>
    </XContainer>
    <ElDrawer
      v-if="showPreview"
      class="v-drawer"
      v-model="showPreview"
      title="模拟数据结果"
      direction="btt"
      append-to-body
      size="80%">
      <Editor
        :model-value="mockResult"
        border
        dark
        height="100%"
        lang="json"></Editor>
    </ElDrawer>
  </XDialog>
</template>
<script setup lang="ts">
  import { ref, computed, watch, provide, nextTick } from 'vue';
  import {
    XDialog,
    XTabs,
    XContainer,
    XPanel,
    XForm,
    type TabsItem
  } from '@vtj/ui';
  import Mock from 'mockjs';
  import { type ApiSchema, type ProjectModel } from '@vtj/core';
  import { ElButton, ElDrawer } from 'element-plus';
  import { parseExpression } from '@vtj/renderer';
  import { notify, expressionValidate } from '../../../utils';
  import BaseInfo from './base-info.vue';
  import RequestSettins from './request-settings.vue';
  import JsonpOptions from './jsonp-options.vue';
  import MockTemplate from './mock-template.vue';
  import Editor from '../../editor';

  export interface Props {
    model?: ApiSchema;
    project?: ProjectModel | null;
  }

  const props = defineProps<Props>();
  const title = computed(() => (props.model ? '编辑API' : '新增API'));
  const currentTab = ref<string>('base');
  const dialogRef = ref();
  const formRef = ref();
  const currentModel = ref<ApiSchema>(props.model || ({} as ApiSchema));
  const showPreview = ref(false);
  const mockResult = ref('');
  const tabs: TabsItem[] = [
    {
      label: '基础信息',
      value: 'base'
    },
    {
      label: '请求配置',
      value: 'settings'
    },
    {
      label: '模拟数据',
      value: 'mock'
    }
  ];

  provide('currentModel', currentModel);

  const isJsonp = computed(() => currentModel.value?.method === 'jsonp');

  watch(
    () => props.model,
    (v) => {
      currentModel.value = Object.assign({}, v || {}) as ApiSchema;
      currentTab.value = 'base';
    },
    {
      immediate: true
    }
  );

  watch(currentTab, async () => {
    formRef.value?.formRef.validate(async (v: boolean) => {
      if (!v) {
        await nextTick();
        currentTab.value = 'base';
      }
    });
  });

  const onCancel = () => {
    dialogRef.value?.cancel();
  };

  const onSubmit = () => {
    formRef.value?.submit();
  };

  const submitMethod = async (_model: any) => {
    const isExist = props.project?.existApiName(
      currentModel.value.name,
      props.model ? [currentModel.value.id] : []
    );
    if (isExist) {
      notify(`API名称 [ ${currentModel.value.name} ] 已存在`);
      return false;
    }

    if (
      currentModel.value.headers &&
      !expressionValidate(currentModel.value.headers, window)
    ) {
      return false;
    }

    if (
      currentModel.value.mockTemplate &&
      !expressionValidate(currentModel.value.mockTemplate, window)
    ) {
      return false;
    }

    props.project?.setApi(currentModel.value);

    dialogRef.value?.close();
    return true;
  };

  const onPreview = () => {
    if (currentModel.value.mockTemplate) {
      const handler = parseExpression(
        currentModel.value.mockTemplate,
        {},
        true
      );
      const { url, method } = currentModel.value;
      const json = Mock.mock(
        handler({
          url,
          type: method
        })
      );
      mockResult.value = JSON.stringify(json, null, 2);
      showPreview.value = true;
    }
  };
</script>
