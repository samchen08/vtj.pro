<template>
  <ElButton
    v-if="props.mode === 'button'"
    :icon="icon"
    :type="props.type"
    :size="props.size"
    :disabled="disabled"
    v-bind="props.button"
    @click="onClick">
    {{ label }}
  </ElButton>
  <div v-else class="x-action__inner" :class="innerClass" @click="onClick">
    <component :is="icon"></component>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRef } from 'vue';
  import { ElButton } from 'element-plus';
  import { actionProps } from './types';
  import { useDisabled, useIcon } from '../../hooks';

  const props = defineProps(actionProps);
  const emit = defineEmits(['click']);
  const icon = useIcon(toRef(props, 'icon'));
  const disabled = useDisabled(toRef(props, 'disabled'));
  const innerClass = computed(() => {
    return {
      [`is-${props.mode}`]: !!props.mode,
      [`is-${props.type}`]: !!props.type,
      [`is-${props.size}`]: !!props.size && props.size !== 'default',
      [`is-background-${props.background}`]:
        props.mode === 'icon' && !!props.background,
      'is-disabled': !!props.disabled,
      'is-circle': !!props.circle
    };
  });

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (disabled.value) return;
    emit('click');
    return false;
  };
</script>
