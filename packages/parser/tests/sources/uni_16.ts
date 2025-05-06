export const uni_16 = `
<template>
  <view class="login-container">
    <view class="logo">
      <image src="https://picsum.photos/200/200?random=1" mode="aspectFit" />
    </view>
    <view class="form">
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
        />
      </view>
      <button 
        class="login-btn" 
        @click="handleLogin"
      >
        登录
      </button>
    </view>
  </view>
</template>
<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Login',
    setup(props) {
      const provider = useProvider({ id: '14z8cyzp', version: '' });
      const state = reactive({
        username: '',
        password: ''
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
        
        // 这里可以添加登录逻辑
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
          this.$router.push('/home');
        }, 1500);
      }
    }
  });
</script>
<style lang="css" scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .logo {
    margin-bottom: 50px;
  }
  
  .logo image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  
  .form {
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .input-group {
    margin-bottom: 20px;
    width: 100%;
  }
  
  .input {
    width: 100%;
    height: 45px;
    padding: 0 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
  }
  
  .login-btn {
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #fff;
    background-color: #007aff;
    border-radius: 4px;
    margin-top: 20px;
  }
</style>
`;
