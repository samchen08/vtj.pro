export const uni_13 = `
<template>
  <view class="login-container">
    <view class="logo">
      <image src="https://picsum.photos/200/200?random=1" mode="aspectFit" class="logo-image"></image>
    </view>
    <view class="form-container">
      <view class="input-group">
        <input 
          v-model="state.username" 
          placeholder="请输入用户名" 
          class="input"
          type="text"
        />
      </view>
      <view class="input-group">
        <input 
          v-model="state.password" 
          placeholder="请输入密码" 
          class="input"
          type="password"
          password
        />
      </view>
      <button 
        class="login-btn" 
        @click="handleLogin"
        :disabled="state.loading"
      >
        {{ state.loading ? '登录中...' : '登录' }}
      </button>
    </view>
    <view class="footer">
      <text class="footer-text">还没有账号？</text>
      <text class="register-text" @click="goToRegister">立即注册</text>
    </view>
  </view>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'LoginPage',
    setup(props) {
      const provider = useProvider({ id: '45u03c9c9', version: '' });
      const state = reactive({
        username: '',
        password: '',
        loading: false
      });
      return { state, props, provider };
    },
    methods: {
      handleLogin() {
        if (!this.state.username) {
          uni.showToast({
            title: '请输入用户名',
            icon: 'none'
          });
          return;
        }
        
        if (!this.state.password) {
          uni.showToast({
            title: '请输入密码',
            icon: 'none'
          });
          return;
        }

        this.state.loading = true;
        
        // 模拟登录请求
        setTimeout(() => {
          this.state.loading = false;
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          // 登录成功后跳转到首页
          uni.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      },
      goToRegister() {
        uni.navigateTo({
          url: '/pages/register/register'
        });
      }
    }
  });
</script>

<style lang="css" scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px;
    height: 100vh;
    box-sizing: border-box;
    background-color: #f5f5f5;
  }
  
  .logo {
    margin-bottom: 50px;
  }
  
  .logo-image {
    width: 120px;
    height: 120px;
    border-radius: 60px;
  }
  
  .form-container {
    width: 100%;
  }
  
  .input-group {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 15px;
  }
  
  .input {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
  
  .login-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #007aff;
    color: #fff;
    border-radius: 8px;
    font-size: 18px;
    margin-top: 30px;
  }
  
  .login-btn[disabled] {
    background-color: #cccccc;
  }
  
  .footer {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  
  .footer-text {
    color: #666;
    font-size: 14px;
  }
  
  .register-text {
    color: #007aff;
    font-size: 14px;
    margin-left: 5px;
  }
</style>
`;
