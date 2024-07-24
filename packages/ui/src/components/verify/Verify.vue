<template>
  <div class="x-verify">
    <ElInput class="x-verify__input">
      <template #suffix>
        <span><strong>59</strong>s</span>
        <ElLink type="primary" :underline="false">获取验证码</ElLink>
      </template>
    </ElInput>
    <div class="x-verify__image">图片验证码</div>
  </div>
</template>
<script lang="ts" setup>
  import { ElInput, ElLink } from 'element-plus';
</script>
