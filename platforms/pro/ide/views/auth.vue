<template>
  <Auth v-if="remote" :remote="remote" :access="access"></Auth>
</template>
<script lang="ts" setup>
  import { LocalService, Auth } from '../../src';
  const service = new LocalService();
  const config = await service.getExtension().catch(() => null);

  const remote = config?.remote;
  const access = config?.__ACCESS__;
</script>
