<template>
  <div>
    <config-table title="字符串转换例子" :list="list"></config-table>
  </div>
</template>

<script setup lang="ts">
  import {
    noop,
    upperFirst,
    camelCase,
    get,
    set,
    cloneDeep,
    merge,
    debounce,
    throttle,
    template,
    lowerFirst,
    kebabCase,
    snakeCase
  } from '@vtj/utils';

  import ConfigTable from '$/components/configTable.vue';

  const list = [
    {
      name: 'lowerFirst',
      example: 'lowerFirst("First")',
      return: lowerFirst('First')
    },
    {
      name: 'upperFirst',
      example: 'upperFirst("abc")',
      return: upperFirst('abc')
    },
    {
      name: 'camelCase',
      example: "camelCase('Foo Bar')",
      return: camelCase('Foo Bar')
    },
    {
      name: 'kebabCase',
      example: "kebabCase('fooBar')",
      return: kebabCase('fooBar')
    },
    {
      name: 'snakeCase',
      example: "snakeCase('Foo Bar')",
      return: snakeCase('Foo Bar')
    },
    {
      name: 'noop',
      example: 'noop()',
      return: 'undefined'
    },
    {
      name: 'get',
      example: "get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c')",
      return: get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c')
    },
    {
      name: 'set',
      example: "set({ 'a': {b:'bb'} }, 'a.b', 'ccc')",
      return: set({ a: { b: 'bb' } }, 'a.b', 'ccc')
    },
    {
      name: 'merge',
      example: 'merge({a: [{ b: 2 }, { d: 4 }},{a: [{ c: 3 }, { e: 5 }]})',
      return: merge(
        {
          a: [{ b: 2 }, { d: 4 }]
        },
        {
          a: [{ c: 3 }, { e: 5 }]
        }
      )
    },
    {
      name: 'cloneDeep',
      example: " cloneDeep({ a: 'aa' })",
      return: cloneDeep({ a: 'aa' })
    },
    {
      name: 'debounce',
      example: ' debounce(() => {}, 1000)',
      return: () => {}
    },
    {
      name: 'throttle',
      example: ' throttle(() => {}, 1000)',
      return: () => {}
    },
    {
      name: 'template',
      example: "template('hello')()",
      return: template('hello')()
    }
  ];
</script>
