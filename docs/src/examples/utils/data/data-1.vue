<template>
  <div>
    <config-table title="数据转换例子" :list="list"></config-table>
  </div>
</template>

<script setup lang="ts">
  import {
    arrayToMap,
    mapToObject,
    arrayToKv,
    kvToArray,
    dedupArray,
    toArray,
    zipObject,
    omit,
    pick,
    trim,
    sum,
    avg,
    splitParser,
    splitStringify
  } from '@vtj/utils';

  import ConfigTable from '$/components/configTable.vue';

  const list = [
    {
      name: 'arrayToMap',
      example: "arrayToMap([{ a: 'aa' }], 'a')",
      return: arrayToMap([{ a: 'aa' }], 'a')
    },
    {
      name: 'mapToObject',
      example: "mapToObject(new Map().set('a', 1).set('b', 2))",
      return: mapToObject(new Map().set('a', 1).set('b', 2))
    },
    {
      name: 'arrayToKv',
      example:
        'arrayToKv([ { "key": "a", "value": "a" }, { "key": "b", "value": "b" } ])',
      return: arrayToKv([
        { key: 'a', value: 'a' },
        { key: 'b', value: 'b' }
      ])
    },
    {
      name: 'arrayToKv',
      example:
        'arrayToKv([ { "id": "a", "name": "a" }, { "id": "b", "name": "b" } ], "id","name")',
      return: arrayToKv(
        [
          { id: 'a', name: 'a' },
          { id: 'b', name: 'b' }
        ],
        'id',
        'name'
      )
    },
    {
      name: 'kvToArray',
      example: "kvToArray({ a: 'a', b: 'b' })",
      return: kvToArray({ a: 'a', b: 'b' })
    },
    {
      name: 'kvToArray',
      example: "kvToArray({ a: 'a', b: 'b' }, 'id', 'name')",
      return: kvToArray({ a: 'a', b: 'b' }, 'id', 'name')
    },
    {
      name: 'dedupArray',
      example: "dedupArray([1, false, 'aa', 3, 3,undefined, null, {}, []])",
      return: dedupArray([1, false, 'aa', 3, 3, undefined, null, {}, []])
    },
    {
      name: 'toArray',
      example: "toArray({ a: 1, b: '2' })",
      return: toArray({ a: 1, b: '2' })
    },
    {
      name: 'zipObject',
      example: "zipObject({ a: 1, b: '2',c:null,d:undefined })",
      return: zipObject({ a: 1, b: '2', c: null, d: undefined })
    },
    {
      name: 'omit',
      example: "omit({ a: 'a', b: 'b' }, ['a'])",
      return: omit({ a: 'a', b: 'b' }, ['a'])
    },
    {
      name: 'pick',
      example: "pick({ a: 'a', b: 'b' }, ['a'])",
      return: pick({ a: 'a', b: 'b' }, ['a'])
    },
    {
      name: 'trim',
      example: "trim([' a ', '1       ', ' 1 '])",
      return: trim([' a ', '1               ', ' 1 '])
    },
    {
      name: 'sum',
      example: "sum([{ age: 11 }, { age: 22 }], 'age')",
      return: sum([{ age: 11 }, { age: 22 }], 'age')
    },
    {
      name: 'avg',
      example: "avg([{ age: 11 }, { age: 22 }], 'age')",
      return: avg([{ age: 11 }, { age: 22 }], 'age')
    },
    {
      name: 'splitParser',
      example: "splitParser('1,2,3,4')",
      return: splitParser('1,2,3,4')
    },
    {
      name: 'splitParser',
      example: "splitParser('1-2-3-4')",
      return: splitParser('1-2-3-4')
    },
    {
      name: 'splitParser',
      example: "splitParser('1-2-3-4', '-')",
      return: splitParser('1-2-3-4', '-')
    },
    {
      name: 'splitStringify',
      example: "splitStringify(['1', '2', '3', '4'], '-')",
      return: splitStringify(['1', '2', '3', '4'], '-')
    }
  ];
</script>

<style scoped>
  table {
    border-collapse: collapse;
    border: 2px solid rgb(140 140 140);
    font-family: sans-serif;
    letter-spacing: 1px;
    font-size: 14px;
  }

  caption {
    caption-side: top;
    padding: 10px;
    font-weight: bold;
    font-size: 22px;
  }

  thead,
  tfoot {
    background-color: rgb(228 240 245);
  }

  th {
    border: 1px solid rgb(160 160 160);
    padding: 4px;
  }
  td {
    border: 1px solid rgb(160 160 160);
    padding: 4px;
  }

  td:last-of-type {
    text-align: center;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .code {
    letter-spacing: 1px;
    font-size: 16px;
    font-style: italic;
  }
</style>
