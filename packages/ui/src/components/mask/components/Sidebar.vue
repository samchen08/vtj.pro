<template>
  <XContainer
    class="x-mask-sidebar"
    :grow="false"
    flex
    direction="column"
    v-resizable="{
      dirs: ['e'],
      disabled: props.collapsed,
      maxWidth: 500,
      minWidth: 200
    }"
    :class="{ 'is-collapsed': props.collapsed }">
    <slot name="brand"></slot>
    <XContainer
      class="x-mask-sidebar__wrapper"
      flex
      grow
      direction="column"
      justify="space-between"
      align="center">
      <slot></slot>
      <div class="x-mask-sidebar__helper"></div>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '../../';
  import { vResizable } from '../../../directives';

  export interface Props {
    collapsed?: boolean;
  }
  const props = defineProps<Props>();
</script>
