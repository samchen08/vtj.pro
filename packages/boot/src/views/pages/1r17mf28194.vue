<template>
  <XContainer :fit="false" wrap="wrap" :padding="false">
    <XContainer
      v-for="(item, index) in 20"
      :fit="false"
      :auto="true"
      width="20%"
      :height="200"
      justify="center"
      align="center"
      :inline="true"
      :style='{"background": "#eee", "margin": "5px"}'
      :grow="true">
      {{ item }}
    </XContainer>
  </XContainer>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XContainer } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Container',

    components: { XContainer },

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
