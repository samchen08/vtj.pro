<template>
  <div>
    <XContainer style="margin-bottom: 10px" wrap="wrap" gap>
      <XPanel
        v-for="n in 10"
        @click="onClick"
        :header="null"
        width="calc(20% - 10px)"
        shadow="always">
        <XDataItem
          title="应用名称"
          :icon="icon"
          :active="n === 1"
          hover
          padding></XDataItem>
      </XPanel>
    </XContainer>

    <XPanel :header="{ content: '容器标题', more: true }" card>
      <template #actions>
        <XAction
          :icon="Setting"
          mode="text"
          label="示意效果，需另行开发"></XAction>
      </template>
      <XDataItem
        v-for="n in 3"
        @imageClick="onClick"
        direction="column"
        :icon="Setting"
        image-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        image-height="100px"
        image-width="100%"
        title="占位内容加载失败"
        description="可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。"
        :actions="actions"
        @actionClick="onActionClick"
        split
        :active="n === 1">
        <div>
          <ElTag size="small">系统管理</ElTag>
          <ElTag size="small">系统管理</ElTag>
          <ElTag size="small">系统管理</ElTag>
        </div>
      </XDataItem>
      <template #footer>
        <div>Footer</div>
      </template>
    </XPanel>
  </div>
  <div>
    <XPanel header="容器标题">
      <template #actions>
        <XAction
          :icon="Setting"
          mode="text"
          label="示意效果，需另行开发"></XAction>
      </template>
      <XTabs :items="items"> </XTabs>
      <XDataItem
        v-for="_n in 3"
        direction="row"
        :icon="Setting"
        image-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        image-height="100px"
        image-width="100%"
        title="占位内容加载失败"
        description="可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。"
        :actions="actions"
        split
        padding
        hover></XDataItem>
      <template #footer>
        <div>Footer</div>
      </template>
    </XPanel>
  </div>
</template>
<script lang="ts" setup>
  import { ElTag } from 'element-plus';
  import { Setting } from '@element-plus/icons-vue';
  import { XTabs, XDataItem, XPanel, XContainer, XAction } from '@vtj/web';
  import { VtjIconPlus } from '@vtj/web';

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

  const icon = {
    icon: Setting,
    color: '#fff',
    background: '#409eff',
    padding: 2,
    radius: 4,
    size: 30
  };

  const items = [
    {
      label: '选项面板一',
      name: 1
    },
    {
      label: '选项面板二',
      name: 2
    },
    {
      label: '选项面板三',
      name: 3
    }
  ];

  const onClick = () => {
    console.log('clicked!');
  };

  const onActionClick = (e: any) => {
    console.log('onActionClick', e);
  };
</script>
