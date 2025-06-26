export const uni_21 = `
<template>
  <view class="container">
    <!-- 顶部状态栏 -->
    <view class="status-bar">
      <text class="time">9:41</text>
      <view class="status-icons">
        <text class="icon">📶</text>
        <text class="icon">Wi-Fi</text>
        <text class="icon">🔋</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="content">
      <!-- 欢迎信息 -->
      <text class="welcome-text">欢迎登录</text>
      
      <!-- 应用标题和图标 -->
      <view class="app-title">
        <text class="app-icon">💉</text>
        <text class="title-text">智慧输液</text>
      </view>

      <!-- 手机号输入框 -->
      <view class="input-container">
        <input 
          class="input-field" 
          type="number" 
          placeholder="请输入手机号码" 
          v-model="state.phoneNumber"
        />
      </view>

      <!-- 验证码输入框和获取验证码按钮 -->
      <view class="input-container code-container">
        <input 
          class="input-field" 
          type="number" 
          placeholder="请输入验证码" 
          v-model="state.verificationCode"
        />
        <button class="get-code-btn" @click="getVerificationCode">
          获取验证码
        </button>
      </view>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">登录</button>
    </view>
  </view>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'LoginPage',
    setup(props) {
      const provider = useProvider({ id: '150vouyt', version: '' });
      const state = reactive({
        phoneNumber: '',
        verificationCode: ''
      });
      return { state, props, provider };
    },
    methods: {
      getVerificationCode() {
        // 获取验证码逻辑
        uni.showToast({
          title: '验证码已发送',
          icon: 'none'
        });
      },
      handleLogin() {
        // 登录逻辑
        if (!this.state.phoneNumber) {
          uni.showToast({
            title: '请输入手机号码',
            icon: 'none'
          });
          return;
        }
        if (!this.state.verificationCode) {
          uni.showToast({
            title: '请输入验证码',
            icon: 'none'
          });
          return;
        }
        
        uni.showLoading({
          title: '登录中...'
        });
        
        // 模拟登录请求
        setTimeout(() => {
          uni.hideLoading();
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          // 登录成功后跳转页面
          uni.navigateTo({
            url: '/pages/home/index'
          });
        }, 1500);
      }
    }
  });
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(to bottom, #e6f2ff, #cce0ff);
  }
  
  .status-bar {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .status-icons {
    display: flex;
    gap: 10px;
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
  }
  
  .welcome-text {
    font-size: 24px;
    color: #1a73e8;
    margin-bottom: 30px;
    font-weight: bold;
  }
  
  .app-title {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .app-icon {
    font-size: 28px;
    margin-right: 10px;
  }
  
  .title-text {
    font-size: 22px;
    color: #1a73e8;
    font-weight: bold;
  }
  
  .input-container {
    width: 100%;
    margin-bottom: 20px;
    position: relative;
  }
  
  .input-field {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 0 15px;
    font-size: 16px;
    background-color: white;
  }
  
  .code-container {
    display: flex;
    align-items: center;
  }
  
  .get-code-btn {
    position: absolute;
    right: 10px;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    background: transparent;
    color: #1a73e8;
    font-size: 14px;
    border: none;
  }
  
  .login-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #1a73e8;
    color: white;
    border-radius: 8px;
    font-size: 18px;
    margin-top: 30px;
    border: none;
  }
  
  .login-btn:active {
    opacity: 0.8;
  }
</style>
`;
