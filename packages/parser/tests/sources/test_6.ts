export const test_6 = `
<template>
  <div class="slogan-container">
    <div class="particles-bg"></div>
    <div class="content">
      <h1 class="main-title">
        <span class="title-word"><i>AI</i><i>11</i></span>
        <span class="plus">+</span>
        <span class="title-word">低代码</span>
      </h1>
      <p class="subtitle">所想即所见，融合双核优势</p>
      <p class="description">打造高生产力研发平台</p>
      <div class="tech-circle"></div>
      <div class="tech-circle small"></div>
      <div class="tech-circle large"></div>
    </div>
  </div>
</template>
<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Slogan',
    setup(props) {
      const provider = useProvider({ id: '14gkh0i4', version: '1745369911162' });
      const state = reactive({
        show: false
      });
      return { state, props, provider };
    },
    methods: {
      animateElements() {
        const elements = document.querySelectorAll('.title-word, .plus, .subtitle, .description');
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animate');
          }, index * 300);
        });
      }
    },
    mounted() {
      this.animateElements();
    }
  });
</script>
<style lang="css" scoped>
  .slogan-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Arial', sans-serif;
  }

  .particles-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><circle cx="10%" cy="20%" r="2" fill="rgba(255,255,255,0.2)"/><circle cx="80%" cy="30%" r="3" fill="rgba(255,255,255,0.3)"/><circle cx="30%" cy="70%" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="60%" cy="50%" r="2" fill="rgba(255,255,255,0.2)"/><circle cx="90%" cy="80%" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: float 20s infinite linear;
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }

    50% {
      transform: translateY(-50px) translateX(50px);
    }

    100% {
      transform: translateY(0) translateX(0);
    }
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    padding: 20px;
  }

  .main-title {
    font-size: 4rem;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .title-word {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .title-word.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .title-word:nth-child(1) {
    color: #4fc3f7;
  }

  .title-word:nth-child(3) {
    color: #66bb6a;
  }

  .plus {
    opacity: 0;
    transform: scale(0);
    transition: all 0.8s ease;
    color: #ff7043;
    font-size: 3.5rem;
  }

  .plus.animate {
    opacity: 1;
    transform: scale(1);
  }

  .subtitle {
    font-size: 2rem;
    margin-bottom: 15px;
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.8s ease 0.6s;
  }

  .subtitle.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .description {
    font-size: 1.5rem;
    color: #b39ddb;
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.8s ease 0.9s;
  }

  .description.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .tech-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: rotate 20s linear infinite;
  }

  .tech-circle::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #4fc3f7;
    border-radius: 50%;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .tech-circle.small {
    width: 200px;
    height: 200px;
    top: 20%;
    left: 10%;
    animation-delay: 0.5s;
  }

  .tech-circle.large {
    width: 400px;
    height: 400px;
    bottom: 10%;
    right: 10%;
    animation-direction: reverse;
  }

  .tech-circle {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>
`;
