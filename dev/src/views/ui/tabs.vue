<template>
  <div class="tabs-demo">
    <h3>基础选项卡</h3>
    <XTabs :items="basicTabs" @action-click="onActionClick"></XTabs>

    <h3>带图标</h3>
    <XTabs :items="iconTabs"></XTabs>

    <h3>可关闭 + 对齐方式</h3>
    <XTabs :items="closableTabs" align="center" closable></XTabs>

    <h3>无边框 + fit 填充</h3>
    <XTabs :items="basicTabs" :border="false" fit></XTabs>

    <h3>带操作按钮</h3>
    <XTabs
      :items="actionTabs"
      @action-click="onActionClick"
      @action-command="onActionCommand"></XTabs>
  </div>
</template>
<script lang="ts" setup>
  import { XTabs, type TabsItem } from '@vtj/ui';
  import { VtjIconBug, VtjIconSetting, VtjIconPlus, VtjIconEdit } from '@vtj/icons';

  const basicTabs: TabsItem[] = [
    { name: 'tab1', label: '基本信息' },
    { name: 'tab2', label: '详细资料' },
    { name: 'tab3', label: '其他设置' }
  ];

  const iconTabs: TabsItem[] = [
    { name: 'home', label: '首页', icon: VtjIconBug },
    { name: 'settings', label: '设置', icon: VtjIconSetting }
  ];

  const closableTabs: TabsItem[] = [
    { name: 'a', label: '页面 A', closable: true },
    { name: 'b', label: '页面 B', closable: true },
    { name: 'c', label: '页面 C', closable: true }
  ];

  const actionTabs: TabsItem[] = [
    {
      name: 't1',
      label: '文档',
      actions: [
        { icon: VtjIconEdit, label: '编辑' },
        { icon: VtjIconPlus, label: '新增' }
      ]
    }
  ];

  const onActionClick = (action: any) => console.log('actionClick:', action);
  const onActionCommand = (action: any) => console.log('actionCommand:', action);
</script>
<style lang="scss" scoped>
  .tabs-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .x-tabs {
      margin-bottom: 16px;
    }
  }
</style>
