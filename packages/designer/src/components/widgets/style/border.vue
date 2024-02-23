<template>
  <Panel title="边框" class="v-sub-panel" size="small" :fit="false" collapsable>
    <ElForm label-width="60px" size="small">
      <SetterWrapper
        name="border-radius"
        label="圆角"
        :setters="{ name: 'SectionSetter', props: { sections: 4 } }"
        :variable="false"
        :value="props.styleJson['border-radius']"
        @change="props.setStyle"></SetterWrapper>

      <SetterWrapper
        name="borders"
        label="边框"
        :setters="{ name: 'TagSetter' }"
        :variable="false"
        :options="borders"
        :value="current"
        @change="onBordersChange"></SetterWrapper>
      <template v-if="current">
        <SetterWrapper
          :name="`${current}-width`"
          :key="`${current}-width`"
          label="宽度"
          :setters="{ name: 'SizeSetter' }"
          :variable="false"
          :value="props.styleJson[`${current}-width`]"
          @change="props.setStyle"></SetterWrapper>

        <SetterWrapper
          :name="`${current}-style`"
          :key="`${current}-style`"
          label="样式"
          :setters="{ name: 'TagSetter' }"
          :options="borderStyleOptions"
          :variable="false"
          :value="props.styleJson[`${current}-style`]"
          @change="props.setStyle"></SetterWrapper>

        <SetterWrapper
          :name="`${current}-color`"
          :key="`${current}-color`"
          label="颜色"
          :setters="{ name: 'ColorSetter' }"
          :variable="false"
          :value="props.styleJson[`${current}-color`]"
          @change="props.setStyle"></SetterWrapper>
      </template>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElForm } from 'element-plus';
  import {
    IconBorderAll,
    IconBorderBottom,
    IconBorderLeft,
    IconBorderRight,
    IconBorderTop,
    IconCross,
    IconBorderStyleDashed,
    IconBorderStyleDotted,
    IconBorderStyleSolid
  } from '@vtj/icons';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const current = ref('border');

  const borders = [
    { label: '全边框', svg: IconBorderAll, value: 'border' },
    { label: '左边框', svg: IconBorderLeft, value: 'border-left' },
    { label: '上边框', svg: IconBorderTop, value: 'border-top' },
    { label: '下边框', svg: IconBorderBottom, value: 'border-bottom' },
    { label: '右边框', svg: IconBorderRight, value: 'border-right' }
  ];

  const borderStyleOptions = [
    { label: '无', value: 'none', svg: IconCross },
    { label: '实线', value: 'solid', svg: IconBorderStyleSolid },
    { label: '虚线', value: 'dashed', svg: IconBorderStyleDashed },
    { label: '点线', value: 'dotted', svg: IconBorderStyleDotted }
  ];

  const onBordersChange = (_name: any, val: string) => {
    current.value = val;
  };
</script>
