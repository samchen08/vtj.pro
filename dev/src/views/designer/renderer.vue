<template>
  <div>
    <component :is="renderer"></component>
    <div v-pin:[arg].modifiers="true">abc</div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  import {
    createRenderer,
    type BlockSchema,
    type NodeDirective
  } from '@vtj/pro';
  import { XAction } from '@vtj/web';
  const vPin = {
    mounted(el: any, binding: any) {
      el.innerHTML = JSON.stringify(binding);
    },
    updated() {
      /* ... */
    }
  };

  const arg = ref('top');

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
        },
        directives: [
          {
            name: 'vIf',
            value: {
              type: 'JSExpression',
              value: 'true'
            }
          },
          {
            name: 'loading',
            value: {
              type: 'JSExpression',
              value: 'true'
            }
          }
        ] as NodeDirective[]
      },
      {
        name: 'div',
        children: 'Div Content',
        directives: [
          {
            name: 'vHtml',
            value: {
              type: 'JSExpression',
              value: '"<h1>aaa</h1>"'
            }
          }
        ] as NodeDirective[]
      }
    ]
  });

  const { renderer } = createRenderer({ dsl, components: { XAction } });

  console.log(renderer);

  setTimeout(() => {
    // dsl.nodes[0].children.value = '"abc"';
  }, 1000);
</script>
