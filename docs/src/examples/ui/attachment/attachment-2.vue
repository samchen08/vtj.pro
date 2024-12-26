<template>
  <div>
    <XAttachment
      size="small"
      v-model="fileList"
      v-model:select-value="selected"
      :limit="5"
      @change="onChange"
      @click="onClick"
      :uploader="uploader"
      :addable="true"
      clickable
      selectable
      :previewable="true"
      :removable="true"
      :downloadable="true"
      :multiple="true">
      <template #tip>
        <div>提示文字提示文字提示文字提示文字提示文字</div>
      </template>
    </XAttachment>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XAttachment, type AttachmentFile } from '@vtj/ui';
  import { delay } from '@vtj/utils';

  const fileList = ref<AttachmentFile[]>([
    {
      url: 'http://dummyimage.com/120x90',
      name: 'food.jpeg'
    },
    {
      url: 'http://dummyimage.com/200x300',
      name: 'http://dummyimage.com/200x300food.jpeg'
    },
    {
      url: 'http://dummyimage.com/300x300/FF0000',
      name: 'food.jpeg',
      type: 'img'
    },
    {
      url: 'http://dummyimage.com/300x300'
    }
  ]);

  const selected = ref({
    url: 'http://dummyimage.com/120x90'
  });

  const onChange = (files: any) => {
    console.log('onChange', files);
  };

  const onClick = (file: any) => {
    console.log('click', file);
  };

  const uploader: any = async () => {
    await delay(1000);
    return 'https://oss.newpearl.com/newpearl/image/2024-07-15/acd6ff3e0bf8fce74d795a870c9069e6.png';
  };
</script>
