<template>
  <XContainer class="v-scripts-widget" direction="column" fit>
    <State :current="current" :context="context"></State>
    <Computed :current="current" :context="context"></Computed>
    <Methods :current="current" :context="context"></Methods>
    <LifeCycles :current="current" :context="context"></LifeCycles>
    <Watch :current="current" :context="context"></Watch>
  </XContainer>
</template>

<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
  import { useCurrent } from '../../hooks';
  import State from './state.vue';
  import Computed from './computed.vue';
  import Methods from './methods.vue';
  import LifeCycles from './lifeCycles.vue';
  import Watch from './watch.vue';
  const { current, context } = useCurrent();
</script>
