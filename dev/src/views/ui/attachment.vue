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
    <hr />
    <XAttachment
      size="large"
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
    <hr />
    <XAttachment
      multiple
      :formatter="formatter"
      :valueFormatter="valueFormatter"
      :uploader="uploader"
      v-model="files"
      :auto-upload="true"
      style="border: 1px red solid; display: inline-block"></XAttachment>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XAttachment, type AttachmentFile, delay } from '@vtj/web';

  const fileList = ref<AttachmentFile[]>([
    {
      url: 'http://dummyimage.com/120x90',
      name: 'food.jpeg'
      // type: 'img'
    },
    {
      url: 'http://dummyimage.com/200x300',
      name: 'http://dummyimage.com/200x300food.jpeg'
      // type: 'img'
    },
    {
      url: 'http://dummyimage.com/300x300/FF0000',
      name: 'food.jpeg',
      type: 'img'
    },
    {
      url: 'http://dummyimage.com/300x300'
      // name: 'food.docx'
      // type: 'word'
    }
  ]);

  const selected = ref({
    url: 'http://dummyimage.com/120x90'
  });

  // const uploader = (file: File) => {
  //   // return new Promise(() => {});
  //   return request({
  //     url: '/mock-api/upload',
  //     settings: {
  //       type: 'data',
  //       originResponse: false,
  //       validSuccess: true,
  //       validate: (r) => r.data.code === 0
  //     },
  //     data: {
  //       file
  //     }
  //   }).then((res) => {
  //     // console.log('request', res);
  //     return {
  //       name: file.name,
  //       url: res as unknown as string
  //     };
  //   });
  // };

  const onChange = (files: any) => {
    console.log('onChange', files);
  };

  const onClick = (file: any) => {
    console.log('click', file);
  };

  const uploader: any = async () => {
    await delay(1000);
    // return null;
    return 'https://oss.newpearl.com/newpearl/image/2024-07-15/acd6ff3e0bf8fce74d795a870c9069e6.png';
  };

  const formatter: any = async (files: any) => {
    console.log('formatter', files);
    for (const file of files) {
      file.__url = file.url;
      file.url = file.url + '?only=true';
    }
    return files;
  };

  const valueFormatter: any = async (files: any) => {
    console.log('valueFormatter', files);

    // for (const file of files) {
    //   file.url = file.__url;
    //   delete file.__url;
    // }
    // console.log('valueFormatter', files);
    return files.map((n: any) => {
      return {
        url: n.url,
        name: n.name
      };
    });
  };

  const files = ref([]);
</script>
