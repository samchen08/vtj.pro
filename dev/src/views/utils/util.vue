<template>
  <div>util</div>
</template>
<script lang="ts" setup>
  import { dedupArray, arrayToKv, kvToArray } from '@vtj/web';

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

  console.log('arrayToKv', arrayToKv(array, 'name', 'id'));

  console.log('kvToArray', kvToArray(arrayToKv(array, 'name', 'id')));
</script>
