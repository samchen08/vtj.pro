export const test_27 = `
<template>
<div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
import { mock } from 'mockjs';
import { View, User, UserFilled, TrendCharts, ArrowUp, ArrowDown } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'StatsCard',
  emits: ['update'],
  setup(props) {
    const provider = useProvider({ id: '1j46qcbl', version: '' });
    const state = reactive({

    });
    return { state, props, provider };
  },

  methods: {
    initData() {
      const baseData = mock({
        'list|4': [
          {
            icon: () => [View, User, UserFilled]
          }
        ]
      });
    }
  }
});
</script>

<style lang="css" scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stats-card {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: cardSlideIn 0.6s ease-out both;
  animation-delay: var(--card-delay, 0s);
}

.stats-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.stats-card:hover .card-glow {
  opacity: 0.6;
}

.stats-card:hover .sparkline svg polyline {
  stroke-width: 2.5;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.3px;
}

.card-value-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
}

.card-value {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.card-unit {
  font-size: 16px;
  font-weight: 500;
  color: #9ca3af;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trend {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.trend.up {
  background: rgba(52, 211, 153, 0.15);
  color: #059669;
}

.trend.down {
  background: rgba(251, 146, 60, 0.15);
  color: #d97706;
}

.compare-text {
  font-size: 12px;
  color: #9ca3af;
}

.sparkline {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
  height: 40px;
  opacity: 0.5;
}

.sparkline svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.sparkline polyline {
  transition: all 0.3s ease;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

`;
