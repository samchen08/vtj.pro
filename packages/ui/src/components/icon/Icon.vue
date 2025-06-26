<template>
  <ElIcon
    class="x-icon"
    :class="iconClass"
    :color="props.color"
    :size="size"
    :style="iconStyle">
    <slot>
      <component v-if="svgComponent" :is="svgComponent"></component>
      <img v-if="props.src" :src="props.src" />
    </slot>
  </ElIcon>
</template>
<script lang="ts" setup>
  import { computed, markRaw, useAttrs, getCurrentInstance } from 'vue';
  import { ElIcon } from 'element-plus';
  import { iconProps, iconSizeMap, type IconSizeKey } from './types';
  import { getSizeValue } from '../../utils';
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
      'is-pointer': !!attrs.onClick,
      'is-hover-effect': props.hoverEffect
    };
    if (!svgComponent.value && props.icon) {
      cls[props.icon as string] = true;
    }
    return cls;
  });

  const iconStyle = computed(() => {
    return {
      'background-color': props.background,
      'border-radius': props.radius ? getSizeValue(props.radius) : undefined,
      padding: props.padding ? getSizeValue(props.padding) : undefined
    };
  });

  const size = computed(() => {
    return typeof props.size === 'number'
      ? props.size
      : (iconSizeMap[props.size as IconSizeKey] ??
          Number.parseInt(props.size) ??
          undefined);
  });

  defineOptions({
    name: 'XIcon'
  });
</script>
