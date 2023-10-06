<template>
  <Dialog
    ref="dialogRef"
    class="vtj-data-source-from"
    :title="title"
    width="1000px"
    height="600px"
    submit
    cancel
    @submit="onSubmit">
    <ElForm
      ref="formRef"
      size="small"
      label-position="right"
      label-width="80px"
      :model="model"
      :rules="rules">
      <ElFormItem label="Api" prop="detail">
        <ElSelect
          v-model="model.detail"
          @change="onApiChange"
          :disabled="!!props.model">
          <ElOption v-for="item in apis" :label="item.title" :value="item.name">
            {{ item.title }}
            <i class="vtj-data-source-from__label-name">{{ item.name }}</i>
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="调用名称" prop="name">
        <ElInput v-model="model.name" :disabled="!!props.model"></ElInput>
      </ElFormItem>
      <ElFormItem label="备注描述" prop="title">
        <ElInput v-model="model.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="转换函数" prop="transform">
        <Editor
          ref="transformRef"
          border
          dark
          height="200px"
          :model-value="(model.transform as JSFunction).value"></Editor>
      </ElFormItem>
      <ElFormItem label="测试用例">
        <Editor
          ref="testRef"
          border
          dark
          height="120px"
          :model-value="(model.test as JSFunction).value"></Editor>
      </ElFormItem>
    </ElForm>
    <template #action>
      <ElButton
        size="default"
        type="warning"
        @click="runTest"
        :loading="loading">
        运行测试用例
      </ElButton>
    </template>
    <ElDrawer
      v-model="testResultVisible"
      title="测试用例运行结果"
      direction="btt"
      append-to-body
      size="80%">
      <Editor
        :model-value="testResult"
        border
        dark
        height="100%"
        lang="json"></Editor>
    </ElDrawer>
  </Dialog>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Dialog } from '../shared';
  import {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
    ElDrawer,
    ElNotification
  } from 'element-plus';
  import Editor from '../../editor';
  import { useCore } from '../../hooks';
  import { DataSourceSchema, JSFunction } from '../../core';
  import { Block } from '../../models';
  import { expressionValidate, cloneDeep, parseFunction } from '../../utils';
  const { project } = useCore();

  export interface Props {
    model?: DataSourceSchema;
    block: Block;
  }

  const props = defineProps<Props>();

  const defaultValue: DataSourceSchema = {
    type: 'api',
    detail: '',
    name: '',
    title: '',
    transform: {
      type: 'JSFunction',
      value: ''
    },
    test: {
      type: 'JSFunction',
      value: ''
    }
  };

  const model = ref<DataSourceSchema>(
    cloneDeep(props.model || { ...defaultValue })
  );
  const apis = computed(() => project.apis.value);
  const rules = {
    name: [{ required: true, message: '调用名称为必填项' }],
    title: [{ required: true, message: '备注描述为必填项' }],
    detail: [{ required: true, message: '选择引用api' }]
  };
  const title = computed(() => (props.model ? '编辑数据源' : '新增数据源'));
  const formRef = ref();
  const transformRef = ref();
  const testRef = ref();
  const dialogRef = ref();
  const testResultVisible = ref(false);
  const loading = ref(false);
  const testResult = ref('');

  const onApiChange = (val: string) => {
    const item = apis.value.find((n) => n.name === val);
    if (item) {
      model.value.name = item.name;
      model.value.title = item.title;
      (model.value.test as JSFunction).value = `() => this.${item.name}()`;
    }
  };

  const createApiDataSource = (source: DataSourceSchema, block: Block) => {
    const handler = async (...args: any[]) => {
      const api = block.runtimeContext?.$apis[source.detail];
      const res = await api.apply(this, args);
      const transform = (source.transform as JSFunction)?.value
        ? parseFunction(source.transform as JSFunction, {})
        : (source.transform as () => any);
      return transform ? transform(res) : res;
    };
    return {
      [source.name]: handler
    };
  };

  const save = async () => {
    const valid = await formRef.value.validate().catch((e: any) => false);
    if (valid) {
      const transform = transformRef.value.getEditor().getValue();
      (model.value.transform as JSFunction).value = transform;
      const test = testRef.value.getEditor().getValue();
      (model.value.test as JSFunction).value = test;

      return (
        (!transform ||
          expressionValidate(
            model.value.transform as any,
            props.block.runtimeContext
          )) &&
        expressionValidate(model.value.test as any, {
          ...props.block.runtimeContext,
          ...createApiDataSource(model.value, props.block)
        })
      );
    }
    return false;
  };

  const onSubmit = async () => {
    if (await save()) {
      props.block.setDataSource(model.value);
      dialogRef.value.close();
    }
  };

  const runTest = async () => {
    if (await save()) {
      if (!(model.value.test as JSFunction).value) {
        ElNotification.warning({
          message: '无测试用例',
          title: '提示'
        });
        return;
      }
      const content = createApiDataSource(model.value, props.block);
      loading.value = true;
      testResult.value = '';
      try {
        const func = parseFunction(model.value.test as JSFunction, content);
        const res = await func().catch((e: any) => e);
        testResult.value =
          typeof res === 'object' ? JSON.stringify(res, null, 2) : '';
        testResultVisible.value = true;
      } catch (e: any) {
        ElNotification.warning({
          message: e.message,
          title: '运行错误'
        });
      }
      loading.value = false;
    }
  };
</script>

<style lang="scss">
  .vtj-data-source-from {
    .el-select {
      width: 100%;
    }
    &__label-name {
      font-size: 12px;
      opacity: 0.6;
    }
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
</style>
