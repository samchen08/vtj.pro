<template>
  <div>
    <config-table title="加密解密例子" :list="list"></config-table>
  </div>
</template>

<script setup lang="ts">
  import { MD5, base64, unBase64, RSA, unRSA, AES, unAES } from '@vtj/utils';
  import ConfigTable from '$/components/configTable.vue';

  const RSAVal: string = RSA('abc') as string;

  const AESVal = AES('abc', 'a');
  const val = unAES(AESVal, 'a');

  const list: any[] = [
    { name: 'MD5', example: "MD5('Abc')", return: MD5('Abc') },
    { name: 'base64', example: "base64('Abc')", return: base64('Abc') },
    {
      name: 'unBase64',
      example: "unBase64(base64('Abc'))",
      return: unBase64(base64('Abc'))
    },
    {
      name: 'RSA',
      example: "RSA('abc')",
      return: RSA('abc')
    },
    {
      name: 'unRSA',
      example: "unRSA(RSA('abc'))",
      return: unRSA(RSAVal)
    },
    {
      name: 'AES',
      example: " AES('abc', 'aaa') ",
      return: AES('abc', 'aaa')
    },
    {
      name: 'unAES',
      example: "unAES(AES('abc', 'a'), 'a')",
      return: val
    }
  ];
</script>
