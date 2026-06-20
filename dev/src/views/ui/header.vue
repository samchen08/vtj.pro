<template>
  <div class="header-demo" style="max-width: 600px">
    <h3>基础标题</h3>
    <XHeader content="基本信息"></XHeader>

    <h3>带图标标题</h3>
    <XHeader content="用户管理" :icon="VtjIconUser"></XHeader>

    <h3>带副标题</h3>
    <XHeader content="系统设置" subtitle="系统参数配置"></XHeader>

    <h3>带边框</h3>
    <XHeader content="带边框标题" border></XHeader>

    <h3>more 箭头</h3>
    <XHeader content="查看更多" more></XHeader>

    <h3>带操作区</h3>
    <XHeader content="数据列表" :icon="VtjIconBug">
      <template #actions>
        <XAction mode="text" size="small" label="新增" type="primary" @click="onClick"></XAction>
        <XAction mode="text" size="small" label="导出" @click="onClick"></XAction>
      </template>
    </XHeader>

    <h3>自定义副标题插槽</h3>
    <XHeader content="订单管理" subtitle="共10条">
      <template #subtitle>
        <span style="color: #409eff">（共 10 条记录）</span>
      </template>
    </XHeader>
  </div>
</template>
<script lang="ts" setup>
  import { XHeader, XAction } from '@vtj/ui';
  import { VtjIconUser, VtjIconBug } from '@vtj/icons';

  const onClick = () => {
    console.log('clicked');
  };
</script>
<style lang="scss" scoped>
  .header-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
  }
</style>
