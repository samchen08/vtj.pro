<template>
  <XDialog title="版本对比" maximizable>
    <CodeDiff
      :filename="filename"
      :newFilename="newFilename"
      :theme="theme"
      maxHeight="100%"
      :old-string="oldString"
      :new-string="newString"
      language="JSON"
      output-format="side-by-side"></CodeDiff>
  </XDialog>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XDialog } from '@vtj/ui';
  //@ts-ignore
  import { CodeDiff } from './v-code-diff/index.es.js';
  import { useEngine } from '../../../framework';

  export interface Props {
    oldString: string;
    newString: string;
    filename: string;
    newFilename: string;
  }

  defineProps<Props>();
  const engine = useEngine();
  const theme = computed(() => {
    return engine.state.dark ? 'dark' : 'light';
  });
</script>

<style lang="scss" scoped>
  .code-diff-view {
    padding: 0;
    margin: 0;
  }
</style>
