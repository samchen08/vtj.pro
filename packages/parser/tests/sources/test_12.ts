export const test_12 = `
<template>
  <div class="container">
    <header class="header">
      <h1 class="title">VTJ.PRO</h1>
      <h2 class="subtitle">低代码开发工具 (Low-Code Development Tools)</h2>
      <p class="description">基于 Vue3 + TypeScript 打造高生产力低代码研发平台 (Based on Vue3 + TypeScript to create a high-productivity low-code development platform)</p>
      <div class="buttons">
        <button class="button">快速开始 (Quick Start)</button>
        <button class="button primary">★ 在线体验 (Online Experience)</button>
        <button class="button">源码仓库 (Source Code Repository)</button>
      </div>
    </header>

    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">📚</div>
        <h3 class="feature-title">流行的技术栈 (Popular Technology Stack)</h3>
        <p class="feature-desc">基于Vue3+TypeScript等流行技术构建</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3 class="feature-title">自由个性化 (Free Personalization)</h3>
        <p class="feature-desc">完全自定义UI和交互体验</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📖</div>
        <h3 class="feature-title">低学习成本 (Low Learning Cost)</h3>
        <p class="feature-desc">简单易上手，快速入门</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔌</div>
        <h3 class="feature-title">高扩展性 (High Scalability)</h3>
        <p class="feature-desc">支持插件扩展，满足各种需求</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🧩</div>
        <h3 class="feature-title">无污染, 可二开 (No Pollution, Re-development)</h3>
        <p class="feature-desc">不污染原生代码，可二次开发</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📦</div>
        <h3 class="feature-title">物料丰富 (Rich Materials)</h3>
        <p class="feature-desc">提供丰富的组件和模板资源</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Bbb',
    setup(props) {
      const provider = useProvider({ id: '14mdd4qw', version: '1745720846428' });
      const state = reactive({});
      return { state, props, provider };
    }
  });
</script>

<style lang="css" scoped>
  .container {
    background-color: #121212;
    color: #ffffff;
    min-height: 100vh;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #cccccc;
  }

  .description {
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #aaaaaa;
    line-height: 1.6;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .button {
    padding: 0.75rem 1.5rem;
    border: 1px solid #444;
    background-color: #222;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .button:hover {
    background-color: #333;
  }

  .button.primary {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    border-color: transparent;
  }

  .button.primary:hover {
    opacity: 0.9;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 2rem;
    transition: transform 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  .feature-desc {
    color: #aaaaaa;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .button {
      width: 100%;
      max-width: 300px;
    }
  }
</style>

`;
