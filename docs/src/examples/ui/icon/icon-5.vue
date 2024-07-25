<template>
  <XIcon :icon="InfoFilled" :size="40"></XIcon>
  <XIcon :icon="VtjIconApi" :size="40"></XIcon>
  <XIcon src="../../../assets/logo.png" :size="40"></XIcon>
  <XIcon :size="40">
    <i>?</i>
  </XIcon>
</template>
<script lang="ts" setup>
  import { XIcon } from '@vtj/ui';
  import { InfoFilled, VtjIconApi } from '@vtj/icons';
</script>
