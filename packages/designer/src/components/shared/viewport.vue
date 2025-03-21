<template>
  <div class="v-viewport" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { MOBILE_SIZE, PAD_SIZE } from '../../constants';

  
  export interface Props {
    mode?: 'pc' | 'pad' | 'mobile' | 'custom';
    width?: number;
    height?: number;
    customSize?: { width : number, height : number }
  }

  const props = withDefaults(defineProps<Props>(), {
    mode: 'pc',
    customSize: ()=>({ width : 1920, height : 1080})
  });

  const classes = computed(() => {
    return [`is-${props.mode}`];
  });

  const size = computed(()=>props.mode === 'mobile' ? MOBILE_SIZE : props.mode === 'pad' ? PAD_SIZE : props.customSize)

  const scale = computed(() => {
    if (props.mode === 'pc') return 1;
    const { width, height } = size.value;
    const widthScale = width > 0 ? (props.width || 0) / width : 1;
    const heightScale = height > 0 ? (props.height || 0) / height : 1;
    return Math.min(widthScale, heightScale);
  });

  const styles = computed(() => {
    if (props.mode === 'pc') return {};
    const { width, height } = size.value;
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
