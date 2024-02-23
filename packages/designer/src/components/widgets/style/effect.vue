<template>
  <Panel title="效果" class="v-sub-panel" size="small" :fit="false" collapsable>
    <ElForm label-width="60px" size="small">
      <SetterWrapper
        name="opacity"
        label="透明度"
        :setters="{ name: 'SliderSetter' }"
        :variable="false"
        :value="getOpactiy()"
        @change="setOpacity"></SetterWrapper>
      <SetterWrapper
        name="box-shadow"
        label="阴影"
        :setters="{ name: 'SelectSetter' }"
        :variable="false"
        :options="shadowOptions"
        :value="props.styleJson['box-shadow']"
        @change="props.setStyle"></SetterWrapper>
      <SetterWrapper
        name="cursor"
        label="光标"
        :setters="{ name: 'TagSetter' }"
        :variable="false"
        :options="cursorsOptions"
        :value="props.styleJson['cursor']"
        @change="props.setStyle"></SetterWrapper>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  //   import { ref } from 'vue';
  import { ElForm } from 'element-plus';
  import {
    IconCursorAuto,
    IconCursorPointer,
    IconCursorNone,
    IconCursorNotAllowed
  } from '@vtj/icons';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const cursorsOptions = [
    {
      label: '自动',
      value: 'auto',
      svg: IconCursorAuto
    },
    {
      label: 'Pointer',
      value: 'pointer',
      svg: IconCursorPointer
    },
    {
      label: 'NotAllowed',
      value: 'not-allowed',
      svg: IconCursorNotAllowed
    },
    {
      label: '无',
      value: 'none',
      svg: IconCursorNone
    }
  ];

  const shadowOptions = [
    {
      label: 'Basic',
      value: 'var(--el-box-shadow)'
    },
    {
      label: 'Light',
      value: 'var(--el-box-shadow-light)'
    },
    {
      label: 'Lighter',
      value: 'var(--el-box-shadow-lighter)'
    },
    {
      label: 'Dark',
      value: 'var(--el-box-shadow-dark)'
    }
  ];

  const setOpacity = (_name: string, v?: number) => {
    props.setStyle(
      'opacity',
      v !== undefined ? (Number(v) || 0) / 100 : undefined
    );
  };

  const getOpactiy = () => {
    return Number(props.styleJson.opactiy || 0) * 100;
  };
</script>
