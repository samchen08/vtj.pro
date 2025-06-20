export const test_26 = `
<template>
  <div class="research-data-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="title">经费预算推送记录</div>
      <div class="close-btn" @click="handleClose">
        <XIcon :icon="VtjIconClose" :size="20" color="#333"></XIcon>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 标题区域 -->
      <div class="section-title">
        <div class="blue-line"></div>
        <div class="title-text">推送记录(Z2020101605146454)</div>
      </div>

      <!-- 表格区域 -->
      <div class="table-container">
        <ATable 
          :dataSource="state.tableData" 
          :columns="state.columns" 
          :rowClassName="tableRowClassName"
          bordered
          size="middle"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'pushStatus'">
              <span style="color: #52c41a">{{ text }}</span>
            </template>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </ATable>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
import { Table } from 'ant-design-vue';
import { XIcon } from '@vtj/ui';
import { VtjIconClose } from '@vtj/icons';

export default defineComponent({
  name: 'ResearchData',
  components: {
    ATable: Table,
    XIcon
  },
  setup(props) {
    const provider = useProvider({ id: '26q4lrwe', version: '1750301575983' });
    const state = reactive({
      tableData: [
        {
          key: '1',
          pushNo: 'TD202110001',
          budgetSubject: '科研项目经费',
          externalFunds: 50000,
          matchingFunds: 20000,
          startTime: '2021-10-16 09:30:25',
          pushStatus: '已推送'
        },
        {
          key: '2',
          pushNo: 'TD202110002',
          budgetSubject: '实验室建设费',
          externalFunds: 80000,
          matchingFunds: 40000,
          startTime: '2021-10-17 10:15:42',
          pushStatus: '已推送'
        },
        {
          key: '3',
          pushNo: 'TD202110003',
          budgetSubject: '学术交流费',
          externalFunds: 30000,
          matchingFunds: 15000,
          startTime: '2021-10-18 14:20:18',
          pushStatus: '已推送'
        },
        {
          key: '4',
          pushNo: 'TD202110004',
          budgetSubject: '设备购置费',
          externalFunds: 120000,
          matchingFunds: 60000,
          startTime: '2021-10-19 11:05:33',
          pushStatus: '已推送'
        },
        {
          key: '5',
          pushNo: 'TD202110005',
          budgetSubject: '材料费',
          externalFunds: 25000,
          matchingFunds: 12500,
          startTime: '2021-10-20 16:45:07',
          pushStatus: '已推送'
        }
      ],
      columns: [
        {
          title: '推送单号',
          dataIndex: 'pushNo',
          key: 'pushNo',
          width: 150
        },
        {
          title: '预算科目',
          dataIndex: 'budgetSubject',
          key: 'budgetSubject',
          width: 150
        },
        {
          title: '外来经费',
          dataIndex: 'externalFunds',
          key: 'externalFunds',
          width: 120
        },
        {
          title: '配套经费',
          dataIndex: 'matchingFunds',
          key: 'matchingFunds',
          width: 120
        },
        {
          title: '发起时间',
          dataIndex: 'startTime',
          key: 'startTime',
          width: 180
        },
        {
          title: '推送状态',
          dataIndex: 'pushStatus',
          key: 'pushStatus',
          width: 120
        }
      ]
    });
    return { state, props, provider, VtjIconClose };
  },
  methods: {
    handleClose() {
      // 关闭页面逻辑
      this.$router.back();
    },
    tableRowClassName(record, index) {
      return index % 2 === 1 ? 'even-row' : 'odd-row';
    }
  }
});
</script>

<style lang="scss" scoped>
.research-data-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .header {
    height: 60px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid #e8e8e8;

    .title {
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }

    .close-btn {
      cursor: pointer;
      padding: 5px;
    }
  }

  .content {
    flex: 1;
    padding: 20px;
    overflow: auto;

    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .blue-line {
        width: 4px;
        height: 18px;
        background-color: #1890ff;
        margin-right: 10px;
      }

      .title-text {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
    }

    .table-container {
      width: 100%;
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}

:deep(.ant-table) {
  .ant-table-thead > tr > th {
    background-color: #f0f7ff;
    color: #333;
    font-weight: 500;
  }

  .ant-table-tbody {
    .odd-row {
      background-color: #fff;
    }

    .even-row {
      background-color: #fafafa;
    }

    tr:hover > td {
      background-color: #e6f7ff !important;
    }
  }

  .ant-table-cell {
    border-color: #e8e8e8;
  }
}
</style>
`;
