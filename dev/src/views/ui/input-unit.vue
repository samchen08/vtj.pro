<template>
  <div class="input-unit-demo" style="max-width: 400px">
    <h3>基础用法（带单位后缀）</h3>
    <div class="demo-row">
      <XInputUnit v-model="value1" unit="px"></XInputUnit>
    </div>

    <h3>单位选择器</h3>
    <div class="demo-row">
      <XInputUnit v-model="value2" :units="['px', 'rem', 'em', '%']"></XInputUnit>
    </div>

    <h3>带单位输出（withUnit）</h3>
    <div class="demo-row">
      <XInputUnit v-model="value3" :units="['px', 'rem', 'em']" with-unit @change="onChange"></XInputUnit>
    </div>

    <h3>数字格式化</h3>
    <div class="demo-row">
      <XInputUnit v-model="value4" :units="['px']" format="0.00"></XInputUnit>
    </div>

    <h3>自定义后缀宽度</h3>
    <div class="demo-row">
      <XInputUnit v-model="value5" :units="['px', 'rem', '%']" :append-width="100"></XInputUnit>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XInputUnit } from '@vtj/ui';

  const value1 = ref('16');
  const value2 = ref('10px');
  const value3 = ref('20');
  const value4 = ref('99');
  const value5 = ref('30');

  const onChange = (val: any) => {
    console.log('change:', val);
  };
</script>
<style lang="scss" scoped>
  .input-unit-demo {
    padding: 20px;
    h3 {
      margin: 20px 0 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      color: #333;
    }
    .demo-row {
      margin-bottom: 10px;
    }
  }
</style>
