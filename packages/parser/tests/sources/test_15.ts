export const test_15 = `
<template>
  <!-- 其他部分保持不变 -->
  <div 
    class="center-panel"
    @dragover.prevent
    @dragenter.prevent
    @drop="handleDrop"
  >
    <h3>画布区域</h3>
    <div 
      class="canvas"
      ref="canvas"
    >
      <div 
        v-for="(item, index) in state.canvasComponents"
        :key="item.id"
        class="canvas-component"
        :style="getComponentStyle(item)"
        @click="selectComponent(index)"
        :class="{ selected: state.selectedIndex === index }"
        @mousedown="startDrag(index, $event)"
      >
        <div class="component-title">{{ item.name }}</div>
        <component 
          :is="getComponentType(item.type)" 
          v-bind="getComponentProps(item)"
          :style="getInnerComponentStyle(item)"
        />
        <div class="resize-handle" @mousedown.stop="startResize(index, $event)"></div>
      </div>
    </div>
  </div>
  <!-- 其他部分保持不变 -->
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';

export default defineComponent({
  name: 'FormDesigner',
  setup(props) {
    const provider = useProvider({ id: 'j4pp19ow', version: '1745921777318' });
    const state = reactive({
      // 原有状态保持不变
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      dragComponentIndex: -1,
      originalX: 0,
      originalY: 0
    });
    return { state, props, provider };
  },
  methods: {
    // 新增拖动相关方法
    startDrag(index, event) {
      if (event.target.classList.contains('resize-handle')) return;
      
      this.state.isDragging = true;
      this.state.dragComponentIndex = index;
      this.state.dragStartX = event.clientX;
      this.state.dragStartY = event.clientY;
      this.state.originalX = this.state.canvasComponents[index].x;
      this.state.originalY = this.state.canvasComponents[index].y;
      
      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    handleDrag(event) {
      if (!this.state.isDragging) return;
      
      const deltaX = event.clientX - this.state.dragStartX;
      const deltaY = event.clientY - this.state.dragStartY;
      
      this.state.canvasComponents[this.state.dragComponentIndex].x = 
        this.state.originalX + deltaX;
      this.state.canvasComponents[this.state.dragComponentIndex].y = 
        this.state.originalY + deltaY;
    },
    stopDrag() {
      this.state.isDragging = false;
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    // 其他方法保持不变
  },
  mounted() {
    // 原有mounted内容保持不变
    document.addEventListener('mouseup', this.stopDrag);
  },
  beforeUnmount() {
    // 原有beforeUnmount内容保持不变
    document.removeEventListener('mouseup', this.stopDrag);
  }
});
</script>

<style lang="css" scoped>
/* 原有样式保持不变，新增拖动相关样式 */
.canvas-component {
  cursor: move;
  user-select: none;
}

.canvas-component.dragging {
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
`;
