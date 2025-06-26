<template>
  <div>
    <el-form :model="state.queryForm" inline>
      <el-form-item label="用户名">
        <el-input
          v-model="state.queryForm.username"
          placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="state.queryForm.gender" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="state.queryForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="state.tableData" border stripe>
      <el-table-column prop="id" label="用户ID" width="100" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="gender" label="性别" width="80">
        <template #default="{ row }">{{
          row.gender === 1 ? '男' : '女'
        }}</template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120" />
      <el-table-column prop="email" label="邮箱地址" width="180" />
      <el-table-column prop="address" label="地址" show-overflow-tooltip />
      <el-table-column prop="createTime" label="注册时间" width="180" />
      <el-table-column label="操作" width="120">
        <template #default>
          <el-button type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      v-model:current-page="state.currentPage"
      v-model:page-size="state.pageSize"
      :total="state.total"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleQuery"
      @size-change="handleQuery" />
  </div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  // import { useProvider } from '@vtj/renderer';
  import {
    ElTable,
    ElTableColumn,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
    ElPagination
  } from 'element-plus';

  export default defineComponent({
    name: 'UserList',
    components: {
      ElTable,
      ElTableColumn,
      ElForm,
      ElFormItem,
      ElInput,
      ElSelect,
      ElOption,
      ElButton,
      ElPagination
    },
    setup(props) {
      // const provider = useProvider({
      //   id: '45tltwv09',
      //   version: '1740707174334'
      // });
      const state = reactive({
        queryForm: {
          username: '',
          gender: '',
          phone: ''
        },
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10
      });
      return { state, props };
    },
    methods: {
      async handleQuery() {
        // 模拟接口调用
        this.state.tableData = [
          {
            id: 1001,
            username: '张三',
            age: 28,
            gender: 1,
            phone: '13800138000',
            email: 'zhangsan@example.com',
            address: '北京市朝阳区',
            createTime: '2023-01-01 10:00:00'
          }
        ];
        this.state.total = 1;
      },
      resetQuery() {
        this.state.queryForm = {
          username: '',
          gender: '',
          phone: ''
        };
        this.handleQuery();
      }
    },
    mounted() {
      this.handleQuery();
    }
  });
</script>

<style lang="css" scoped>
  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }

  .el-form-item {
    margin-bottom: 12px;
  }

  .el-button + .el-button {
    margin-left: 8px;
  }
</style>
