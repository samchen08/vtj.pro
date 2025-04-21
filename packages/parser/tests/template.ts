export const dependencies = [
  {
    package: 'vue',
    version: 'latest',
    library: 'Vue',
    urls: ['@vtj/materials/deps/vue/vue.global.prod.js'],
    assetsLibrary: 'VueMaterial',
    required: true,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: 'vue-router',
    version: 'latest',
    library: 'VueRouter',
    urls: ['@vtj/materials/deps/vue-router/vue-router.global.prod.js'],
    assetsLibrary: 'VueRouterMaterial',
    required: true,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/utils',
    version: 'latest',
    library: 'VtjUtils',
    urls: ['@vtj/materials/deps/@vtj/utils/index.umd.js'],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: '@vtj/icons',
    version: 'latest',
    library: 'VtjIcons',
    urls: [
      '@vtj/materials/deps/@vtj/icons/style.css',
      '@vtj/materials/deps/@vtj/icons/index.umd.js'
    ],
    required: true,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: '@vueuse/core',
    version: 'latest',
    library: 'VueUse',
    urls: [
      '@vtj/materials/deps/@vueuse/shared/index.iife.min.js',
      '@vtj/materials/deps/@vueuse/core/index.iife.min.js'
    ],
    required: false,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: 'element-plus',
    version: 'latest',
    library: 'ElementPlus',
    localeLibrary: 'ElementPlusLocaleZhCn',
    urls: [
      '@vtj/materials/deps/element-plus/dark/css-vars.css',
      '@vtj/materials/deps/element-plus/index.css',
      '@vtj/materials/deps/element-plus/zh-cn.js',
      '@vtj/materials/deps/element-plus/index.full.min.js'
    ],
    assetsUrl: '@vtj/materials/assets/element/index.umd.js',
    assetsLibrary: 'ElementPlusMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: 'web'
  },
  {
    package: '@vtj/ui',
    version: 'latest',
    library: 'VtjUI',
    urls: [
      '@vtj/materials/deps/vxe-table/style.min.css',
      '@vtj/materials/deps/@vtj/ui/style.css',
      '@vtj/materials/deps/xe-utils/xe-utils.umd.min.js',
      '@vtj/materials/deps/vxe-table/index.umd.min.js',
      '@vtj/materials/deps/@vtj/ui/index.umd.js'
    ],
    assetsUrl: '@vtj/materials/assets/ui/index.umd.js',
    assetsLibrary: 'VtjUIMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: 'web'
  },
  {
    package: 'ant-design-vue',
    version: 'latest',
    library: 'antd',
    urls: [
      '@vtj/materials/deps/ant-design-vue/reset.css',
      '@vtj/materials/deps/ant-design-vue/dayjs/dayjs.min.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/customParseFormat.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/weekday.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/localeData.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/weekOfYear.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/weekYear.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/advancedFormat.js',
      '@vtj/materials/deps/ant-design-vue/dayjs/plugin/quarterOfYear.js',
      '@vtj/materials/deps/ant-design-vue/antd.min.js'
    ],
    assetsUrl: '@vtj/materials/assets/antdv/index.umd.js',
    assetsLibrary: 'AntdvMaterial',
    required: false,
    official: true,
    enabled: false,
    platform: ['web']
  },
  {
    package: '@vtj/charts',
    version: 'latest',
    library: 'VtjCharts',
    urls: [
      '@vtj/materials/deps/echarts/echarts.min.js',
      '@vtj/materials/deps/@vtj/charts/index.umd.js'
    ],
    assetsUrl: '@vtj/materials/assets/charts/index.umd.js',
    assetsLibrary: 'VtjChartsMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: ['web', 'h5']
  },
  {
    package: 'mockjs',
    version: 'latest',
    library: 'Mock',
    urls: ['@vtj/materials/deps/mockjs/mock-min.js'],
    required: false,
    official: true,
    enabled: true
  }
];

export const template1 = `
<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">用户登录</h2>
      <el-form :model="state.form" :rules="state.rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="state.form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="state.form.password"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin"
            class="login-btn"
            :loading="state.loading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  export default defineComponent({
    name: 'LoginPage',
    components: {
      ElCard,
      ElForm,
      ElFormItem,
      ElInput,
      ElButton
    },
    setup(props) {
      const provider = useProvider({ id: '45tltwv09', version: '1740707174334' });
      const state = reactive({
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        loading: false
      });
      return { state, props, provider };
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.state.loading = true;
            // 这里可以添加登录逻辑
            console.log('登录信息:', this.state.form);
            // 模拟登录请求
            setTimeout(() => {
              this.state.loading = false;
              this.$message.success('登录成功');
            }, 1000);
          }
        });
      }
    }
  });
</script>
<style lang="css" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
  }
  .login-card {
    width: 400px;
    padding: 20px;
  }
  .login-title {
    text-align: center;
    margin-bottom: 30px;
    color: #409eff;
  }
  .login-btn {
    width: 100%;
  }
</style>

`;
