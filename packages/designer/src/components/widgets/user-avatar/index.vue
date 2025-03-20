<template>
  <ElAvatar
    class="v-user-avatar"
    :size="30"
    :icon="UserFilled"
    :src="avatarSrc"></ElAvatar>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElAvatar } from 'element-plus';
  import { UserFilled } from '@vtj/icons';
  import { useEngine } from '../../../framework';
  import { useCheckVersion } from '../../hooks';
  import { notify } from '../../../utils';

  const engine = useEngine();
  const { access } = engine || {};

  useCheckVersion((version) => {
    notify(
      `VTJ 发布了版本 ${version}，您可以通过重新安装依赖更新到最新版本`,
      '版本更新'
    );
  });

  const avatarSrc = computed(() => {
    const avatar = access?.getData()?.avatar || '';
    const remote = engine.adapter?.remote || '';
    return avatar
      ? avatar.startsWith('https:')
        ? avatar
        : `${remote}/api/oss/file/${avatar}`
      : null;
  });
</script>

<style lang="scss" scoped>
  .v-user-avatar {
    box-shadow: 0 0 3px var(--el-border-color);
    margin-left: -4px;
    border: 1px solid var(--el-border-color);
  }
</style>
