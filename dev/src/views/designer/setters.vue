<template>
  <div>
    <ElForm label-width="100px">
      <SetterWrapper
        name="test"
        label="排布"
        :value="2"
        :setters="{ name: 'RadioSetter' }"
        :options="options"
        :variable="true"
        @change="onChange"></SetterWrapper>
      <SetterWrapper
        name="test"
        label="排布"
        :value="2"
        :setters="{ name: 'TagSetter' }"
        :options="options"
        :variable="true"
        @change="onChange"></SetterWrapper>

      <SetterWrapper
        name="image"
        label="图片"
        :setters="['ImageSetter', 'StringSetter']"
        :variable="true"
        @change="onChange"></SetterWrapper>

      <SetterWrapper
        name="border"
        label="SectionSetter"
        :setters="{ name: 'SectionSetter', props: { sections: 2 } }"
        :variable="true"
        @change="onChange"></SetterWrapper>

      <SetterWrapper
        name="Slider"
        label="Slider"
        :value="2"
        :setters="{ name: 'SliderSetter' }"
        :variable="true"
        @change="onChange"></SetterWrapper>
      <SetterWrapper
        name="RangeSetter"
        label="RangeSetter"
        :value="[10, 50]"
        :setters="{ name: 'RangeSetter' }"
        :variable="true"
        @change="onChange"></SetterWrapper>

      <SetterWrapper
        name="FunctionSetter"
        label="JS"
        setters="FunctionSetter"
        :variable="true"
        @change="onChange"></SetterWrapper>
      <SetterWrapper
        name="file"
        label="文件"
        :setters="{
          name: 'FileSetter',
          props: { attachment: { uploader, multiple: true } }
        }"
        :variable="true"
        @change="onChange"></SetterWrapper>
    </ElForm>

    <div
      :style="`width: 200px; height: 100px; background-image: url(${imgUrl})`"></div>
  </div>
</template>
<script lang="ts" setup>
  import { ElForm } from 'element-plus';
  import { ref } from 'vue';
  import { SetterWrapper } from '@vtj/pro';
  import { request } from '@vtj/web';
  import {
    IconDisplayBlock,
    IconDisplayFlex,
    IconDisplayInlineBlock,
    IconDisplayInline,
    IconEyeInvisible
  } from '@vtj/icons';

  const imgUrl = ref('');

  const options = [
    {
      label: '选项1',
      value: 1,
      svg: IconDisplayBlock
    },
    {
      label: '选项2',
      value: 2,
      svg: IconDisplayFlex
    },
    {
      label: '选项3',
      value: 3,
      svg: IconDisplayInlineBlock
    },
    {
      label: '选项3',
      value: 4,
      svg: IconDisplayInline
    },
    {
      label: '选项3',
      value: 5,
      svg: IconEyeInvisible
    }
  ];

  const onChange = (n: string, v: any) => {
    console.log('change', n, v);
    // imgUrl.value = v;
  };

  const uploader = async (file: File) => {
    return request({
      url: '/mock-api/upload',
      settings: {
        type: 'data',
        originResponse: false,
        validSuccess: true,
        validate: (r) => r.data.code === 0
      },
      data: {
        file
      }
    }).then((res) => {
      return {
        name: file.name,
        url: res as unknown as string
      };
    });
  };
</script>
