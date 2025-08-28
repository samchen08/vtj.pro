<template>
  <div class="card">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="desc">
        <slot name="desc">
          {{ desc }}
        </slot>
      </div>
      <div class="price"><span>￥</span>{{ price }}</div>
      <div class="btn" :class="`is-${type}`">
        <a class="PButton medium" href="#订阅购买流程">立即订阅</a>
      </div>
    </div>
    <div class="body">
      <div class="row section">
        <span class="label">服务时长</span>
        <span class="value">1年</span>
      </div>
      <div class="row">
        <span class="label">源码免费更新升级</span>
      </div>
      <div class="row">
        <span class="label">作者微信一对一技术咨询</span>
      </div>
      <div class="row">
        <span class="label"
          >赠送AI助手 <strong>{{ tokens }}</strong> Token额度</span
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  export interface Props {
    title: string;
    desc?: string;
    price?: string;
    tokens?: string;
    type?: string;
  }

  defineProps<Props>();
</script>
<style lang="scss" scoped>
  .card {
    border: 1px solid var(--vp-c-divider);
    border-radius: 10px;
    box-shadow: var(--vp-shadow-1);
    flex-grow: 1;
    flex-shrink: 1;
    min-width: calc(50% - 24px);
  }
  .header {
    padding: 10px;
    text-align: center;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }
  .desc {
    font-size: 14px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .price {
    font-size: 30px;
    font-weight: bold;
    padding: 20px 0;
    span {
      font-size: 20px;
      color: var(--vp-c-text-2);
    }
  }
  .btn a {
    width: 100%;
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition:
      color 0.25s,
      border-color 0.25s,
      background-color 0.25s;

    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-c-brand-3);
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      opacity: 0.8;
    }
  }
  .btn.is-plus a {
    background-color: var(--vp-c-warning-1);
  }
  .body {
    border-top: 1px solid var(--vp-c-divider);
    padding: 10px;
  }
  .row {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    padding: 2px 5px;
    border-radius: 4px;
    &.section {
      background: var(--vp-c-bg-soft);
      font-weight: bold;
    }
  }
  .value {
    color: var(--vp-c-text-3);
  }
</style>
