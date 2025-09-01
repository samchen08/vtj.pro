<template>
  <view class="launch-page">
    <view class="logo-container">
      <image
        class="logo"
        src="https://picsum.photos/200/200?random=1"
        alt="App Logo"></image
    ></view>
    <view class="app-name"> 我的应用</view>
    <view class="enter-btn" @click="enterApp"> {{ $t('19o4rx0p') }}</view></view
  >
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'LaunchPage',
    setup(props) {
      const provider = useProvider({ id: '18qdrlpy', version: '1756711073277' });
      const state = reactive({ countDown: 3 });
      return { state, props, provider };
    },
    methods: {
      enterApp() {
        uni.showToast({ title: 'clicked!' });
      }
    }
  })
</script>
<style lang="css" scoped>
  .launch-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
  }

  .logo-container {
    margin-bottom: 40px;
  }

  .logo {
    width: 150px;
    height: 150px;
    border-radius: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .app-name {
    font-size: 28px;
    color: white;
    font-weight: bold;
    margin-bottom: 60px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .enter-btn {
    padding: 12px 40px;
    background-color: white;
    color: #6e8efb;
    border-radius: 25px;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .enter-btn:active {
    transform: scale(0.95);
  }
</style>
