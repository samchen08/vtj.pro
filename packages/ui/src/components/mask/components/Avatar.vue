<template>
  <ElPopover
    :width="props.width"
    popper-class="x-mask-avatar__popper"
    :disabled="!$slots.default">
    <template #reference>
      <ElAvatar
        class="x-mask-avatar"
        shape="circle"
        :icon="UserFilled"
        :src="props.avatar"
        :size="26"></ElAvatar>
    </template>
    <slot v-if="!!$slots.default"></slot>
  </ElPopover>
</template>
<script lang="ts" setup>
  import { ElAvatar, ElPopover } from 'element-plus';
  import { UserFilled } from '@vtj/icons';

  export interface Props {
    avatar?: string;
    width?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 350
  });
</script>
