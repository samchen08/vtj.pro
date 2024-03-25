<template>
  <view class="x-loading" :style="styles">
    <view class="line">
      <view class="div" v-for="_n in 6"></view>
    </view>
    <view class="circlebg"></view>
  </view>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { loadingProps } from './props';

  const props = defineProps(loadingProps);

  const styles = computed(() => {
    return {
      zoom: props.zoom
    };
  });
</script>
<style lang="scss" scoped>
  .x-loading {
    margin: 0 auto;
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
  }

  .x-loading .line .div {
    position: absolute;
    left: 13px;
    top: 0;
    width: 3px;
    height: 30px;
  }

  .x-loading .line .div:before,
  .x-loading .line .div:after {
    content: '';
    display: block;
    height: 50%;
    background: $uni-text-color-placeholder;
    border-radius: 5px;
  }

  .x-loading .line .div:nth-child(2) {
    transform: rotate(30deg);
  }

  .x-loading .line .div:nth-child(3) {
    transform: rotate(60deg);
  }

  .x-loading .line .div:nth-child(4) {
    transform: rotate(90deg);
  }

  .x-loading .line .div:nth-child(5) {
    transform: rotate(120deg);
  }

  .x-loading .line .div:nth-child(6) {
    transform: rotate(150deg);
  }

  .x-loading .circlebg {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 15px;
    height: 15px;
    background: $uni-bg-color-hover;
    border-radius: 15px;
  }

  @keyframes load {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .x-loading .line .div:nth-child(1):before {
    animation: load 1.2s linear 0s infinite;
  }

  .x-loading .line .div:nth-child(2):before {
    animation: load 1.2s linear 0.1s infinite;
  }

  .x-loading .line .div:nth-child(3):before {
    animation: load 1.2s linear 0.2s infinite;
  }

  .x-loading .line .div:nth-child(4):before {
    animation: load 1.2s linear 0.3s infinite;
  }

  .x-loading .line .div:nth-child(5):before {
    animation: load 1.2s linear 0.4s infinite;
  }

  .x-loading .line .div:nth-child(6):before {
    animation: load 1.2s linear 0.5s infinite;
  }

  .x-loading .line .div:nth-child(1):after {
    animation: load 1.2s linear 0.6s infinite;
  }

  .x-loading .line .div:nth-child(2):after {
    animation: load 1.2s linear 0.7s infinite;
  }

  .x-loading .line .div:nth-child(3):after {
    animation: load 1.2s linear 0.8s infinite;
  }

  .x-loading .line .div:nth-child(4):after {
    animation: load 1.2s linear 0.9s infinite;
  }

  .x-loading .line .div:nth-child(5):after {
    animation: load 1.2s linear 1s infinite;
  }

  .x-loading .line .div:nth-child(6):after {
    animation: load 1.2s linear 1.1s infinite;
  }
</style>
