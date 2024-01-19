<template>
  <div class="v-logo-widget" @click="onClick">
    <img
      v-if="props.icon"
      :title="props.text"
      class="v-logo-widget__icon"
      :src="props.icon" />
    <span v-else>{{ props.text }}</span>
  </div>
</template>

<script lang="ts" setup>
  import logo from './logo.png';
  export interface Props {
    icon?: string;
    text?: string;
    link?: string;
  }

  defineOptions({
    name: 'LogoWidget',
    inheritAttrs: false
  });

  const props = withDefaults(defineProps<Props>(), {
    text: 'VTJ',
    icon: logo
  });

  const onClick = () => {
    if (props.link) {
      location.href = props.link;
    }
  };
</script>
