<template>
  <XDialogForm
    :title="title"
    width="800px"
    height="650px"
    :maximizable="true"
    :form-props="{ tooltipMessage: false }"
    :model="model"
    :submit-method="submit">
    <XField
      name="dir"
      label="类型"
      editor="radio"
      :options="typeOptions"
      :props="{ button: true, size: 'small' }"
      :disabled="!!props.item || isUniapp"
      inline
      :tip="isUniapp ? `UniApp不支持目录类型` : undefined"
      required></XField>
    <XField v-if="!model.dir && !!props.item" label="路由" disabled>
      <template #editor>
        <ElAlert :closable="false">
          {{
            `${engine.options.pageBasePath || ''}/${pageDir}/${(model as any).id}`
          }}
          <XIcon
            :icon="CopyDocument"
            @click="
              onCopy(
                `${engine.options.pageBasePath || ''}/${pageDir}/${(model as any).id}`
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
      :rules="{
        pattern: NAME_REGEX,
        message: '名称格式不正确，要求英文驼峰格式'
      }"></XField>
    <XField name="title" label="标题" required></XField>
    <XField v-if="!isUniapp" name="icon" label="菜单图标" editor="none">
      <template #editor>
        <IconSetter v-model="model.icon" size="default"></IconSetter>
      </template>
    </XField>
    <XField
      v-if="!isUniapp"
      :visible="{ dir: false }"
      inline
      name="mask"
      label="包含母版"
      editor="switch"
      tip="页面内嵌入框架, 仅Web平台有效"
      :disabled="!isWebPlatform"></XField>

    <XField
      v-if="!isUniapp"
      name="cache"
      :visible="{ dir: false }"
      inline
      label="开启缓存"
      editor="switch"
      tip="开启路由 KeepAlive 缓存, 仅Web平台有效"
      :disabled="!isWebPlatform"></XField>

    <XField
      v-if="!isUniapp"
      name="hidden"
      inline
      label="隐藏菜单"
      editor="switch"
      tip="系统菜单中不显示该项，仅Web平台有效"
      :disabled="!isWebPlatform"></XField>

    <XField
      v-if="!isUniapp"
      :visible="{ dir: false }"
      inline
      name="pure"
      label="纯净页面"
      editor="switch"
      tip="页面默认不带背景和内边距，仅Web平台有效"
      :disabled="!isWebPlatform"></XField>

    <XField
      :visible="{ dir: false }"
      :disabled="!!props.item"
      inline
      name="raw"
      label="源码模式"
      editor="switch"
      tip="页面是非低代码开发，不能在线编辑"></XField>

    <XField
      v-if="!isUniapp"
      :visible="{ dir: false }"
      name="meta"
      label="路由Meta"
      label-width="80px">
      <template #editor>
        <Editor dark height="100px" lang="json" v-model="computedMeta"></Editor>
      </template>
    </XField>

    <XField
      v-if="isUniapp"
      inline
      name="needLogin"
      label="needLogin"
      editor="switch"
      tip="是否需要登录才可访问"></XField>

    <XField
      v-if="isUniapp"
      name="style"
      label="style"
      label-width="80px"
      tip="配置页面窗口表现，配置项参考: https://uniapp.dcloud.net.cn/collocation/pages.html#style">
      <template #editor>
        <Editor
          dark
          height="250px"
          width="100%"
          lang="json"
          v-model="computedStyle"></Editor>
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
  const isWebPlatform = computed(() => {
    const { platform = 'web' } = project.value || {};
    return platform === 'web';
  });

  const isUniapp = computed(() => {
    const { platform = 'web' } = project.value || {};
    return platform === 'uniapp';
  });

  const pageDir = computed(() => {
    return engine.options.pageRouteName || (isUniapp.value ? 'pages' : 'page');
  });

  const createEmptyModel = () => ({
    dir: false,
    name: '',
    title: '',
    icon: '',
    mask: true,
    hidden: false,
    raw: false,
    pure: !isWebPlatform.value,
    meta: null,
    cache: false,
    needLogin: false,
    style: null
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

  const computedStyle = computed({
    get() {
      return JSON.stringify(model.value.style || {}, null, 4);
    },
    set(v) {
      try {
        model.value.style = JSON.parse(v);
      } catch (e) {
        notify('页面窗口表现配置解析出错，必须是JSON格式数据', '运行时错误');
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
