<template>
  <div class="v-switcher-widget">
    <ElButton size="small" round @click="onClick">
      <VtjIconBack class="v-switcher-widget__back"></VtjIconBack>
      <span>{{ title }}</span>
      <ElDivider v-if="subtitle" direction="vertical"></ElDivider>
      <span v-if="subtitle">{{ subtitle }}</span>
    </ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElButton, ElDivider } from 'element-plus';
  import { VtjIconBack } from '@vtj/icons';
  import { useCurrent } from '../../hooks';

  const emit = defineEmits(['click']);
  const { engine } = useCurrent();
  const title = computed(() => {
    return engine.project.value?.config?.title || engine.project.value?.name;
  });
  const subtitle = computed(() => engine.project.value?.currentFile?.title);

  const onClick = () => {
    emit('click', engine.project.value);
  };

  defineOptions({
    name: 'SwitcherWidget',
    inheritAttrs: false
  });
</script>
