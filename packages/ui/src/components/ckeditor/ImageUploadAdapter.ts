import { type CKEditorImageUploder } from './types';
import { fileToBase64 } from '@vtj/utils';

export class ImageUploadAdapter {
  constructor(
    public loader: any,
    public uploader: CKEditorImageUploder = fileToBase64
  ) {}
  async upload() {
    const loader = this.loader;

    const file = await (loader.file as Promise<File>);
    if (file) {
      const data = await this.uploader(file).catch((e) => {
        console.warn('XCkeditor', e);
        return null;
      });
      if (data) {
        loader.uploadTotal = file.size;
        loader.uploaded = file.size;
        return {
          default: data
        };
      }
    }
  }

  abort() {}
}
