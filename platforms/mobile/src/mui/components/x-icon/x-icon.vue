<template>
  <view class="x-icon" @click="onClick">
    <uni-icons v-if="stringIcons" v-bind="stringIcons"></uni-icons>
    <component
      v-if="iconComponent"
      :is="iconComponent"
      :style="styles"></component>
    <image
      v-if="props.src"
      :src="props.src"
      :style="styles"
      mode="scaleToFill"></image>
  </view>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { iconProps } from './props';

  const props = defineProps(iconProps);
  const emit = defineEmits<{
    click: [];
  }>();

  const stringIcons = computed(() => {
    return typeof props.name === 'string'
      ? ({
          type: props.name,
          color: props.color,
          size: props.size
        } as Record<string, any>)
      : null;
  });

  const iconComponent = computed(() => {
    return typeof props.name === 'object' ? props.name : null;
  });

  const styles = computed(() => {
    const size = `${props.size}px`;
    return {
      color: props.color,
      fontSize: size,
      width: size,
      height: size,
      lineHeight: size
    };
  });

  const onClick = () => {
    emit('click');
  };
</script>

<style lang="scss" scoped>
  .x-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
