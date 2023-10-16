<template>
  <ElCarousel height="300px" :style='{"width": "100%"}'>
    <ElCarouselItem v-for="(item, index) in 3" :style='{"width": "100%"}'>
      <component
        is="img"
        :style='{"width": "100%", "height": "300px"}'
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
      </component>
    </ElCarouselItem>
  </ElCarousel>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'MyBlock',

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    }
  });
</script>
<style lang="scss" scoped></style>
