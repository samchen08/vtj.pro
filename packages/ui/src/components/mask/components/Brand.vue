<template>
  <XContainer
    class="x-mask-brand"
    :class="{ 'is-collapsed': props.collapsed }"
    align="center">
    <XContainer
      class="x-mask-brand__logo"
      flex
      justify="center"
      align="center"
      @click="onClick">
      <slot name="logo">
        <img v-if="props.logo" :src="props.logo" />
      </slot>
    </XContainer>
    <XContainer class="x-mask-brand__title" flex align="center">
      <span v-if="props.title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </span>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '../../';
  import { useRouter } from 'vue-router';
  export interface Props {
    collapsed?: boolean;
    logo?: string;
    title?: string;
    url?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    collapsed: false
  });

  const router = useRouter();
  const onClick = () => {
    if (props.url) {
      router.push(props.url);
    }
  };
</script>
