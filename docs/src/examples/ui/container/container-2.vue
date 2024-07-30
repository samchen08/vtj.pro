<template>
  <XContainer
    class="XContainer"
    tag="span"
    width="200px"
    height="100px"
    overflow="hidden"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
    accusantium aliquam porro, totam, iste temporibus error in praesentium
    aperiam rerum quo perspiciatis sapiente labore laudantium dolore, tenetur
    minus quidem quasi.</XContainer
  >
</template>
<script lang="ts" setup>
  import { XContainer } from '@vtj/ui';
</script>

<style scoped>
  .XContainer {
    background-color: seagreen;
    color: white;
  }
</style>
