<template>
  <view class="test-list">
    <uni-section title="组件" type="line">
      <uni-list>
        <uni-list-item
          v-for="item in components"
          :title="item.title"
          :right-text="item.rightText"
          clickable
          :to="item.path"></uni-list-item>
      </uni-list>
    </uni-section>
    <uni-section title="hooks" type="line">
      <uni-list>
        <uni-list-item
          v-for="item in hooks"
          :title="item.title"
          clickable
          :to="item.path"></uni-list-item>
      </uni-list>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
  const components = [
    {
      title: 'XIcon',
      rightText: '图标',
      path: '/pages/components/icon'
    },
    {
      title: 'XContextMenu',
      rightText: '上下文菜单',
      path: '/pages/components/context-menu'
    },
    {
      title: 'XImageViewer',
      rightText: '图片预览器',
      path: '/pages/components/image-viewer'
    },
    {
      title: 'XAvatar',
      rightText: '头像',
      path: '/pages/components/avatar'
    },
    {
      title: 'XLoading',
      rightText: '加载中',
      path: '/pages/components/loading'
    }
  ];

  const hooks = [
    {
      title: 'useKeyboardHeight',
      path: '/pages/hooks/useKeyboardHeight'
    }
  ];
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
