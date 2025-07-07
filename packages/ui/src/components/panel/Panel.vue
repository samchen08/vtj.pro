<template>
  <XContainer
    class="x-panel"
    direction="column"
    :class="classes"
    :fit="props.fit"
    :width="props.width"
    :height="props.height">
    <XContainer
      v-if="hasHeader || $slots.header"
      :flex="false"
      class="x-panel__header">
      <slot name="header">
        <XHeader v-bind="headerProps">
          <template #default>
            <slot name="title"></slot>
          </template>
          <template #actions>
            <slot name="actions"></slot>
          </template>
        </XHeader>
      </slot>
    </XContainer>
    <XContainer
      ref="bodyRef"
      :flex="false"
      :overflow="bodyOverflow"
      grow
      padding
      class="x-panel__body"
      v-bind="props.body">
      <slot></slot>
    </XContainer>
    <XContainer
      v-if="$slots.footer"
      :flex="false"
      padding
      class="x-panel__footer"
      v-bind="props.footer">
      <slot name="footer"></slot>
    </XContainer>
    <div v-if="props.badge" class="x-panel__badge" :class="badgeClasses">
      {{ props.badge.text }}
    </div>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XContainer, XHeader } from '../';
  import { panelProps } from './types';

  defineOptions({
    name: 'XPanel'
  });

  const props = defineProps(panelProps);
  const bodyRef = ref();
  const classes = computed(() => {
    return {
      'x-panel__badge-wrapper': !!props.badge,
      'x-panel--card': !!props.card,
      'x-panel--default': !props.card,
      [`is-${props.size}`]: !!props.size && props.size !== 'default',
      'is-border': !!props.border,
      'is-radius': !!props.radius,
      [`is-shadow-${props.shadow}`]: !!props.shadow && props.shadow !== 'none'
    };
  });

  const badgeClasses = computed(() => {
    if (props.badge === null) return null;
    return props.badge ? `is-badge-${props.badge.type}` : '';
  });

  const headerProps = computed(() => {
    if (props.header === null || props.header === undefined) return null;
    return typeof props.header === 'string'
      ? {
          content: props.header,
          size: props.size
        }
      : {
          ...props.header,
          size: props.size
        };
  });

  const hasHeader = computed(() => {
    return !!headerProps.value;
  });

  const bodyOverflow = computed(() => {
    return props.fit || !!props.height ? 'auto' : undefined;
  });

  defineExpose({
    bodyRef
  });
</script>
