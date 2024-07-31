<template>
  <div class="icons-page">
    <h1>内置图标</h1>
    <div class="icons">
      <div class="icon" v-for="(icon, name) of icons">
        <XIcon :icon="icon" :size="30"></XIcon>
        <span> {{ name }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { icons } from '@vtj/icons';
  import { XIcon } from '@vtj/ui';
</script>

<style lang="scss" scoped>
  .icons-page {
    padding: 20px;
    h1 {
      letter-spacing: -0.02em;
      line-height: 40px;
      font-size: 32px;
    }
  }

  .icons {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
  }
  .icon {
    width: calc(10% - 10px);
    min-width: 120px;
    height: 100px;
    border: 1px dotted var(--vp-c-default-3);
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border-radius: 4px;
    flex-wrap: 1;

    span {
      font-size: 12px;
      margin-top: 10px;
    }
  }
</style>
