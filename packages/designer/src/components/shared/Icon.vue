<template>
  <ElTooltip effect="dark" placement="right" :content="label" :show-after="600">
    <div
      v-bind="$attrs"
      class="v-apps-region__icon"
      :class="classes"
      @click="handleClick">
      <ElBadge :is-dot="isDot">
        <component :is="icon"></component>
      </ElBadge>
    </div>
  </ElTooltip>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElTooltip, ElBadge } from 'element-plus';
  import type { VueComponent } from '../../framework';

  export interface Props {
    icon?: VueComponent;
    label?: string;
    active?: boolean;
    open?: boolean;
    isDot?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    active: false,
    open: false,
    isDot: false
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
