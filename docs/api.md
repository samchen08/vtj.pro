# Api相关配置文档

VTJ设计器的请求发送依赖 `@vtj/utils` 中的 `request` 和 `jsonp`。 本地项目需要执行初始化设置。步骤如下：

1. 在 /src/api/index.ts 设置全局 request 配置

```ts
import { request, IRequestConfig } from '@vtj/utils';
import { ElNotification } from 'element-plus';

request.setConfig({
  settings: {
    // 默认采用表单的方式提交数据
    type: 'form',
    // 校验请求响应码
    validSuccess: true,
    // 请求响应返回原始 AxiosResponse, 如果设置为false，成功是返回 res.data.data
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
    headers: (config: IRequestConfig) => {
      return {
        token: 'ABC'
      };
    }
  }
});
```

更多配置项目，参考：https://gitee.com/newgateway/vtj/blob/master/packages/utils/src/request.ts

1. 在 /src/main.ts 引入 /src/api/index.tsss

```ts
import '@/api';
```

1. 请求参数不需要配置，直接传递给接口方法，如：

```ts
this.fetchUsemameLogin({
  username: 'admin',
  password: '123s'
});
```

如该请求的配置与全局的不一致，也可以在调用时更改，如：


```ts
this.fetchUsemameLogin({
  username: 'admin',
  password: '123s'
}, {
  settings: {
    originResponse: true
  }
});
```