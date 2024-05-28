<template>
  <div>
    <XForm :model="state.model">
      <!-- <XField label="名称" name="name" :required="true"></XField>
      <XField label="分组编码" :required="true" name="groupCode"></XField>
      <XField
        label="排序"
        :required="false"
        name="orderValue"
        editor="number"></XField>
      <XField label="备注" :required="false" name="remark"></XField> -->
      <XField name="children">
        <template #editor>
          <XGrid
            height="400px"
            :columns="[
              { type: 'seq', title: '#', width: '50' },
              { field: 'name', title: '名称' },
              { field: 'dictKey', title: '子项编码' },
              { field: 'dictValue', title: '子项值' },
              { field: 'orderValue', title: '排序' },
              { field: 'remark', title: '备注' },
              { field: 'status', title: '状态' },
              { field: 'op', title: '操作', width: '100' }
            ]"
            :cellRenders="createCellRender()"
            :editRenders="{
              name: 'XInput'
            }"
            ref="gridRef"
            :editable="true"
            :editRules="state.editRules">
            <template #toolbar__buttons>
              <XAction
                label="新增子项"
                type="primary"
                icon="VtjIconPlus"
                @click="
                  (...args: any[]) => click_2a8fplmzen0({}, args)
                "></XAction> </template
          ></XGrid>
        </template>
      </XField>
      <!-- <XField
        label="状态"
        :required="false"
        name="status"
        editor="select"
        :options="[
          { label: '有效', value: 'Effective' },
          { label: '无效', value: 'Invalid' }
        ]"></XField> -->
    </XForm>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XPanel, XForm, XField, XGrid, XAction } from '@vtj/ui';
  // import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'DictEdit',
    components: { XPanel, XForm, XField, XGrid, XAction },
    setup(props) {
      // const provider = useProvider({
      //   id: 'gd1200xoac',
      //   version: '1716807130099'
      // });
      const state = reactive<Record<string, any>>({
        model: null,
        editRules: {
          name: [{ required: true, message: '名称是必填项' }],
          dictKey: [{ required: true, message: '子项编码是必填项' }],
          dictValue: [{ required: true, message: '子项值是必填项' }],
          orderValue: [{ required: true, message: '排序是必填项' }],
          remark: [{ required: true, message: '备注是必填项' }],
          status: [{ required: true, message: '状态是必填项' }]
        }
      });
      return { state, props };
    },
    methods: {
      async sysDictGroupIsExist(...args: any[]) {
        return await this.provider.apis['e71nf7z6va']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      },
      async sysDictGroupSaveOrUpdate(...args: any[]) {
        return await this.provider.apis['bximvqfqbg']
          .apply(this, args)
          .then((res) => {
            return res;
          });
      },
      click_2a8fplmzen0({ scope_14l0yfbgbfn, editor }, args) {
        return (() => {
          this.handleAdd();
        }).apply(this, args);
      },
      createEmptyModel() {
        return {
          status: 'Effective',
          orderValue: 0
        };
      },
      async save() {
        const { name, groupCode } = this.state.model || {};
        if (name && groupCode) {
          const isExistName = await this.sysDictGroupIsExist({
            rowName: 'name',
            rowValue: name
          });
          const isExistGroupCode = await this.sysDictGroupIsExist({
            rowName: 'groupCode',
            rowValue: groupCode
          });
          if (!isExistName && !isExistGroupCode) {
            console.log('model', this.state.mode);
          } else {
            this.$notify({
              message: '字典名称或分组编码已存在'
            });
          }
        }
      },
      createCellRender() {
        return {
          op: {
            name: 'XActions'
          }
        };
      },
      handleAdd() {
        const gridRef = Array.isArray(this.$refs.gridRef)
          ? this.$refs.gridRef[0]
          : this.$refs.gridRef;
        gridRef.insertActived(this.createEmptyModel());
      },
      removeRow(row) {
        const gridRef = Array.isArray(this.$refs.gridRef)
          ? this.$refs.gridRef[0]
          : this.$refs.gridRef;
        gridRef.vxeRef.remove(row);
      }
    },
    created() {
      this.state.model = this.createEmptyModel();
    }
  });
</script>
<style lang="scss" scoped></style>
