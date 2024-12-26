<template>
  <div>
    <config-table title="正则表达式例子" :list="list"></config-table>
  </div>
</template>

<script setup lang="ts">
  import {
    isUrl,
    isEmail,
    isIdCardNo,
    isMobilePhone,
    isCarNo
  } from '@vtj/utils';

  import ConfigTable from '$/components/configTable.vue';

  const list = [
    {
      rowspan: 2,
      name: 'isUrl',
      example: "isUrl('https://www.baidu.com/')",
      return: isUrl('https://www.baidu.com/')
    },
    {
      example: "isUrl('www.baidu.com/')",
      return: isUrl('www.baidu.com/')
    },
    {
      rowspan: 2,
      name: 'isEmail',
      example: "isEmail('1111.com')",
      return: isEmail('1111.com')
    },
    {
      example: "isEmail('11@11.com')",
      return: isEmail('11@11.com')
    },
    {
      rowspan: 2,
      name: 'isIdCardNo',
      example: "isIdCardNo('110220300014253678')",
      return: isIdCardNo('110220300014253678')
    },
    {
      example: "isIdCardNo('19')",
      return: isIdCardNo('19')
    },
    {
      rowspan: 2,
      name: 'isMobilePhone',
      example: "isMobilePhone('18912345678')",
      return: isMobilePhone('18912345678')
    },
    {
      example: "isMobilePhone('1891234567')",
      return: isMobilePhone('1891234567')
    },
    {
      rowspan: 2,
      name: 'isCarNo',
      example: "isCarNo('粤999999')",
      return: isCarNo('粤999999')
    },
    {
      example: "isMobilePhone('粤A99999')",
      return: isMobilePhone('粤A99999')
    }
  ];
</script>
