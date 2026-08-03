/**
 * 文件上传与大模型识别 composable
 * 管理图片/JSON 文件上传 → recognition API → 识别结果的全生命周期
 */
import { ref, computed } from 'vue';

// ── 类型定义 ──

export interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'json';
  description: string;
  recognizing: boolean;
  error: string;
  /** 图片的 objectURL，用于缩略图预览 */
  previewUrl: string;
}

// ── 工具函数 ──

let _fileIdCounter = 0;
function generateId(): string {
  return `file_${Date.now()}_${++_fileIdCounter}`;
}

function detectFileType(file: File): 'image' | 'json' {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type === 'application/json' || file.name.endsWith('.json'))
    return 'json';
  return 'json';
}

// ── Composable ──

export function useFileRecognition(token: () => string, remote: () => string) {
  const files = ref<UploadedFile[]>([]);

  /** 是否有文件正在识别中 */
  const recognizing = computed(() => files.value.some((f) => f.recognizing));

  /** 上传单个文件并调用识别接口 */
  async function uploadFile(file: File): Promise<void> {
    const id = generateId();
    const type = detectFileType(file);
    const previewUrl = type === 'image' ? URL.createObjectURL(file) : '';

    const record: UploadedFile = {
      id,
      name: file.name,
      type,
      description: '',
      recognizing: true,
      error: '',
      previewUrl
    };

    files.value.push(record);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const t = token();
      if (!t) throw new Error('缺少 Token');

      const url = `${remote().replace(/\/$/, '')}/api/open/recognition/post/${t}`;
      const res = await fetch(url, { method: 'POST', body: formData });
      const wrapper = await res.json();

      // 后端 ResponseInterceptor 统一包装 { code, message, data }
      let data: { title?: string; content?: string; type?: string };
      if (wrapper.code !== undefined) {
        if (wrapper.code !== 0) {
          throw new Error(wrapper.message || `识别失败 code=${wrapper.code}`);
        }
        data = wrapper.data;
      } else {
        data = wrapper;
      }

      const idx = files.value.findIndex((f) => f.id === id);
      if (idx !== -1) {
        files.value[idx] = {
          ...files.value[idx],
          description: data.content || data.title || '',
          recognizing: false,
          error: ''
        };
      }
    } catch (e: any) {
      const idx = files.value.findIndex((f) => f.id === id);
      if (idx !== -1) {
        files.value[idx] = {
          ...files.value[idx],
          recognizing: false,
          error: e.message || '识别失败'
        };
      }
    }
  }

  /** 移除已上传文件 */
  function removeFile(fileId: string): void {
    const idx = files.value.findIndex((f) => f.id === fileId);
    if (idx !== -1) {
      const f = files.value[idx];
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
      files.value.splice(idx, 1);
    }
  }

  /** 构建文件识别描述合并后的 prompt 片段 */
  function buildFilePrompt(): string {
    return files.value
      .filter((f) => !f.recognizing && f.description && !f.error)
      .map((f) => {
        const label = f.type === 'image' ? '图片' : 'JSON';
        return `[${label}描述: ${f.name}]\n${f.description}`;
      })
      .join('\n\n');
  }

  /** 清空所有文件 */
  function clearFiles(): void {
    files.value.forEach((f) => {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
    files.value = [];
  }

  return {
    files,
    recognizing,
    uploadFile,
    removeFile,
    buildFilePrompt,
    clearFiles
  };
}
