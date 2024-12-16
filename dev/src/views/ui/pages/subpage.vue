<template>
  <div>
    <h3>Subpage</h3>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { defineTab } from '@vtj/ui';

  export default defineComponent({
    setup() {
      const { tab, mask } = defineTab({
        title: '二级页面' + Math.random()
      });

      console.log('defineTab', tab, mask);
    }
  });
</script>
