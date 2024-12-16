<template>
  <XAction
    :icon="VtjIconBug"
    label="提示按钮"
    tooltip="提示信息"
    @click="onClick">
  </XAction>

  <XAction :icon="VtjIconBug" mode="icon" tooltip="提示信息" @click="onClick">
  </XAction>

  <XAction :icon="VtjIconBug" mode="icon" tooltip="提示信息" @click="onClick">
  </XAction>

  <XAction
    :icon="VtjIconBug"
    mode="icon"
    tooltip="提示信息"
    circle
    background="hover"
    type="success"
    @click="onClick">
  </XAction>

  <XAction tooltip="提示">
    <h1>Custom</h1>
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
