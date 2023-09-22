<template>
  <XContainer class="box" fit direction="column">
    <XContainer class="inner" height="50px">header</XContainer>
    <XContainer grow>
      <XContainer>Inner Header</XContainer>
      <XContainer grow justify="center" align="center">Inner Body</XContainer>
      <XContainer>Inner Footer</XContainer>
    </XContainer>
    <XContainer class="inner" height="40px">footer</XContainer>
  </XContainer>
</template>

<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
</script>

<style lang="scss" scoped>
  .box {
    border: 1px solid #999;
  }
  .inner {
    background-color: #ddd;
  }
</style>
