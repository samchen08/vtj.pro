<template>
  <div>
    <ElAlert
      v-if="!config.mock"
      type="warning"
      title="需要在项目配置中开启模拟数据"
      :closable="false"
      style="margin-bottom: 20px"></ElAlert>
    <XField
      size="small"
      name="mock"
      label="开启模拟数据"
      :disabled="!config.mock"
      editor="switch"></XField>
    <XContainer justify="space-between">
      <span>模拟数据模板</span>
      <XAction
        :icon="VtjIconHelp"
        mode="text"
        label="帮助"
        @click="help"></XAction>
    </XContainer>
    <XField size="small" name="mockTemplate.value" label=" ">
      <template #editor>
        <Editor
          dark
          :height="config.mock ? '330px' : '280px'"
          lang="typescript"
          :disabled="!config.mock"
          :readonly="!config.mock"
          v-model="currentModel.mockTemplate.value"></Editor>
      </template>
    </XField>
  </div>
</template>
<script lang="ts" setup>
  import { inject, computed } from 'vue';
  import { ElAlert } from 'element-plus';
  import { XContainer, XField, XAction } from '@vtj/ui';
  import { VtjIconHelp } from '@vtj/icons';
  import Editor from '../../editor';
  import { useProject } from '../../hooks';
  const currentModel = inject('currentModel', null) as any;
  const { project } = useProject();

  const config = computed(() => project.value?.config || {});
  const help = () => {
    window.open('https://vtj.pro/help/mock.html');
  };
</script>
