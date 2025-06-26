# AI识别设计稿元数据生成页面

VTJ的AI助手支持识别 Sketch 和 Figma 设计稿的元数据，当需要高精度还原设计图时，您可以使用这种方式通过AI开发页面组件。 Sketch 和 Figma 的元数据文件是一个json格式的文件，可以通过VTJ官方提供的插件导出。

## Sketch元数据导出插件

### 安装Sketch插件

1. [下载 vtj-sketch-plugin 插件](https://gitee.com/newgateway/vtj-sketch-plugin/raw/master/vtj.sketchplugin.zip)
1. 解压后把 `vtj.sketchplugin` 复制到 Sketch 的插件文件夹，即完成安装。

### 导出Sketch元数据

打开Sketch，选中你需要导出的图层，然后点击菜单： `插件 > vtj-sketch-plugin > 导出图层元数据`。 选择文件保存位置，即可导出json文件。

![](../assets/meta/1.png)

## Figma元数据导出插件

### 安装Figma插件

1. [下载 vtj-figma-plugin 插件](https://gitee.com/newgateway/vtj-figma-plugin/raw/master/vtj-figma-plugin.zip)
1. 解压zip，打开Figma客户端，打开菜单：`Plugins > Development > import plugin from manifest` 选择解压后的 `manifest.json`文件完成安装

### 导出Figma元数据

打开 Figma客户端，选中您需要导出的图层，点击菜单 `Plugins > Development > Figma元数据导出工具` 打开插件。插件显示后点击 `导出为JSON` 按钮。 选择文件保存位置，即可导出json文件。

![](../assets/meta/2.png)

![](../assets/meta/3.png)

## AI识别元数据

打开VTJ设计器在 在AI助手新建话题 选择元数据，选择导出的 Sketch 或 Figma 元数据json文件，即可通过AI高精度还原设计图。

![](../assets/meta/4.png)

![](../assets/meta/5.png)
