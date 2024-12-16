<template>
  <div class="x-coder-result">
    <div>已生成源码项目，可通过以下链接下载（两小时内有效）。</div>
    <div>
      <a :href="link" target="_blank">
        {{ link }}
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
  export interface Props {
    link?: string;
  }

  defineProps<Props>();
</script>
