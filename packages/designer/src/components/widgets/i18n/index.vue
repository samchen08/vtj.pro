<template>
  <Panel
    class="v-i18n-widget"
    title="国际化资源"
    plus
    remove
    @plus="onAdd"
    @remove="onRemove">
    <template #actions>
      <XAction
        mode="icon"
        background="hover"
        title="设置"
        size="default"
        :icon="Setting"
        @click="onSetting"></XAction>
    </template>
    <XGrid
      ref="gridRef"
      size="mini"
      :columns="columns"
      :loader="loader"
      :editRules="editRules"
      :rowConfig="{ keyField: 'key' }"
      auto-resize
      editable
      border="none"
      :editConfig="{ mode: 'row', trigger: 'click', showStatus: false }"
      @edit-change="onChange">
      <template #top>
        <div>
          <ElInput
            size="small"
            :prefix-icon="Search"
            placeholder="请输入查询关键字..."
            v-model="keyword"
            clearable></ElInput>
        </div>
      </template>
    </XGrid>
    <XDialogForm
      v-if="formVisible"
      v-model="formVisible"
      title="国际化设置"
      width="300px"
      height="200px"
      :model="formModel"
      :submitMethod="submitMethod">
      <XField
        name="locale"
        size="small"
        label="默认语言"
        editor="radio"
        :props="{ button: true }"
        :options="locales"></XField>
      <XField
        name="fallbackLocale"
        size="small"
        label="回退语言"
        editor="radio"
        :props="{ button: true }"
        :options="locales"></XField>
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Panel } from '../../shared';
  import {
    XGrid,
    XAction,
    XDialogForm,
    XField,
    type GridColumns,
    type GridLoader
  } from '@vtj/ui';
  import { ElInput } from 'element-plus';
  import { Search, Setting } from '@vtj/icons';
  import { uid } from '@vtj/utils';
  import { useI18n } from '../../hooks';

  defineOptions({
    name: 'I18nWidget'
  });

  const { project, formModel, formVisible, submitMethod, locales } = useI18n();

  const gridRef = ref();
  const keyword = ref('');

  const columns: GridColumns = [
    {
      type: 'checkbox',
      width: 40
    },
    {
      field: 'key',
      title: '标识',
      minWidth: 60
    },
    {
      field: 'zh-CN',
      title: '简体中文',
      minWidth: 80,
      editRender: {
        name: 'XInput'
      }
    },
    {
      field: 'en',
      title: 'English',
      minWidth: 80,
      editRender: {
        name: 'XInput'
      }
    }
  ];

  const editRules = {
    key: [{ required: true, message: '不能为空' }],
    'zh-CN': [{ required: true, message: '不能为空' }],
    en: [{ required: true, message: '不能为空' }]
  };

  const loader: GridLoader = async () => {
    let list: any[] = project.value?.i18n.messages ?? [];
    list = keyword.value
      ? list.filter((n) => {
          return (
            n.key?.includes(keyword.value) ||
            n['zh-CN']?.includes(keyword.value) ||
            n.en?.includes(keyword.value)
          );
        })
      : list;
    return {
      list,
      total: list.length
    };
  };

  const onAdd = () => {
    gridRef.value.insertActived({
      key: uid(),
      ['zh-CN']: '',
      en: ''
    });
  };

  const onChange = async (rows: any) => {
    if (!project.value) return;
    const i18n = project.value.i18n;
    if (i18n) {
      const errors = await gridRef.value.validate();
      if (!errors) {
        i18n.messages = rows;
        project.value.setI18n(i18n);
      }
    }
  };

  const onRemove = async () => {
    if (gridRef.value) {
      const rows = gridRef.value.getSelected();
      gridRef.value.remove(rows);
    }
  };

  const onSetting = () => {
    formVisible.value = true;
  };

  watch(keyword, () => {
    gridRef.value?.search();
  });
</script>
