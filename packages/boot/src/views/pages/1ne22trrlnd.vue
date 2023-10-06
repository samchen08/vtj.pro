<template>
  <MyBlock title="我是传递过去的标题文本" @submit="submit_handler_2dohrw6rl55">
    <template #default="scope_2dohrw6rl55">
      <ElTabs modelValue="1" :style='{"width": "100%"}'>
        <ElTabPane label="暗暗大师傅323" name="1"> 面板一内容 </ElTabPane>
        <ElTabPane label="面板二" name="2"> 面板二内容 </ElTabPane>
        <ElTabPane label="面板三" name="3"> 面板三内容 </ElTabPane>
      </ElTabs>
    </template>
  </MyBlock>
  <ElTable
    :data='[{"date":"2016-05-03","name":"Tom","address":"No. 189, Grove St, Los Angeles"},{"date":"2016-05-02","name":"Tom","address":"No. 189, Grove St, Los Angeles"},{"date":"2016-05-04","name":"Tom","address":"No. 189, Grove St, Los Angeles"},{"date":"2016-05-01","name":"Tom","address":"No. 189, Grove St, Los Angeles"}]'>
    <ElTableColumn prop="date" label="Date"> </ElTableColumn>
    <ElTableColumn prop="name" label="Name">
      <template #default="{row,column,$index}">
        <ElTag
          @click="click_handler_1wg65bkklv9($event, {row, column, $index})">
          {{ row?.name }}
        </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="address" label="Address"> </ElTableColumn>
  </ElTable>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElTabs, ElTabPane, ElTable, ElTableColumn, ElTag } from 'element-plus';
  import MyBlock from '@/components/blocks/1bh5ci0vpnp.vue';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'TestBlock',

    components: { MyBlock, ElTabs, ElTabPane, ElTable, ElTableColumn, ElTag },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    },

    methods: {
      submit_handler_2dohrw6rl55(val) {
        this.$message.info({
          message: `收到事件消息：${val}`
        });
      },
      click_handler_1wg65bkklv9($event, { row, column, $index }) {
        return (() => {
          this.$message.info({
            message: row?.date
          });
        })();
      }
    }
  });
</script>
<style lang="scss" scoped></style>
