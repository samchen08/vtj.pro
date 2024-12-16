<template>
  <div class="page">
    <XContainer>
      <XContainer class="divEl w-24 yellow">1</XContainer>
      <XContainer class="divEl w-24 salmon">2</XContainer>
    </XContainer>

    <XContainer>
      <XContainer class="divEl w-24 yellow">正常</XContainer>
      <XContainer class="divEl w-24 salmon" :grow="true">放大</XContainer>
    </XContainer>

    <XContainer width="300px">
      <XContainer class="divEl w-24 yellow">正常</XContainer>
      <XContainer class="divEl w-24 salmon" :shrink="true">缩小</XContainer>
    </XContainer>
  </div>
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .divEl {
    width: 100%;
    height: 30px;
    background: #000;
  }

  .yellow {
    background-color: yellowgreen;
  }
  .salmon {
    background-color: salmon;
  }

  .violet {
    background-color: violet;
  }

  .w-24 {
    width: 200px;
  }
</style>
