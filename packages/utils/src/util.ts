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
