# 辅助工具

| 函数名         | 描述                        | 类型                                  | 参数                          | 返回值    |
| -------------- | --------------------------- | ------------------------------------- | ----------------------------- | --------- |
| isClient       | 是否浏览器环境              | `boolean`                             | -                             | `Boolean` |
| fileToBase64   | 文件对象 File 转换为 base64 | `(file:File) => base64`               | (file:文件对象)               | `Base64`  |
| formDataToJson | FormData 转换为json         | `(data:FormData) => Json`             | (data:表单数据)               | `Json`    |
| dataURLtoBlob  | Base64 转换 Blob            | `(dataUrl:string) => Blob`            | (dataUrl:Base64)              | `Blob`    |
| blobToFile     | Blob 转 File                | `(blob:Blob,fileName:string) => File` | (blob:Blob,fileName:文件名称) | `File`    |



### 示例
    在控制台查看效果
:::preview
demo-preview=../../examples/utils/util/utils.vue
:::


### isClient

是否浏览器环境

```js
  import {isClient} from '@vtj/utils';
  const onClick = () => {
    console.log('isClient', isClient);
    // isClient true or false
  };

```


### fileToBase64

文件对象 File 转换为 base64

```js
  import { fileToBase64 } from '@vtj/utils';  
  const onClickFileToBase64 = async () => {
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain'
    });
    const FileToBase64 = await fileToBase64(file);

    console.log('FileToBase64', FileToBase64);
    // FileToBase64 data:text/plain;base64,Zm9v
  };

```


### formDataToJson

FormData 转换为json  

```js
  import { formDataToJson } from '@vtj/utils';  
  const onClickFormDataToJson = async () => {
    const formData = new FormData(); // 当前为空
    formData.append('username', 'admin');
    const FormDataToJson = formDataToJson(formData);
    console.log('FormDataToJson', FormDataToJson);
    // FormDataToJson {username: 'admin'}
  };

```

### dataURLtoBlob

Base64 转换 Blob

```js
  import { dataURLtoBlob } from '@vtj/utils';  
  const onClickDataURLtoBlob = () => {
    const imgUrl =
      'data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7';

    const DataURLtoBlob = dataURLtoBlob(imgUrl);
    console.log('DataURLtoBlob', DataURLtoBlob);
    // DataURLtoBlob Blob {size: 45, type: 'image/gif'}
  };

```


### blobToFile

Blob 转 File 

```js
  import { blobToFile } from '@vtj/utils';  
  const onClickBlobToFile = () => {
    const blobParts = ['<q id="a"><span id="b">hey!</span></q>']; // 一个包含单个字符串的数组
    const blob = new Blob(blobParts, { type: 'text/html' }); // 得到 blob

    const BlobToFile = blobToFile(blob, 'vtj.html');
    console.log('BlobToFile', BlobToFile);
    // DataURLtoBlob => Blob对象
  };

```


