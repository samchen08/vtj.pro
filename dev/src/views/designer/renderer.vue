<template>
  <div>
    <component :is="renderer"></component>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { createRenderer, type BlockSchema } from '@vtj/pro';
  import { XAction } from '@vtj/web';

  const dsl: BlockSchema = reactive({
    name: 'Test',
    props: [
      {
        name: 'title',
        type: ['String', 'Number'],
        default: {
          type: 'JSExpression',
          value: '123'
        }
      }
    ],
    nodes: [
      {
        name: 'XAction',
        props: {
          label: 'ABC'
        }
      }
    ]
  });

  const { renderer } = createRenderer({ dsl, components: { XAction } });

  console.log(renderer);

  setTimeout(() => {
    // dsl.nodes[0].children.value = '"abc"';
  }, 1000);
</script>
