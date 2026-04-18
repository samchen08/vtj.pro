<template>
  <div class="v-actions-widget">
    <ElBadge v-if="false" :value="0" :max="99" :hidden="true">
      <XAction mode="icon" :icon="VtjIconBug" background="hover"></XAction>
    </ElBadge>

    <ElDivider v-if="false" direction="vertical"></ElDivider>

    <ElButton
      :type="locked ? 'warning' : 'default'"
      size="small"
      title="锁定"
      @click="onToggleLock">
      <XIcon :icon="Lock"></XIcon>
    </ElButton>

    <ElButton
      @click="onPreview"
      :type="isPreview ? 'warning' : 'default'"
      size="small"
      title="预览"
      :disabled="engine.state.streaming">
      <VtjIconPreview></VtjIconPreview>
    </ElButton>

    <ElButton
      @click="refresh"
      type="default"
      size="small"
      title="刷新"
      :disabled="engine.state.streaming">
      <VtjIconRefresh></VtjIconRefresh>
    </ElButton>

    <ElButton
      type="default"
      size="small"
      title="页面设置"
      @click="openCodeSetting">
      <VtjIconPageSetting></VtjIconPageSetting>
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
      v-else-if="!props.appMode"
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

    <ElDropdown
      v-if="props.appMode"
      split-button
      type="primary"
      size="small"
      @click="onPublishApp"
      @command="onPublishCommand">
      <span>发布</span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="publishApp" :icon="VtjIconPublish">
            发布应用
          </ElDropdownItem>
          <ElDropdownItem command="template" :icon="VtjIconTemplate">
            发布模板
          </ElDropdownItem>
          <ElDropdownItem command="coder" :icon="Download" divided>
            项目出码
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>

    <Publisher
      v-if="publisherVisible"
      v-model="publisherVisible"
      v-bind="publisherProps"></Publisher>

    <Versioner
      ref="versionerRef"
      :canvas="homepageCanvas"
      :getAppsInit="props.getAppsInit"
      :postAppsVersions="props.postAppsVersions"
      :postDslDevPublish="props.postDslDevPublish"
      :putAppsCurrentVersion="props.putAppsCurrentVersion"></Versioner>
  </div>
</template>
<script lang="ts" setup>
  import { ref, h, computed } from 'vue';
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
    VtjIconRefresh,
    VtjIconBug,
    VtjIconPreview,
    VtjIconTemplate,
    VtjIconPublish,
    VtjIconProject,
    VtjIconPageSetting,
    Download,
    Lock
  } from '@vtj/icons';
  import { XAction, createDialog, XIcon } from '@vtj/ui';
  import { delay } from '@vtj/utils';
  import Publisher from './publisher.vue';
  import Coder from './coder.vue';
  import Versioner from './versioner‌.vue';
  import { useSelected, useOpenApi } from '../../hooks';
  import { message, alert } from '../../../utils';

  export interface Props {
    onlyPublishTemplate?: boolean;
    coder?: boolean;
    appMode?: boolean;
    getAppsInit?: any;
    postAppsVersions?: any;
    postDslDevPublish?: any;
    putAppsCurrentVersion?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    onlyPublishTemplate: false,
    coder: false,
    appMode: false
  });

  const { engine, designer } = useSelected();
  const { isLogined, toRemoteAuth } = useOpenApi();
  const isPreview = ref(false);
  const publisherVisible = ref(false);
  const publisherProps = ref();
  const versionerRef = ref();
  const homepageCanvas = ref();
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

  const onPublishApp = async () => {
    const project = engine.project.value;
    if (!project) return;
    const homepage = project.getHomepage();
    if (!homepage) {
      message('项目没有页面，无需发布', 'warning');
      return;
    }
    project.active(homepage);
    await delay(300);
    homepageCanvas.value = await engine.simulator.capture();
    versionerRef?.value.openDialog();
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
      case 'coder':
        onCoder();
        break;
      case 'publishApp':
        onPublishApp();
        break;
    }
  };

  const locked = computed(() => {
    return !!engine.project.value?.locked;
  });

  const onToggleLock = async () => {
    const lockedBy = engine.project.value?.locked;
    const isLocked = !!lockedBy;
    if (await isLogined()) {
      const info = engine.access?.getData();
      if (isLocked) {
        if (info?.name && info.name === lockedBy) {
          engine.project.value?.unlock(info.name);
          message('项目已解除锁定');
        } else {
          alert(`项目已被[ ${lockedBy} ]锁定`);
        }
      } else {
        if (info?.name) {
          engine.project.value?.lock(info.name);
          message('项目已锁定，只有你才能更改项目');
        }
      }
    } else {
      const ret = await ElMessageBox.confirm(
        `${isLocked ? '解锁' : '锁定'}项目需要登录，您还没登录或已过期，请重新登录！`,
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
  };

  defineOptions({
    name: 'ActionsWidget',
    inheritAttrs: false
  });

  defineExpose({
    preview: onPreview,
    isPreview,
    refresh
  });
</script>
