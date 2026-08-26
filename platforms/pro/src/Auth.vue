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
    const remote = props.remote || REMOTE;
    let useLegacy = false;
    const res = await fetch(`${remote}/api/open/session/${token}`, {
      method: 'post',
      credentials: 'include'
    })
      .then((response) => {
        useLegacy = response.status === 404 || response.status === 405;
        return response.json();
      })
      .catch(() => {
        useLegacy = true;
        return null;
      });
    if (res?.success) {
      return res.data;
    }
    if (!useLegacy) return null;
    const legacy = await jsonp(`${remote}/api/open/user/${token}`).catch(
      () => null
    );
    if (Array.isArray(legacy)) return legacy;
    if (legacy?.data) return legacy.data;
    return null;
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
  } else {
    await alert('登录失败');
    const redirect = route.query.redirect as string;
    location.href = decodeURIComponent(redirect || props.baseUrl);
  }
</script>

<style lang="scss" scoped>
  .loading {
    padding: 40px;
  }
</style>
