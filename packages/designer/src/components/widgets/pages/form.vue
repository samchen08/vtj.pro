<template>
  <XDialogForm
    :title="title"
    width="800px"
    height="700px"
    :form-props="{ tooltipMessage: false }"
    :model="model"
    :submit-method="submit">
    <XField
      name="dir"
      label="类型"
      editor="radio"
      :options="typeOptions"
      :props="{ button: true, size: 'small' }"
      :disabled="!!props.item"
      required></XField>
    <XField v-if="!model.dir && !!props.item" label="路由" disabled>
      <template #editor>
        <ElAlert :closable="false">
          {{ `${engine.options.pageBasePath || ''}/page/${(model as any).id}` }}
          <XIcon
            :icon="CopyDocument"
            @click="
              onCopy(
                `${engine.options.pageBasePath || ''}/page/${(model as any).id}`
              )
            "></XIcon>
        </ElAlert>
      </template>
    </XField>
    <XField
      name="name"
      label="名称"
      required
      @change="onNameChange"
      :rules="{ pattern: NAME_REGEX, message: '名称格式不正确' }"></XField>
    <XField name="title" label="标题" required></XField>
    <XField name="icon" label="菜单图标" editor="none">
      <template #editor>
        <IconSetter v-model="model.icon" size="default"></IconSetter>
      </template>
    </XField>
    <XField
      :visible="{ dir: false }"
      inline
      name="mask"
      label="包含母版"
      editor="switch"
      tip="页面内嵌入框架"></XField>

    <XField
      name="cache"
      :visible="{ dir: false }"
      inline
      label="开启缓存"
      editor="switch"
      tip="开启路由 KeepAlive 缓存"></XField>

    <XField
      name="hidden"
      inline
      label="隐藏菜单"
      editor="switch"
      tip="系统菜单中不显示该项"></XField>

    <XField
      :visible="{ dir: false }"
      inline
      name="pure"
      label="纯净页面"
      editor="switch"
      tip="页面默认不带背景和内边距"></XField>

    <XField
      :visible="{ dir: false }"
      :disabled="!!props.item"
      inline
      name="raw"
      label="源码模式"
      editor="switch"
      tip="页面是非低代码开发，不能在线编辑"></XField>

    <XField
      :visible="{ dir: false }"
      name="meta"
      label="路由元信息"
      label-width="100px">
      <template #editor>
        <Editor dark height="100px" lang="json" v-model="computedMeta"></Editor>
      </template>
    </XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XDialogForm, XField, XIcon } from '@vtj/ui';
  import { type PageFile } from '@vtj/core';
  import { useClipboard } from '@vueuse/core';
  import { ElAlert, ElMessage } from 'element-plus';
  import { CopyDocument } from '@vtj/icons';
  import { upperFirstCamelCase } from '@vtj/utils';
  import IconSetter from '../../setters/icon.vue';
  import { NAME_REGEX } from '../../../constants';
  import { useProject, useSelected } from '../../hooks';
  import { notify } from '../../../utils';
  import Editor from '../../editor';

  export interface Props {
    item?: PageFile;
    parentId?: string;
  }

  defineOptions({
    name: 'PageForm'
  });

  const props = defineProps<Props>();
  const { project, engine } = useProject();
  const { designer } = useSelected();
  const title = computed(() => (props.item ? '编辑页面' : '新增页面'));
  const createEmptyModel = () => ({
    dir: false,
    name: '',
    title: '',
    icon: '',
    mask: true,
    hidden: false,
    raw: false,
    prue: false,
    meta: null,
    cache: false
  });

  const model = ref(props.item || createEmptyModel());

  const computedMeta = computed({
    get() {
      return JSON.stringify(model.value.meta || {}, null, 4);
    },
    set(v) {
      try {
        model.value.meta = JSON.parse(v);
      } catch (e) {
        notify('路由元信息解析出错，必须是JSON格式数据', '运行时错误');
      }
    }
  });

  const typeOptions = [
    { label: '页面', value: false },
    { label: '目录', value: true }
  ];

  const onNameChange = (val: string) => {
    if (model.value) {
      model.value.name = upperFirstCamelCase(val);
    }
  };

  const submit = async (data: any) => {
    const exist = project.value?.existPageName(data.name, [data.id]);
    if (exist) {
      notify('页面名称已存在，请更换');
      return false;
    }
    if (!!props.item) {
      project.value?.updatePage(data);
      designer.value?.setSelected(null);
      engine.simulator.refresh();
    } else {
      project.value?.createPage(data, props.parentId);
    }
    return true;
  };

  const { copy } = useClipboard({});

  const onCopy = (name: string) => {
    copy(name);
    ElMessage.success({
      message: '已经复制到粘贴板'
    });
  };
</script>
