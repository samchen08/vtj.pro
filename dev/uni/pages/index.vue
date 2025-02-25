<template>
  <div ref="uniRef">UniApp</div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { setupUniApp, View } from '@vtj/uni';
  import { createRenderer, type BlockSchema } from '@vtj/pro';
  import UniRoot from '../components/UniRoot.vue';
  import UniPage from '../components/UniPage.vue';

  const dsl: BlockSchema = {
    name: 'UniPageDemo',
    nodes: [
      {
        name: 'View',
        children: 'ViewText'
      }
    ],
    lifeCycles: {
      onLoad: {
        type: 'JSFunction',
        value: `
      (opt)=>{
      console.log('onLoad app',opt)
      }
        `
      },
      onShow: {
        type: 'JSFunction',
        value: `
      ()=>{
      console.log('onShow app')
      }
        `
      }
    }
  };

  const { renderer } = createRenderer({ dsl, components: { View } });

  const uniRef = ref();

  const app = setupUniApp({
    App: UniRoot,
    routes: [
      {
        path: '/',
        component: UniPage
      },
      {
        path: '/pages/1',
        component: renderer
      }
    ]
  });

  onMounted(() => {
    app.mount(uniRef.value);
  });

  console.log('uniapp', app);
</script>
