<template>
  <div class="loading">正在登录中...</div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { jsonp } from '@vtj/utils';
  import { ElMessageBox } from 'element-plus';
  import { LocalService, Extension, createAccess } from '../../src';
  // import { ACCESS_STORAGE_KEY } from '../contants';
  const route = useRoute();
  const service = new LocalService();
  const config = await service.getExtension().catch(() => null);
  const { adapters } = config ? await new Extension(config).load() : {};
  // const { __BASE_PATH__ = '/' } = config || {};
  // const accessOptions = adapters?.access;
  const remote = adapters?.remote;
  const access = createAccess({});

  const getLoginInfo = async (token: string) => {
    const api = `${remote}/api/open/user/${token}`;
    const res = await jsonp(api).catch(() => null);
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
      access?.login(info);
      const redirect = route.query.redirect as string;
      location.href = decodeURIComponent(redirect || '/');
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
