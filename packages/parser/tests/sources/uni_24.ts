export const uni_24 = `
<template>
  <view class="doctor-detail">
    <!-- 导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="handleBack">
        <text class="icon">←</text>
      </view>
      <view class="share-btn" @click="handleShare">
        <text class="icon">↗</text>
      </view>
    </view>

    <!-- 医生信息 -->
    <view class="doctor-info">
      <view class="doctor-avatar">
        <image class="avatar" src="https://picsum.photos/100/100?random=1" mode="aspectFill"></image>
      </view>
      <view class="doctor-meta">
        <view class="name-title">
          <text class="name">刘风</text>
          <text class="title">主任医师</text>
        </view>
        <view class="specialization">普通内科、肝病专治</view>
        <view class="stats">
          <text class="stat-item">4327 服务人次</text>
          <text class="stat-item">98% 好评率</text>
          <text class="stat-item">良好 回复率</text>
        </view>
      </view>
      <view class="follow-btn" @click="toggleFollow">
        <text>{{ state.isFollowed ? '已关注' : '+ 关注' }}</text>
      </view>
    </view>

    <!-- 咨询选项 -->
    <view class="consultation-options">
      <view class="section-title">咨询方式</view>
      <view class="option-list">
        <view class="option-item" @click="goToConsult('text')">
          <view class="option-main">
            <text class="option-title">图文咨询</text>
            <text class="option-desc">9小时内图文多次沟通</text>
          </view>
          <view class="option-action">
            <text class="price">¥68</text>
            <text class="action-btn">去咨询</text>
          </view>
        </view>
        <view class="option-item" @click="goToConsult('phone')">
          <view class="option-main">
            <text class="option-title">电话咨询</text>
            <text class="option-desc">9小时内图文多次沟通</text>
          </view>
          <view class="option-action">
            <text class="price">¥128</text>
            <text class="action-btn">去咨询</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 预约排班 -->
    <view class="appointment-schedule">
      <view class="section-title">呼吸内科 肺结节门诊</view>
      <view class="schedule-list">
        <view class="schedule-item" v-for="(item, index) in state.schedules" :key="index">
          <view class="date-info">
            <text class="date">{{ item.date }}</text>
            <text class="day">{{ item.day }}</text>
            <text class="today" v-if="item.isToday">今天</text>
          </view>
          <view class="status">
            <text v-if="item.available">剩余 {{ item.available }} 号</text>
            <text v-else class="no-ticket">无号</text>
          </view>
          <view class="book-btn" v-if="item.available" @click="bookAppointment(item)">
            <text>预约</text>
          </view>
        </view>
      </view>
      <view class="show-all-btn" @click="showAllSchedules">
        <text>显示全部排班</text>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/uni-app';

export default defineComponent({
  name: 'DoctorDetail',
  setup(props) {
    const provider = useProvider({ id: '14p85lbm', version: '1745893880713' });
    const state = reactive({
      isFollowed: false,
      schedules: [
        { date: '2022-02-07', day: '周一', isToday: true, available: 0 },
        { date: '2022-02-08', day: '周二', isToday: false, available: 3 },
        { date: '2022-02-09', day: '周三', isToday: false, available: 5 },
        { date: '2022-02-10', day: '周四', isToday: false, available: 0 },
        { date: '2022-02-11', day: '周五', isToday: false, available: 2 }
      ]
    });
    return { state, props, provider };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    handleShare() {
      uni.showToast({ title: '分享功能', icon: 'none' });
    },
    toggleFollow() {
      this.state.isFollowed = !this.state.isFollowed;
    },
    goToConsult(type) {
   
    },
    bookAppointment(item) {

    },
    showAllSchedules() {
      uni.showToast({ title: '显示全部排班', icon: 'none' });
    }
  }
});
</script>

<style lang="css" scoped>
.doctor-detail {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 20px;
}

/* 导航栏样式 */
.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
}
.back-btn, .share-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  font-size: 20px;
}

/* 医生信息样式 */
.doctor-info {
  display: flex;
  padding: 15px;
  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
}
.doctor-avatar {
  margin-right: 15px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.name-title {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.title {
  font-size: 14px;
  color: #666;
}
.specialization {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
.stats {
  display: flex;
  font-size: 12px;
  color: #666;
}
.stat-item {
  margin-right: 15px;
}
.follow-btn {
  position: absolute;
  right: 15px;
  top: 15px;
  padding: 5px 10px;
  border: 1px solid #1abc9c;
  border-radius: 15px;
  color: #1abc9c;
  font-size: 12px;
}

/* 咨询选项样式 */
.consultation-options {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}
.option-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.option-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.option-main {
  display: flex;
  flex-direction: column;
}
.option-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}
.option-desc {
  font-size: 12px;
  color: #666;
}
.option-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.price {
  font-size: 16px;
  color: #f56c6c;
  margin-bottom: 10px;
}
.action-btn {
  padding: 5px 10px;
  background-color: #1abc9c;
  color: #fff;
  border-radius: 15px;
  font-size: 12px;
}

/* 预约排班样式 */
.appointment-schedule {
  background-color: #fff;
  padding: 15px;
}
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}
.schedule-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.date-info {
  flex: 1;
  display: flex;
  align-items: center;
}
.date {
  font-size: 14px;
  margin-right: 10px;
}
.day {
  font-size: 14px;
  color: #666;
  margin-right: 10px;
}
.today {
  font-size: 12px;
  color: #1abc9c;
  padding: 2px 5px;
  border: 1px solid #1abc9c;
  border-radius: 3px;
}
.status {
  width: 80px;
  font-size: 12px;
  color: #666;
}
.no-ticket {
  color: #f56c6c;
}
.book-btn {
  width: 60px;
  padding: 5px 0;
  text-align: center;
  background-color: #1abc9c;
  color: #fff;
  border-radius: 15px;
  font-size: 12px;
}
.show-all-btn {
  text-align: center;
  padding: 10px;
  color: #1abc9c;
  font-size: 14px;
}
</style>
`;
