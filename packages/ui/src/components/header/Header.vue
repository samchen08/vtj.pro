<template>
  <XContainer
    class="x-header"
    justify="space-between"
    align="center"
    :class="classes">
    <XContainer
      align="center"
      class="x-header__wrapper"
      grow
      :class="classes"
      @click="(attrs as any).onClick">
      <component
        v-if="icon"
        :is="icon"
        class="x-header__icon"
        :onClick="attrs.onClickIcon || attrs.onClick"></component>
      <span class="x-header__content">
        <slot>{{ props.content }}</slot>
      </span>
      <XIcon
        v-if="props.more"
        class="x-header__more"
        :icon="ArrowRight"></XIcon>
      <span
        v-if="props.subtitle || $slots.subtitle"
        class="x-header__subtitle"
        @click="(attrs as any).onClick">
        <slot name="subtitle"> {{ props.subtitle }} </slot>
      </span>
    </XContainer>
    <div v-if="$slots.actions" class="x-header__actions">
      <slot name="actions"></slot>
    </div>
  </XContainer>
</template>
<script lang="ts" setup>
  import { toRef, computed, useAttrs } from 'vue';
  import { ArrowRight } from '@vtj/icons';
  import { XContainer, XIcon } from '../';
  import { useIcon } from '../../hooks';
  import { headerProps } from './types';

  defineOptions({
    name: 'XHeader',
    inheritAttrs: false
  });

  const props = defineProps(headerProps);
  const icon = useIcon(toRef(props, 'icon'));
  const attrs = useAttrs();

  const classes = computed(() => {
    return {
      [`is-size-${props.size}`]: !!props.size && props.size !== 'default',
      'is-border': props.border,
      'is-pointer': !!attrs.onClick
    };
  });
</script>
