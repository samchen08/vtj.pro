export const uni_24 = `
<template>
  <view :class="page1.class" :title="page()">
  </view>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  import { axios } from '@vtj/utils';
  export default defineComponent({
    name: 'LaunchPage',
    setup(props) {
      const provider = useProvider({ id: '1bfetlhc', version: '1767512044679' });
      const state = reactive({
      title:'Title'
      });
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
       console.log('this.page1', this.page1)
}
    }
  })
</script>
<style lang="css" scoped>

</style>

`;
