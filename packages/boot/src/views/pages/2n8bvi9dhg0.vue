<template>
  <ElButton type="primary"> 按钮 </ElButton>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElButton } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: '33',

    components: { ElButton },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    }
  });
</script>
<style lang="scss" scoped></style>
