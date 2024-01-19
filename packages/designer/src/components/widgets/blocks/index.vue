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
      height="250px"
      :form-props="{ tooltipMessage: false }"
      :submit-method="submitMethod">
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
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed, type Ref } from 'vue';
  import { ElRow, ElCol, ElEmpty } from 'element-plus';
  import { XDialogForm, XField } from '@vtj/ui';
  import { upperFirstCamelCase, cloneDeep } from '@vtj/utils';
  import type { BlockFile, NodeFrom } from '@vtj/core';
  import { type Designer } from '../../../framework';
  import { Panel, Box } from '../../shared';
  import { useColSpan, useBlocks, useCurrent } from '../../hooks';
  import { notify } from '../../../utils';
  import { NAME_REGEX } from '../../../constants';

  const { span } = useColSpan();
  const { blocks, engine } = useBlocks();

  const model: Ref<BlockFile | undefined> = ref(undefined);
  const { current } = useCurrent();
  const visible = ref(false);
  const title = computed(() => (model.value?.id ? '编辑' : '新增'));
  const subtitle = computed(() => {
    return `(共 ${blocks.value.length} 个)`;
  });

  const createEmtpyModel = () => {
    return {
      name: '',
      title: '',
      type: 'block'
    } as BlockFile;
  };

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
    engine.project.value?.active(file);
  };

  const onDragStart = async (file: BlockFile) => {
    const from: NodeFrom = {
      type: 'Schema',
      id: file.id as string
    };
    const desc = await engine.assets.getBlockMaterial(from);
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
