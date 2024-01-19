<template>
  <div style="height: 100%">
    <XList :data="loader" data-key="id" @load="onLoad" :page="1" pager>
      <template #="{ item, index }">
        <XDataItem
          split
          direction="row"
          image-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
          image-height="100px"
          image-width="100px"
          :title="`占位内容加载失败_${JSON.stringify(item)}_${index}`"
          description="可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。">
        </XDataItem>
      </template>
    </XList>
  </div>
</template>
<script lang="ts" setup>
  import { XList, XDataItem, type ListData } from '@vtj/web';

  // const list: any = [];

  const onLoad = (params: any) => {
    console.log('trigger load', params);
  };

  const loader = (state: any) => {
    console.log('do loader', state);
    const total = 100;
    const { page = 1, pageSize = 10 } = state;
    const list: any[] = [];
    for (let i = 0; i < pageSize; i++) {
      list.push({
        id: (page - 1) * pageSize + i
      });
    }

    return new Promise<ListData>((resolve) => {
      setTimeout(() => {
        resolve({
          list,
          total
        });
      }, 20);
    });
  };
</script>
