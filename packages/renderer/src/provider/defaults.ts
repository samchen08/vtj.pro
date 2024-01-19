import { createRequest } from '@vtj/utils';
import { ElLoading, ElNotification } from 'element-plus';

let loading: any = null;

export const request = createRequest({
  settings: {
    type: 'form',
    validSuccess: true,
    originResponse: false,
    loading: true,
    validate: (res: any) => {
      return res.data?.code === 0 || !!res.data?.success;
    },
    failMessage: true,
    showError: (msg: string) => {
      ElNotification.error({
        message: msg || '未知错误'
      });
    },
    showLoading: () => {
      if (loading) {
        loading.close();
      }
      loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.05)'
      });
    },
    hideLoading: () => {
      if (loading) {
        loading.close();
        loading = null;
      }
    }
  }
});
