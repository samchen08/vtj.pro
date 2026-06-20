<template>
  <div class="menu-demo">
    <h3>基础菜单</h3>
    <div class="demo-section">
      <XMenu :data="menuData" @select="onSelect"></XMenu>
    </div>

    <h3>折叠模式</h3>
    <div class="demo-section" style="width: 200px">
      <XMenu :data="menuData" collapse @select="onSelect"></XMenu>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { XMenu } from '@vtj/ui';
  import { VtjIconBug, VtjIconSetting, VtjIconUser, VtjIconData } from '@vtj/icons';

  const menuData = [
    { id: '1', title: '首页', icon: VtjIconBug },
    {
      id: '2',
      title: '系统管理',
      icon: VtjIconSetting,
      children: [
        { id: '2-1', title: '用户管理', icon: VtjIconUser },
        { id: '2-2', title: '角色管理', icon: VtjIconUser },
        { id: '2-3', title: '数据管理', icon: VtjIconData }
      ]
    },
    {
      id: '3',
      title: '业务管理',
      icon: VtjIconSetting,
      children: [
        { id: '3-1', title: '订单管理' },
        { id: '3-2', title: '商品管理' }
      ]
    }
  ];

  const onSelect = (item: any) => {
    console.log('selected:', item);
  };
</script>
<style lang="scss" scoped>
  .menu-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-section {
      width: 240px;
      border: 1px solid #eee;
      border-radius: 4px;
    }
  }
</style>
