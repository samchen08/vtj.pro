export const test_27 = `
<template>
  <ElTable
    v-loading:arg.body="true">
    </ElTable>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { ElTable, ElTableColumn, vLoading } from 'element-plus';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'TestTable',
    components: { ElTable, ElTableColumn },
    directives: { Loading: vLoading },
    setup(props) {
      const provider = useProvider({ id: '1fxwojn7', version: '1770366137924' });
      const state = reactive({ loading: false });
      return { state, props, provider, vLoading };
    },
    mounted() {
      this.state.loading = true;
      setTimeout(() => {
        this.state.loading = false;
      }, 2000);
    }
  })
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>

`;
