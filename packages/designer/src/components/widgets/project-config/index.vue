<template>
  <Panel class="v-project-config-widget" title="项目配置">
    <XForm
      v-if="project"
      :footer="false"
      size="small"
      label-position="top"
      :model="project.config"
      @change="onChange">
      <XField label="站点名称" name="title"></XField>
      <XField
        label="Logo"
        name="logo"
        :editor="FileSetter"
        :props="{ attachment: { accept: '.png,.jpg,.jpeg' } }"></XField>
      <XField label="主题切换" name="themeSwitchable" editor="switch"></XField>
      <XField label="模拟数据" name="mock" editor="switch"></XField>
    </XForm>
  </Panel>
</template>
<script setup lang="ts">
  import { XForm, XField } from '@vtj/ui';
  import { type ProjectConfig } from '@vtj/core';
  import { Panel } from '../../shared';
  import FileSetter from '../../setters/file.vue';
  import { useProject } from '../../hooks';

  defineOptions({
    name: 'ProjectConfigWidget'
  });

  const { project } = useProject();

  const onChange = (model: ProjectConfig) => {
    project.value?.setConfig(model);
  };
</script>
