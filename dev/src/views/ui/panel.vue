<template>
  <div class="bg">
    <XPanel
      card
      :header="header"
      shadow="always"
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
    <hr />
    <XPanel :header="header" shadow="always">
      Body
      <template #actions>
        <XAction :icon="VtjIconPlus" mode="text" label="添加"></XAction>
        <XAction :icon="VtjIconSetting" mode="text" label="设置"></XAction>
      </template>
    </XPanel>
    <XPanel shadow="hover" :badge="{type: 'danger', text: '迭代'}">
      2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。
      2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。2.5 版本，基于 Arco Design Pro 前端模板开发的 ContiNew Admin 前端适配项目。
    </XPanel>
    <XPanel header="面板标题" size="small">
      <ElTabs>
        <ElTabPane label="选项卡一"></ElTabPane>
        <ElTabPane label="选项卡二"></ElTabPane>
      </ElTabs>
    </XPanel>
  </div>
</template>

<script lang="ts" setup>
  import { VtjIconPlus, VtjIconSetting, XPanel, XAction } from '@vtj/web';

  import { ElTabs, ElTabPane } from 'element-plus';

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
