<template>
  <div class="page">
    <XContainer
      tag="div"
      :flex="true"
      direction="column"
      :gap="true"
      :grow="true"
      :padding="true"
      :autoPointer="true">
      <XContainer tag="h1" class="el yellow">这是个h1 标签</XContainer>
      <XContainer tag="span" class="el salmon" alignSelf="flex-end"
        >这是个 span 标签</XContainer
      >
      <XContainer
        tag="p"
        class="el violet"
        width="300px"
        height="50px"
        :autoPointer="true"
        @click="onClick"
        >这是个 p 标签</XContainer
      >
    </XContainer>
  </div>
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';

  const onClick = () => {};
</script>

<style scoped>
  .yellow {
    background-color: yellowgreen;
  }
  .salmon {
    background-color: salmon;
  }

  .violet {
    background-color: violet;
  }
</style>
