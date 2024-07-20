/**
 * 是否浏览器环境
 */
export const isClient = typeof window !== 'undefined';

/**
 *  文件对象 File 转换为 base64
 * @param file
 * @returns
 */
export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * FormData 转换为json
 * @param data
 * @returns
 */
export function formDataToJson(data: FormData) {
  const json: Record<string, any> = {};
  if (!data) return {};
  data.forEach((val, key) => {
    json[key] = typeof val === 'string' ? decodeURIComponent(val) : val;
  });
  return json;
}

/**
 *  Base64 转换 Blob
 * @param dataurl
 * @returns
 */
export function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Blob 转 File
 * @param blob
 * @param fileName
 * @returns
 */
export function blobToFile(blob: Blob, fileName: string) {
  const file = blob as any;
  file.lastModified = Date.now();
  file.lastModifiedDate = new Date();
  file.name = fileName;
  return file as File;
}
