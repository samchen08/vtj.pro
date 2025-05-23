export const test_25 = `
<template>
 
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { ElButton, ElDatePicker, ElTable, ElTableColumn } from 'element-plus';
  import { XMapChart, XChart } from '@vtj/charts';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'ProductChart',
    components: {
      ElButton,
      XMapChart,
      ElDatePicker,
      ElTable,
      ElTableColumn,
      XChart
    },
    setup(props) {
      const provider = useProvider({ id: '75nhw32d', version: '1747978825346' });
      const state = reactive({
        alarmList: [
          { time: '08:30:45', unit: '张掖市XX公司', type: '超范围产线' },
          { time: '09:15:22', unit: '酒泉市XX公司', type: '超员产线' },
          { time: '10:05:33', unit: '兰州市XX公司', type: '超时产线' }
        ],
        dateRange: [],
        mapOption: {
          series: [
            {
              type: 'map',
              data: [
                { name: '兰州市', value: 100 },
                { name: '嘉峪关市', value: 80 },
                { name: '金昌市', value: 60 },
                { name: '白银市', value: 70 },
                { name: '天水市', value: 50 },
                { name: '武威市', value: 40 },
                { name: '张掖市', value: 90, selected: true },
                { name: '平凉市', value: 30 },
                { name: '酒泉市', value: 60 },
                { name: '庆阳市', value: 40 },
                { name: '定西市', value: 30 },
                { name: '陇南市', value: 20 },
                { name: '临夏回族自治州', value: 10 },
                { name: '甘南藏族自治州', value: 5 }
              ]
            }
          ],
          visualMap: {
            min: 0,
            max: 100,
            text: ['高', '低'],
            inRange: { color: ['#1E90FF', '#4169E1', '#0000CD'] }
          }
        },
        tableData: [
          {
            unitType: '生产企业',
            statType: '月度统计',
            explosiveIn: '120吨',
            explosiveOut: '110吨',
            explosiveStock: '50吨',
            detonatorIn: '15万发',
            detonatorOut: '14万发',
            detonatorStock: '5万发'
          },
          {
            unitType: '销售企业',
            statType: '月度统计',
            explosiveIn: '150吨',
            explosiveOut: '140吨',
            explosiveStock: '60吨',
            detonatorIn: '18万发',
            detonatorOut: '16万发',
            detonatorStock: '7万发'
          }
        ],
        chartOption: {
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          legend: { data: ['雷管库', '炸药库'], textStyle: { color: '#ffffff' } },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: {
            type: 'category',
            data: [
              '兰州市',
              '嘉峪关市',
              '金昌市',
              '白银市',
              '天水市',
              '武威市',
              '张掖市'
            ],
            axisLabel: { color: '#ffffff' }
          },
          yAxis: { type: 'value', axisLabel: { color: '#ffffff' } },
          series: [
            {
              name: '雷管库',
              type: 'bar',
              data: [120, 132, 101, 134, 90, 230, 210],
              itemStyle: { color: '#1E90FF' },
              label: { show: true, position: 'top', color: '#ffffff' }
            },
            {
              name: '炸药库',
              type: 'bar',
              data: [220, 182, 191, 234, 290, 330, 310],
              itemStyle: { color: '#FF7D00' },
              label: { show: true, position: 'top', color: '#ffffff' }
            }
          ]
        }
      });
      return { state, props, provider };
    }
  })
</script>
<style lang="scss" scoped>
  $--color:red;
  .date-picker-white {
    backgound:$--color;
    :deep(.el-range-input) {
      color: #ffffff !important;
    }

    :deep(.el-range-separator) {
      color: #ffffff !important;
    }

    :deep(.el-range__close-icon) {
      color: #ffffff !important;
    }

    :deep(.el-input__inner) {
      color: #ffffff !important;
    }

    :deep(.el-input__prefix) {
      color: #ffffff !important;
    }

    :deep(.el-input__suffix) {
      color: #ffffff !important;
    }

    :deep(.el-icon-date) {
      color: #ffffff !important;
    }
  }
</style>
`;
