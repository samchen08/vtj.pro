<template>
  <div>util</div>
</template>
<script lang="ts" setup>
  import { dedupArray } from '@vtj/utils';

  const array = [
    {
      id: 1,
      name: 'a'
    },
    {
      id: 2,
      name: 'b'
    },
    {
      id: 2,
      name: 'd'
    },
    {
      id: 3,
      name: 'c'
    }
  ];

  console.log('dedupArray(array)', dedupArray(array, 'id'));
</script>
