<template>
  <div>
    <ElForm size="default">
      <XField
        ref="fieldRef"
        v-model="fieldValue"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange">
      </XField>

      <XField
        label="字段名称"
        label-width="100px"
        editor="text"
        required
        error="错误信息"
        :inline-message="true"
        :show-message="true"
        @change="onChange"
        :tooltipMessage="true"
        tooltip-position="outer">
      </XField>

      <XField
        label="字段名称"
        label-width="100px"
        editor="textarea"
        placeholder="多行文本"
        :disabled="disabled">
      </XField>

      <XField
        label="字段名称"
        error="错误信息"
        label-width="100px"
        editor="select"
        :props="{ multiple: true }"
        :options="options"
        tooltip-position="outer">
        <template #option="{ option }">
          <div>-- {{ option.label }}</div>
        </template>
      </XField>

      <XField
        label="字段名称"
        error="错误信息"
        v-model="fieldValue"
        label-width="100px"
        :options="optionsLoader"
        tooltip-position="outer"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange">
        <template #editor="{ editor }">
          <ElInput v-bind="editor">
            <template #prepend>搜索</template>
          </ElInput>
        </template>
      </XField>

      <XField
        label="字段名称"
        error="错误信息"
        label-width="100px"
        editor="checkbox"
        :model-value="[2]"
        :props="{
          button: true
        }"
        :options="optionsLoader">
      </XField>
      <XField
        label="字段名称"
        error="错误信息"
        label-width="100px"
        editor="radio"
        :props="{
          button: true
        }"
        :options="optionsLoader">
      </XField>

      <XField label="Number" editor="number"> </XField>
      <XField label="日期" editor="date"> </XField>
      <XField label="日期时间" editor="datetime"> </XField>
      <XField label="时间" editor="time" width="400px"> </XField>
      <XField label="投票" editor="rate"> </XField>
      <XField label="开关" editor="switch"> </XField>
      <XField label="滑块" editor="slider"> </XField>
      <XField label="级联" editor="cascader" :options="TreeData"> </XField>
      <XField
        label="数据选择器"
        editor="picker"
        :props="{ loader, columns, valueKey: 'id', onPicked }">
      </XField>
      <XField
        label="表格编辑器"
        editor="grid"
        :model-value="{ a: 1 }"
        :props="dialogGrid">
      </XField>
    </ElForm>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XField, request, arrayToKv, kvToArray } from '@vtj/web';
  import { ElInput, ElForm } from 'element-plus';
  import TreeData from '../../data/tree';

  const fieldValue = ref('');
  const fieldRef = ref();

  const disabled = ref(false);

  const onChange = (val: any) => {
    console.log('onChange', val);
  };

  const onFocus = () => {
    console.log('onFocus');
  };

  const onBlur = () => {
    console.log('onBlur');
  };

  const options: any = ref([
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 }
  ]);

  const optionsLoader = () => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(options.value);
      }, 0);
    });
  };

  setTimeout(() => {
    // disabled.value = true;
    // fieldValue.value = 'ABC';
    // fieldRef.value.focus();
    // console.log('fieldRef.value.focus', fieldRef.value.focus);
    options.value.push({ label: '选项五', value: 5 });
  }, 100);

  const fetchData = (data: any) => {
    return request({
      url: '/mock-api/list',
      method: 'get',
      data,
      settings: {
        originResponse: false
      }
    });
  };

  const loader: any = async (params: any) => {
    console.log('do load', params);
    const { page, pageSize = 50, form } = params || {};
    // console.log('query', { ...params, ...model, tab: tabValue.value });
    return await fetchData({
      ...form,
      currentPage: page,
      pageSize,
      total: 1000
    });
  };

  const columns = [
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'name',
      title: '姓名'
    },

    {
      field: 'sex',
      title: '性别'
    },
    {
      field: 'age',
      title: '年龄'
    },
    {
      field: 'intro',
      title: '简介'
    },
    {
      field: 'join',
      title: '入职日期'
    },
    {
      field: 'create',
      title: '创建时间'
    }
  ];

  const onPicked = (data: any) => {
    console.log('picked', data);
  };

  const dialogGrid = {
    title: '键值对',
    columns: [
      {
        type: 'checkbox',
        title: '',
        width: 60
      },
      {
        type: 'seq',
        title: '序号',
        width: 60
      },
      {
        field: 'key',
        title: '键',
        editRender: {
          name: 'XInput'
        }
      },
      {
        field: 'value',
        title: '值',
        editRender: {
          name: 'XInput'
        }
      }
    ],
    formatter: kvToArray,
    valueFormatter: arrayToKv
  };
</script>
