<template>
  <div>
    <h1>request</h1>
    <ElButton @click="execApi1">Test api1</ElButton>
    <ElButton @click="doRequest">Test api2</ElButton>
    <ElButton @click="doRequest3">Test api3</ElButton>
  </div>
</template>
<script lang="ts" setup>
  import { request, Access } from '@vtj/web';
  import {
    ElNotification,
    ElLoading,
    ElButton,
    ElMessageBox
  } from 'element-plus';
  let loading: any = null;

  request.setConfig({
    settings: {
      showLoading() {
        loading = ElLoading.service({
          fullscreen: true
        });
      },
      hideLoading() {
        if (loading) {
          loading.close();
        }
      },
      showError(msg) {
        ElNotification.warning({
          message: msg
        });
      },
      originResponse: true,
      validSuccess: true,
      failMessage: true,
      validate(res) {
        return res.data?.success;
      },
      skipWarn: {
        code: 7,
        async executor(reslove, reject) {
          const ret = await ElMessageBox.confirm('跳过警告测试')
            .then(() => true)
            .catch(() => false);
          if (ret) {
            reslove(true);
          } else {
            reject('cancel');
          }
        },
        callback(res) {
          console.log('warn callbck', res);
        }
      }
    }
  });

  const access = new Access({
    alert: ElMessageBox.alert
  });

  access.connect({ request: request });

  const doRequest = () => {
    for (let i = 0; i < 10; i++) {
      request({
        url: '/mock/api.json?t=' + Date.now()
      });
    }
  };

  const doRequest3 = () => {
    request({
      url: '/api/logs'
    });
  };

  // const url = '/api/test/user/${id}';
  // const url = '/api/scm/auth/scm/scmPurchaseApplyH/waitList.do';
  // const url = '/mock/api/:id.json';
  const url = 'https://127.0.0.1:9527/mock/api/:id.json';

  const execApi1 = () => {
    // console.log(request);
    request({
      settings: {
        // type: 'form'
      },
      url,
      method: 'delete',
      params: {
        id: 'abc'
      },
      query: {
        id: 'bbb'
      },
      data: {
        name: 'Name'
      }
    })
      .then((res) => {
        console.log('then', res);
      })
      .catch((e) => {
        console.log('catch', e);
      });
    // request.cancel();
    // console.log('request', res);
  };

  // let loading: any = null;
  // const url = '/1api/test/user';
  // type IParams = {
  //   id: number;
  // };
  // type IResponse = {
  //   result: boolean;
  // };
  // const api1 = createApi<IParams, IResponse>({
  //   url,
  //   settings: {
  //     originResponse: false,
  //     validSuccess: true,
  //     failMessage: true,
  //     loading: true,
  //     showError(msg: string) {
  //       console.log('showError', msg);
  //       ElNotification.error({
  //         message: msg
  //       });
  //     },
  //     showLoading() {
  //       console.log('showLoading');
  //       loading = ElLoading.service();
  //     },
  //     hideLoading() {
  //       if (loading) {
  //         loading.close();
  //       }
  //     }
  //   }
  // });
</script>
