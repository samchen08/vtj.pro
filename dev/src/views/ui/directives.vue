<template>
  <div>
    <XPanel
      v-draggable="{ selector: '.x-header' }"
      v-resizable="{
        disabled: false,
        minWidth: 50,
        minHeight: 50,
        maxWidth: 400,
        maxHeight: 400
      }"
      header="Title"
      card></XPanel>
  </div>
</template>
<script lang="ts" setup>
  import { vDraggable, vResizable, XPanel } from '@vtj/ui';
</script>

<style lang="scss" scoped>
  .x-panel {
    position: absolute;
    width: 300px;
    height: 200px;
    left: 300px;
    top: 0;
  }
</style>
