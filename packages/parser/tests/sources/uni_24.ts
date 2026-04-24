export const uni_24 = `
<template>
  <button @click.stop="handleClick">Button</button>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'Test',
    setup(props) {
      const provider = useProvider({ id: '3iyxe4pv', version: '1776955609888' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
      handleClick() {
        console.log('click');
      }
    }
  })
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>
`;
