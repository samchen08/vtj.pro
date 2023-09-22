<template>
  <ElSwitch
    class="x-mask-theme-switch"
    v-model="isDark"
    size="default"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"></ElSwitch>
</template>
<script lang="ts" setup>
  import { ElSwitch } from 'element-plus';
  import { Sunny, Moon } from '@element-plus/icons-vue';
  import { useDark } from '@vueuse/core';
  const isDark = useDark();
</script>
