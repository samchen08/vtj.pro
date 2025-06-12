<template>
  <XDialogForm
    width="1000px"
    height="700px"
    :title="title"
    :model="model"
    :form-props="{ tooltipMessage: false }"
    :submit-method="submit">
    <XField
      name="type"
      label="数据类型"
      editor="radio"
      :options="typeOptions"
      required
      :disabled="!!props.item"
      @change="onTypeChange"></XField>
    <XField
      name="ref"
      label="引用"
      editor="select"
      :key="model.type"
      required
      :disabled="!!props.item"
      :visible="refVisible"
      :options="refOptions"
      :props="{ filterable: true }"
      @change="onRefChange">
      <template #option="{ option }">
        {{ option.label }}
        <i>[ {{ option.data.name || option.data.code }} ]</i>
      </template>
    </XField>
    <XField
      name="name"
      label="调用名称"
      required
      tip="名称为英文驼峰格式"
      :disabled="!!props.item"
      :rules="{
        message: '名称格式错误',
        pattern: NAME_REGEX
      }"></XField>
    <XField name="label" label="备注说明" required></XField>
    <XField
      name="transform.value"
      label="转换函数"
      editor="none"
      :visible="refVisible">
      <Editor
        v-model="(model.transform as JSFunction).value"
        height="200px"
        dark></Editor>
    </XField>
    <XField
      name="mockTemplate.value"
      label="Mock模版"
      editor="none"
      :visible="mockVisible">
      <Editor
        v-model="(model.mockTemplate as JSFunction).value"
        height="300px"
        dark></Editor>
    </XField>
    <XField name="test.value" label="测试用例" editor="none">
      <Editor
        v-model="(model.test as JSFunction).value"
        height="100px"
        dark></Editor>
    </XField>
    <template #extra>
      <ElButton :loading="loading" type="warning" @click="runTest">
        运行测试用例
      </ElButton>
    </template>
    <ElDrawer
      v-if="showResult"
      class="v-drawer"
      v-model="showResult"
      title="测试用例运行结果"
      direction="btt"
      append-to-body
      size="80%">
      <Editor
        :model-value="runResult"
        border
        dark
        height="100%"
        lang="json"></Editor>
    </ElDrawer>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { ElButton, ElDrawer } from 'element-plus';
  import {
    type DataSourceSchema,
    BlockModel,
    type JSFunction
  } from '@vtj/core';
  import { type Context, parseExpression, createMock } from '@vtj/renderer';
  import { logger, cloneDeep } from '@vtj/utils';
  import Editor from '../../editor';
  import { NAME_REGEX } from '../../../constants';
  import { expressionValidate, notify } from '../../../utils';
  import { useDataSources } from '../../hooks';
  import { widgetManager } from '../../../managers';

  export interface Props {
    context: Context | null;
    current: BlockModel | null;
    item?: DataSourceSchema;
  }

  defineOptions({
    name: 'DataSourceDialogForm'
  });

  const props = defineProps<Props>();

  const typeOptions = computed(() => {
    const hasMeta = !!widgetManager.get('Meta');
    const options = [
      {
        label: 'API',
        value: 'api',
        border: true
      },
      {
        label: '模拟数据',
        value: 'mock',
        border: true
      }
    ];
    if (hasMeta) {
      options.splice(1, 0, {
        label: '数据配置',
        value: 'meta',
        border: true
      });
    }
    return options;
  });

  const { apis, meta, engine } = useDataSources();

  const { access } = engine.adapter || {};

  const createEmtpyModel = () => {
    return {
      type: 'api',
      ref: '',
      name: '',
      label: '',
      transform: {
        type: 'JSFunction',
        value: `(res) => {
    return res;
}`
      },
      test: {
        type: 'JSFunction',
        value: `() => this.runApi({
    /* 在这里可输入接口参数  */
})`
      },
      mockTemplate: {
        type: 'JSFunction',
        value: `(params) => {
    return {};
}`
      }
    } as DataSourceSchema;
  };

  const model = ref<DataSourceSchema>(
    Object.assign(createEmtpyModel(), cloneDeep(props.item))
  );
  const loading = ref(false);
  const runResult = ref('');
  const showResult = ref(false);

  const refOptions = computed(() => {
    if (model.value.type === 'api') {
      return apis.value.map((api) => {
        return {
          label: api.label || '',
          value: api.id,
          data: api
        };
      });
    }

    if (model.value.type === 'meta') {
      return meta.value.map((item) => {
        return {
          label: item.title || '',
          value: item.id,
          data: item
        };
      });
    }
    return [];
  });

  const title = computed(() => (props.item ? '编辑数据源' : '新增数据源'));

  const refVisible = (model: Record<string, any>) => {
    return ['api', 'meta'].includes(model.type);
  };

  const mockVisible = (model: Record<string, any>) => {
    return ['mock'].includes(model.type);
  };

  const onTypeChange = (_val: string) => {
    model.value.ref = '';
    model.value.name = '';
    model.value.label = '';
    if (
      refVisible(model.value) &&
      model.value.transform &&
      !model.value.transform.value
    ) {
      model.value.transform.value = `(res) => {
    return res;
}`;
    }

    if (
      mockVisible(model.value) &&
      model.value.mockTemplate &&
      !model.value.mockTemplate.value
    ) {
      model.value.mockTemplate.value = `(params) => {
    return {};
}`;
    }
  };

  const onRefChange = (val: string) => {
    if (model.value.type === 'api') {
      const api = apis.value.find((api) => api.id === val);
      if (api) {
        model.value.name = api.name;
        model.value.label = api.label || '';
      }
    }
    if (model.value.type === 'meta') {
      const item = meta.value.find((n) => n.id === val);
      if (item) {
        model.value.name = item.code;
        model.value.label = item.title || '';
      }
    }
  };

  const submit = async (data: any) => {
    const { transform, test, name } = data;
    if (!props.current) return false;
    if (!props.item && props.current.dataSources[name]) {
      notify(`名称【${name}】已经存在，请更换名称`);
      return false;
    }

    if (transform?.value) {
      const ret = expressionValidate(transform, props.context, true);
      if (!ret) {
        return false;
      }
    } else {
      data.transform = undefined;
    }
    if (test?.value) {
      const ret = expressionValidate(test, props.context, true);
      if (!ret) {
        return false;
      }
    } else {
      data.test = undefined;
    }

    props.current?.setDataSource(data);
    return true;
  };

  const runTest = async () => {
    if (!props.context) return;

    if (refVisible(model.value) && !model.value.ref) {
      notify('请先选择API');
      return;
    }

    if (!model.value.test?.value) {
      notify('请先填写测试用例');
      return;
    }
    const ret = expressionValidate(model.value.test, props.context, true);
    if (!ret) {
      return;
    }

    const runApi = async (...args: any[]) => {
      if (model.value.type === 'mock') {
        const mock = createMock(model.value);
        return await mock.apply(mock, args);
      } else {
        let api = props.context?.$apis[model.value.ref as string];
        if (api) {
          return await api.apply(api, args);
        } else {
          logger.warn(`API【${model.value.ref}】不存在`);
        }
      }
    };

    const run = parseExpression(model.value.test, {
      runApi
    });

    const transform = model.value.transform?.value
      ? parseExpression(model.value.transform, {}, true)
      : (v: any) => v;

    loading.value = true;
    try {
      access?.disableIntercept();
      const result = await run();
      runResult.value = JSON.stringify(await transform(result), null, 2);
      access?.enableIntercept();
    } catch (e) {
      logger.error(e);
    }
    loading.value = false;
    showResult.value = true;
  };
</script>
