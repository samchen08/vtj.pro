<template>
  <ElPopover
    :width="200"
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
  import { UserFilled } from '@element-plus/icons-vue';

  export interface Props {
    avatar?: string;
  }

  const props = defineProps<Props>();
</script>
