<template>
  <div>
    <XPanel
      card
      :header="header"
      shadow="always"
      width="600px"
      height="200px"
      :body="{ padding: false }"
      :footer="{ padding: false }">
      <div v-for="n in 20">{{ n }}</div>
      <template #actions>
        <XAction :icon="VtjIconPlus" mode="icon" background="hover"></XAction>
        <XAction
          :icon="VtjIconSetting"
          mode="icon"
          background="hover"></XAction>
      </template>
    </XPanel>

    <XPanel card header="面板标题" size="large" shadow="hover">
      Body

      <template #actions>
        <XAction :icon="VtjIconPlus" mode="icon"></XAction>
        <XAction :icon="VtjIconSetting" mode="icon"></XAction>
      </template>
    </XPanel>

    <XPanel card header="面板标题" size="small">
      Body

      <template #actions>
        <XAction :icon="VtjIconPlus" mode="icon" size="small"></XAction>
        <XAction :icon="VtjIconSetting" mode="icon" size="small"></XAction>
      </template>
    </XPanel>
  </div>
</template>

<script lang="ts" setup>
  import { XPanel, XAction } from '@vtj/ui';

  import { VtjIconPlus, VtjIconSetting } from '@vtj/icons';

  const header = {
    content: '面板主要标题',
    subtitle: '副标题内容',
    more: true,
    icon: {
      icon: VtjIconSetting,
      color: 'var(--el-color-primary)'
    },
    onClick() {
      console.log('header clicked!');
    }
  };
</script>

<style lang="scss" scoped>
  .x-panel {
    margin: 10px 0;
  }
</style>
