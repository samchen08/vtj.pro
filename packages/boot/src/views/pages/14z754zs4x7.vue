<template>
  <ElTable
    :data='[{"date":"2016-05-03","name":"Tom","address":"No. 189, Grove St, Los Angeles"},{"date":"2016-05-02","name":"Tom","address":"No. 189, Grove St, Los Angeles"},{"date":"2016-05-04","name":"Tom","address":"No. 189, Grove St, Los Angeles"},{"date":"2016-05-01","name":"Tom","address":"No. 189, Grove St, Los Angeles"}]'>
    <ElTableColumn prop="date" label="Date"> </ElTableColumn>
    <ElTableColumn prop="name" label="Name">
      <template #default="{row,column,$index}">
        <ElTag
          @click="(...args:any[]) => click_handler_291w5brie74({row, column, $index}, args)">
          {{ row?.name }}
        </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="address" label="Address"> </ElTableColumn>
  </ElTable>
  <ElDivider> 分割线 </ElDivider>
  <ElTree
    :data='[{"value":"guide","label":"Guide","children":[{"value":"disciplines","label":"Disciplines","children":[{"value":"consistency","label":"Consistency"},{"value":"feedback","label":"Feedback"},{"value":"efficiency","label":"Efficiency"},{"value":"controllability","label":"Controllability"}]},{"value":"navigation","label":"Navigation","children":[{"value":"side nav","label":"Side Navigation"},{"value":"top nav","label":"Top Navigation"}]}]},{"value":"component","label":"Component","children":[{"value":"basic","label":"Basic","children":[{"value":"layout","label":"Layout"},{"value":"color","label":"Color"},{"value":"typography","label":"Typography"},{"value":"icon","label":"Icon"},{"value":"button","label":"Button"}]},{"value":"form","label":"Form","children":[{"value":"radio","label":"Radio"},{"value":"checkbox","label":"Checkbox"},{"value":"input","label":"Input"},{"value":"input-number","label":"InputNumber"},{"value":"select","label":"Select"},{"value":"cascader","label":"Cascader"},{"value":"switch","label":"Switch"},{"value":"slider","label":"Slider"},{"value":"time-picker","label":"TimePicker"},{"value":"date-picker","label":"DatePicker"},{"value":"datetime-picker","label":"DateTimePicker"},{"value":"upload","label":"Upload"},{"value":"rate","label":"Rate"},{"value":"form","label":"Form"}]},{"value":"data","label":"Data","children":[{"value":"table","label":"Table"},{"value":"tag","label":"Tag"},{"value":"progress","label":"Progress"},{"value":"tree","label":"Tree"},{"value":"pagination","label":"Pagination"},{"value":"badge","label":"Badge"}]},{"value":"notice","label":"Notice","children":[{"value":"alert","label":"Alert"},{"value":"loading","label":"Loading"},{"value":"message","label":"Message"},{"value":"message-box","label":"MessageBox"},{"value":"notification","label":"Notification"}]},{"value":"navigation","label":"Navigation","children":[{"value":"menu","label":"Menu"},{"value":"tabs","label":"Tabs"},{"value":"breadcrumb","label":"Breadcrumb"},{"value":"dropdown","label":"Dropdown"},{"value":"steps","label":"Steps"}]},{"value":"others","label":"Others","children":[{"value":"dialog","label":"Dialog"},{"value":"tooltip","label":"Tooltip"},{"value":"popover","label":"Popover"},{"value":"card","label":"Card"},{"value":"carousel","label":"Carousel"},{"value":"collapse","label":"Collapse"}]}]},{"value":"resource","label":"Resource","children":[{"value":"axure","label":"Axure Components"},{"value":"sketch","label":"Sketch Templates"},{"value":"docs","label":"Design Documentation"}]}]'
    @node-click="nodeClick_handler_2ntljtb3b5s">
  </ElTree>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElTable, ElTableColumn, ElTag, ElDivider, ElTree } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'TestEvent',

    components: { ElTable, ElTableColumn, ElTag, ElDivider, ElTree },

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
      click_handler_291w5brie74({ row, column, $index }, args) {
        return (() => {
          this.$message.info({
            message: row?.date
          });
        }).apply(this, args);
      },
      nodeClick_handler_2ntljtb3b5s(data, node) {
        this.$message.info({
          message: JSON.stringify(data)
        });
        console.log(data, node);
      }
    }
  });
</script>
<style lang="scss" scoped></style>
