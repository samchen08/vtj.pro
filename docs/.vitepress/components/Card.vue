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
      <div class="original"><span>￥</span>{{ original }}</div>
      <div class="btn" :class="`is-${type}`">
        <a class="PButton medium" href="#订阅购买流程">限时订阅</a>
        <span v-if="timeLeft > 0" class="timer">{{ countdownText }}</span>
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
      <slot name="rows"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';

  export interface Props {
    title: string;
    desc?: string;
    price?: string;
    original?: string;
    tokens?: string;
    type?: string;
    expiryTime?: string | number | Date;
    showDays?: boolean;
    expiredText?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    showDays: true,
    expiredText: '已过期',
    expiryTime: () => {
      // 默认30天后过期
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date;
    }
  });

  const timeLeft = ref(0);
  let timer: NodeJS.Timeout | null = null;

  const updateTimeLeft = () => {
    try {
      const expiry = new Date(props.expiryTime).getTime();
      const now = Date.now();
      timeLeft.value = Math.max(0, expiry - now);

      // 如果倒计时结束，清除定时器
      if (timeLeft.value <= 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    } catch (error) {
      console.error('Invalid expiryTime format:', error);
      timeLeft.value = 0;
    }
  };

  const countdownText = computed(() => {
    if (timeLeft.value <= 0) {
      return props.expiredText;
    }

    const totalSeconds = Math.floor(timeLeft.value / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (props.showDays && days > 0) {
      return `${days}天${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}后失效`;
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}后失效`;
    }
  });

  onMounted(() => {
    updateTimeLeft();
    // 每秒更新一次
    timer = setInterval(updateTimeLeft, 1000);
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });
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
    margin: 10px 0;
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
    padding: 20px 0 5px 0;
    color: var(--vp-c-danger-3);
    span {
      font-size: 20px;
      color: var(--vp-c-danger-3);
    }
  }
  .original {
    color: var(--vp-c-danger-3);
    opacity: 0.5;
    text-decoration: line-through;
    margin-bottom: 20px;
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
    margin-bottom: 10px;
  }
  .btn.is-plus a {
    background-color: var(--vp-c-warning-1);
  }
  .body {
    border-top: 1px solid var(--vp-c-divider);
    padding: 10px;

    :deep(.row) {
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
  .timer {
    font-size: 14px;
    margin-top: 10px;
    display: block;
    color: var(--vp-c-danger-3);
  }
</style>
