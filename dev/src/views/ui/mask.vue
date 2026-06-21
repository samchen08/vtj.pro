<template>
  <div class="demo-mask">
    <h3>禁用模式（仅内容区域）</h3>
    <div class="demo-row">
      <XMask disabled style="height: 200px; border: 1px solid #dcdfe6">
        <div class="mask-content">
          <p>禁用模式下，XMask 只展示插槽内容，不包含侧边栏、标签页和工具栏。</p>
        </div>
      </XMask>
    </div>

    <h3>基本布局</h3>
    <div class="demo-row">
      <XMask
        title="管理系统"
        :menus="menus"
        :actions="actions"
        home="/"
        style="height: 400px; border: 1px solid #dcdfe6"
      >
        <div class="mask-content">
          <p>完整布局：侧边栏菜单、顶部标签页和工具栏。</p>
        </div>
      </XMask>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { XMask } from '@vtj/ui';
import type { MenuDataItem, ActionBarItems } from '@vtj/ui';
import { VtjIconHome, VtjIconSetting, VtjIconUser } from '@vtj/icons';

const menus: MenuDataItem[] = [
  {
    id: '1',
    title: '首页',
    icon: VtjIconHome,
    url: '/'
  },
  {
    id: '2',
    title: '系统管理',
    icon: VtjIconSetting,
    children: [
      { id: '2-1', title: '用户管理', url: '/users' },
      { id: '2-2', title: '角色管理', url: '/roles' }
    ]
  },
  {
    id: '3',
    title: '个人中心',
    icon: VtjIconUser,
    url: '/profile'
  }
];

const actions: ActionBarItems = [
  { label: '个人设置', icon: VtjIconSetting },
  { label: '退出登录', icon: VtjIconUser }
];
</script>

<style lang="scss" scoped>
.demo-mask {
  padding: 20px;

  h3 {
    margin: 16px 0 8px;
    font-size: 16px;
    font-weight: 600;
  }

  .demo-row {
    margin-bottom: 12px;
  }

  .mask-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;

    p {
      margin: 0;
    }
  }
}
</style>
