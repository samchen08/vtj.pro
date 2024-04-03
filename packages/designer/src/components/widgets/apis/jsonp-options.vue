<template>
  <div>
    <XField
      name="jsonpOptions.jsonpCallback"
      size="small"
      label="jsonpCallback"></XField>
    <XField
      name="jsonpOptions.jsonpCallbackFunction"
      size="small"
      label="jsonpCallbackFunction"></XField>
    <XField
      name="jsonpOptions.timeout"
      size="small"
      label="timeout"
      editor="number"></XField>
    <XField
      name="jsonpOptions.crossorigin"
      size="small"
      label="crossorigin"
      editor="switch"></XField>
  </div>
</template>
<script lang="ts" setup>
  import { XField } from '@vtj/ui';
</script>
