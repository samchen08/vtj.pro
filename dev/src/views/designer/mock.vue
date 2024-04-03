<template>
  <div>
    Mock

    <button @click="send">Request</button>
  </div>
</template>
<script lang="ts" setup>
  import Mock from 'mockjs';
  import {
    request,
    pathToRegexp,
    url as urlUtil,
    formDataToJson
  } from '@vtj/web';

  // const data = Mock.mock({
  //   'list|1-10': [
  //     {
  //       'id|+1': 1
  //     }
  //   ]
  // });
  // console.log(JSON.stringify(data, null, 2));
  // console.log(Mock);

  Mock.setup({
    timeout: '50-500'
  });

  // Mock.mock('/api/drdf.json', {
  //   code: 0,
  //   'data|2-10': [
  //     {
  //       'id|+1': '@guid'
  //     }
  //   ]
  // });

  const url = '/api/:id.json(.*)';
  const regex = pathToRegexp(url);
  console.log(regex);
  Mock.mock(regex, (options) => {
    const params = urlUtil.parse(options.url) || {};
    const data =
      options.body instanceof FormData
        ? formDataToJson(options.body)
        : options.body;

    console.log('options', options, params, data);
    return Mock.mock({
      code: 0,
      'data|2-10': [
        {
          'id|+1': '@guid'
        }
      ]
    });
  });

  const send = () => {
    Mock.mock(regex);
    request({
      url: '/api/:id.json',
      method: 'post',
      settings: {
        type: 'json'
      },
      data: {
        title: 'ABC'
      },
      params: {
        name: 'abc'
      },
      query: {
        id: 123
      }
    }).then((res: any) => {
      console.log('result', res.data);
    });
  };
</script>
