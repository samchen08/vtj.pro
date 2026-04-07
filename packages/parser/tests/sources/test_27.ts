export const test_27 = `
<template>
  <div @click.stop>容器文本内容示例</div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Test2',
    setup(props) {
      const provider = useProvider({ id: '6hgb69yh', version: '1773652358525' });
      const state = reactive({});
      return { state, props, provider };
    },
    methods: {
    async fetchUser() {
      return await this.provider.apis['getUser']
        .apply(this, arguments)
        .then(res => res);
    }
    }
  })
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>

`;
