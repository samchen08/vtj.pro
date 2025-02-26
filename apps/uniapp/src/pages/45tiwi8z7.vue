<template>
  <button>Button</button>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Aa',
    setup(props) {
      const provider = useProvider({ id: '45tiwi8z7', version: '1740530139492' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
