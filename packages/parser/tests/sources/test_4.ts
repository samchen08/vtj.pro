export const test_4 = `
<template>
   <el-table :data="state.list">
      <el-table-column v-for="col in columns">
        <template #default={row}>
        <span>{{ row.title }}</span>
         <span>{{col.name}}</span>
        </template>
      </el-table-column>
   </el-table>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  import { useProvider } from '@vtj/renderer';

  export default defineComponent({
    name: 'LoginPage',
    components: {
      ElTable,
      ElTableColumn
    },
    setup(props) {
      const provider = useProvider({ id: 'lvw0jl2df', version: '' });
      const state = reactive({
         list:[],
         columns:[]
      });
      return { state, props, provider };
    }
  });
</script>

<style lang="css" scoped>

</style>

`;
