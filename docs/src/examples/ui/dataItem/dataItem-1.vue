<template>
  <XDataItem
    v-for="_n in 3"
    @imageClick="onClick"
    @title-click="onTitleClick"
    direction="row"
    :icon="Setting"
    image-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
    image-height="100px"
    image-width="100%"
    title="占位内容加载失败"
    description="可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。"
    :actions="actions"
    @actionClick="onActionClick"
    @action-command="onActionCommand"
    split>
  </XDataItem>
</template>
<script lang="ts" setup>
  import { Setting } from '@element-plus/icons-vue';
  import { XDataItem } from '@vtj/ui';
  import { VtjIconPlus } from '@vtj/icons';

  const actions = [
    {
      label: '按钮一',
      icon: VtjIconPlus
    },
    {
      label: '按钮二',
      icon: VtjIconPlus
    }
  ];

  const onClick = () => {
    console.log('clicked!');
  };

  const onTitleClick = () => {
    console.log('onTitleClick');
  };

  const onActionClick = (e: any) => {
    console.log('onActionClick', e);
  };

  const onActionCommand = (action: any, menu: any) => {
    console.log('onActionCommand', action, menu);
  };
</script>
