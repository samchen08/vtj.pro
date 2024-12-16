<template>
  <Panel
    class="v-blocks-widget"
    title="区块管理"
    :subtitle="subtitle"
    plus
    @plus="onAdd">
    <div class="v-blocks__search">
      <ElInput
        size="small"
        v-model="keyword"
        :prefix-icon="Search"
        placeholder="搜索区块"
        clearable></ElInput>
    </div>
    <ElEmpty v-if="!list.length" description="找不到符合条件的区块"></ElEmpty>
    <ElCollapse v-else :model-value="categories">
      <ElCollapseItem
        v-for="(items, name) in groups"
        :name="name"
        :title="`${name} (${items.length})`">
        <ElRow wrap="wrap" :gutter="5">
          <ElCol v-for="block in items" :key="block.id" :span="span">
            <Box
              :name="block.name"
              :title="block.title"
              :active="current?.id === block.id"
              :editable="!block.preset"
              :tag="fromTypeMap[block.fromType || 'Schema']?.label"
              :tagType="fromTypeMap[block.fromType || 'Schema']?.type"
              @edit="onEdit(block)"
              @copy="onCopy(block)"
              @remove="onRemove(block)"
              @click="onClick(block)"
              :draggable="current?.id !== block.id"
              @dragstart="onDragStart(block)"
              @dragend="onDragEnd"></Box>
          </ElCol>
        </ElRow>
      </ElCollapseItem>
    </ElCollapse>
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
      <XField
        name="category"
        label="分组"
        editor="select"
        :props="categoryProps"
        :options="options"></XField>
    </XDialogForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed, type Ref } from 'vue';
  import {
    ElRow,
    ElCol,
    ElEmpty,
    ElCollapse,
    ElCollapseItem,
    ElInput
  } from 'element-plus';
  import { XDialogForm, XField } from '@vtj/ui';
  import { Search } from '@vtj/icons';
  import { upperFirstCamelCase, cloneDeep, groupBy } from '@vtj/utils';
  import { type BlockFile, createNodeFrom } from '@vtj/core';
  import { type Designer } from '../../../framework';
  import { Panel, Box } from '../../shared';
  import { useColSpan, useBlocks, useCurrent } from '../../hooks';
  import { notify } from '../../../utils';
  import { NAME_REGEX } from '../../../constants';
  import FileSetter from '../../setters/file.vue';

  const { span } = useColSpan();
  const { blocks, engine } = useBlocks();
  const keyword = ref('');

  const list = computed(() => {
    if (keyword.value) {
      return blocks.value.filter((n) => {
        return (
          n.name.includes(keyword.value) || n.title?.includes(keyword.value)
        );
      });
    }
    return blocks.value;
  });

  const groups = computed(() =>
    groupBy(list.value, (block) => block.category || '默认分组')
  );

  const categories = computed(() => Object.keys(groups.value));

  const categoryProps = {
    filterable: true,
    allowCreate: true,
    defaultFirstOption: true
  };

  const options = computed(() => {
    return categories.value.map((n) => {
      return {
        label: n,
        value: n
      };
    });
  });

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

  const onCopy = (file: BlockFile) => {
    engine.project.value?.cloneBlock(file);
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
      const region = engine.skeleton?.getRegion('Workspace');
      if (region) {
        region.regionRef.openTab('Designer');
      }
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
