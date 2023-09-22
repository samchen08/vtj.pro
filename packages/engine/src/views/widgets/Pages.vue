<template>
  <Panel title="页面管理" :tools="tools" @tool-click="onAddClick">
    <ElEmpty v-if="pages.length === 0" description="您还没创建文件"></ElEmpty>
    <ElTree
      v-if="pages.length"
      node-key="id"
      :default-expand-all="true"
      :data="pages"
      draggable
      :allow-drop="allowDrop"
      @node-drop="onNodeDrop"
      class="vtj-pages-items">
      <template #default="{ node, data }">
        <DataItem
          :title="data.title"
          :active="isActive(data.id)"
          @click="onSelectPage(data)"
          @edit="onEidt(data)"
          @remove="onRemove(data)"
          :clickable="!data.isDir"
          editable
          removable>
          <template #action>
            <i
              v-if="!!data.isDir"
              @click.stop="onAddChildClick(data)"
              class="vtj-icon-plus"
              title="新增"></i>
            <i
              v-if="!data.isDir"
              @click.stop="copyPage(data, node)"
              class="vtj-icon-copy"
              title="复制"></i>
          </template>
          <template #title>
            <XIcon :icon="components[data.icon] || data.icon"></XIcon>
            {{ data.title }}
            <i class="vtj-pages__name">{{ data.name }}</i>
            <span v-if="data.home" class="vtj-pages__home">首页 </span>
          </template>
        </DataItem>
      </template>
    </ElTree>
    <Dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      width="600px"
      :title="model.id ? '修改页面' : '新增页面'"
      submit
      cancel
      @submit="onSubmit">
      <ElForm
        ref="formRef"
        :model="model"
        :rules="rules"
        size="small"
        label-position="right"
        label-width="80px">
        <ElFormItem label="类型" prop="isDir">
          <ElRadioGroup v-model="model.isDir" :disabled="!!model.id">
            <ElRadioButton :label="false">页面</ElRadioButton>
            <ElRadioButton :label="true">目录</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="标题描述" prop="title">
          <ElInput v-model="model.title"></ElInput>
        </ElFormItem>
        <ElFormItem label="名称编码" prop="name">
          <ElInput v-model="model.name"></ElInput>
        </ElFormItem>

        <ElFormItem label="菜单图标" prop="icon">
          <IconSetter v-model="model.icon"></IconSetter>
        </ElFormItem>

        <ElFormItem v-if="!model.isDir" label="包含母版" prop="mask">
          <ElSwitch v-model="model.mask"></ElSwitch>
        </ElFormItem>

        <ElFormItem v-if="!model.isDir" label="站点首页" prop="mask">
          <ElSwitch v-model="model.home"></ElSwitch>
        </ElFormItem>
        <ElFormItem v-if="!model.isDir" label="隐藏菜单" prop="mask">
          <ElSwitch v-model="model.hidden"></ElSwitch>
        </ElFormItem>
      </ElForm>
    </Dialog>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Panel, DataItem, Dialog } from '../shared';
  import IconSetter from '../setters/IconSetter.vue';
  import { components } from '@vtj/icons';
  import { XIcon } from '@vtj/ui';
  import { PageSchema } from '../../core';
  import { useCore } from '../../hooks';
  import { ElMessage, ElMessageBox, ElEmpty } from 'element-plus';
  import {
    ElTree,
    ElForm,
    ElFormItem,
    ElInput,
    ElSwitch,
    ElRadioGroup,
    ElRadioButton
  } from 'element-plus';
  const { project, engine } = useCore();
  const tools = [{ name: 'add', icon: 'vtj-icon-plus' }];
  const rules = {
    name: [{ required: true, message: '名称为必填项' }],
    title: [{ required: true, message: '标题为必填项' }]
  };

  const pages = computed(() => project.pages.value);

  const isActive = (id: string) => {
    return id === project.current.value?.id;
  };

  const emptyData: PageSchema = {
    id: '',
    name: '',
    title: '',
    isDir: false,
    icon: '',
    mask: true,
    home: false,
    hidden: false
  };
  const model = ref();
  const dialogVisible = ref(false);
  const formRef = ref();
  const parentId = ref();

  const onSelectPage = async (page: PageSchema) => {
    if (page.isDir) return;
    const id = page.id as string;
    const schema = await engine.service.getFile(id);
    project.activeFile(schema);
  };

  const onAddClick = () => {
    parentId.value = undefined;
    model.value = { ...emptyData };
    dialogVisible.value = true;
  };
  const onAddChildClick = (page: PageSchema) => {
    parentId.value = page.id;
    model.value = { ...emptyData };
    dialogVisible.value = true;
  };

  const onEidt = (page: PageSchema) => {
    model.value = { ...page };
    dialogVisible.value = true;
  };

  const copyPage = async (page: PageSchema, node: any) => {
    const id = page.id as string;
    const parentId = node.parent?.data.id;
    const schema = await engine.service.getFile(id);
    project.copyPage(page, schema, parentId);
  };

  const onRemove = async (page: PageSchema) => {
    if (!page.id) return;
    if (page.children && page.children.length > 0) {
      ElMessage.warning({
        message: '该目录有子页面文件，不能删除。'
      });
      return;
    }
    const ret = await ElMessageBox.confirm('确定删除？', '提示', {
      type: 'warning'
    }).catch((e) => false);
    if (ret) {
      project.removePage(page.id);
    }
  };

  const onSubmit = async () => {
    const valid = await formRef.value.validate().catch((e: any) => false);
    if (valid) {
      //  更新
      if (model.value.id) {
        const schema = model.value.isDir
          ? undefined
          : await engine.service.getFile(model.value.id);
        project.updatePage(model.value, schema);
      } else {
        // 新增
        const page = project.addPage(model.value, parentId.value);
        if (!project.current.value && !model.value.isDir) {
          project.activeFile(page.toDsl());
        }
      }
      dialogVisible.value = false;
    }
  };

  const allowDrop = (draggingNode: any, dropNode: any, type: string) => {
    if (type === 'inner') {
      return !!dropNode.data.isDir;
    }
    return true;
  };

  const onNodeDrop = () => {
    project.update({
      pages: pages.value
    });
  };
</script>

<style lang="scss">
  @use '../../style/vars' as *;
  .vtj-pages-items {
    --el-tree-node-hover-bg-color: transparent;
    .el-tree-node__content {
      height: 30px;
      --el-tree-node-hover-bg-color: transparent;
    }
    .vtj-pages__name {
      opacity: 0.6;
    }
    .vtj-pages__home {
      color: $vtj-warning-color-light;
      zoom: 0.8;
      background-color: $vtj-warning-color;
      border-radius: 4px;
      padding: 2px 5px;
      display: inline-block;
      margin-left: 20px;
      font-size: 12px;
    }
  }
</style>
