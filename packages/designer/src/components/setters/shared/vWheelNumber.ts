import type { Directive, DirectiveBinding } from 'vue';

interface WheelOptions {
  step?: number;
  min?: number;
  max?: number;
  ignoreClass?: string;
}

export const vWheelNumber: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<WheelOptions | number>) {
    // 解析配置参数
    const options: WheelOptions = {};

    if (typeof binding.value === 'number') {
      options.step = binding.value;
    } else if (typeof binding.value === 'object') {
      Object.assign(options, binding.value);
    }

    const step = options.step || 1;
    const min = options.min ?? -Infinity;
    const max = options.max ?? Infinity;
    const ignoreClass = options.ignoreClass || 'ignore-wheel';

    // 查找真正的输入元素
    let input: HTMLInputElement | null = null;

    // 处理 ElementPlus 的 ElInput 组件
    if (el.classList.contains('el-input')) {
      input = el.querySelector('.el-input__inner') as HTMLInputElement;
    }
    // 处理原生 input 或 textarea
    else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      input = el as HTMLInputElement;
    }

    const targetElement = input || el;
    let timer: NodeJS.Timeout | null = null
    let lastScrollTime = 0;
    let isFastScroll = false;
    // 处理滚轮事件
    const handleWheel = (e: WheelEvent) => {
      // 如果事件发生在忽略类元素上，则跳过
      if ((e.target as HTMLElement).classList.contains(ignoreClass)) {
        return;
      }

      e.preventDefault();
      const now = Date.now();
      const timeDiff = now - lastScrollTime;
      lastScrollTime = now;
      
      // 检测是否为快速滚动（两次滚动间隔小于100ms）
      isFastScroll = timeDiff > 0 && timeDiff < 100;
      // 获取当前值
      let currentValue: number;
      if (input) {
        currentValue = parseFloat(input.value);
      } else {
        currentValue = parseFloat(el.textContent || '0');
      }

      if (isNaN(currentValue)) currentValue = 0;
       
      // 基础变化量总是1
      let change = step;
            
      // 只有确认为快速滚动时才增加变化量
      if (isFastScroll) {
          // 计算额外变化量
          const speedFactor = Math.min(1, 100 / timeDiff);
          change += Math.floor(speedFactor * (step * 5));
      }
            
      // 根据滚轮方向计算新值
      let newValue = currentValue + (e.deltaY < 0 ? change : -change);

      // 应用边界限制
      if (newValue < min) newValue = min;
      if (newValue > max) newValue = max;

      // 保留两位小数避免浮点精度问题
      newValue = parseFloat(newValue.toFixed(10));

      // 更新值
      if (input) {
        input.value = newValue.toString();
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          input.dispatchEvent(new Event('input'));
          input.dispatchEvent(new Event('change'));
        }, 500)
      } else {
        el.textContent = newValue.toString();
      }

      // 添加视觉反馈
      targetElement.classList.add('wheel-number-active');
      setTimeout(() => {
        targetElement.classList.remove('wheel-number-active');
      }, 200);
    };

    // 添加事件监听
    targetElement.addEventListener('wheel', handleWheel, { passive: false });

    // 保存处理函数以便卸载时使用
    targetElement._wheelHandler = handleWheel;
  },

  unmounted(el: HTMLElement) {
    // 查找真正的输入元素
    let targetElement: HTMLElement | null = el;

    // 处理 ElementPlus 的 ElInput 组件
    if (el.classList.contains('el-input')) {
      targetElement = el.querySelector('.el-input__inner');
    }

    if (targetElement && targetElement._wheelHandler) {
      targetElement.removeEventListener('wheel', targetElement._wheelHandler);
      delete targetElement._wheelHandler;
    }
  }
};

// 扩展HTMLElement类型以存储事件处理器
declare global {
  interface HTMLElement {
    _wheelHandler?: (e: WheelEvent) => void;
  }
}
