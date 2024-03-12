<template>
  <view class="x-avatar" :class="classes" :style="styles" @tap="onClick">
    <uni-badge
      v-if="props.badge"
      class="x-avatar__badge"
      size="small"
      v-bind="badgeProps"></uni-badge>
    <slot>
      <image
        v-if="props.src"
        class="x-avatar__image"
        :src="props.src"
        mode="scaleToFill"
        :style="styles" />
      <text v-else class="x-avatar__text">{{ firstLetter }}</text>
    </slot>
  </view>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { avatarProps } from './props';
  const props = defineProps(avatarProps);
  const emit = defineEmits(['click']);

  const styles = computed(() => {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      background: `${props.background}`
    };
  });

  const classes = computed(() => {
    return {
      'is-circle': !!props.circle
    };
  });

  const firstLetter = computed(() => {
    return props.label?.charAt(0).toUpperCase();
  });

  const badgeProps = computed(() => {
    return typeof props.badge === 'number'
      ? { text: props.badge }
      : props.badge;
  });

  const onClick = () => {
    emit('click');
  };
</script>
<style lang="scss" scoped>
  .x-avatar {
    background-color: $uni-text-color-placeholder;
    color: $uni-text-color-inverse;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    position: relative;
    &.is-circle {
      border-radius: 50%;
      .x-avatar__image {
        border-radius: 50%;
      }
    }
    & + .x-avatar {
      margin-left: 10px;
    }
  }

  .x-avatar__image {
    border-radius: 4px;
  }
  .x-avatar__text {
    font-weight: bold;
    font-size: 14px;
  }
  .x-avatar__badge {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    z-index: 1;
  }
</style>
