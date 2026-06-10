<template>
  <XContainer class="v-scripts-widget" direction="column" fit>
    <Refs v-if="isComposition" :current="current" :context="context"></Refs>
    <Reactives
      v-if="isComposition"
      :current="current"
      :context="context"></Reactives>
    <State :current="current" :context="context"></State>
    <Computed :current="current" :context="context"></Computed>
    <Methods :current="current" :context="context"></Methods>
    <LifeCycles :current="current" :context="context"></LifeCycles>
    <Watch :current="current" :context="context"></Watch>
  </XContainer>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { XContainer } from '@vtj/ui';
  import { useCurrent } from '../../hooks';
  import Refs from './refs.vue';
  import Reactives from './reactives.vue';
  import State from './state.vue';
  import Computed from './computed.vue';
  import Methods from './methods.vue';
  import LifeCycles from './lifeCycles.vue';
  import Watch from './watch.vue';
  const { current, context } = useCurrent();

  const isComposition = computed(
    () => current.value?.apiMode === 'composition'
  );
</script>
