<template>
  <div class="data-item-demo" style="max-width: 500px">
    <h3>基础数据项（column 排列）</h3>
    <XDataItem title="用户名称" description="这是用户的描述信息">
      <div class="tag">VIP 会员</div>
    </XDataItem>

    <h3>行方向 + 图片</h3>
    <XDataItem
      direction="row"
      image-src="https://picsum.photos/80/80?t=1"
      title="商品名称"
      description="商品描述信息"
      split>
    </XDataItem>

    <h3>带图标</h3>
    <XDataItem :icon="VtjIconUser" title="用户中心" description="管理个人资料">
    </XDataItem>

    <h3>带操作按钮</h3>
    <XDataItem
      title="文件名称"
      description="文件描述信息"
      :actions="actions"
      @action-click="onActionClick"
      @action-command="onActionCommand">
    </XDataItem>

    <h3>高亮 + 悬停效果</h3>
    <XDataItem
      title="可选中项"
      description="点击高亮显示"
      active
      hover
      @image-click="onImageClick"
      @title-click="onTitleClick">
    </XDataItem>

    <h3>自定义插槽</h3>
    <XDataItem title="自定义卡片">
      <template #image>
        <div class="custom-image">自定义图片</div>
      </template>
      <template #actions>
        <XAction mode="text" size="small" label="查看详情" type="primary" @click="onClick"></XAction>
      </template>
    </XDataItem>
  </div>
</template>
<script lang="ts" setup>
  import { XDataItem, XAction, type ActionBarItems } from '@vtj/ui';
  import { VtjIconUser, VtjIconEdit, VtjIconRemove } from '@vtj/icons';

  const actions: ActionBarItems = [
    { label: '编辑', icon: VtjIconEdit, command: 'edit' },
    { label: '删除', icon: VtjIconRemove, type: 'danger', command: 'delete' }
  ];

  const onClick = () => console.log('click');
  const onActionClick = (action: any) => console.log('actionClick:', action);
  const onActionCommand = (action: any, menu: any) => console.log('command:', action, menu);
  const onImageClick = () => console.log('imageClick');
  const onTitleClick = () => console.log('titleClick');
</script>
<style lang="scss" scoped>
  .data-item-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .tag {
      display: inline-block;
      padding: 2px 8px;
      background: #fef0f0;
      color: #f56c6c;
      border-radius: 4px;
      font-size: 12px;
    }
    .custom-image {
      width: 80px;
      height: 80px;
      background: #f5f7fa;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 13px;
      border-radius: 4px;
    }
  }
</style>
