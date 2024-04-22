<template>
  <div class="x-sms-code-input">
    <ElInput class="x-sms-code-input__input">
      <template #suffix>
        <span><strong>59</strong>s</span>
        <ElLink type="primary" :underline="false">获取验证码</ElLink>
      </template>
    </ElInput>
    <div class="x-sms-code-input__image">图片验证码</div>
  </div>
</template>
<script lang="ts" setup>
  import { ElInput, ElLink } from 'element-plus';
</script>
