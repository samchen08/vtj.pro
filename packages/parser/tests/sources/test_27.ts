export const test_27 = `
<template>
   <div class="collapse-btn" @click="toggleCollapse">
        <XIcon
          :icon="state.isCollapse ? ArrowRightBold : ArrowLeftBold"
          :size="18"></XIcon>
      </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import {
    ElDrawer,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElTooltip
  } from 'element-plus';
  import { XIcon } from '@vtj/ui';
  import { ArrowRightBold, ArrowLeftBold } from '@vtj/icons';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: '',
    components: { ElDrawer, ElMenu, ElMenuItem, ElSubMenu, XIcon, ElTooltip },
    props: {
      menuData: {
        type: [Array],
        required: true,
        default: () => []
      },
      isCollapse: {
        type: [Boolean],
        required: false,
        default: false
      },
      activeMenu: {
        type: [String],
        required: true,
        default: ''
      },
      isMobile: {
        type: [Boolean],
        required: false,
        default: false
      },
      sidebarVisible: {
        type: [Boolean],
        required: false,
        default: false
      }
    },
    emits: ['toggle-collapse', 'select', 'update:sidebarVisible'],
    setup(props) {
      const provider = useProvider({ id: '998tws2i', version: '1755786564748' });
      const state = reactive({
        isCollapse: props.isCollapse
      });
      return { state, props, provider, ArrowRightBold, ArrowLeftBold };
    }
  })
</script>
<style lang="css" scoped>

</style>


`;
