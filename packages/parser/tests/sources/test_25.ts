export const test_25 = `
<template>
  <div class="container">
    <!-- Background Elements -->
    <div class="bg-gradient"></div>
    <div class="bg-particles"></div>

    <!-- Header Section -->
    <header class="header">
      <div class="logo-container">
        <div class="logo-wrapper">
          <span class="logo-vtj">VTJ</span>
          <span class="logo-dot">.</span>
          <span class="logo-pro">PRO</span>
        </div>
        <div class="logo-tag">
          <span class="logo-ai">AI</span>
          <span class="logo-plus">+</span>
          <span class="logo-lowcode">低代码</span>
        </div>
      </div>
      <p class="tagline">所想即所见, 融合双核优势, 打造高生产力研发平台</p>
      <div class="buttons">
        <button class="btn-primary" @click="navigateTo('quick-start')">
          <span>快速开始</span>
          <XIcon :icon="VtjIconArrowRight" :size="16" />
        </button>
        <button class="btn-secondary" @click="navigateTo('demo')">
          <span>在线体验</span>
        </button>
        <button class="btn-secondary" @click="navigateTo('repository')">
          <span>源码仓库</span>
        </button>
      </div>
    </header>

    <!-- Features Grid Section -->
    <div class="features-grid" v-if="state.features && state.features.length">
      <div 
        class="feature-card" 
        v-for="(feature, index) in state.features" 
        :key="index"
        :style="{ '--delay': index * 0.1 + 's' }"
      >
        <div class="feature-icon">
          <XIcon :icon="feature.icon" :size="40" />
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.desc }}</p>
        <div class="feature-hover"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { XIcon } from '@vtj/ui';
  import { 
    VtjIconComponents, 
    VtjIconTemplate, 
    VtjIconBlock, 
    VtjIconData, 
    VtjIconOutline, 
    VtjIconDocument,
    VtjIconArrowRight
  } from '@vtj/icons';

  export default defineComponent({
    name: 'VtjPro',
    components: {
      XIcon
    },
    setup(props) {
      const provider = useProvider({ id: '35newr5i', version: '1747960506587' });
      const state = reactive({
        features: [
          {
            icon: VtjIconComponents,
            title: "流行的技术栈",
            desc: "基于Vue3、TypeScript等现代前端技术"
          },
          {
            icon: VtjIconTemplate,
            title: "自由个性化",
            desc: "完全自定义UI和交互体验"
          },
          {
            icon: VtjIconBlock,
            title: "低学习成本",
            desc: "简单易上手，快速构建应用"
          },
          {
            icon: VtjIconData,
            title: "高扩展性",
            desc: "轻松扩展功能和组件"
          },
          {
            icon: VtjIconOutline,
            title: "无污染, 可二开",
            desc: "干净代码，方便二次开发"
          },
          {
            icon: VtjIconDocument,
            title: "物料丰富",
            desc: "大量预设组件和模板"
          }
        ]
      });
      
      // 确保features数组始终存在
      if (!state.features) {
        state.features = [];
      }
      
      return { 
        state, 
        props, 
        provider,
        VtjIconComponents,
        VtjIconTemplate,
        VtjIconBlock,
        VtjIconData,
        VtjIconOutline,
        VtjIconDocument,
        VtjIconArrowRight
      };
    },
    methods: {
      navigateTo(route) {
        // 导航方法
        console.log('Navigating to:', route);
      }
    }
  });
</script>

<style lang="css" scoped>
  /* 样式部分保持不变 */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .container {
    background-color: #0f0f13;
    min-height: 100vh;
    padding: 60px 20px;
    color: #ffffff;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .bg-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0f 100%);
    z-index: -2;
  }

  .bg-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 20% 30%, rgba(156, 39, 176, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.1) 0%, transparent 50%);
    z-index: -1;
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
  }

  .header {
    text-align: center;
    margin-bottom: 80px;
    animation: fadeIn 0.8s ease-out;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    position: relative;
  }

  .logo-vtj {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(90deg, #9c27b0, #673ab7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
  }

  .logo-dot {
    font-size: 48px;
    font-weight: 800;
    color: #21cbf3;
    margin: 0 2px;
    position: relative;
    z-index: 1;
  }

  .logo-pro {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(90deg, #2196f3, #21cbf3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
  }

  .logo-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo-ai {
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(90deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .logo-plus {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 6px;
  }

  .logo-lowcode {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
  }

  .logo-wrapper::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -20px;
    right: -20px;
    bottom: -10px;
    background: linear-gradient(45deg, 
      rgba(156, 39, 176, 0.2) 0%, 
      rgba(33, 150, 243, 0.2) 50%, 
      rgba(33, 203, 243, 0.2) 100%);
    border-radius: 50px;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .logo-wrapper:hover::after {
    opacity: 1;
  }

  .tagline {
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    margin-bottom: 40px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  button {
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  button:hover::before {
    transform: translateX(100%);
  }

  .btn-primary {
    background: linear-gradient(45deg, #2196f3, #21cbf3);
    color: white;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-primary:hover, .btn-secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: rgba(37, 37, 37, 0.6);
    border-radius: 16px;
    padding: 40px 30px;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    animation: fadeIn 0.6s ease-out;
    animation-fill-mode: both;
    animation-delay: var(--delay);
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #9c27b0, #2196f3, #21cbf3);
    z-index: -1;
    border-radius: 18px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature-card:hover::before {
    opacity: 0.6;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .feature-icon {
    margin-bottom: 25px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .feature-card:hover .feature-icon {
    background: linear-gradient(45deg, #9c27b0, #2196f3);
    transform: scale(1.1);
  }

  .feature-title {
    font-size: 22px;
    margin-bottom: 15px;
    color: #ffffff;
    font-weight: 600;
  }

  .feature-desc {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    line-height: 1.6;
  }

  .feature-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature-card:hover .feature-hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .logo-container {
      flex-direction: column;
      gap: 5px;
    }
    
    .logo-vtj,
    .logo-dot,
    .logo-pro {
      font-size: 36px;
    }
    
    .logo-ai,
    .logo-plus,
    .logo-lowcode {
      font-size: 16px;
    }
    
    .logo-tag {
      padding: 6px 12px;
    }
    
    .buttons {
      flex-direction: column;
      align-items: center;
    }
    
    button {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
`;
