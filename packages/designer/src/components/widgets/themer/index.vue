<template>
  <XAction
    mode="text"
    size="small"
    v-bind="switchThemeProps"
    @click="toggleTheme">
  </XAction>
</template>
<script lang="ts" setup>
  import { computed, markRaw } from 'vue';
  import { XAction } from '@vtj/ui';
  import { Sunny, Moon } from '@vtj/icons';
  import { useEngine } from '../../../framework';

  const engine = useEngine();

  const switchThemeProps = computed(() => {
    return engine.state.dark
      ? {
          icon: markRaw(Sunny),
          label: '明亮'
        }
      : {
          icon: markRaw(Moon),
          label: '暗黑'
        };
  });

  const toggleTheme = () => {
    engine.state.dark = !engine.state.dark;
  };

  defineOptions({
    name: 'Themer',
    inheritAttrs: false
  });
</script>
