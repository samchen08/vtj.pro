<template>
  <div class="x-startup">
    <slot>
      <div>
        <div class="brand">
          <img :src="Logo" />

          <h1>{{ props.text }}</h1>
        </div>
        <ElDivider></ElDivider>
        <h3>基于 <span>Vue3 + TypeScript</span> 的低代码设计器引擎</h3>
        <div class="btn">
          <ElButton
            @click="onClick"
            type="primary"
            round
            size="large"
            :icon="VideoPlay">
            立即开始体验
          </ElButton>
        </div>
      </div>
    </slot>
    <div class="ba">
      <a href="http://beian.miit.gov.cn/">粤ICP备2023104074号</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ElButton, ElDivider } from 'element-plus';
  import { VideoPlay } from '@element-plus/icons-vue';
  import Logo from '../mask/assets/logo.png';

  export interface StartupProps {
    text?: string;
    link?: string;
  }

  const props = withDefaults(defineProps<StartupProps>(), {
    text: 'VTJ.PRO',
    link: '/'
  });

  const onClick = () => {
    location.href = props.link + '#/?startup';
  };

  defineOptions({
    name: 'XStartup'
  });
</script>
<style lang="scss">
  .x-startup {
    height: 100%;
    background-color: #ecf5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
    }

    h1 {
      font-size: 110px;
      font-weight: bold;
      color: rgb(1, 87, 254);
      text-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      margin: 0;
      text-align: center;
      line-height: 1;
    }

    h3 {
      font-size: 28px;
      color: #666;
      text-align: center;
    }
    .ba {
      position: absolute;
      height: 30px;
      line-height: 30px;
      text-align: center;
      bottom: 0;
      width: 100%;
      left: 0;
      a {
        color: #b1b3b8;
      }
    }
    .btn {
      text-align: center;
      padding-top: 20px;
      // zoom: 1.2;
      button {
        width: 200px;
      }
    }
  }
</style>
