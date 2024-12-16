# XQrCode 操作按钮


#### 实现 基于 [VueQrcode](https://github.com/rx-ts/vue/blob/master/packages/vue-qrcode/README.md#demo)


## 示例

### 基础用法


:::preview
demo-preview=../examples/ui/qrcode/qrcode-1.vue
:::


### options 用法


:::preview
demo-preview=../examples/ui/qrcode/qrcode-2.vue
:::




## API

### 属性 

| 属性名  | 说明            | 类型   | 默认值 |
| ------- | --------------- | ------ | ------ |
| size    | 二维码尺寸      | number | -      |
| content | 二维码内容      | string | -      |
| expired | 过期时间        | number | -      |
| tip     | 提示文本        | string | -      |
| options | qrcode 配置参数 | object | -      |



### options 属性配置

| 参数                   | type (range)                                                       | default value                               |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `version`              | `number` (1-40)                                                    | N/A                                         |
| `errorCorrectionLevel` | `String` ('low', 'medium', 'quartile', 'high', 'L', 'M', 'Q', 'H') | `'M'`                                       |
| `maskPattern`          | `number` (0-7)                                                     | N/A                                         |
| `toSJISFunc`           | `Function`                                                         | N/A                                         |
| `margin`               | `number`                                                           | `4`                                         |
| `scale`                | `number`                                                           | `4`                                         |
| `width`                | `number`                                                           | N/A                                         |
| `color`                | `{ dark: string; light:string }`                                   | `{ dark: '#000000ff', light: '#ffffffff' }` |
| `type`                 | `string` ('image/png', 'image/jpeg', 'image/webp')                 | `'image/png'`                               |
| `quality`              | `number`(0-1)                                                      | `0.92`                                      |
| `value`                | `string \|Array<{ data: string; mode?: string }>`                  | N/A                                         |





### 暴露

| 名称    | 说明 | 类型 |
| ------- | ---- | ---- |
| refresh | 刷新 | -    |