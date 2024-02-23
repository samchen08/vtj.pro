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
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
