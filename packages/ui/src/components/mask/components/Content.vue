<template>
  <XContainer
    class="x-mask__content"
    overflow="auto"
    :flex="false"
    grow
    :padding="false">
    <slot></slot>

    <RouterView v-slot="{ Component, route }">
      <KeepAlive :exclude="props.exclude">
        <component
          v-if="Component"
          :is="props.createView(Component, route)"
          :key="route.fullPath"></component>
      </KeepAlive>
    </RouterView>
  </XContainer>
</template>
<script lang="ts" setup>
  // @ts-ignore
  import { KeepAlive } from 'vue';
  import { RouterView, type RouteLocationNormalizedLoaded } from 'vue-router';
  import { XContainer } from '../../';

  export interface Props {
    createView: (module: any, route: RouteLocationNormalizedLoaded) => any;
    exclude: string[];
  }
  const props = defineProps<Props>();
</script>
