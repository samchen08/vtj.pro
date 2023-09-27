<template>
  <ElContainer :style='{"padding": "20px"}' direction="horizontal ">
    <XIcon icon="Star" size="small"> </XIcon>
    <XIcon icon="Star" size="default"> </XIcon>
    <XIcon icon="Star" size="large"> </XIcon>
    <XIcon icon="Star" size="large" color="#0B509F"> </XIcon>
    <XIcon icon="Grid" :size="50" color="#1DC60A"> </XIcon>
    <XIcon
      icon=""
      :size="50"
      color="#0B509F"
      src="/ide/assets/logo-32adf494.png">
    </XIcon>
  </ElContainer>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElContainer } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Icon',

    components: { ElContainer, XIcon },

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
