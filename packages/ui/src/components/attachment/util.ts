import { type AttachmentFile, type AttachmentFileType } from './types';

export function getFileType(file: AttachmentFile): AttachmentFileType {
  if (file.type) return file.type;
  const url = file.name || file.url.split('?')[0];
  const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  const image = ['jpg', 'png', 'gif', 'jpeg', 'bpm', 'webp', 'svg'];
  const js = ['js', 'mjs', 'cjs', 'ts', 'jsx', 'tsx'];
  const css = ['css', 'scss', 'sass', 'less'];
  const word = ['doc', 'docx'];
  const excel = ['xls', 'xlsx'];
  const ppt = ['ppt', 'pptx'];
  const zip = ['zip', 'rar'];
  const video = ['mp4', 'wmv'];
  const audio = ['mp3', 'wma'];
  const other = ['pdf', 'json'];
  if (image.includes(ext)) return 'img';
  if (js.includes(ext)) return 'js';
  if (css.includes(ext)) return 'css';
  if (word.includes(ext)) return 'word';
  if (excel.includes(ext)) return 'excel';
  if (ppt.includes(ext)) return 'ppt';
  if (zip.includes(ext)) return 'zip';
  if (video.includes(ext)) return 'video';
  if (audio.includes(ext)) return 'audio';
  if (other.includes(ext)) return ext as AttachmentFileType;
  return 'unknow';
}

export function isImage(file: AttachmentFile) {
  return getFileType(file) === 'img';
}

export function toAttachmentFile(file: any) {
  const { url, type } = file || {};
  return {
    url,
    ...file,
    ...file.response,
    type: type || getFileType(file.response || file)
  };
}
