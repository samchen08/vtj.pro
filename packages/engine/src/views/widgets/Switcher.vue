<template>
  <div class="vtj-switcher">
    <ElButton size="small" round @click="onClick">
      <i class="vtj-icon-back vtj-switcher__back"></i>
      <span>{{ project.name }}</span>
      <ElDivider v-if="currentTitle" direction="vertical"></ElDivider>
      <span v-if="currentTitle">{{ currentTitle }}</span>
    </ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElButton, ElDivider } from 'element-plus';
  import { useCore } from '../../hooks';

  const props = defineProps<{
    link?: string;
  }>();

  const { project } = useCore();
  const currentTitle = computed(() => project.current.value?.title);

  const onClick = () => {
    if (props.link) {
      location.href = props.link;
    }
  };
</script>
<style lang="scss">
  @use '../../style/vars' as *;

  .vtj-switcher {
    padding-left: 10px;
    color: $vtj-secondary-color;
    font-size: 14px;
    width: 340px;
    &__back {
      margin-right: 5px;
    }
  }
</style>
