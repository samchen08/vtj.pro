import FormData from 'miniprogram-formdata';
import Blob from 'miniprogram-blob';

if (typeof globalThis.FormData === 'undefined') {
  (globalThis as any).FormData = FormData;
}

if (typeof globalThis.Blob === 'undefined') {
  (globalThis as any).Blob = Blob;
}
