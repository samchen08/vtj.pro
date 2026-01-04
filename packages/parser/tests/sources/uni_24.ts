export const uni_24 = `
<template>
  <view class="launch-page">
    <view class="logo-container">
      <image
        alt="App Logo"
        src="https://picsum.photos/200/200?random=1"
        class="logo"></image
    ></view>
    <view class="app-name"> 我的应用</view>
    <view class="enter-btn" @click="click_58o4z7x6"> 立即体验</view></view
  >
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'LaunchPage',
    setup(props) {
      const provider = useProvider({ id: '1bfetlhc', version: '1767512044679' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
      click_58o4z7x6() {
        uni.navigateTo({
          url: '/pages/3e1fldxr'
        });
      }
    }
  })
</script>
<style lang="css" scoped>

</style>

`;
