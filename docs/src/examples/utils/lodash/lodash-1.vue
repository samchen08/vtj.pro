<template>
  <config-table title="数据类型校验例子" :list="list"></config-table>
</template>

<script setup lang="ts">
  import {
    isString,
    isFunction,
    isArray,
    isObject,
    isBoolean,
    isBuffer,
    isArrayBuffer,
    isDate,
    isUndefined,
    isNaN,
    isNull,
    isNumber,
    isSymbol,
    isPlainObject,
    isEqual
  } from '@vtj/utils';

  import ConfigTable from '$/components/configTable.vue';

  const list = [
    {
      rowspan: 2,
      name: 'isString',
      example: 'isString(111)',
      return: isString(111)
    },
    {
      example: "isString('abc')",
      return: isString('abc')
    },
    {
      rowspan: 2,
      name: 'isFunction',
      example: "isFunction('abc')",
      return: isFunction('abc')
    },
    {
      example: 'isFunction(()=>{})',
      return: isFunction(() => {})
    },
    {
      rowspan: 2,
      name: 'isArray',
      example: "isArray('abc')",
      return: isArray('abc')
    },
    {
      example: 'isArray([])',
      return: isArray([])
    },
    {
      rowspan: 2,
      name: 'isObject',
      example: "isObject('abc')",
      return: isObject('abc')
    },
    {
      example: 'isObject({})',
      return: isObject({})
    },
    {
      rowspan: 2,
      name: 'isBoolean',
      example: "isBoolean('abc')",
      return: isBoolean('abc')
    },
    {
      example: 'isBoolean(false)',
      return: isBoolean(false)
    },
    {
      rowspan: 2,
      name: 'isBoolean',
      example: "isBoolean('abc')",
      return: isBoolean('abc')
    },
    {
      example: 'isBoolean(false)',
      return: isBoolean(false)
    },
    {
      name: 'isBuffer',
      example: 'isBuffer(new Uint8Array(2))',
      return: isBuffer(new Uint8Array(2))
    },
    // {
    //   example: 'isBuffer(new Buffer(2))',
    //   return: isBuffer(new Buffer(2))
    // },
    // {
    //   rowspan: 2,
    //   name: 'isArrayBuffer',
    //   example: 'isArrayBuffer(new Array(2))',
    //   return: isArrayBuffer(new Array(2))
    // },
    {
      name: 'isArrayBuffer',
      example: 'isArrayBuffer(new ArrayBuffer(2))',
      return: isArrayBuffer(new ArrayBuffer(2))
    },
    {
      rowspan: 2,
      name: 'isDate',
      example: "isDate('Mon April 23 2012')",
      return: isDate('Mon April 23 2012')
    },
    {
      example: 'isDate(new Date())',
      return: isDate(new Date())
    },
    {
      rowspan: 2,
      name: 'isUndefined',
      example: 'isUndefined(null)',
      return: isUndefined(null)
    },
    {
      example: 'isUndefined(void 0)',
      return: isUndefined(void 0)
    },
    {
      rowspan: 2,
      name: 'isNaN',
      example: 'isNaN(111)',
      return: isNaN(111)
    },
    {
      example: 'isNaN(new Number(NaN))',
      return: isNaN(new Number(NaN))
    },
    {
      rowspan: 2,
      name: 'isNull',
      example: 'isNull({})',
      return: isNull({})
    },
    {
      example: 'isNull(null)',
      return: isNull(null)
    },
    {
      rowspan: 2,
      name: 'isNumber',
      example: 'isNumber("111")',
      return: isNumber('111')
    },
    {
      example: 'isNumber(222)',
      return: isNumber(333)
    },
    {
      rowspan: 2,
      name: 'isSymbol',
      example: 'isSymbol("111")',
      return: isSymbol('111')
    },
    {
      example: 'isSymbol(Symbol())',
      return: isSymbol(Symbol())
    },
    {
      rowspan: 2,
      name: 'isPlainObject',
      example: 'isPlainObject("111")',
      return: isPlainObject('111')
    },
    {
      example: 'isPlainObject({ x: 0, y: 0 })',
      return: isPlainObject({ x: 0, y: 0 })
    },
    {
      rowspan: 2,
      name: 'isEqual',
      example: 'isEqual(11, 22)',
      return: isEqual(11, 22)
    },
    {
      example: "isEqual({ a:'a' },{a:'a'})",
      return: isEqual({ a: 'a' }, { a: 'a' })
    }
  ];
</script>
