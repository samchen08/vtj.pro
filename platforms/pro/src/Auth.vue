<template>
  <div class="loading">正在登录中...</div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { createAccess } from '@vtj/pro';
  import { ElMessageBox } from 'element-plus';
  import { jsonp } from '@vtj/utils';

  export interface Props {
    remote?: string;
    access?: Record<string, any>;
  }

  const props = withDefaults(defineProps<Props>(), {
    remote: 'https://lcdp.vtj.top',
    access: () => {
      return {
        auth: 'https://lcdp.vtj.top/auth.html',
        storageKey: 'RRO_IDE_ACCESS_STORAGE__',
        privateKey:
          'MIIBOgIBAAJBAKoIzmn1FYQ1YOhOBw9EhABxZ+PySAIaydI+zdhoKflrdgJ4A5E4/5gbQmRpk09hPWG8nvX7h+l/QLU8kXxAIBECAwEAAQJAAlgpxQY6sByLsXqzJcthC8LSGsLf2JEJkHwlnpwFqlEV8UCkoINpuZ2Wzl+aftURu5rIfAzRCQBvHmeOTW9/zQIhAO5ufWDmnSLyfAAsNo5JRNpVuLFCFodR8Xm+ulDlosR/AiEAtpAltyP9wmCABKG/v/hrtTr3mcvFNGCjoGa9bUAok28CIHbrVs9w1ijrBlvTsXYwJw46uP539uKRRT4ymZzlm9QjAiB+1KH/G9f9pEEL9rtaSOG7JF5D0JcOjlze4MGVFs+ZrQIhALKOUFBNr2zEsyJIjw2PlvEucdlG77UniszjXTROHSPd'
      };
    }
  });

  const access = createAccess({
    alert: ElMessageBox.alert,
    ...props.access
  });

  const route = useRoute();
  const getLoginInfo = async (token: string) => {
    const api = `${props.remote}/api/open/user/${token}`;
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
      access.login(info);
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
