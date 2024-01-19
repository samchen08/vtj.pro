<template>
  <ElTooltip effect="dark" placement="right" :content="label" :show-after="600">
    <div class="v-apps-region__icon" :class="classes" @click="handleClick">
      <component :is="icon"></component>
    </div>
  </ElTooltip>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElTooltip } from 'element-plus';
  import type { VueComponent } from '../../framework';

  export interface Props {
    icon?: VueComponent;
    label?: string;
    active?: boolean;
    open?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    active: false,
    open: false
  });

  const emit = defineEmits(['click']);

  const classes = computed(() => {
    return {
      'is-active': props.active,
      'is-open': props.open
    };
  });

  const handleClick = () => {
    emit('click');
  };

  defineOptions({
    name: 'VIcon'
  });
</script>
