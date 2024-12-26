# 加密解密

内置 加密解密 工具函数

| 函数名   | 描述                          | 类型                                   | 参数                        | 返回值   |
| -------- | ----------------------------- | -------------------------------------- | --------------------------- | -------- |
| MD5      | MD5加密                       | `(content:string)=> string`            | (content:string)            | `String` |
| base64   | Base64编码                    | `(content:string)=> string`            | (content:string)            | `String` |
| unBase64 | Base64解码                    | `(content:string)=> string`            | (content:string)            | `String` |
| RSA      | 非对称加密(RSA密钥对生成工具) | `(content:string,key:string)=> string` | (content:string,key:string) | `String` |
| unRSA    | 非对称解密                    | `(content:string,key:string)=> string` | (content:string,key:string) | `String` |
| AES      | 对称加密                      | `(content:string,key:string)=> string` | (content:string,key:string) | `String` |
| unAES    | 对称解密                      | `(content:string,key:string)=> string` | (content:string,key:string) | `String` |

### 示例

:::preview
demo-preview=../../examples/utils/crypto/crypto-1.vue
:::
