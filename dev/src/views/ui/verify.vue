<template>
  <div class="verify-demo">
    <h3>基础用法</h3>
    <div class="demo-row">
      <XVerify v-model="value1"></XVerify>
    </div>

    <h3>自定义秒数与长度</h3>
    <div class="demo-row">
      <XVerify v-model="value2" :seconds="30" :maxlength="4" placeholder="请输入4位验证码"></XVerify>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XVerify } from '@vtj/ui';

  const value1 = ref('');
  const value2 = ref('');
</script>
<style lang="scss" scoped>
  .verify-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      max-width: 400px;
      margin-bottom: 10px;
    }
  }
</style>
