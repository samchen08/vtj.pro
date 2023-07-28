<template>
  <XSimpleMask :menu="{ data: menus }" :project="project">
    <slot></slot>
  </XSimpleMask>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { XSimpleMask } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  const provider = useProvider();
  const { dsl, project } = provider || {};
  const menus = computed(() => dsl?.pages || []);
</script>
