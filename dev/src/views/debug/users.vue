<template>
  <XDialogForm
    v-model:modelValue="state.visible"
    :title="title"
    width="600px"
    height="300px"
    :modelValue="false"
    :model="state.model"
    :submitMethod="submit">
    <XField
      label="用户账号"
      editor="text"
      labelWidth=""
      :required="true"
      name="username"></XField>
    <XField
      label="登录密码"
      editor="text"
      labelWidth=""
      :required="true"
      name="password"></XField>
    <XField
      label="用户角色"
      editor="select"
      labelWidth=""
      :required="true"
      name="roles"
      :props="{ multiple: true }"
      :options="state.roles"></XField
  ></XDialogForm>
  <XGrid
    height="auto"
    :columns="columns()"
    :loader="loader"
    ref="gridRef"
    :pager="true"
    :syncResize="true"
    :autoResize="true"
    :customable="true">
    <template #toolbar__buttons="scope_254466rf9cq">
      <ElInput
        v-model:modelValue="state.keyword"
        placeholder="请输入查询关键字"
        :clearable="true"
        class="ElInput_70abccuh53"></ElInput>
      <XAction
        label="查询"
        icon="VtjIconNpSearch"
        type="default"
        @click="search"></XAction>
      <XAction
        label="新增"
        icon="VtjIconNpAddRow"
        type="primary"
        @click="onAdd"></XAction>
      <ElDivider direction="vertical"> 分割线</ElDivider>
      <XAction
        label="删除"
        icon="VtjIconNpDelete"
        type="danger"
        @click="remove"></XAction>
    </template>
    <template #op="scope_254466rf9cq">
      <XAction
        label="编辑"
        size="default"
        mode="text"
        type="primary"
        @click="
          (...args: any[]) => click_2bbfk8d083d({ scope_254466rf9cq }, args)
        "></XAction> </template
  ></XGrid>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { XDialogForm, XField, XGrid, XAction } from '@vtj/ui';
  import { ElInput, ElDivider } from 'element-plus';
  import { dateFormat } from '@vtj/utils';
  // import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Users',
    components: { XDialogForm, XField, XGrid, ElInput, XAction, ElDivider },
    setup(props) {
      // const provider = useProvider({
      //   id: '282ggpwiei4',
      //   version: '1728978986386'
      // });
      const state = reactive<Record<string, any>>({
        keyword: '',
        current: null,
        model: null,
        visible: false,
        roles: []
      });
      return { state, props, dateFormat };
    },
    computed: {
      isEdit() {
        return !!this.state.model?.id;
      },
      title() {
        return this.isEdit ? '编辑角色' : '新增角色';
      },
      watcher_fa1ig8xlp2() {
        return this.state.visible;
      }
    },
    methods: {
      async saveUser(...args: any[]) {
        // return await this.provider.apis['jwn5gw7e0d']
        //   .apply(this, args)
        //   .then((res) => {
        //     return res;
        //   });
      },
      async findUsers(...args: any[]) {
        // return await this.provider.apis['gk4fmis036']
        //   .apply(this, args)
        //   .then((res) => {
        //     return res;
        //   });
      },
      async removeUsers(...args: any[]) {
        // return await this.provider.apis['2m1szppfxoo']
        //   .apply(this, args)
        //   .then((res) => {
        //     return res;
        //   });
      },
      async findRoles(...args: any[]) {
        // return await this.provider.apis['18md3cgzncn']
        //   .apply(this, args)
        //   .then((res) => {
        //     return res;
        //   });
      },
      click_2bbfk8d083d({ scope_254466rf9cq }, args) {
        return (() => {
          this.onEdit(scope_254466rf9cq);
        }).apply(this, args);
      },
      columns() {
        return [
          {
            type: 'checkbox',
            width: 40
          },
          {
            type: 'seq',
            title: '序号',
            width: 60
          },
          {
            field: 'id',
            title: 'ID',
            minWidth: 260
          },
          {
            field: 'avatar',
            title: '头像',
            minWidth: 100
          },
          {
            field: 'username',
            title: '账号',
            minWidth: 100
          },
          {
            field: 'password',
            title: '密码',
            minWidth: 100
          },
          {
            field: 'email',
            title: '邮箱',
            minWidth: 100
          },
          {
            field: 'phone',
            title: '电话号码',
            minWidth: 100
          },
          {
            field: 'oauthType',
            title: '第三方登录',
            minWidth: 100
          },
          {
            field: 'oauthId',
            title: '第三方登录标识',
            minWidth: 200
          },
          {
            field: 'freeze',
            title: '是否冻结',
            minWidth: 100
          },
          {
            field: 'createdAt',
            title: '创建时间',
            minWidth: 160,
            formatter: ({ cellValue }) => dateFormat(cellValue)
          },
          {
            field: 'updatedAt',
            title: '更新时间',
            minWidth: 160,
            formatter: ({ cellValue }) => dateFormat(cellValue)
          },
          {
            field: 'op',
            title: '操作',
            width: 300,
            slots: {
              default: 'op'
            }
          }
        ];
      },
      loader(state) {
        const { page, pageSize } = state || {};
        return this.findUsers({
          page,
          limit: pageSize,
          keyword: this.state.keyword
        });
      },
      search() {
        this.$refs.gridRef.search();
      },
      onAdd() {
        this.state.model = {};
        this.state.visible = true;
      },
      onEdit({ row }) {
        if (row) {
          this.state.model = { ...row };
          this.state.visible = true;
        }
      },
      async remove() {
        const rows = this.$refs.gridRef.getSelected();
        if (!rows.length) {
          this.$message.info('请选择需删除的数据');
          return;
        }
        const ok = await this.$confirm('确定删除数据?', '提示', {
          type: 'warning'
        }).catch(() => false);
        if (!ok) return;
        const idArray = rows.map((n) => n.id);
        const ret = await this.removeUsers(idArray).catch(() => false);
        if (ret) {
          this.$message.success('删除成功！');
          this.search();
        }
      },
      async submit(model) {
        const ret = !!(await this.saveUser(model));
        if (ret) {
          this.search();
        }
        return ret;
      },
      async fetchRoles() {
        const res = await this.findRoles({ page: 1, limit: 9999 });

        setTimeout(() => {
          this.state.roles = [{ label: 'AA', value: '11' }];
        }, 100);
      }
    },
    watch: {
      watcher_fa1ig8xlp2: {
        deep: false,
        immediate: true,
        handler(v) {
          if (v) {
            this.fetchRoles();
          }
        }
      }
    },
    activated() {
      this.search();
    }
  });
</script>
<style lang="scss" scoped>
  .ElInput_70abccuh53 {
    display: flex;
    width: 300px;
    margin-right: 10px;
  }
</style>
