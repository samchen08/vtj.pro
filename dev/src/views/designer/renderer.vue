<template>
  <div>
    <component :is="renderer" title="456" subtitle="subtitle"></component>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { createRenderer, type BlockSchema } from '@vtj/pro';

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
        name: 'div',
        children: {
          type: 'JSExpression',
          value: '`title:${this.$props.title}`'
        }
      }
    ]
  });

  const { renderer } = createRenderer({ dsl });

  console.log(renderer);

  setTimeout(() => {
    // dsl.nodes[0].children.value = '"abc"';
  }, 1000);
</script>
