<template>
  <div class="action-bar-demo">
    <h3>基础操作栏（Button 模式）</h3>
    <div class="demo-row">
      <XActionBar :items="buttonItems" @click="onClick" @command="onCommand"></XActionBar>
    </div>

    <h3>Text 模式</h3>
    <div class="demo-row">
      <XActionBar :items="textItems" mode="text" @click="onClick"></XActionBar>
    </div>

    <h3>Icon 模式</h3>
    <div class="demo-row">
      <XActionBar
        :items="iconItems"
        mode="icon"
        type="primary"
        @click="onClick"></XActionBar>
    </div>

    <h3>带 Badge 徽标</h3>
    <div class="demo-row">
      <XActionBar :items="badgeItems" @click="onClick"></XActionBar>
    </div>

    <h3>下拉菜单项</h3>
    <div class="demo-row">
      <XActionBar :items="menuItems" @command="onCommand"></XActionBar>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { XActionBar, type ActionBarItems } from '@vtj/ui';
  import { VtjIconBug, VtjIconPlus, VtjIconApi, VtjIconEdit, VtjIconRemove, VtjIconMore } from '@vtj/icons';

  const menus = [
    { command: 'edit', label: '编辑' },
    { command: 'delete', label: '删除', divided: true }
  ];

  const buttonItems: ActionBarItems = [
    { label: '新增', icon: VtjIconPlus },
    { label: '编辑', icon: VtjIconEdit },
    { label: '删除', icon: VtjIconRemove },
    '|',
    { label: '更多', icon: VtjIconMore, menus }
  ];

  const textItems: ActionBarItems = [
    { label: '新增', icon: VtjIconPlus, type: 'primary' },
    { label: '编辑', icon: VtjIconEdit },
    { label: '删除', icon: VtjIconRemove, type: 'danger' }
  ];

  const iconItems: ActionBarItems = [
    { label: '新增', icon: VtjIconPlus },
    { label: '编辑', icon: VtjIconEdit },
    { label: '删除', icon: VtjIconRemove }
  ];

  const badgeItems: ActionBarItems = [
    { label: '消息', icon: VtjIconBug, badge: 3 },
    { label: '通知', icon: VtjIconApi, badge: 99 },
    { label: '待办', icon: VtjIconEdit, badge: { value: 5, type: 'warning' } }
  ];

  const menuItems: ActionBarItems = [
    { label: '文件操作', icon: VtjIconPlus, menus },
    { label: '系统', icon: VtjIconMore, menus }
  ];

  const onClick = (action: any) => {
    console.log('click:', action);
  };

  const onCommand = (action: any, item: any) => {
    console.log('command:', action, item);
  };
</script>
<style lang="scss" scoped>
  .action-bar-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      margin-bottom: 16px;
    }
  }
</style>
