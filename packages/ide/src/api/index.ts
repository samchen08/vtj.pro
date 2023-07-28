import { createApi } from '@vtj/utils';
import { ElNotification } from 'element-plus';

export const ideConfig = createApi({
  url: '/vtj.json',
  method: 'get',
  settings: {
    validSuccess: false,
    originResponse: false
  }
});

export const ideBase = createApi({
  url: '/vtj/base.json',
  method: 'post',
  settings: {
    type: 'json',
    validSuccess: true,
    originResponse: false,
    validate: (res: any) => {
      return res.data?.code === 0;
    },
    showError: (msg: string) => {
      ElNotification.error({
        message: msg || '未知错误'
      });
    }
  }
});
