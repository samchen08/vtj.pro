<template>
  <div>data</div>
</template>
<script lang="ts" setup>
  import { arrayToTree } from '@vtj/utils';

  const tree = arrayToTree([
    { id: 1, name: 'a', parentId: null },
    { id: 2, name: 'a-1', parentId: 1 },
    { id: 3, name: 'b', parentId: null },
    { id: 4, name: 'b-1', parentId: 3 },
    { id: 5, name: 'a-1-1', parentId: 2 }
  ]);

  console.log(tree);
</script>
