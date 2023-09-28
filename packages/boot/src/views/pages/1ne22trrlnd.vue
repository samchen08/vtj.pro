<template>
  <MyBlock title="我是传递过去的标题文本" @submit="submit_handler_2dohrw6rl55">
    <template #default="scope">
      <ElTabs modelValue="1" :style='{"width": "100%"}'>
        <ElTabPane label="面板一" name="1"> 面板一内容 </ElTabPane>
        <ElTabPane label="面板二" name="2"> 面板二内容 </ElTabPane>
        <ElTabPane label="面板三" name="3"> 面板三内容 </ElTabPane>
      </ElTabs>
    </template>
  </MyBlock>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElTabs, ElTabPane } from 'element-plus';
  import MyBlock from '@/components/blocks/1bh5ci0vpnp.vue';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'TestBlock',

    components: { MyBlock, ElTabs, ElTabPane },

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
