<template>
  <Panel title="尺寸" class="v-sub-panel v-" size="small" :fit="false" collapsable>
    <ElForm
      class="v-style-widget__sizing"
      size="small"
      label-width="60px"
      inline>
      <SetterWrapper
        v-for="item in setters"
        :name="item.name"
        :label="item.label"
        :setters="{ name: item.setter }"
        :options="item.options"
        :variable="false"
        :value="props.styleJson[item.name]"
        @change="setStyle"></SetterWrapper>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ElForm } from 'element-plus';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const overflowOptions = [
    { label: '自动', value: 'auto' },
    { label: '隐藏', value: 'hidden' },
    { label: '滚动', value: 'scroll' },
    { label: '显示', value: 'visible' }
  ];

  const objectFitOptions = [
    { label: '填充', value: 'fill' },
    { label: '适应', value: 'contain' },
    { label: '覆盖', value: 'cover' },
    { label: '拉伸', value: 'scale-down' },
    { label: '原始', value: 'none' }
  ];

  const setters = [
    {
      name: 'width',
      label: '宽(W)',
      setter: 'SizeSetter'
    },
    {
      name: 'height',
      label: '高(H)',
      setter: 'SizeSetter'
    },
    {
      name: 'min-width',
      label: '最小宽',
      setter: 'SizeSetter'
    },
    {
      name: 'min-height',
      label: '最小高',
      setter: 'SizeSetter'
    },
    {
      name: 'max-width',
      label: '最大宽',
      setter: 'SizeSetter'
    },
    {
      name: 'max-height',
      label: '最大高',
      setter: 'SizeSetter'
    },
    {
      name: 'overflow',
      label: '溢出',
      setter: 'SelectSetter',
      options: overflowOptions
    },
    {
      name: 'object-fit',
      label: '适应',
      setter: 'SelectSetter',
      options: objectFitOptions
    }
  ];
</script>
