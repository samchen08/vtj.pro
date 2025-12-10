export const test_28 = `
<template>
  <div>
    {{ t1 }}
  </div>
  <div>
    {{ t2 }}
  </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Test',
    setup(props) {
      const provider = useProvider({ id: '1d4q4cmu', version: '1764245073038' });
      const state = reactive({});
      return { state, props, provider };
    },
    computed: {
      t1() {
        return 'abc';
      },
      t2() {
        return this.t1.length;
      }
    }
  })
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>

`;
