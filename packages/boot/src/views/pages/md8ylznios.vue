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
  <ElDivider> 分割线 </ElDivider>
  <XIcon icon="GoodsFilled" :size="100" color="#F10B0B"> </XIcon>
  <XIcon
    :icon="state.icon"
    :size="100"
    color="#F10B0B"
    @click="click_handler_2jl6c2bv8q8">
  </XIcon>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElContainer, ElDivider } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Icon',

    components: { ElContainer, XIcon, ElDivider },

    setup(props) {
      const provider = useProvider();
      const state = reactive({ icon: 'Plus' });
      return {
        state,
        props,
        provider
      };
    },

    methods: {
      click_handler_2jl6c2bv8q8() {
        this.state.icon = this.state.icon === 'Minus' ? 'Plus' : 'Minus';
      }
    }
  });
</script>
<style lang="scss" scoped></style>
