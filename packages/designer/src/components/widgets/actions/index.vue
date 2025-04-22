<template>
  <div class="v-actions-widget">
    <ElBadge v-if="false" :value="0" :max="99" :hidden="true">
      <XAction mode="icon" :icon="VtjIconBug" background="hover"></XAction>
    </ElBadge>

    <ElDivider v-if="false" direction="vertical"></ElDivider>

    <ElButton
      @click="onPreview"
      :type="isPreview ? 'warning' : 'default'"
      size="small"
      title="预览">
      <VtjIconPreview></VtjIconPreview>
    </ElButton>

    <ElButton @click="refresh" type="default" size="small" title="刷新">
      <VtjIconRefresh></VtjIconRefresh>
    </ElButton>

    <ElButton
      type="default"
      size="small"
      title="页面设置"
      @click="openCodeSetting">
      <VtjIconSetting></VtjIconSetting>
    </ElButton>

    <ElButton
      v-if="engine.remote"
      type="default"
      size="small"
      title="AI助手"
      @click="onActiveAI">
      <VtjIconAi></VtjIconAi>
    </ElButton>

    <ElDivider direction="vertical"></ElDivider>

    <ElButton
      v-if="props.coder"
      @click="onCoder"
      :icon="Download"
      size="small"
      type="success">
      出码
    </ElButton>

    <ElButton
      v-if="props.onlyPublishTemplate"
      @click="onPublishToTemplate"
      :icon="VtjIconTemplate"
      size="small"
      type="primary">
      发布模板
    </ElButton>
    <ElDropdown
      v-else
      split-button
      type="primary"
      size="small"
      @click="onPublish"
      @command="onPublishCommand">
      <span>发布</span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="current" :icon="VtjIconPublish">
            发布文件
          </ElDropdownItem>
          <ElDropdownItem command="project" :icon="VtjIconProject">
            整站发布
          </ElDropdownItem>
          <ElDropdownItem
            v-if="engine.remote"
            command="template"
            :icon="VtjIconTemplate"
            divided>
            发布模板
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>

    <Publisher
      v-if="publisherVisible"
      v-model="publisherVisible"
      v-bind="publisherProps"></Publisher>

    <!-- <Coder :icon="Download"></Coder> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref, h } from 'vue';
  import {
    ElButton,
    ElDivider,
    ElBadge,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElMessageBox
  } from 'element-plus';
  import {
    VtjIconSetting,
    VtjIconRefresh,
    VtjIconBug,
    VtjIconPreview,
    VtjIconTemplate,
    VtjIconPublish,
    VtjIconProject,
    Download,
    VtjIconAi
  } from '@vtj/icons';
  import { XAction, createDialog } from '@vtj/ui';
  import { delay } from '@vtj/utils';
  import Publisher from './publisher.vue';
  import Coder from './coder.vue';
  import { useSelected, useOpenApi } from '../../hooks';
  import { message } from '../../../utils';

  export interface Props {
    onlyPublishTemplate?: boolean;
    coder?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    onlyPublishTemplate: false,
    coder: false
  });

  const { engine, designer } = useSelected();
  const { isLogined, toRemoteAuth } = useOpenApi();
  const isPreview = ref(false);
  const publisherVisible = ref(false);
  const publisherProps = ref();
  const refresh = () => {
    if (engine.current.value) {
      if (isPreview.value) {
        const widget = engine.skeleton?.getWidget('Previewer');
        widget?.widgetRef.refresh();
      } else {
        designer.value?.setSelected(null);
        engine.simulator.refresh();
      }
      message('刷新完成', 'success');
    } else {
      message('请先打开文件', 'warning');
    }
  };

  const openCodeSetting = async () => {
    if (engine.current.value) {
      if (isPreview.value) {
        engine.skeleton?.closePreview();
        isPreview.value = false;
        await delay(1000);
      }
      designer.value?.setSelected(engine.current.value);
    } else {
      message('请先打开文件', 'warning');
    }
  };

  const onPreview = () => {
    const project = engine.project.value;
    if (!project) return;
    if (engine.current.value) {
      if (isPreview.value) {
        engine.skeleton?.closePreview();
        isPreview.value = false;
        return;
      }
      engine.skeleton?.openPreview('');
      isPreview.value = true;
    } else {
      message('请先打开文件', 'warning');
    }
  };

  const onPublish = () => {
    const project = engine.project.value;
    if (!project) return;
    if (project.currentFile) {
      project.publish(project.currentFile);
    } else {
      message('请先打开文件', 'warning');
    }
  };

  const onPublishToTemplate = async () => {
    const project = engine.project.value;
    if (!project) return;
    if (project.currentFile) {
      if (await isLogined()) {
        const canvas = await engine.simulator.capture();
        const { name, title, market } = project.currentFile;
        if (!canvas) {
          message('截图失败', 'warning');
          return;
        }
        publisherProps.value = {
          id: market?.id,
          canvas,
          name,
          label: title,
          dsl: engine.current.value?.toDsl()
        };
        publisherVisible.value = true;
      } else {
        const ret = await ElMessageBox.confirm(
          '发布到模板需登录系统，您还没登录或登录已过期，请重新登录！',
          '提示',
          {
            type: 'info',
            confirmButtonText: '立即登录'
          }
        ).catch(() => false);
        if (ret) {
          toRemoteAuth();
        }
      }
    } else {
      message('请先打开文件', 'warning');
    }
  };

  const onPublishCommand = (command: string) => {
    const project = engine.project.value;
    if (!project) return;
    switch (command) {
      case 'current':
        onPublish();
        break;
      case 'project':
        project.publish();
        break;
      case 'template':
        onPublishToTemplate();
        break;
    }
  };

  const onCoder = async () => {
    const project = engine.project.value;
    if (!project) return;
    const link = await engine.genSource();
    if (link) {
      createDialog({
        width: '600px',
        height: '200px',
        title: '出码',
        icon: Download,
        content: h(Coder, { link })
      });
    }
  };

  const onActiveAI = async () => {
    const region = engine.skeleton?.getRegion('Apps');
    if (region) {
      region.regionRef.setActive('AI');
    }
  };

  defineOptions({
    name: 'ActionsWidget',
    inheritAttrs: false
  });
</script>
