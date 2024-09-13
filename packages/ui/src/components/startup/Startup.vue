<template>
  <div class="x-startup">
    <div class="x-startup__wrapper">
      <div class="x-startup__name">
        <span class="clip">{{ props.name }}</span>
      </div>
      <!-- <div class="x-startup__text">帮助中心</div> -->
      <div class="x-startup__tagline">
        {{ props.tagline }}
      </div>
      <div class="x-startup__actions">
        <ElButton
          type="primary"
          size="large"
          round
          :icon="EditPen"
          @click="onClick">
          {{ props.actionText }}
        </ElButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ElButton } from 'element-plus';
  import { EditPen } from '@vtj/icons';
  import { startupProps } from './types';
  const props = defineProps(startupProps);

  const onClick = () => {
    if (typeof window !== 'undefined') {
      const options = (window as any).__VTJ_LINK__ || {};
      let path = options.href || window.location.pathname + '__vtj__/#/';
      window.location.href = path;
    }
  };
</script>
