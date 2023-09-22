<template>
  <XContainer
    class="x-header"
    justify="space-between"
    align="center"
    :class="classes">
    <XContainer align="center" class="x-header__wrapper" grow :class="classes">
      <component v-if="icon" :is="icon" class="x-header__icon"></component>
      <span class="x-header__content" v-bind="$attrs">
        <slot>{{ props.content }}</slot>
      </span>
      <XIcon
        v-if="props.more"
        class="x-header__more"
        :icon="ArrowRight"></XIcon>
      <span v-if="props.subtitle || $slots.subtitle" class="x-header__subtitle">
        <slot name="subtitle"> {{ props.subtitle }} </slot>
      </span>
    </XContainer>
    <div v-if="$slots.actions" class="x-header__actions">
      <slot name="actions"></slot>
    </div>
  </XContainer>
</template>
<script lang="ts" setup>
  import { toRef, useAttrs, computed } from 'vue';
  import { ArrowRight } from '@element-plus/icons-vue';
  import { XContainer, XIcon } from '../';
  import { useIcon } from '../../hooks';
  import { headerProps } from './types';

  defineOptions({
    name: 'XHeader',
    inheritAttrs: false
  });

  const props = defineProps(headerProps);
  const attrs = useAttrs();
  const icon = useIcon(toRef(props, 'icon'));

  const classes = computed(() => {
    return {
      [`is-size-${props.size}`]: !!props.size && props.size !== 'default',
      'is-border': props.border,
      'is-pointer': !!attrs.onClick
    };
  });
</script>
