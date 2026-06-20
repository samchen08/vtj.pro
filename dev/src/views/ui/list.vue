<template>
  <div class="list-demo">
    <h3>基础列表（静态数据）</h3>
    <div class="list-box">
      <XList :data="staticData" :height="300" @load="onLoad">
        <template #default="{ item }">
          <div class="list-item">{{ item.name }} - {{ item.desc }}</div>
        </template>
      </XList>
    </div>

    <h3>分页列表</h3>
    <div class="list-box">
      <XList
        :data="pagedLoader"
        :page-size="5"
        pager
        :height="300"
        @load="onLoad">
        <template #default="{ item, index }">
          <div class="list-item">{{ index + 1 }}. {{ item }}</div>
        </template>
      </XList>
    </div>

    <h3>无限滚动加载</h3>
    <div class="list-box">
      <XList
        :data="infiniteLoader"
        :page-size="10"
        :item-height="40"
        infinite-scroll
        :height="300"
        @load="onLoad">
        <template #default="{ item, index }">
          <div class="list-item">{{ index + 1 }}. Item {{ item }}</div>
        </template>
        <template #loading>加载中...</template>
        <template #nomore>没有更多数据了</template>
      </XList>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { XList, type ListData, type ListState } from '@vtj/ui';

  const staticData: ListData = {
    list: [
      { name: '项目 A', desc: '项目 A 的描述' },
      { name: '项目 B', desc: '项目 B 的描述' },
      { name: '项目 C', desc: '项目 C 的描述' }
    ],
    total: 3
  };

  const pagedLoader = (params?: ListState): ListData => {
    const { page = 1, pageSize = 5 } = params || {};
    const start = (page - 1) * pageSize;
    const items = Array.from({ length: 20 }, (_, i) => `数据项 ${i + 1}`);
    const list = items.slice(start, start + pageSize);
    return { list, total: items.length };
  };

  const infiniteLoader = (params?: ListState): ListData => {
    const { page = 1, pageSize = 10 } = params || {};
    const start = (page - 1) * pageSize;
    const items = Array.from({ length: 50 }, (_, i) => `无限数据 ${i + 1}`);
    const list = items.slice(start, start + pageSize);
    return { list, total: items.length };
  };

  const onLoad = (state?: ListState) => {
    console.log('load:', state);
  };
</script>
<style lang="scss" scoped>
  .list-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .list-box {
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .list-item {
      padding: 8px 12px;
      border-bottom: 1px solid #f5f7fa;
      font-size: 14px;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #f5f7fa;
      }
    }
  }
</style>
