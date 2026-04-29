<template>
  <div>
    <component :is="renderer"></component>
  </div>
</template>

<script lang="ts" setup>
  import { createRenderer } from '@vtj/renderer';

  const { renderer } = createRenderer({
    dsl: {
      id: '123',
      name: 'Test',
      state: {
        text: 'ABC',
        message: {
          type: 'JSExpression',
          value: '"ABC"'
        }
      },
      nodes: [
        {
          name: 'div',
          children: [
            {
              name: 'button',
              children: {
                type: 'JSExpression',
                value: '`按钮_${this.context.item}_${this.state.message}`'
              },
              events: {
                click: {
                  name: 'click',
                  handler: {
                    type: 'JSFunction',
                    value: 'this.state.message = "DDD"'
                  }
                }
              },
              directives: [
                {
                  name: 'vFor',
                  value: {
                    type: 'JSExpression',
                    value: '3'
                  }
                }
              ]
            }
          ]
        }
      ],
      methods: {
        say: {
          type: 'JSFunction',
          value: '(a, i, e)=>{ console.log(a,i, e)}'
        }
      }
    }
  });
</script>
