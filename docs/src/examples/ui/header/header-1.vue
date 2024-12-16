<template>
  <div>
    <XHeader
      size="large"
      :icon="VtjIconBug"
      content="主标题文本"
      subtitle="我是副标题"
      more
      @click="onClick">
      <template #actions>
        <XAction
          :icon="VtjIconPlus"
          label="添加"
          mode="text"
          size="small"></XAction>
        <XAction
          :icon="VtjIconSetting"
          label="管理"
          mode="text"
          size="small"></XAction>
      </template>
    </XHeader>

    <XHeader :icon="VtjIconBug" content="主标题文本" subtitle="我是副标题" more>
      <template #actions>
        <XAction
          :icon="VtjIconPlus"
          label="添加"
          mode="text"
          size="small"></XAction>
        <XAction
          :icon="VtjIconSetting"
          label="管理"
          mode="text"
          size="small"></XAction>
      </template>
    </XHeader>

    <XHeader
      size="small"
      :icon="VtjIconBug"
      content="主标题文本"
      subtitle="我是副标题"
      border
      more
      @clickIcon="onClickIcon"
      @click="onClick">
      <template #actions>
        <XAction
          :icon="VtjIconPlus"
          mode="icon"
          size="small"
          background="hover"></XAction>
        <XAction
          :icon="VtjIconSetting"
          mode="icon"
          size="small"
          background="hover"></XAction>
      </template>
    </XHeader>
  </div>
</template>

<script setup lang="ts">
  import { XHeader, XAction } from '@vtj/ui';

  import { VtjIconBug, VtjIconPlus, VtjIconSetting } from '@vtj/icons';

  const onClick = () => {
    console.log('clicked!');
  };

  const onClickIcon = () => {
    console.log('onClickIcon!');
  };
</script>

<style scoped></style>
