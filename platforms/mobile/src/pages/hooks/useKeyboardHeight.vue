<template>
  <view>
    <text>Keyboard height: {{ height }}</text>
    <view>
      <input />
    </view>
  </view>
</template>
<script lang="ts" setup>
  import { useKeyboardHeight } from '@/mui';
  const height = useKeyboardHeight();
</script>
