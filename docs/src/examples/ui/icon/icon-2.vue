<template>
  <XIcon :icon="InfoFilled" size="large"></XIcon>
  <XIcon :icon="InfoFilled" size="default"></XIcon>
  <XIcon :icon="InfoFilled" size="small"></XIcon>
  <XIcon :icon="InfoFilled" :size="60"></XIcon>
</template>
<script lang="ts" setup>
  import { XIcon } from '@vtj/ui';
  import { InfoFilled } from '@vtj/icons';
</script>
