<template>
  <div class="v-empty-region">找不到符合【{{ region }}】名称的区域组件</div>
</template>
<script lang="ts" setup>
  export interface Props {
    region: string;
  }

  defineProps<Props>();

  defineOptions({
    name: 'EmptyRegion'
  });
</script>
