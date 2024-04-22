<template>
  <Panel
    class="v-blocks-widget"
    title="区块管理"
    :subtitle="subtitle"
    plus
    @plus="onAdd">
    <ElRow wrap="wrap" :gutter="5">
      <ElCol v-for="block in blocks" :key="block.id" :span="span">
        <Box
          :name="block.name"
          :title="block.title"
          :active="current?.id === block.id"
          editable
          :tag="fromTypeMap[block.fromType || 'Schema']?.label"
          :tagType="fromTypeMap[block.fromType || 'Schema']?.type"
          @edit="onEdit(block)"
          @remove="onRemove(block)"
          @click="onClick(block)"
          :draggable="current?.id !== block.id"
          @dragstart="onDragStart(block)"
          @dragend="onDragEnd"></Box>
      </ElCol>
    </ElRow>
    <ElEmpty v-if="!blocks.length"></ElEmpty>
    <XDialogForm
      v-model="visible"
      :title="title"
      :model="model"
      width="600px"
      height="400px"
      :form-props="{ tooltipMessage: false }"
      :submit-method="submitMethod">
      <XField
        name="fromType"
        label="类型"
        required
        editor="radio"
        :disabled="!!model?.id"
        :options="fromTypeOptions"></XField>
      <XField
        name="name"
        label="名称"
        required
        tip="名称为英文驼峰格式"
        :rules="{
          message: '名称格式错误',
          pattern: NAME_REGEX
        }"
        @change="onNameChange"></XField>
      <XField name="title" label="标题" required></XField>
      <XField
        v-if="model?.fromType === 'Plugin'"
        name="library"
        label="插件名称"
        required></XField>
      <XField
        name="urls"
        label="资源文件"
        v-if="['Plugin', 'UrlSchema'].includes(model?.fromType || '')"
        required
        :editor="FileSetter"
        :props="{ attachment: { accept, multiple } }"></XField>
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed, type Ref } from 'vue';
  import { ElRow, ElCol, ElEmpty } from 'element-plus';
  import { XDialogForm, XField } from '@vtj/ui';
  import { upperFirstCamelCase, cloneDeep } from '@vtj/utils';
  import { type BlockFile, createNodeFrom } from '@vtj/core';
  import { type Designer } from '../../../framework';
  import { Panel, Box } from '../../shared';
  import { useColSpan, useBlocks, useCurrent } from '../../hooks';
  import { notify } from '../../../utils';
  import { NAME_REGEX } from '../../../constants';
  import FileSetter from '../../setters/file.vue';

  const { span } = useColSpan();
  const { blocks, engine } = useBlocks();

  const fromTypeOptions = [
    {
      label: '设计',
      value: 'Schema',
      border: true
    },
    {
      label: '引用',
      value: 'UrlSchema',
      border: true
    },
    {
      label: '插件',
      value: 'Plugin',
      border: true
    }
  ];

  const fromTypeMap: Record<string, any> = {
    Schema: {
      label: '设计',
      type: 'primary'
    },
    UrlSchema: {
      label: '引用',
      type: 'warning'
    },
    Plugin: {
      label: '插件',
      type: 'danger'
    }
  };

  const model: Ref<BlockFile | undefined> = ref(undefined);
  const { current } = useCurrent();
  const visible = ref(false);
  const title = computed(() => (model.value?.id ? '编辑区块' : '新增区块'));
  const subtitle = computed(() => {
    return `(共 ${blocks.value.length} 个)`;
  });

  const createEmtpyModel = () => {
    return {
      fromType: 'Schema',
      name: '',
      title: '',
      urls: '',
      library: '',
      type: 'block'
    } as BlockFile;
  };

  const accept = computed(() => {
    if (model.value?.fromType === 'UrlSchema') {
      return '.json';
    }
    if (model.value?.fromType === 'Plugin') {
      return '.js,.css,.json';
    }
    return undefined;
  });

  const multiple = computed(() => {
    return model.value?.fromType === 'Plugin';
  });

  const submitMethod = async (data: any) => {
    const file = data as BlockFile;
    const project = engine.project.value;
    if (!project) return false;
    if (data.id) {
      if (!project.existBlockName(file.name, [file.id])) {
        project.updateBlock(file);
      } else {
        notify(`名称【${file.name}】已经存在，请更换名称`);
        return false;
      }
    } else {
      if (!project.existBlockName(file.name)) {
        project.createBlock(file);
      } else {
        notify(`名称【${file.name}】已经存在，请更换名称`);
        return false;
      }
    }
    return true;
  };

  const onAdd = () => {
    model.value = createEmtpyModel();
    visible.value = true;
  };

  const onEdit = (file: BlockFile) => {
    model.value = cloneDeep(file);
    visible.value = true;
  };

  const onRemove = (file: BlockFile) => {
    engine.project.value?.removeBlock(file.id);
  };

  const onNameChange = (val: string) => {
    if (model.value) {
      model.value.name = upperFirstCamelCase(val);
    }
  };

  const onClick = async (file: BlockFile) => {
    if (!file.fromType || file.fromType === 'Schema') {
      engine.project.value?.active(file);
    }
  };

  const onDragStart = async (file: BlockFile) => {
    const from = createNodeFrom(file);
    const desc = await engine.assets.getBlockMaterial(from, file.name);
    const designer = engine.skeleton?.getWidget('Designer')?.widgetRef
      ?.designer as Designer;
    if (designer && desc) {
      designer.setDragging(desc);
    }
  };

  const onDragEnd = () => {
    const designer = engine.skeleton?.getWidget('Designer')?.widgetRef
      ?.designer as Designer;
    if (designer) {
      designer.setDragging(null);
    }
  };

  defineOptions({
    name: 'BlocksWidget'
  });
</script>
