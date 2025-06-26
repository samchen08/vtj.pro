export const test_17 = `
<template>
      <div 
        @click="switchTab('home')"
      >
      </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Slogan',
    setup(props) {
      const provider = useProvider({ id: '14gkh0i4', version: '1745369911162' });
      const state = reactive({
        show: false
      });
      return { state, props, provider };
    },
    methods: {
      switchTab(name) {
        console.log(name)
      }
    }
  })
</script>
`;
