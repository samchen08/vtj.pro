export const test_1 = `
<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">系统登录</h1>
      <el-form 
        :model="state.form" 
        :rules="state.rules" 
        ref="loginForm"
        @submit.prevent="submitForm"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="state.form.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            class="input-with-icon"
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="state.form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            class="input-with-icon"
          ></el-input>
        </el-form-item>

        <el-form-item prop="captcha">
          <div class="captcha-container">
            <div class="captcha-image"></div>
            <el-slider
              v-model="state.sliderValue"
              :min="0"
              :max="200"
              :format-tooltip="formatTooltip"
              @change="handleCaptchaVerify"
              class="captcha-slider"
            ></el-slider>
            <div class="captcha-hint" v-if="!state.captchaVerified">
              请拖动滑块完成验证
            </div>
            <div class="captcha-success" v-else>
              <el-icon color="#67C23A"><CircleCheck /></el-icon>
              验证通过
            </div>
          </div>
        </el-form-item>
        
        <el-button
          native-type="submit"
          type="primary"
          class="login-btn"
          :loading="state.loading"
          :disabled="!state.captchaVerified"
        >
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElSlider, ElIcon } from 'element-plus';
import { User, Lock, CircleCheck } from '@element-plus/icons-vue';
import { useProvider } from '@vtj/renderer';

export default defineComponent({
  name: 'LoginPage',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSlider,
    ElIcon,
    User,
    Lock,
    CircleCheck
  },
  setup(props) {
    const provider = useProvider({ id: 'lvw0jl2df', version: '' });
    const state = reactive({
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        captcha: [
          { validator: validateCaptcha, trigger: 'change' }
        ]
      },
      loading: false,
      sliderValue: 0,
      captchaOffset: Math.floor(Math.random() * 100),
      captchaVerified: false,
      targetPosition: 0
    });

    function validateCaptcha(rule, value, callback) {
      if (!state.captchaVerified) {
        callback(new Error('请完成验证码验证'));
      } else {
        callback();
      }
    }

    function formatTooltip(val) {
      return val === state.targetPosition ? '验证通过' : '';
    }

    function handleCaptchaVerify(val) {
      // 允许±5的误差范围
      if (Math.abs(val - state.targetPosition) <= 5) {
        state.captchaVerified = true;
        state.form.captcha = 'verified';
      } else {
        state.sliderValue = 0;
      }
    }

    function resetCaptcha() {
      state.sliderValue = 0;
      state.captchaVerified = false;
      state.captchaOffset = Math.floor(Math.random() * 100);
      state.targetPosition = Math.floor(Math.random() * 180) + 20;
    }

    onMounted(() => {
      resetCaptcha();
    });

    return { 
      state, 
      props, 
      provider,
      handleCaptchaVerify,
      formatTooltip
    };
  },
  methods: {
    async submitForm() {
      try {
        const valid = await this.$refs.loginForm.validate();
        if (valid) {
          this.state.loading = true;
          // 模拟登录请求
          setTimeout(() => {
            this.state.loading = false;
            this.$router.push('/');
          }, 1000);
        }
      } catch (error) {
        console.log('表单验证失败', error);
        this.resetCaptcha();
      }
    },
    resetCaptcha() {
      this.state.sliderValue = 0;
      this.state.captchaVerified = false;
      this.state.captchaOffset = Math.floor(Math.random() * 100);
      this.state.targetPosition = Math.floor(Math.random() * 180) + 20;
    }
  }
});
</script>

<style lang="css" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
  position: relative;
}

.login-container::before,
.login-container::after {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(0, 150, 255, 0.15) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
  top: -25%;
  left: -25%;
}

.login-container::after {
  background: radial-gradient(circle, rgba(100, 255, 200, 0.1) 0%, transparent 70%);
  animation: rotate 40s linear infinite reverse;
  animation-delay: 5s;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.login-card {
  position: relative;
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.title {
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
}

.login-form {
  margin-top: 20px;
}

.input-with-icon :deep(.el-input__inner) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.input-with-icon :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.input-with-icon :deep(.el-input__prefix) {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
}

.captcha-container {
  width: 100%;
  margin-top: 10px;
}

.captcha-image {
  width: 100%;
  height: 40px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="40" viewBox="0 0 300 40"><rect width="300" height="40" fill="%23222"/><path d="M0,20 Q75,40 150,20 T300,20" stroke="%2300c6ff" stroke-width="2" fill="none"/><circle cx="150" cy="20" r="5" fill="%230072ff"/></svg>');
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.captcha-slider :deep(.el-slider__runway) {
  background-color: rgba(255, 255, 255, 0.1);
  height: 6px;
}

.captcha-slider :deep(.el-slider__bar) {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  height: 6px;
}

.captcha-slider :deep(.el-slider__button) {
  width: 20px;
  height: 20px;
  border: 2px solid #0072ff;
  background-color: #00c6ff;
}

.captcha-hint, .captcha-success {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.captcha-success {
  color: #67C23A;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.login-btn {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  letter-spacing: 2px;
  transition: all 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 114, 255, 0.4);
}

.login-btn:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  transform: none;
  box-shadow: none;
  cursor: not-allowed;
}
</style>


`;
