<template>
  <XAction
    :icon="VtjIconBug"
    mode="icon"
    circle
    type="success"
    @click="onClick">
  </XAction>

  <XAction :icon="VtjIconBug" mode="icon" type="danger" @click="onClick">
  </XAction>

  <XAction
    :icon="VtjIconBug"
    mode="icon"
    circle
    background="hover"
    type="success"
    @click="onClick">
  </XAction>

  <XAction
    :icon="VtjIconBug"
    mode="icon"
    background="hover"
    type="danger"
    @click="onClick">
  </XAction>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/icons';

  const onClick = (action: any) => {
    console.log('click action', action);
  };
</script>

<style scoped></style>
