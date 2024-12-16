<template>
  <div>
    <XPanel :header="header" shadow="always">
      Body
      <template #actions>
        <XAction :icon="VtjIconPlus" mode="text" label="添加"></XAction>
        <XAction :icon="VtjIconSetting" mode="text" label="设置"></XAction>
      </template>
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
  import { XPanel, XAction } from '@vtj/ui';

  import { VtjIconPlus, VtjIconSetting } from '@vtj/icons';

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
