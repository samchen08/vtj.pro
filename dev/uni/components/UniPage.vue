<template>
  <View class="content">
    <Image class="logo" :src="Logo" />
    <View class="text-area">
      <Text class="title">{{ title }}</Text>
    </View>
  </View>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  //@ts-ignore
  import { View, Image, Text } from '@dcloudio/uni-h5';
  //@ts-ignore
  import Logo from '@/assets/logo.png';
  //@ts-ignore
  const title = ref('Hello');

  onLoad((opt) => {
    console.log('onLoad', opt);
  });

  // import { defineComponent, ref } from '@dcloudio/uni-h5-vue';
  // import { onLoad } from '@dcloudio/uni-app';
  // import { View, Image, Text } from '@dcloudio/uni-h5';
  // import Logo from '@/assets/logo.png';
  // export default {
  //   components: {
  //     View,
  //     Image,
  //     Text
  //   },
  //   setup() {
  //     const title = ref('Hello');
  //     return {
  //       title,
  //       Logo
  //     };
  //   },
  //   onLoad(opt) {
  //     console.log('onLoad', opt);
  //   }
  // };
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
