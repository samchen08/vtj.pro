<template>
  <div>
    <h3>Subpage</h3>
  </div>
</template>

<script lang="ts" setup>
  import { defineTab } from '@vtj/ui';
  const { tab, mask } = defineTab({
    title: '二级页面'
  });

  console.log('defineTab', tab, mask);
</script>
