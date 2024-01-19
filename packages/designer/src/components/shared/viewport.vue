<template>
  <div class="v-viewport" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { MOBILE_SIZE, PAD_SIZE } from '../../constants';
  export interface Props {
    mode?: 'pc' | 'pad' | 'mobile';
    width?: number;
    height?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    mode: 'pc'
  });

  const classes = computed(() => {
    return [`is-${props.mode}`];
  });

  const scale = computed(() => {
    if (props.mode === 'pc') return 1;
    const size = props.mode === 'mobile' ? MOBILE_SIZE : PAD_SIZE;
    const { width, height } = size;
    const widthScale = width > 0 ? (props.width || 0) / width : 1;
    const heightScale = height > 0 ? (props.height || 0) / height : 1;
    return Math.min(widthScale, heightScale);
  });

  const styles = computed(() => {
    if (props.mode === 'pc') return {};
    const size = props.mode === 'mobile' ? MOBILE_SIZE : PAD_SIZE;
    const { width, height } = size;
    return {
      width: `${width}px`,
      height: `${height}px`,
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${scale.value})`
    };
  });

  defineOptions({
    name: 'Viewport'
  });
</script>
