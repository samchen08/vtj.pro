<template>
  <view class="goods-list">
    <scroll-view
      scroll-y=""
      class="scroll-view"
      refresher-enabled=""
      :refresher-triggered="state.refreshing"
      @scrolltolower="loadMore"
      @refresherrefresh="onRefresh">
      <view v-for="(item, index) in state.list" class="goods-item" :key="index">
        <image class="goods-image" :src="item.image" mode="aspectFill"></image>
        <view class="goods-info">
          <text class="goods-title"> {{ item.title }}</text>
          <view class="goods-bottom">
            <text class="goods-price">
              <span>
                <span> ¥</span>
                <span> {{ item.price }}</span></span
              ></text
            >
            <view class="goods-sales">
              <UniIcons type="eye" size="14" color="#999"></UniIcons>
              <text>
                <span>
                  <span> {{ Math.floor(Math.random() * 1000) }}</span>
                  <span> 人浏览</span></span
                ></text
              ></view
            ></view
          ></view
        ></view
      >
      <view class="loading-status">
        <view v-if="state.loadingMore" class="loading-more">
          <UniIcons
            type="spinner-cycle"
            size="18"
            color="#999"
            class="loading-icon"></UniIcons>
          <text> 正在加载...</text></view
        >
        <view v-if="state.noMore" class="no-more">
          <text> — 我是有底线的 —</text></view
        ></view
      ></scroll-view
    ></view
  >
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'Bbb',
    setup(props) {
      const provider = useProvider({ id: '14ktqdut', version: '1745628936336' });
      const state = reactive({
        list: [],
        page: 1,
        pageSize: 10,
        refreshing: false,
        loadingMore: false,
        noMore: false
      });
      return { state, props, provider };
    },
    methods: {
      fetchGoodsList() {
        return new Promise((resolve) => {
          setTimeout(() => {
            const newList = Array.from(
              { length: this.state.pageSize },
              (_, i) => ({
                id: i + (this.state.page - 1) * this.state.pageSize,
                title: `商品${i + (this.state.page - 1) * this.state.pageSize + 1}`,
                price: (Math.random() * 100).toFixed(2),
                image: `https://picsum.photos/200/200?random=${i + (this.state.page - 1) * this.state.pageSize}`
              })
            );
            resolve(newList);
          }, 800);
        });
      },
      async onRefresh() {
        this.state.refreshing = true;
        this.state.page = 1;
        this.state.noMore = false;
        const newList = await this.fetchGoodsList();
        this.state.list = newList;
        this.state.refreshing = false;
      },
      async loadMore() {
        if (this.state.noMore || this.state.loadingMore) return;
        this.state.loadingMore = true;
        this.state.page++;
        const newList = await this.fetchGoodsList();
        if (newList.length < this.state.pageSize) {
          this.state.noMore = true;
        }
        this.state.list = [...this.state.list, ...newList];
        this.state.loadingMore = false;
      }
    },
    mounted() {
      this.onRefresh();
    }
  })
</script>
<style lang="scss" scoped>
  .goods-list {
    height: 100vh;
    background-color: #f7f7f7;
  }
  .scroll-view {
    height: 100%;
    box-sizing: border-box;
    padding: 20rpx;
  }
  .goods-item {
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  .goods-image {
    width: 160rpx; /* 图片宽度缩小 */
    height: 160rpx; /* 图片高度缩小 */
    border-radius: 8rpx;
    object-fit: cover;
    flex-shrink: 0; /* 防止图片被压缩 */
  }
  .goods-info {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0; /* 防止文字溢出 */
  }
  .goods-title {
    font-size: 28rpx;
    color: #333;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .goods-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10rpx;
  }
  .goods-price {
    font-size: 32rpx;
    color: #ff4d4f;
    font-weight: bold;
  }
  .goods-sales {
    display: flex;
    align-items: center;
    font-size: 22rpx;
    color: #999;
  }
  .goods-sales text {
    margin-left: 6rpx;
  }
  .loading-status {
    padding: 30rpx 0;
    text-align: center;
  }
  .loading-more {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 26rpx;
  }
  .loading-icon {
    margin-right: 10rpx;
    animation: rotate 1s linear infinite;
  }
  .no-more {
    color: #ccc;
    font-size: 26rpx;
  }
</style>
