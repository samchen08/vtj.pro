<template>
  <XInputUnit
    clearable
    :unit="unit"
    :with-unit="!!unit"
    v-model="modelValue"
    v-wheelinput="{
      min: 0,
      status: true
    }"
    @change="onChange"
    @blur="onBlur"
    v-bind="$attrs">
  </XInputUnit>
</template>
<script lang="ts" setup>
  import { computed, ref, watch, type Directive, nextTick } from 'vue';
  import { XInputUnit } from '@vtj/ui';

  export interface Props {
    modelValue?: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['change']);
  const isPx = ref(true);
  const unit = computed(() => (isPx.value ? 'px' : undefined));

  const modelValue = ref(props.modelValue);

  const onChange = (val: any) => {
    isPx.value = !!Number(val);
  };

  const onBlur = (e: FocusEvent) => {
    const value = (e.target as HTMLInputElement).value;
    isPx.value = !!Number(value);
    const val = value ? value + unit.value : value;
    emit('change', val);
  };

  watch(modelValue, (v: any) => {
    emit('change', v);
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v) {
        isPx.value = v.endsWith('px');
        modelValue.value = v;
      }
    },
    { immediate: true }
  );

  defineOptions({
    name: 'SizeSetter'
  });

  const vWheelinput: Directive<HTMLElement> = {
    mounted(el, binding) {
      const { value } = binding;
      nextTick(() => {
        if (Object.prototype.toString.call(value) === '[object Object]') {
          const { min, max, status } = value;
          /* 是否执行指令 */
          if (status === false) {
            return false;
          }
          /* 最大值最小值控制 */
          let minValueInput = 'infinity';
          let maxValueInput = 'infinity';
          if (min !== undefined) {
            minValueInput = min;
          }
          if (max !== undefined) {
            maxValueInput = max;
          }
          let inputs: HTMLInputElement[] | HTMLCollectionOf<HTMLInputElement>;
          if (el.tagName === 'INPUT') {
            inputs = [el as HTMLInputElement];
          } else {
            inputs = el.getElementsByTagName('input');
          }
          let lastScrollTime = 0;
          let isFastScroll = false;

          // 安全转换数字函数
          const getNumberValue = (value: string) => {
            const num = parseFloat(value);
            return isNaN(num) ? 0 : num;
          };

          // 获取限制值
          const getLimitValue = (
            value: string | number
          ): number | 'infinity' => {
            if (
              typeof value === 'string' &&
              value.toLowerCase() === 'infinity'
            ) {
              return 'infinity'; // 返回"infinity"字符串
            }
            const num = typeof value === 'number' ? value : parseFloat(value);
            return isNaN(num) ? 'infinity' : num;
          };

          // 应用限制
          const applyLimits = (value: number): number => {
            const minValue = getLimitValue(minValueInput);
            const maxValue = getLimitValue(maxValueInput);
            let result = value;
            // 应用最小值限制
            if (minValue !== 'infinity' && result < minValue) {
              result = minValue;
            }
            // 应用最大值限制
            if (maxValue !== 'infinity' && result > maxValue) {
              result = maxValue;
            }
            return result;
          };
          for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            input.addEventListener(
              'wheel',
              (e: { preventDefault: () => void; deltaY: number }) => {
                e.preventDefault();
                const now = Date.now();
                const timeDiff = now - lastScrollTime;
                lastScrollTime = now;
                // 检测是否为快速滚动（两次滚动间隔小于100ms）
                isFastScroll = timeDiff > 0 && timeDiff < 100;
                // 获取当前值并转换为数字
                const currentValue = getNumberValue(input.value);
                // 基础变化量总是1
                let change = 1;
                // 只有确认为快速滚动时才增加变化量
                if (isFastScroll) {
                  // 计算额外变化量（最大额外+4，所以最快时总共+5）
                  const speedFactor = Math.min(1, 100 / timeDiff);
                  change += Math.floor(speedFactor * 4);
                }
                // 计算新值
                let newValue = currentValue + (e.deltaY < 0 ? change : -change);
                // 应用限制
                newValue = applyLimits(newValue);
                // 更新输入框值
                if (input.type === 'number') {
                  input.value = newValue + '';
                } else {
                  // 对于text类型，检查原始值是否是数字字符串
                  const originalValue = input.value.trim();
                  const isNumericString = /^-?\d*\.?\d+$/.test(originalValue);

                  if (isNumericString) {
                    // 如果是纯数字字符串，去掉前导零和小数点（如果是整数）
                    input.value =
                      newValue % 1 === 0
                        ? newValue.toString()
                        : newValue.toFixed(2);
                  } else {
                    // 如果不是纯数字，直接显示计算后的数字
                    input.value = newValue + '';
                  }
                }
              }
            );
          }
        }
      });
    }
  };
</script>
