<template>
  <XAction
    mode="icon"
    :icon="Rank"
    draggable
    @dragstart="onDragStart"></XAction>

  <XAction :icon="Rank" draggable @dragstart="onDragStart"></XAction>

  <div
    style="height: 400px; background-color: #ccc"
    @dragover="onDragOver"></div>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';
  import { Rank } from '@vtj/icons';

  const onDragStart = (e: any) => {
    console.log('onDragStart', e);
  };

  const onDragOver = (e: any) => {
    console.log('onDragOver', e);
    e.preventDefault();
  };
</script>

<style scoped></style>
