<template>
  <ElAvatar
    v-if="showUserAvatar"
    class="v-user-avatar"
    :size="30"
    :icon="UserFilled"
    :src="avatarSrc"></ElAvatar>
  <XIcon v-else :icon="VtjIconInfo" :size="20"></XIcon>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElAvatar } from 'element-plus';
  import { UserFilled, VtjIconInfo } from '@vtj/icons';
  import { XIcon } from '@vtj/ui';
  import { useEngine } from '../../../framework';
  const engine = useEngine();
  const { access } = engine || {};

  const avatarSrc = computed(() => {
    const avatar = access?.getData()?.avatar || '';
    const remote = engine.remote || '';
    return avatar
      ? avatar.startsWith('https:')
        ? avatar
        : `${remote}/api/oss/file/${avatar}`
      : null;
  });

  const showUserAvatar = computed(() => {
    // 设置了auth，不显示头像
    return !!engine.remote && !engine.options.auth;
  });
</script>

<style lang="scss" scoped>
  .v-user-avatar {
    box-shadow: 0 0 3px var(--el-border-color);
    margin-left: -4px;
    border: 1px solid var(--el-border-color);
  }
</style>
