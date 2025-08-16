<template>
  <XDialog
    ref="dialogRef"
    :title="title"
    width="1000px"
    height="600px"
    maximizable>
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
          class="v-apis-widget__form"
          ref="formRef"
          :footer="false"
          labelPosition="top"
          :tooltipMessage="false"
          :model="currentModel"
          :submitMethod="submitMethod">
          <BaseInfo
            :categories="categories"
            v-show="currentTab === 'base'"></BaseInfo>

          <template v-if="currentTab === 'settings'">
            <JsonpOptions v-if="isJsonp"></JsonpOptions>
            <RequestSettins v-else></RequestSettins>
          </template>
          <MockTemplate v-if="currentTab === 'mock'"></MockTemplate>
          <TestPanel
            v-if="currentTab === 'test'"
            v-model="testCode"></TestPanel>
        </XForm>

        <template #footer>
          <XContainer v-if="currentTab === 'test'" justify="flex-end">
            <ElButton type="warning" @click="onRunTest" :loading="testLoading">
              运行测试
            </ElButton>
          </XContainer>
          <XContainer v-else justify="space-between">
            <div>
              <ElButton
                v-if="currentTab === 'mock'"
                :disabled="!currentModel.mock"
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
      :title="resultTitle"
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
  import { parseExpression, createSchemaApi } from '@vtj/renderer';
  import { notify, expressionValidate } from '../../../utils';
  import BaseInfo from './base-info.vue';
  import RequestSettins from './request-settings.vue';
  import JsonpOptions from './jsonp-options.vue';
  import MockTemplate from './mock-template.vue';
  import TestPanel from './test-panel.vue';
  import Editor from '../../editor';
  import { useEngine } from '../../../framework';

  export interface Props {
    model?: ApiSchema;
    project?: ProjectModel | null;
    categories?: string[];
  }

  const engine = useEngine();
  const props = defineProps<Props>();
  const title = computed(() => (props.model ? '编辑API' : '新增API'));
  const currentTab = ref<string>('base');
  const dialogRef = ref();
  const formRef = ref();
  const currentModel = ref<ApiSchema>(props.model || ({} as ApiSchema));
  const showPreview = ref(false);
  const mockResult = ref('');
  const testCode = ref(`() => this.runApi({
      /* 在这里可输入接口参数  */
  })`);
  const resultTitle = ref('模拟数据结果');
  const testLoading = ref(false);
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
    },
    {
      label: '接口测试',
      value: 'test'
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
      resultTitle.value = '模拟数据结果';
      showPreview.value = true;
    }
  };

  const onRunTest = async () => {
    const adapter = engine.provider.adapter;
    if (adapter && currentModel.value) {
      const runApi = createSchemaApi(currentModel.value, adapter);
      if (!runApi) return;

      if (testCode.value) {
        const run = parseExpression(
          { type: 'JSFunction', value: testCode.value },
          {
            runApi
          }
        );
        testLoading.value = true;
        try {
          adapter.access?.disableIntercept();
          const result = await run().catch((e: any) => e);
          const res = JSON.stringify(result, null, 2);
          mockResult.value = res;
          adapter.access?.enableIntercept();
        } catch (e) {
          console.warn('[runTest]', e);
        }
        testLoading.value = false;
        resultTitle.value = '接口测试结果';
        showPreview.value = true;
      }
    }
  };
</script>
