<template>
  <XAction label="操作按钮"> </XAction>
  <XAction :icon="VtjIconBug" label="操作按钮" type="success"> </XAction>
  <XAction :icon="VtjIconBug" label="操作按钮" :disabled="true"> </XAction>
  <XAction mode="icon" :icon="VtjIconBug" size="large"></XAction>
  <XAction mode="icon" :icon="VtjIconBug" size="default"></XAction>
  <XAction mode="icon" :icon="VtjIconBug" size="small"></XAction>
  <XAction mode="icon" :icon="VtjIconBug" type="primary"></XAction>
  <XAction mode="icon" :icon="VtjIconBug" type="success"></XAction>
  <XAction mode="icon" :icon="VtjIconBug" type="info"></XAction>
  <XAction mode="icon" :icon="VtjIconBug" type="danger"></XAction>
</template>

<script setup lang="ts">
  import { XAction } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/icons';
</script>
