export const test_19 = `
<template>
  <div class="landing-page">
    <!-- 导航栏 -->
    <header class="header">
      <div class="logo">
        <XIcon :icon="VtjIconComponents" size="24"></XIcon>
        <span>LowCode Platform</span>
      </div>
      <nav class="nav">
        <a href="#features">功能</a>
        <a href="#advantages">优势</a>
        <a href="#cases">案例</a>
        <a href="#contact">联系我们</a>
      </nav>
      <button class="try-button">免费试用</button>
    </header>

    <!-- 主标题区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1>快速构建企业级应用</h1>
        <p>无需编码，拖拽式开发，让您的创意快速落地</p>
        <div class="hero-buttons">
          <button class="primary-button">立即开始</button>
          <button class="secondary-button">观看演示</button>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://picsum.photos/600/400?random=1" alt="平台界面展示">
      </div>
    </section>

    <!-- 功能介绍 -->
    <section id="features" class="features">
      <h2>核心功能</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <XIcon :icon="feature.icon" size="32"></XIcon>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 优势展示 -->
    <section id="advantages" class="advantages">
      <h2>为什么选择我们</h2>
      <div class="advantages-content">
        <div class="advantage-item" v-for="(advantage, index) in advantages" :key="index">
          <div class="advantage-number">{{ index + 1 }}</div>
          <div class="advantage-text">
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 客户案例 -->
    <section id="cases" class="cases">
      <h2>成功案例</h2>
      <div class="cases-grid">
        <div class="case-card" v-for="(caseItem, index) in cases" :key="index">
          <img :src="caseItem.image" :alt="caseItem.company">
          <div class="case-info">
            <h3>{{ caseItem.company }}</h3>
            <p>{{ caseItem.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-icons">
            <a href="#"><XIcon :icon="VtjIconShare" size="20"></XIcon></a>
            <a href="#"><XIcon :icon="VtjIconTeam" size="20"></XIcon></a>
            <a href="#"><XIcon :icon="VtjIconData" size="20"></XIcon></a>
          </div>
        </div>
      </div>

    </footer>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
import { XIcon } from '@vtj/ui';
import { 
  VtjIconComponents,
  VtjIconShare,
  VtjIconTeam,
  VtjIconData,
  VtjIconTemplate,
  VtjIconPublish,
  VtjIconPreview,
  VtjIconApi,
  VtjIconDatabase
} from '@vtj/icons';

export default defineComponent({
  name: 'Page4',
  components: {
    XIcon
  },
  setup(props) {
    const provider = useProvider({ id: '24zmgtgg', version: '1746522072310' });
    const state = reactive({});
    return { 
      state, 
      props, 
      provider,
      VtjIconComponents,
      VtjIconShare,
      VtjIconTeam,
      VtjIconData,
      VtjIconTemplate,
      VtjIconPublish,
      VtjIconPreview,
      VtjIconApi,
      VtjIconDatabase
    };
  },
  methods: {
    // 在此处添加方法
  },
  computed: {
    features() {
      return [
        {
          icon: VtjIconTemplate,
          title: '可视化设计',
          description: '拖拽组件快速构建界面，所见即所得'
        },
        {
          icon: VtjIconPublish,
          title: '一键发布',
          description: '应用开发完成后，一键发布到多端'
        },
        {
          icon: VtjIconPreview,
          title: '实时预览',
          description: '开发过程中随时预览效果，即时反馈'
        },
        {
          icon: VtjIconApi,
          title: 'API集成',
          description: '轻松连接各种API和数据源'
        },
        {
          icon: VtjIconDatabase,
          title: '数据管理',
          description: '内置强大的数据模型管理功能'
        },
        {
          icon: VtjIconComponents,
          title: '组件库',
          description: '丰富的预制组件，满足各种业务场景'
        }
      ];
    },
    advantages() {
      return [

      ];
    },
    cases() {
      return [

      ];
    }
  }
});
</script>

<style lang="css" scoped>

</style>

`;
