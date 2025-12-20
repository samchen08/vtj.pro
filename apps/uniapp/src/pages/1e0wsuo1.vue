<template>
  <view class="login-container">
    <view class="logo-section">
      <image
        class="logo"
        src="https://picsum.photos/120/120?random=0"
        alt="应用Logo"
        mode="aspectFit"></image>
      <text class="app-name"> 用户登录</text></view
    >
    <view class="form-section">
      <view class="input-group">
        <uni-icons
          class="input-icon"
          type="person"
          size="20"
          color="#999"></uni-icons>
        <input
          v-model="state.username"
          class="input-field"
          type="text"
          placeholder="请输入用户名/手机号"
          placeholder-style="color: #ccc"
      /></view>
      <view class="input-group">
        <uni-icons
          class="input-icon"
          type="locked"
          size="20"
          color="#999"></uni-icons>
        <input
          v-model="state.password"
          class="input-field"
          type="password"
          placeholder="请输入密码"
          placeholder-style="color: #ccc"
          :password="true"
      /></view>
      <view class="remember-section">
        <checkbox-group @change="toggleRemember">
          <label class="checkbox-label">
            <checkbox
              :checked="state.rememberPassword"
              color="#007AFF"></checkbox>
            <text class="checkbox-text"> 记住密码</text></label
          ></checkbox-group
        >
        <text class="forgot-password" @click="goToForgotPassword">
          忘记密码？</text
        ></view
      >
      <button
        :class="
          Object.assign(
            { 'login-btn': true },
            { 'login-btn-disabled': !state.canLogin }
          )
        "
        :disabled="!state.canLogin"
        @click="handleLogin">
        登录
      </button>
      <view class="register-section">
        <text class="register-text"> 还没有账号？</text>
        <text class="register-link" @click="goToRegister"> 立即注册</text></view
      >
      <view class="third-party-section">
        <text class="divider-text"> 其他方式登录</text>
        <view class="third-party-icons">
          <view class="icon-item" @click="click_23e0x5jfb">
            <uni-icons type="weixin" size="30" color="#07C160"></uni-icons>
            <text class="icon-text"> 微信</text></view
          >
          <view class="icon-item" @click="click_26e0x5jfb">
            <uni-icons type="qq" size="30" color="#12B7F5"></uni-icons>
            <text class="icon-text"> QQ</text></view
          >
          <view class="icon-item" @click="click_29e0x5jfb">
            <uni-icons type="weibo" size="30" color="#E6162D"></uni-icons>
            <text class="icon-text"> 微博</text></view
          ></view
        ></view
      ></view
    >
    <view class="agreement-section">
      <checkbox-group @change="toggleAgreement">
        <label class="agreement-label">
          <checkbox :checked="state.agreed" color="#007AFF"></checkbox>
          <text class="agreement-text">
            <span> 我已阅读并同意</span>
            <text class="agreement-link" @click="showUserAgreement">
              《用户协议》</text
            >
            <span> 和</span>
            <text class="agreement-link" @click="showPrivacyPolicy">
              《隐私政策》</text
            ></text
          ></label
        ></checkbox-group
      ></view
    ></view
  >
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  export default defineComponent({
    name: 'Login',
    setup(props) {
      const provider = useProvider({ id: '1e0wsuo1', version: '1766191438651' });
      const state = reactive({
        username: '',
        password: '',
        rememberPassword: false,
        agreed: false,
        canLogin: false
      });
      return { state, props, provider };
    },
    computed: {
      watcher_1ce0x5jf5() {
        return this.state.username;
      },
      watcher_1de0x5jf5() {
        return this.state.password;
      },
      watcher_1ee0x5jf5() {
        return this.state.agreed;
      }
    },
    methods: {
      click_23e0x5jfb($event) {
        this.thirdPartyLogin('wechat');
      },
      click_26e0x5jfb($event) {
        this.thirdPartyLogin('qq');
      },
      click_29e0x5jfb($event) {
        this.thirdPartyLogin('weibo');
      },
      checkLoginStatus() {
        this.state.canLogin =
          this.state.username.trim().length > 0 &&
          this.state.password.trim().length >= 6 &&
          this.state.agreed;
      },
      async handleLogin() {
        if (!this.state.canLogin) return;
        uni.showLoading({ title: '登录中...', mask: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          uni.hideLoading();
          uni.showToast({ title: '登录成功', icon: 'success', duration: 1500 });
          setTimeout(() => {
            uni.switchTab({ url: '/pages/tabbar/home' });
          }, 1500);
        } catch (error) {
          uni.hideLoading();
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'error',
            duration: 2000
          });
        }
      },
      toggleRemember(e) {
        this.state.rememberPassword = e.detail.value.length > 0;
      },
      toggleAgreement(e) {
        this.state.agreed = e.detail.value.length > 0;
      },
      goToForgotPassword() {
        uni.navigateTo({ url: '/pages/forgot-password' });
      },
      goToRegister() {
        uni.navigateTo({ url: '/pages/register' });
      },
      thirdPartyLogin(type) {
        uni.showToast({
          title: `${type}登录功能开发中`,
          icon: 'none',
          duration: 1500
        });
      },
      showUserAgreement() {
        uni.navigateTo({
          url: '/pages/webview?url=https://example.com/user-agreement'
        });
      },
      showPrivacyPolicy() {
        uni.navigateTo({
          url: '/pages/webview?url=https://example.com/privacy-policy'
        });
      }
    },
    mounted() {
      const savedUsername = uni.getStorageSync('savedUsername');
      const savedPassword = uni.getStorageSync('savedPassword');
      const remember = uni.getStorageSync('rememberPassword');
      if (remember && savedUsername && savedPassword) {
        this.state.username = savedUsername;
        this.state.password = savedPassword;
        this.state.rememberPassword = true;
      }
      this.checkLoginStatus();
    },
    beforeUnmount() {
      if (this.state.rememberPassword) {
        uni.setStorageSync('savedUsername', this.state.username);
        uni.setStorageSync('savedPassword', this.state.password);
        uni.setStorageSync('rememberPassword', true);
      } else {
        uni.removeStorageSync('savedUsername');
        uni.removeStorageSync('savedPassword');
        uni.removeStorageSync('rememberPassword');
      }
    }
  })
</script>
<style lang="css" scoped>
  .login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  /* Logo区域 */
  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    margin-bottom: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  .app-name {
    font-size: 24px;
    font-weight: bold;
    color: white;
    letter-spacing: 1px;
  }
  /* 表单区域 */
  .form-section {
    background: white;
    border-radius: 12px;
    padding: 30px 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  .input-group {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 25px;
    padding-bottom: 10px;
  }
  .input-group:last-of-type {
    margin-bottom: 15px;
  }
  .input-icon {
    margin-right: 10px;
    flex-shrink: 0;
  }
  .input-field {
    flex: 1;
    height: 30px;
    font-size: 16px;
    color: #333;
  }
  .input-field::placeholder {
    color: #ccc;
  }
  /* 记住密码区域 */
  .remember-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .checkbox-label {
    display: flex;
    align-items: center;
  }
  .checkbox-text {
    font-size: 14px;
    color: #666;
    margin-left: 5px;
  }
  .forgot-password {
    font-size: 14px;
    color: #007aff;
    text-decoration: underline;
  }
  /* 登录按钮 */
  .login-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    height: 45px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  .login-btn-disabled {
    background: #ccc !important;
    box-shadow: none !important;
    opacity: 0.7;
  }
  /* 注册引导 */
  .register-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .register-text {
    font-size: 14px;
    color: #666;
  }
  .register-link {
    font-size: 14px;
    color: #007aff;
    font-weight: bold;
    margin-left: 5px;
    text-decoration: underline;
  }
  /* 第三方登录 */
  .third-party-section {
    text-align: center;
  }
  .divider-text {
    display: block;
    font-size: 13px;
    color: #999;
    margin-bottom: 20px;
    position: relative;
  }
  .divider-text::before,
  .divider-text::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #eee;
  }
  .divider-text::before {
    left: 0;
  }
  .divider-text::after {
    right: 0;
  }
  .third-party-icons {
    display: flex;
    justify-content: space-around;
    padding: 0 30px;
  }
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-text {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
  }
  /* 协议区域 */
  .agreement-section {
    margin-top: 20px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }
  .agreement-label {
    display: flex;
    align-items: flex-start;
  }
  .agreement-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
    margin-left: 5px;
  }
  .agreement-link {
    color: #ffd700;
    text-decoration: underline;
  }
</style>
