export const test_27 = `
<template>
  <ElTable :data="[
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]">
    <ElTableColumn prop="date" label="Date">
      <template #default="scope">
        <div>容器文本内容示例</div>
      </template>
    </ElTableColumn>
  </ElTable>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  import { useProvider } from '@vtj/renderer';
  import {mock} from 'mockjs'
  export default defineComponent({
    name: 'Abc1',
    components: { ElTable, ElTableColumn },
    setup(props) {
      const provider = useProvider({ id: '17zuumip', version: '1753066495241' });
      const state = reactive({
      mock: null,
      tableDatra:[{mock:'mock',id:"abc", mock2:'mock'}]
      });
      return { state, props, provider,mock };
    },
    methods: {
     mock() {}

      
    },
    async created() {
     this.state.tableDatra = this.mock({
      'list|6':['@guid']
     })
      const data = [{id:"abc", mock:mock}];
    this.mock
    this.mock();
    console.log(this.mock);
    await this.mock()
    mock();
    mock(\`mock\${mock}\`);
     mock(\`mock\${ mock }\`);
     }
  })
</script>
<style lang="css" scoped></style>

`;
