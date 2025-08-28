import { ref } from 'vue';
import { type UploadRawFile, ElMessage } from 'element-plus';
import type { ApiSchema, ApiMethod } from '@vtj/core';
import { uid, isUrl, camelCase } from '@vtj/utils';
import { useEngine } from '../../framework';

const parseFile = async (file: UploadRawFile) => {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      if (typeof reader?.result === 'string') {
        let json: any;
        try {
          json = JSON.parse(reader.result);
          if (json) {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const validate = (json: any) => {
  return json?.swagger === '2.0' || !!json?.openapi;
};

const getApiType = (consumes: string[] = [], requestBody: any) => {
  const map = {
    form: 'application/x-www-form-urlencoded',
    json: 'application/json',
    data: 'multipart/form-data'
  };
  const str = consumes.join(',');
  const keys = Object.keys(requestBody?.content || {});
  for (const [type, item] of Object.entries(map)) {
    if (str.includes(item) || keys.includes(item)) {
      return type;
    }
  }

  return 'form';
};

const createCallName = (method: string, url: string) => {
  let path = isUrl(url) ? new URL(url).pathname : url;
  path = path.replace(/\:/g, '').replace(/\//g, '-');
  return camelCase(`${method}-${path}`);
};

const parseSwagger = (json: any) => {
  const apis: ApiSchema[] = [];
  const entries: [string, any][] = Object.entries(json.paths || {});
  for (const [url, items] of entries) {
    for (const [method, info] of Object.entries(items)) {
      const _info: any = info;
      const _url = url.replace(/{([^}]+)}/g, ':$1');
      const _method = method.toLowerCase();
      const api: ApiSchema = {
        id: uid(),
        name: createCallName(_method, _url),
        url: _url,
        method: _method as ApiMethod,
        label: _info.summary,
        settings: {
          type: getApiType(_info.consumes, _info.requestBody),
          originResponse: true,
          validSuccess: false
        }
      };
      apis.push(api);
    }
  }
  return apis;
};

export function useSwagger() {
  const engine = useEngine();
  const swaggerApis = ref<ApiSchema[]>([]);
  const swaggerVisible = ref(false);
  const onBeforeUpload = async (file: UploadRawFile) => {
    const content = await parseFile(file).catch((e) => {
      ElMessage.error({
        message: '导入失败:' + e.message
      });
      return null;
    });
    if (content) {
      const valid = validate(content);
      if (!valid) {
        ElMessage.warning({
          message: '仅支持 OpenAPI 或 Swagger 2.0 的 JSON文件'
        });
        return false;
      }
      swaggerVisible.value = true;
      swaggerApis.value = parseSwagger(content);
    }
    return false;
  };

  const saveApis = (rows: ApiSchema[] = []) => {
    const project = engine.project.value;
    if (!project) return;
    project.setApis(rows);
    swaggerVisible.value = false;
    ElMessage.success({
      message: `已经导入 ${rows.length} 条数据`
    });
  };

  return {
    swaggerVisible,
    onBeforeUpload,
    swaggerApis,
    saveApis
  };
}
