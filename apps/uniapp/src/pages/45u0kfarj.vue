<template>
  <button>Button</button>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'Test',
    setup(props) {
      const provider = useProvider({ id: '45u0kfarj', version: '1741913370215' });
      const state = reactive({});
      return { state, props, provider };
    }
  })
</script>
<style lang="scss" scoped></style>
