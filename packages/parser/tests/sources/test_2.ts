export const test_2 = `
<template>
      <el-form 
        :model="state.form" 
        :rules="state.rules" 
        ref="loginForm"
        @submit.prevent="submitForm"
        class="login-form"
      >
      </el-form>

</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  import { User, Lock } from '@element-plus/icons-vue';
  import { useProvider } from '@vtj/renderer';

  export default defineComponent({
    name: 'LoginPage',
    components: {
      ElForm,
      ElFormItem,
      ElInput,
      ElButton,
      User,
      Lock
    },
    setup(props) {
      const provider = useProvider({ id: 'lvw0jl2df', version: '' });
      const state = reactive({
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        },
        loading: false
      });
      return { state, props, provider };
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
        }
      }
    }
  });
</script>

<style lang="css" scoped>

</style>

`;
