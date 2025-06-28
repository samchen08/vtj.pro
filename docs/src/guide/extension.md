# 内置设计器扩展

VTJ 内置的设计器文件在`@vtj/pro`依赖包里面，虽然源代码经过了编译打包，当您可以通过以下的方式更改或扩展您需要的功能。

项目`package.json`文件可配置 `vtj` 节点信息 `ExtensionConfig`，项目启动时，本地设计器服务在初始化时会获取该配置进行设计器初始处理。

## 扩展配置

配置示例：

```json
{
  "vtj": {
    "extension": {
      "urls": [
        "@vtj/extension/extension.css",
        "@vtj/extension/extension.umd.js"
      ],
      "library": "VtjExtension",
      "params": [
        {
          "systemType": "SYS",
          "portalHost": "sso-sit.newpearl.com"
        }
      ]
    }
  }
}
```

其中的urls配置项目，是数组，可以包含css或js文件， js文件必须是`umd`的模块格式， 文件路径必须是以 `@vtj/extension/` 前缀开始。

扩增的文件目录在 `vite.config.ts` 中 `createDevTools` 插件的选项参数 `extensionDir` 设置， 如：

```ts
import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
export default createViteConfig({
  plugins: [
    createDevTools({
      extensionDir: './public'
    })
  ]
});
```

结合上述两个配置标识，在设计器启动时，从项目目录 `/public/` 找到文件 `extension.css` 和 `extension.umd.js` 加载。

您可以在这两个文件中实现对设计器的更改和扩展功能。

:::warning
更改 `package.json` 文件后需要重启 `dev` 才会生效
:::

### ExtensionConfig

配置项定义说明

```ts
/**
 * 扩展配置
 */
export interface ExtensionConfig {
  /**
   * 扩展资源文件路径：js、css文件，js文件要求 umd 格式
   */
  urls: string[];
  /**
   * js库导出名
   */
  library: string;

  /**
   * 附加参数/数据，用作个性需求
   */
  params?: Array<Record<string, any>>;
}
```

### 扩展实现

以下示例演示更改设计器的Logo组件

:::warning
本示例仅演示设计器扩展是如何工作的，实际情况，您应该搭建一个类库工程进行开发，打包输出umd文件和样式文件。
扩展类库工程示例：[https://gitee.com/newgateway/examples-vtj/tree/master/packages/extension](https://gitee.com/newgateway/examples-vtj/tree/master/packages/extension)
:::

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // 导出 library 名称
    root.VtjExtension = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const __VTJ_PRO__ = self.__VTJ_PRO__ || {};

  // @vtj/pro 依赖
  console.log('__VTJ_PRO__', __VTJ_PRO__);

  const { widgetManager } = __VTJ_PRO__;

  // 更换Logo Widget组件的图片
  widgetManager.set('Logo', {
    props: {
      icon: '/vite.svg'
    }
  });

  const install = (app, engine) => {
    console.log('vue根应用实例', app);
    console.log('低代码引擎实例', engine);
  };

  return (params) => {
    console.log('params', params);
    return {
      install
    };
  };
});
```

![](../assets//extension-1.png)

示例工程：[https://gitee.com/newgateway/examples-vtj/tree/master/packages/extension-app](https://gitee.com/newgateway/examples-vtj/tree/master/packages/extension-app)

## 功能扩展方式

- [DepsManager 依赖管理器](./extras/deps-manager.md)
- [WidgetManager 器件管理器](./extras/widget-manager.md)
- [SetterManager 属性设置器管理器](./extras/setter-manager.md)
