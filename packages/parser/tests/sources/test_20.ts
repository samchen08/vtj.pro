export const test_20 = `
<template>

  <div class="login-container">

    <div class="particles" id="particles-js"></div>

    <div class="circuit-lines"></div>

    <div class="holographic-grid"></div>

    <div class="login-box">

      <div class="glow"></div>

      <div class="corner corner-tl"></div>

      <div class="corner corner-tr"></div>

      <div class="corner corner-bl"></div>

      <div class="corner corner-br"></div>

      <h1 class="title">系统<span class="highlight">登录</span></h1>

      <div class="line">

        <div class="dot"></div>

      </div>


    </div>

  </div>

</template>



<script>

  import { defineComponent, reactive, onMounted } from 'vue';

  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

  import { useProvider } from '@vtj/renderer';

  

  export default defineComponent({

    name: 'LoginPage',

    components: {

      ElForm,

      ElFormItem,

      ElInput,

      ElButton

    },

    setup(props) {

      const provider = useProvider({ id: '33b9k52j', version: '' });

      const state = reactive({

        form: {

          username: '',

          password: ''

        },

        rules: {

          username: [

            { required: true, message: '请输入用户名', trigger: 'blur' },

            { min: 3, max: 12, message: '长度应为3到12个字符', trigger: 'blur' }

          ],

          password: [

            { required: true, message: '请输入密码', trigger: 'blur' },

            { min: 6, max: 16, message: '长度应为6到16个字符', trigger: 'blur' }

          ]

        }

      });

      return { state, props, provider };

    }

  });

</script>



<style lang="css" scoped>


</style>


`;
