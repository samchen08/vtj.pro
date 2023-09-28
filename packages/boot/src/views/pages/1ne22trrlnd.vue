<template>
  <MyBlock title="我是传递过去的标题文本" @submit="submit_handler_2dohrw6rl55">
  </MyBlock>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import MyBlock from '@/components/blocks/1bh5ci0vpnp.vue';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'TestBlock',

    components: { MyBlock },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    },

    methods: {
      submit_handler_2dohrw6rl55(val) {
        this.$message.info({
          message: `收到事件消息：${val}`
        });
      }
    }
  });
</script>
<style lang="scss" scoped></style>
