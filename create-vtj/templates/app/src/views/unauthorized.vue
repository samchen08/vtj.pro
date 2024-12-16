<template>
  <XContainer class="unauthorized" fit justify="center">
    <ElEmpty description="无权限访问该页面"></ElEmpty>
  </XContainer>
</template>
<script lang="ts" setup>
import { XContainer } from '@vtj/ui';
import { ElEmpty } from 'element-plus';
</script>
<style lang="scss" scoped></style>
