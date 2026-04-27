export const test_27 = `
<template>
  <div class="love-rain" v-if="state.isActive">
    <div
      v-for="(heart, index) in state.hearts"
      :key="index"
      class="heart-rain-item"
      :style="heart.style"
    >
      ❤️
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
export default defineComponent({
  name: 'LoveRainBlock',
  setup(props) {
    const provider = useProvider({ id: '5j4fo4ck', version: '' });
    const state = reactive({
      isActive: false,
      hearts: []
    });
    return { state, props, provider };
  },
  methods: {
    startRain() {
      this.state.isActive = true;
      this.state.hearts = [];
      const count = 60;
      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 4 + Math.random() * 6;
        const size = 16 + Math.random() * 24;
        const opacity = 0.4 + Math.random() * 0.6;
        this.state.hearts.push({
          style: {
            left: \`\${left}%\`,
            animationDelay: \`\${delay}s\`,
            animationDuration: \`\${duration}s\`,
            fontSize: \`\${size}px\`,
            opacity
          }
        });
      }
    },
    stopRain() {
      this.state.isActive = false;
      this.state.hearts = [];
    }
  }
});
</script>
<style lang="css" scoped>
.love-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}
.heart-rain-item {
  position: absolute;
  top: -40px;
  animation: heartFall linear infinite;
}
@keyframes heartFall {
  0% {
    transform: translateY(-40px) rotate(0deg) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg) scale(1.2);
    opacity: 0;
  }
}
</style>
`;
