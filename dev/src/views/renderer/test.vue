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
          name: 'div',
          children: 'ABC',
          props: {
            ref: 'div'
          }
        }
      ],
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
