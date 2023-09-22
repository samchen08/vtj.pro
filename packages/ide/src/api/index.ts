import { createApi, request } from '@vtj/utils';
import { ElNotification } from 'element-plus';

request.setConfig({
  settings: {
    type: 'json',
    validSuccess: true,
    originResponse: false,
    validate: (res: any) => {
      return res.data?.code === 0;
    },
    failMessage: true,
    showError: (msg: string) => {
      ElNotification.error({
        message: msg || '未知错误'
      });
    }
  }
});

export const ideConfig = createApi({
  url: '/vtj.json',
  method: 'get'
});

export const ideBase = createApi({
  url: '/vtj/base.json',
  method: 'post'
});
