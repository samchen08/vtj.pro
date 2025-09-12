export const test_27 = `
<template>
  <div class="user-management-page">
  <XIcon
          :icon="item.expanded ? ChevronDown : ChevronRight"
          :size="16"
          :color="item.active ? '#ffffff' : '#aec1e0'"
        ></XIcon>
        <XIcon
          :icon="ChevronRight"
        ></XIcon>
  </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import {ChevronDown, ChevronRight} from '@vtj/icons'
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'UserPage',
    components: {},
    setup(props) {
      const provider = useProvider({
        id: '19eiup0i',
        version: '1756167211727'
      });
      const state = reactive({});
      return {
        state,
        props,
        provider,
        ChevronDown, ChevronRight
      };
    },
    methods: {
      // 获取用户列表
      async fetchUserList(
        orgId = '',
        page = 1,
        size = 10,
        keyword = '',
        status = '',
        role = ''
      ) {
       this.state.data = [];  
      }
    }
  });
</script>
<style lang="css" scoped></style>


`;
