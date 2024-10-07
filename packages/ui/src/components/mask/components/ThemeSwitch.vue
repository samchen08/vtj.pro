<template>
  <XAction
    :icon="icon"
    :dropdown="{ size: 'small' }"
    mode="icon"
    circle
    background="hover"
    type="primary"
    @click="toggleChange"></XAction>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { Sunny, Moon } from '@vtj/icons';
  import { useDark } from '@vueuse/core';
  import { XAction } from '../../';
  const isDark = useDark();

  const icon = computed(() => (isDark.value ? Sunny : Moon));
  const toggleChange = () => {
    isDark.value = !isDark.value;
  };
</script>
