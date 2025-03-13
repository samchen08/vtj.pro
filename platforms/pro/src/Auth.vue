<template>
  <div class="loading">正在登录中...</div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { createAdapter, type CreateAdapterOptions } from '@vtj/pro';
  import { ElMessageBox } from 'element-plus';

  export interface Props {
    options?: CreateAdapterOptions;
  }

  const props = defineProps<Props>();

  const _options = {
    ...props.options,
    access: {
      alert: ElMessageBox.alert,
      ...props.options?.access
    }
  };
  const route = useRoute();
  const adapter = createAdapter(_options);
  const getLoginInfo = async (token: string) => {
    const api = `${adapter.remote}/api/open/user/${token}`;
    const res = await adapter.jsonp(api).catch(() => null);
    if (!res || !res.success) {
      await ElMessageBox.alert('登录失败');
      return null;
    } else {
      return res.data;
    }
  };

  const token = route.query.token as string;
  const info = token ? await getLoginInfo(token) : null;
  if (info) {
    try {
      adapter.access?.login(info);
      const redirect = route.query.redirect as string;
      location.href = decodeURIComponent(redirect || '/');
    } catch (e) {
      location.reload();
    }
  }
</script>
