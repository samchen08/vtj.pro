import { ref, markRaw } from 'vue';

export async function ckLoader() {
  if (typeof window === 'undefined') return undefined;
  const win = window as any;
  const version = win.CKEDITOR_VERSION;
  win.CKEDITOR_VERSION = undefined;

  const ClassicEditor =
    win.ClassicEditor ||
    (await import('@ckeditor/ckeditor5-build-classic')).default;
  const CKEditorVue =
    win.CKEditor || (await import('@ckeditor/ckeditor5-vue')).default;
  if (ClassicEditor) {
  }
  const CKEditorCN =
    win.CKEditorCN ||
    (
      await import(
        //@ts-ignore
        '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js'
      )
    ).default;
  win.CKEditorCN = CKEditorCN;
  win.CKEDITOR_VERSION = version;
  return {
    ClassicEditor: markRaw(ClassicEditor),
    CKEditor: markRaw(CKEditorVue.component),
    CKEditorCN
  };
}

export function useCkLoader() {
  const ckeditor = ref<any>();
  ckLoader().then((res) => {
    ckeditor.value = res;
  });
  return ckeditor;
}
