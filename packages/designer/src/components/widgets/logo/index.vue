<template>
  <div
    class="v-logo-widget"
    :class="{ 'is-pointer': !!props.link }"
    @click="onClick">
    <img
      v-if="_logo"
      :title="props.text"
      class="v-logo-widget__icon"
      :src="_logo" />
    <span v-else>{{ props.text }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useCurrent } from '../../hooks';
  import logo from '../../../assets/logo.svg';
  export interface Props {
    icon?: string;
    text?: string;
    link?: string;
  }

  defineOptions({
    name: 'LogoWidget',
    inheritAttrs: false
  });
  const { engine } = useCurrent();

  const props = withDefaults(defineProps<Props>(), {
    text: 'VTJ'
  });

  const _logo = computed(() => {
    return props.icon || engine.project.value?.config?.logo || logo;
  });

  const onClick = () => {
    if (props.link) {
      location.href = props.link;
    }
  };
</script>
