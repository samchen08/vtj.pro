/// <reference types="vite/client" />

import type { ElMessageBox, Notify, ElLoading, Message } from 'element-plus';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;

  interface ComponentCustomProperties {
    $message: any;
  }
}

declare module '*.json';

declare module 'vue' {
  interface ComponentCustomProperties {
    $message: Message;
    $msgbox: ElMessageBox;
    $loading: ElLoading.service;
    $notify: Notify;
    $alert: ElMessageBox.alert;
    $confirm: ElMessageBox.confirm;
    $prompt: ElMessageBox.prompt;
  }
}

export {};
