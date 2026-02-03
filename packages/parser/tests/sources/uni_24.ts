export const uni_24 = `
<template>
  <view :class="page1.class" :title="page()">
  </view>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'LaunchPage',
    setup(props) {
      const provider = useProvider({ id: '1bfetlhc', version: '1767512044679' });
      const state = reactive({});
      return { state, props, provider };
    },
    computed: {
    page1() {
    return 'page1'
    }
    },
    methods: {
      click_58o4z7x6() {
        uni.navigateTo({
          url: '/pages/3e1fldxr'
        });
      },
      page() {
       console.log('this.page1','/uni/page1',[page1]);
        return page1.class}
    }
  })
</script>
<style lang="css" scoped>

</style>

`;
