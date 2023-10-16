<template>
  <AButtonGroup>
    <AButton> Button1 </AButton>
    <AButton> Button2 </AButton>
    <AButton> Button3 </AButton>
  </AButtonGroup>
  <MyBlock> </MyBlock>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Button } from 'ant-design-vue';
  import MyBlock from '@/components/blocks/4g42wqf4eo.vue';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Homepage',

    components: { AButtonGroup: Button.Group, AButton: Button, MyBlock },

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
