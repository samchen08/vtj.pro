import { expect, test } from 'vitest';
import { parseVue } from '../src';

const project = { apis: [], dependencies: [] } as any;

const cardSource = `
<template>
  <div v-for="(card, index) in cardList" :key="index">
    <VanIcon :name="card.user" size="24" color="#fff"></VanIcon>
  </div>
</template>
<script lang="ts" setup>
  // @ts-nocheck
  import { useProvider } from '@vtj/renderer';
  import { ref } from 'vue';
  import { Icon as VanIcon } from 'vant';

  const __provider = useProvider({ id: '1l2qoifa', version: '1781539187917' });

  const cardList = ref([{ icon: 'contact' }])
</script>
<style lang="css" scoped>
  /* 组件样式内容 */
</style>
`;

test('debug card.user', async () => {
  const result = await parseVue({
    project,
    id: '1l2qoifa',
    name: 'CardDemo',
    source: cardSource
  });

  console.log('NODES:', JSON.stringify(result.nodes, null, 2));
});
