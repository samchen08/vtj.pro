<template>
  <view>
    <XIcon name="color" />
    <XIcon :name="VtjIconApi" color="red" :size="18" />
    <XIcon :src="IconAccessdeclined" />
  </view>
</template>
<script lang="ts" setup>
  import { XIcon, VtjIconApi } from '@/mui';
  import { IconAccessdeclined } from '@vtj/icons';
</script>
