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
      nodes: [
        {
          name: 'input',
          props: {
            name: 'text'
          },
          directives: [
            {
              name: 'vModel',
              value: {
                type: 'JSExpression',
                value: 'this.state.text'
              }
            }
          ]
        },
        {
          name: 'div',
          children: {
            type: 'JSExpression',
            value: 'this.state.text'
          }
        }
      ],
      state: {
        text: {
          type: 'JSExpression',
          value: '2'
        }
      },
      lifeCycles: {
        mounted: {
          type: 'JSFunction',
          value: `()=>{
              console.log(this.$refs.div)
             setTimeout(()=>{
               console.log(this.$refs.div)
             }, 0)
            
            }`
        }
      }
    }
  });
</script>
