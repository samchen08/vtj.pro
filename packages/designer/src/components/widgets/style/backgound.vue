<template>
  <Panel title="背景" class="v-sub-panel" size="small" :fit="false" collapsable>
    <ElForm label-width="60px" size="small">
      <SetterWrapper
        name="background-image"
        label="图片"
        :setters="{ name: 'ImageSetter' }"
        :variable="false"
        :value="getImage(props.styleJson['background-image'])"
        @change="setImage"></SetterWrapper>
      <SetterWrapper
        name="background-color"
        label="颜色"
        :setters="{ name: 'ColorSetter' }"
        :variable="false"
        :value="props.styleJson['background-color']"
        @change="props.setStyle"></SetterWrapper>

      <SetterWrapper
        name="background-repeat"
        label="重复"
        :setters="{ name: 'TagSetter' }"
        :variable="false"
        :value="props.styleJson['background-repeat']"
        :options="backgroundRepeatOptions"
        @change="props.setStyle"></SetterWrapper>

      <SetterWrapper
        name="background-attachment"
        label="固定"
        :setters="{ name: 'RadioSetter' }"
        :variable="false"
        :value="props.styleJson['background-attachment']"
        :options="backgroundAttachmentOptions"
        @change="props.setStyle"></SetterWrapper>
      <SetterWrapper
        name="background-position"
        label="位置"
        :setters="{ name: 'SectionSetter', props: { sections: 2 } }"
        :variable="false"
        :value="props.styleJson['background-position']"
        @change="props.setStyle"></SetterWrapper>
      <SetterWrapper
        name="background-size"
        label="大小"
        :setters="{ name: 'SelectSetter' }"
        :variable="false"
        :value="props.styleJson['background-size']"
        :options="backgroundSizeOptions"
        @change="props.setStyle"></SetterWrapper>
      <SetterWrapper
        name="background-clip"
        label="裁剪"
        :setters="{ name: 'SelectSetter' }"
        :variable="false"
        :value="props.styleJson['background-clip']"
        :options="backgroundClipOptions"
        @change="props.setStyle"></SetterWrapper>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ElForm } from 'element-plus';
  import { IconTileXy, IconTileX, IconTileY, IconClose } from '@vtj/icons';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
    setStyle: (name: string, value?: any) => void;
  }

  const props = defineProps<Props>();

  const setImage = (_name: string, url: string) => {
    if (url) {
      props.setStyle('background-image', `url(${url})`);
    } else {
      props.setStyle('background-image', undefined);
    }
  };

  const getImage = (val: string) => {
    const r = /^url\(([\w\W]+)\)$/;
    return val?.match(r)?.[1];
  };

  const backgroundRepeatOptions = [
    { label: '重复', value: 'repeat', svg: IconTileXy },
    { label: '水平重复', value: 'repeat-x', svg: IconTileX },
    { label: '垂直重复', value: 'repeat-y', svg: IconTileY },
    { label: '不重复', value: 'no-repeat', svg: IconClose }
  ];

  const backgroundAttachmentOptions = [
    { label: '固定', value: 'fixed' },
    { label: '滚动', value: 'scroll' }
  ];

  const backgroundClipOptions = [
    { label: '裁剪到填充', value: 'padding-box' },
    { label: '裁剪到内容', value: 'content-box' },
    { label: '裁剪到文字', value: 'text' }
  ];

  const backgroundSizeOptions = [
    { label: '自动', value: 'auto' },
    { label: '长度', value: 'length' },
    { label: '百分比', value: 'percentage' },
    { label: '覆盖', value: 'cover' },
    { label: '填充', value: 'contain' }
  ];
</script>
