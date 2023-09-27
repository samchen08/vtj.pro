<template>
  <div>
    <textarea v-model="value" rows="20"> </textarea>
    <hr />
    <button @click="onVueCoder">错误日志出码</button>
    <button @click="onDSLCoder">DSL出码</button>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { vueCoder } from '@vtj/engine/shared';

  const textareaCacheKey = '__vtj_dev_code__';

  const value = ref(localStorage.getItem(textareaCacheKey) || '');

  watch(value, (v) => {
    localStorage.setItem(textareaCacheKey, v);
  });

  const onVueCoder = () => {
    const json = JSON.parse(value.value || '{}');

    const dsl = json.dsl;
    const componentMap = json.componentMap;
    const packages = json.packages;
    const result = vueCoder(dsl, componentMap, packages, (e) => {
      console.log('error:--------------');
      console.log(e);
    });
    console.log(result);
  };

  const onDSLCoder = () => {
    const dsl = JSON.parse(value.value || '{}');
    const result = vueCoder(dsl, {}, [], (e) => {
      console.log('error:--------------');
      console.log(e);
    });
    console.log(result);
  };
</script>
<style lang="scss" scoped>
  textarea {
    width: 100%;
  }
</style>
