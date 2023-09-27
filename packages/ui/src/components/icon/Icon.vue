<template>
  <ElIcon class="x-icon" :class="iconClass" :color="props.color" :size="size">
    <slot>
      <component v-if="svgComponent" :is="svgComponent"></component>
      <img v-if="props.src" :src="props.src" />
    </slot>
  </ElIcon>
</template>
<script lang="ts" setup>
  import { computed, markRaw, useAttrs, getCurrentInstance } from 'vue';
  import { ElIcon } from 'element-plus';
  import { iconProps, iconSizeMap, IconSizeKey } from './types';
  const props = defineProps(iconProps);
  const attrs = useAttrs();
  const instance = getCurrentInstance();

  const svgComponent = computed(() => {
    if (!props.icon) return null;
    const app = instance?.appContext.app;
    return typeof props.icon === 'object'
      ? markRaw(props.icon)
      : app?.component(props.icon) || props.icon;
  });

  const iconClass = computed(() => {
    const cls: Record<string, boolean> = {
      'is-pointer': !!attrs.onClick
    };
    if (!svgComponent.value && props.icon) {
      cls[props.icon as string] = true;
    }
    return cls;
  });

  const size = computed(() => {
    return typeof props.size === 'number'
      ? props.size
      : iconSizeMap[props.size as IconSizeKey] ?? undefined;
  });

  defineOptions({
    name: 'XIcon'
  });
</script>
