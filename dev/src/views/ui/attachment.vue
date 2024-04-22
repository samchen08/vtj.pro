<template>
  <div>
    <XAttachment
      size="default"
      v-model="fileList"
      v-model:select-value="selected"
      :limit="2"
      @change="onChange"
      @click="onClick"
      :uploader="uploader"
      :addable="true"
      clickable
      selectable
      :previewable="true"
      :removable="true"
      :downloadable="false"
      :multiple="false"></XAttachment>
    <XAttachment
      size="default"
      list-type="list"
      v-model="fileList"
      v-model:select-value="selected"
      @change="onChange"
      @click="onClick"
      :uploader="uploader"
      :addable="true"
      clickable
      selectable
      :previewable="true"
      :removable="true"
      :downloadable="true"
      :multiple="true"></XAttachment>
    <!-- <XAttachment v-model="fileList"></XAttachment>
    <XAttachment size="large" v-model="fileList"></XAttachment> -->
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XAttachment, request, type AttachmentFile } from '@vtj/web';

  const fileList = ref<AttachmentFile[]>([
    {
      url: 'http://dummyimage.com/120x90',
      name: 'food.jpeg',
      type: 'img'
    },
    {
      url: 'http://dummyimage.com/200x300',
      name: 'food.jpeg',
      type: 'img'
    },
    {
      url: 'http://dummyimage.com/300x300/FF0000',
      name: 'food.jpeg',
      type: 'img'
    },
    {
      url: 'http://dummyimage.com/300x300',
      name: 'food.docx',
      type: 'word'
    }
  ]);

  const selected = ref({
    url: 'http://dummyimage.com/120x90'
  });

  const uploader = (file: File) => {
    // return new Promise(() => {});
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
      // console.log('request', res);
      return {
        name: file.name,
        url: res as unknown as string
      };
    });
  };

  const onChange = (files: any) => {
    console.log('onChange', files);
  };

  const onClick = (file: any) => {
    console.log('click', file);
  };
</script>
