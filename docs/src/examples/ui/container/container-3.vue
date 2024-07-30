<template>
  <div class="page">
    <XContainer>
      <div class="divEl yellow">1</div>
      <div class="divEl salmon">2</div>
      <div class="divEl violet">3</div>
    </XContainer>

    <XContainer wrap="wrap">
      <XContainer class="divEl w-50 yellow">1</XContainer>
      <XContainer class="divEl w-50 salmon">2</XContainer>
      <XContainer class="divEl w-50 violet">3</XContainer>
    </XContainer>

    <XContainer :flex="true" direction="column">
      <XContainer class="divEl w-24 yellow">1</XContainer>
      <XContainer class="divEl w-24 salmon">2</XContainer>
      <XContainer class="divEl w-24 violet">3</XContainer>
    </XContainer>

    <XContainer
      :flex="true"
      direction="column"
      justify="center"
      align="flex-end"
      :gap="true">
      <XContainer class="divEl w-24 yellow">1</XContainer>
      <XContainer class="divEl w-24 salmon">2</XContainer>
      <XContainer class="divEl w-24 violet">3</XContainer>
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
    width: 500px;
  }

  .w-50 {
    width: 40%;
  }
</style>
