export const uni_24 = `
<template>
  <view class="login-container">
    <view class="login-form">
      <view class="logo">
        <image
          src="https://picsum.photos/200/200?random=1"
          mode="aspectFit"
          class="logo-image"></image>
      </view>
      <view class="form-item">
        <VanField
          v-model="state.username"
          label="用户名"
          placeholder="请输入用户名"
          clearable />
      </view>
      <view class="form-item">
        <VanField
          v-model="state.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          clearable />
      </view>
      <view class="form-item">
        <VanButton
          type="primary"
          block
          :loading="state.loading"
          @click="handleLogin">
          登录
        </VanButton>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/uni-app';
  import { Field as VanField, Button as VanButton } from 'vant';
  import { debounce } from '@vtj/utils';

  export default defineComponent({
    name: 'Login',
    components: {
      VanField,
      VanButton
    },
    setup(props) {
      const provider = useProvider({ id: '15dg9eu0', version: '1747358146525' });
      const state = reactive({
        username: '',
        password: '',
        loading: false
      });
      return { state, props, provider };
    },
    methods: {
      handleLogin: debounce(function() {
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
          uni.reLaunch({
            url: '/pages/index/index'
          });
        }, 1500);
      }, 300)
    }
  });
</script>

<style lang="css" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  .login-form {
    width: 80%;
    max-width: 400px;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  .logo-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .form-item {
    margin-bottom: 20px;
  }
</style>
`;
