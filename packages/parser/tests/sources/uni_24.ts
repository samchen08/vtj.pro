export const uni_24 = `
<template>
  <view class="account-container">
    <view class="header">
      <text class="title">日常记账</text>
      <view class="total-amount">
        <text class="total-label">当前余额：</text>
        <text class="total-value" :class="{ 'positive': state.total >= 0, 'negative': state.total < 0 }">
          ¥{{ state.total.toFixed(2) }}
        </text>
      </view>
    </view>

    <view class="input-section">
      <view class="input-row">
        <view class="input-group">
          <text class="input-label">类型</text>
          <picker class="type-picker" :range="state.typeOptions" :value="state.currentTypeIndex" @change="onTypeChange">
            <view class="picker-text">{{ state.typeOptions[state.currentTypeIndex] }}</view>
          </picker>
        </view>
        <view class="input-group">
          <text class="input-label">金额</text>
          <input class="amount-input" type="digit" v-model="state.amount" placeholder="0.00" placeholder-class="placeholder" />
        </view>
      </view>
      <view class="input-row">
        <view class="input-group full-width">
          <text class="input-label">备注</text>
          <input class="remark-input" v-model="state.remark" placeholder="请输入备注" placeholder-class="placeholder" />
        </view>
      </view>
      <view class="input-row">
        <view class="input-group full-width">
          <text class="input-label">日期</text>
          <picker class="date-picker" mode="date" :value="state.date" @change="onDateChange">
            <view class="picker-text">{{ state.date }}</view>
          </picker>
        </view>
      </view>
      <button class="add-button" @click="addRecord">添加记录</button>
    </view>

    <view class="record-section">
      <view class="section-header">
        <text class="section-title">记账记录</text>
        <text class="record-count">共 {{ state.records.length }} 条</text>
      </view>
      <scroll-view class="record-list" scroll-y>
        <view v-if="state.records.length === 0" class="empty-tips">
          <text>暂无记账记录，开始添加第一条吧~</text>
        </view>
        <view v-else class="record-item" v-for="(record, index) in state.records" :key="index">
          <view class="record-left">
            <view class="record-type" :class="record.type">
              <text>{{ record.type === 'income' ? '收' : '支' }}</text>
            </view>
            <view class="record-info">
              <text class="record-remark">{{ record.remark || '无备注' }}</text>
              <text class="record-date">{{ record.date }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-amount" :class="record.type">
              {{ record.type === 'income' ? '+' : '-' }}¥{{ record.amount.toFixed(2) }}
            </text>
            <text class="delete-icon" @click="deleteRecord(index)">×</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import { defineComponent, reactive, computed } from 'vue';
import { useProvider } from '@vtj/renderer';

export default defineComponent({
  name: 'DailyAccount',
  components: {},
  props: {},
  emits: [],
  setup(props) {
    const provider = useProvider({ id: '2hfwdzpo', version: '' });
    const state = reactive({
      typeOptions: ['收入', '支出'],
      currentTypeIndex: 0,
      amount: '',
      remark: '',
      date: new Date().toISOString().split('T')[0],
      records: []
    });
    return { state, props, provider };
  },
  computed: {
    total() {
      return this.state.records.reduce((sum, record) => {
        return record.type === 'income' ? sum + record.amount : sum - record.amount;
      }, 0);
    }
  },
  methods: {
    onTypeChange(e) {
      this.state.currentTypeIndex = e.detail.value;
    },
    onDateChange(e) {
      this.state.date = e.detail.value;
    },
    addRecord() {
      if (!this.state.amount || parseFloat(this.state.amount) <= 0) {
        uni.showToast({
          title: '请输入有效金额',
          icon: 'none'
        });
        return;
      }

      const newRecord = {
        type: this.state.currentTypeIndex === 0 ? 'income' : 'expense',
        amount: parseFloat(this.state.amount),
        remark: this.state.remark,
        date: this.state.date,
        id: Date.now()
      };

      this.state.records.unshift(newRecord);
      
      // 重置输入
      this.state.amount = '';
      this.state.remark = '';
      
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      });
      
      // 保存到本地存储
      this.saveRecords();
    },
    deleteRecord(index) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这条记录吗？',
        success: (res) => {
          if (res.confirm) {
            this.state.records.splice(index, 1);
            this.saveRecords();
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            });
          }
        }
      });
    },
    saveRecords() {
      try {
        uni.setStorageSync('account_records', this.state.records);
      } catch (e) {
        console.error('保存记录失败:', e);
      }
    },
    loadRecords() {
      try {
        const records = uni.getStorageSync('account_records');
        if (records) {
          this.state.records = records;
        }
      } catch (e) {
        console.error('加载记录失败:', e);
      }
    }
  },
  mounted() {
    this.loadRecords();
  }
});
</script>

<style lang="css" scoped>
  .account-container {
    padding: 20rpx;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .header {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 20rpx;
    padding: 40rpx 30rpx;
    margin-bottom: 30rpx;
    color: white;
  }

  .title {
    font-size: 36rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 20rpx;
  }

  .total-amount {
    display: flex;
    align-items: center;
  }

  .total-label {
    font-size: 28rpx;
    opacity: 0.9;
  }

  .total-value {
    font-size: 48rpx;
    font-weight: bold;
    margin-left: 20rpx;
  }

  .total-value.positive {
    color: #07c160;
  }

  .total-value.negative {
    color: #fa5151;
  }

  .input-section {
    background-color: white;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
  }

  .input-row {
    display: flex;
    margin-bottom: 30rpx;
  }

  .input-group {
    flex: 1;
    margin-right: 20rpx;
  }

  .input-group.full-width {
    flex: 1;
    margin-right: 0;
  }

  .input-group:last-child {
    margin-right: 0;
  }

  .input-label {
    display: block;
    font-size: 26rpx;
    color: #666;
    margin-bottom: 10rpx;
  }

  .type-picker,
  .date-picker {
    background-color: #f8f8f8;
    border-radius: 10rpx;
    padding: 20rpx;
    font-size: 28rpx;
  }

  .picker-text {
    color: #333;
  }

  .amount-input,
  .remark-input {
    background-color: #f8f8f8;
    border-radius: 10rpx;
    padding: 20rpx;
    font-size: 28rpx;
    color: #333;
  }

  .placeholder {
    color: #999;
  }

  .add-button {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border-radius: 50rpx;
    font-size: 32rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin-top: 10rpx;
  }

  .record-section {
    background-color: white;
    border-radius: 20rpx;
    padding: 30rpx;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #eee;
  }

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }

  .record-count {
    font-size: 26rpx;
    color: #666;
  }

  .record-list {
    max-height: 800rpx;
  }

  .empty-tips {
    text-align: center;
    padding: 100rpx 0;
    color: #999;
    font-size: 28rpx;
  }

  .record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
  }

  .record-item:last-child {
    border-bottom: none;
  }

  .record-left {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .record-type {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    font-size: 24rpx;
    font-weight: bold;
  }

  .record-type.income {
    background-color: #e7f7ff;
    color: #4facfe;
  }

  .record-type.expense {
    background-color: #fff0f0;
    color: #fa5151;
  }

  .record-info {
    flex: 1;
  }

  .record-remark {
    display: block;
    font-size: 30rpx;
    color: #333;
    margin-bottom: 10rpx;
  }

  .record-date {
    font-size: 24rpx;
    color: #999;
  }

  .record-right {
    display: flex;
    align-items: center;
  }

  .record-amount {
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 30rpx;
  }

  .record-amount.income {
    color: #07c160;
  }

  .record-amount.expense {
    color: #fa5151;
  }

  .delete-icon {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    background-color: #f8f8f8;
    color: #999;
    font-size: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
</style>

`;
