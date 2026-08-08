/**
 * 文件上传与大模型识别 composable
 * 管理图片/JSON 文件上传 → recognition API → 识别结果的全生命周期
 */
import { ref, computed } from 'vue';
import type { AttachmentInfo } from '../types/agent';
import { genId } from '../utils/genId';

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
  /** 识别成功后后端返回的文件访问地址 */
  url: string;
}

// ── 工具函数 ──

let _fileIdCounter = 0;
function generateId(): string {
  return genId(`file_${++_fileIdCounter}`);
}

function detectFileType(file: File): 'image' | 'json' {
  if (file.type.startsWith('image/')) return 'image';
  return 'json';
}

// ── Composable ──

export function useFileRecognition(
  recognitionFile: (file: File) => Promise<{
    title?: string;
    content?: string;
    type?: string;
    url?: string;
  }>
) {
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
      previewUrl,
      url: ''
    };

    files.value.push(record);

    try {
      const data = await recognitionFile(file);

      const idx = files.value.findIndex((f) => f.id === id);
      if (idx !== -1) {
        files.value[idx] = {
          ...files.value[idx],
          description: data.content || data.title || '',
          url: data.url || '',
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

  /** 清空所有文件 */
  function clearFiles(): void {
    files.value.forEach((f) => {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
    files.value = [];
  }

  /** 构建文件识别描述合并后的 prompt 片段（带剥离标记，回显时可还原纯文本） */
  function buildFilePrompt(): string {
    return files.value
      .filter((f) => !f.recognizing && f.description && !f.error)
      .map((f) => {
        const label = f.type === 'image' ? '图片' : 'JSON';
        return `[${label}描述: ${f.name}]\n<<<FILE_DESC>>>\n${f.description}\n<<<END_FILE_DESC>>>`;
      })
      .join('\n\n');
  }

  /** 构建附件展示快照（仅已识别完成且无错误的文件，不含识别描述） */
  function buildAttachments(): AttachmentInfo[] {
    return files.value
      .filter((f) => !f.recognizing && !f.error)
      .map((f) => ({
        id: f.id,
        name: f.name,
        type: f.type,
        url: f.url || undefined
      }));
  }

  return {
    files,
    recognizing,
    uploadFile,
    removeFile,
    buildFilePrompt,
    buildAttachments,
    clearFiles
  };
}
