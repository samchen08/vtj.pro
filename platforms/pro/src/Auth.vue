<template>
  <div class="loading">正在登录中...</div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { createAccess, ACCESS, REMOTE, alert } from '@vtj/pro';
  import { jsonp } from '@vtj/utils';

  export interface Props {
    remote?: string;
    access?: Record<string, any>;
    baseUrl?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    baseUrl: '/'
  });

  const access = createAccess({
    alert,
    ...ACCESS,
    ...props.access
  });

  const route = useRoute();
  const getLoginInfo = async (token: string) => {
    const api = `${props.remote || REMOTE}/api/open/user/${token}`;
    const res = await jsonp(api).catch(() => null);
    if (!res || !res.success) {
      await alert('登录失败');
      return null;
    } else {
      return res.data;
    }
  };

  const token = route.query.token as string;
  const info = token ? await getLoginInfo(token) : null;
  if (info) {
    try {
      access.login(info);
      const redirect = route.query.redirect as string;
      location.href = decodeURIComponent(redirect || props.baseUrl);
    } catch (e) {
      location.reload();
    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    padding: 40px;
  }
</style>
