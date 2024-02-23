<template>
  <Panel title="文本" class="v-sub-panel" size="small" :fit="false" collapsable>
    <ElForm
      class="v-style-widget__texting"
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
    <ElForm size="small" label-width="60px">
      <SetterWrapper
        name="color"
        label="颜色"
        :setters="{ name: 'ColorSetter' }"
        :variable="false"
        :value="props.styleJson.color"
        @change="setStyle"></SetterWrapper>
      <SetterWrapper
        name="text-align"
        label="对齐"
        :setters="{ name: 'TagSetter' }"
        :variable="false"
        :options="textAlignOptions"
        :value="props.styleJson['text-align']"
        @change="setStyle"></SetterWrapper>
      <SetterWrapper
        name="font-style"
        label="风格"
        :setters="{ name: 'TagSetter' }"
        :variable="false"
        :options="textStyleOptions"
        :value="props.styleJson['font-style']"
        @change="setStyle"></SetterWrapper>
      <SetterWrapper
        name="text-decoration"
        label="修饰"
        :setters="{ name: 'TagSetter' }"
        :variable="false"
        :options="textDecorationOptions"
        :value="props.styleJson['text-decoration']"
        @change="setStyle"></SetterWrapper>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { Panel } from '../../shared';
  import { ElForm } from 'element-plus';
  import {
    IconTextAlignCenter,
    IconTextAlignJustify,
    IconTextAlignLeft,
    IconTextAlignRight,
    IconFontStyleNone,
    IconFontStyleItalic,
    IconCross,
    IconTextDecorationOverline,
    IconTextDecorationStrike,
    IconTextDecorationUnderline
  } from '@vtj/icons';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const setters = [
    {
      name: 'font-size',
      label: '字号',
      setter: 'SizeSetter'
    },
    {
      name: 'font-family',
      label: '字体',
      setter: 'SelectSetter',
      options: [
        'Arial',
        'Verdana',
        'Georgia',
        '"Times New Roman"',
        '"Microsoft YaHei"',
        'SimSun',
        'SimHei',
        'KaiTi',
        'FangSong',
        'STSong',
        'STKaiti',
        'STFangsong',
        'STCaiyun',
        'STHupo',
        'STLiti',
        'STXingkai',
        'STXinwei',
        'STXinwei',
        'STZhongsong'
      ]
    },
    {
      name: 'line-height',
      label: '行高',
      setter: 'SizeSetter'
    },
    {
      name: 'font-weight',
      label: '字重',
      setter: 'SelectSetter',
      options: [
        { label: '正常', value: 'normal' },
        { label: '粗体', value: 'bold' },
        { label: '更粗', value: 'bolder' },
        { label: '更细', value: 'lighter' }
      ]
    }
  ];

  const textAlignOptions = [
    { label: '左', value: 'left', svg: IconTextAlignLeft },
    { label: '中', value: 'center', svg: IconTextAlignCenter },
    { label: '右', value: 'right', svg: IconTextAlignRight },
    { label: '两端', value: 'justify', svg: IconTextAlignJustify }
  ];

  const textStyleOptions = [
    { label: '正常', value: 'normal', svg: IconFontStyleNone },
    { label: '斜体', value: 'italic', svg: IconFontStyleItalic }
  ];

  const textDecorationOptions = [
    { label: '无', value: 'none', svg: IconCross },
    { label: '下划线', value: 'underline', svg: IconTextDecorationUnderline },
    { label: '删除线', value: 'line-through', svg: IconTextDecorationStrike },
    { label: '上划线', value: 'overline', svg: IconTextDecorationOverline }
  ];
</script>
