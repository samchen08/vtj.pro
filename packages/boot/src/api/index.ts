import { request, IRequestConfig } from '@vtj/utils';
import { ElNotification } from 'element-plus';

request.setConfig({
  settings: {
    // 默认采用表单的方式提交数据
    type: 'form',
    // 校验请求响应码
    validSuccess: true,
    // 请求响应返回原始 AxiosResponse
    originResponse: false,
    // 自定义校验响应码方法
    validate: (res: any) => {
      return res.data?.code === 0;
    },
    // 请求失败显示提示信息
    failMessage: true,
    // 自定义请求失败提示方法
    showError: (msg: string) => {
      ElNotification.error({
        message: msg || '未知错误'
      });
    },
    // 定义请求头
    headers: (id: string, config: IRequestConfig) => {
      return {
        token: 'ABC'
      };
    }
  }
});
