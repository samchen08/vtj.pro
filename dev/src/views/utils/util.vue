<template>
  <div>util</div>
</template>
<script lang="ts" setup>
  import { dedupArray, arrayToKv, kvToArray, uid } from '@vtj/web';

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

  const results = [];
  for (let i = 0; i < 100; i++) {
    results.push(uid());
  }

  // 找出数组中重复的元素
  const findRepeat = (arr: any[]) => {
    const map = new Map();
    const result = [];
    for (const item of arr) {
      if (map.has(item)) {
        result.push(item);
      } else {
        map.set(item, 1);
      }
    }
    return result;
  };

  console.log('results', results);

  console.log('findRepeat', findRepeat(results));
</script>
