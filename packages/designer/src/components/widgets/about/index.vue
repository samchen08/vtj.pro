<template>
  <div class="v-about-widget">
    <div class="v-about-widget__item">
      <div class="v-about-widget__logo">
        <ElBadge :value="latest" title="最新版本" :hidden="latest === version"
          ><img :src="logo"
        /></ElBadge>
      </div>
      <div class="v-about-widget__name">VTJ.PRO</div>
      <div class="v-about-widget__version">
        版本：
        <span>{{ version }}</span>
      </div>
    </div>
    <ElDivider direction="vertical"></ElDivider>
    <div class="v-about-widget__item">
      <div class="v-about-widget__logo">
        <ElAvatar
          :size="80"
          :icon="UserFilled"
          :src="avatarSrc"
          class="v-about-widget__avatar"></ElAvatar>
      </div>
      <div class="v-about-widget__name">{{ username }}</div>
      <div class="v-about-widget__version">
        <ElButton v-if="isLogined" size="small" @click="logout">
          退出登录
        </ElButton>
        <ElButton v-else size="small" @click="props.toRemoteAuth">
          登录
        </ElButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElDivider, ElAvatar, ElButton, ElBadge } from 'element-plus';
  import { UserFilled } from '@vtj/icons';
  import logo from '../../../assets/logo.png';
  import { version } from '../../../version';
  import { useCheckVersion } from '../../hooks';

  export interface Props {
    engine: any;
    isLogined: any;
    toRemoteAuth: any;
  }
  const props = defineProps<Props>();
  const engine = props.engine;
  const { access } = engine.adapter || {};
  const { latest } = useCheckVersion();
  const avatarSrc = computed(() => {
    const avatar = access?.getData()?.avatar || '';
    const remote = engine.adapter?.remote || '';
    return avatar
      ? avatar.startsWith('https:')
        ? avatar
        : `${remote}/api/oss/file/${avatar}`
      : null;
  });

  const username = computed(() => {
    return access?.getData()?.name || '未登录';
  });

  const isLogined = computed(() => {
    return access?.isLogined();
  });

  const logout = () => {
    access?.clear();
    location.reload();
  };

  defineOptions({
    name: 'AboutWidget'
  });
</script>
