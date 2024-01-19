<template>
  <Panel class="v-apis-widget" title="API管理" plus @plus="onPlus">
    <Item
      v-for="item in list"
      :key="item.id"
      small
      :title="item.name"
      :subtitle="item.label"
      :model-value="item"
      :tag="item.method?.toUpperCase()"
      :tag-type="(tagTypeMap[item.method || 'get'] as any)"
      background
      :actions="['edit', 'remove']"
      @click="onEdit(item)"
      @action="onAction"></Item>
    <ElEmpty v-if="list.length === 0" :image-size="50"></ElEmpty>
    <XDialogForm
      v-model="visible"
      :model="formModel"
      :title="title"
      width="1000px"
      height="600px"
      :form-props="{
        labelPosition: 'top',
        tooltipMessage: false,
        size: 'default'
      }"
      :submit-method="submit">
      <XContainer gap fit>
        <XContainer direction="column" grow width="50%" shrink>
          <XField
            name="method"
            label="请求类型"
            required
            editor="radio"
            :options="methods"
            :props="{ button: true }"></XField>
          <XField
            name="name"
            label="接口名称"
            required
            :rules="{ pattern: NAME_REGEX, message: '名称格式不正确' }">
          </XField>
          <XField name="label" label="备注说明" required></XField>
          <XField name="url" label="接口URL" required></XField>
        </XContainer>
        <XContainer direction="column" grow width="50%" shrink>
          <Panel
            v-if="formModel.method !== 'jsonp'"
            title="请求配置"
            :subtitle="formModel.method"
            border>
            <XContainer justify="space-around">
              <XField
                name="settings.loading"
                size="small"
                label="加载提示"
                editor="switch"></XField>
              <XField
                size="small"
                name="settings.failMessage"
                label="失败提示"
                editor="switch"></XField>
              <XField
                size="small"
                name="settings.validSuccess"
                label="校验成功"
                editor="switch"></XField>
              <XField
                size="small"
                name="settings.originResponse"
                label="原始响应"
                editor="switch"></XField>
              <XField
                size="small"
                name="settings.injectHeaders"
                label="注入请求头"
                editor="switch"></XField>
            </XContainer>
            <XField
              size="small"
              name="settings.type"
              label="发送数据类型"
              editor="radio"
              :options="typeOptions"
              :props="{ button: true }"></XField>
            <XField
              size="small"
              name="settings.headers.value"
              label="请求头配置"
              tip="支持 JSExpression 或 JSFunction"
              :rules="{ validator }">
              <template #editor>
                <Editor
                  v-model="formModel.settings.headers.value"
                  dark
                  height="200px"></Editor>
              </template>
            </XField>
          </Panel>
          <Panel
            v-if="formModel.method === 'jsonp'"
            title="请求配置"
            :subtitle="formModel.method"
            border>
            <XField
              name="jsonpOptions.jsonpCallback"
              size="small"
              label="jsonpCallback"></XField>
            <XField
              name="jsonpOptions.jsonpCallbackFunction"
              size="small"
              label="jsonpCallbackFunction"></XField>
            <XField
              name="jsonpOptions.timeout"
              size="small"
              label="timeout"
              editor="number"></XField>
            <XField
              name="jsonpOptions.crossorigin"
              size="small"
              label="crossorigin"
              editor="switch"></XField>
          </Panel>
        </XContainer>
      </XContainer>
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XDialogForm, XField, XContainer } from '@vtj/ui';
  import { cloneDeep } from '@vtj/utils';
  import { ElEmpty } from 'element-plus';
  import { Panel, Item } from '../../shared';
  import { useProject } from '../../hooks';
  import Editor from '../../editor';
  import { NAME_REGEX, API_METHOD_TYPES } from '../../../constants';
  import { expressionValidate, notify } from '../../../utils';
  defineOptions({
    name: 'ApisWidget'
  });

  const visible = ref(false);
  const formModel = ref<any>(null);
  const isEdit = ref(false);
  const title = computed(() => (isEdit.value ? '编辑API' : '新增API'));
  const list = computed(() => {
    return project.value?.apis || [];
  });

  const { project } = useProject();

  const createEmptyFormModel = () => {
    return {
      method: 'get',
      name: '',
      label: '',
      url: '',
      settings: {
        loading: true,
        failMessage: true,
        validSuccess: true,
        originResponse: false,
        injectHeaders: false,
        type: 'form',
        headers: {
          type: 'JSExpression',
          value: '({})'
        }
      }
    };
  };

  const onPlus = () => {
    visible.value = true;
    isEdit.value = false;
    formModel.value = createEmptyFormModel();
  };

  const methods = API_METHOD_TYPES.map((n) => {
    return {
      label: n,
      value: n.toLowerCase()
    };
  });

  const tagTypeMap = {
    get: 'success',
    post: 'primary',
    put: 'warning',
    delete: 'danger',
    patch: 'warning',
    jsonp: 'info'
  };

  const typeOptions = [
    {
      label: '表单',
      value: 'form'
    },
    {
      label: 'JSON',
      value: 'json'
    },
    {
      label: '文件',
      value: 'data'
    }
  ];

  const validator = (_rule: any, value: any, callback: any) => {
    expressionValidate(
      {
        type: 'JSExpression',
        value
      },
      window
    )
      ? callback()
      : callback(new Error('代码错误'));
  };

  const onAction = (action: any) => {
    if (action.name === 'edit') {
      onEdit(action.modelValue);
    }
    if (action.name === 'remove') {
      project.value?.removeApi(action.modelValue.name);
    }
  };

  const onEdit = (item: any) => {
    isEdit.value = true;
    formModel.value = cloneDeep(item);
    visible.value = true;
  };

  const submit = async (data: any) => {
    const isExist = project.value?.existApiName(
      data.name,
      isEdit.value ? [data.id] : []
    );
    if (isExist) {
      notify(`API名称 [ ${data.name} ] 已存在`);
      return false;
    }
    project.value?.setApi(data);
    return true;
  };
</script>
