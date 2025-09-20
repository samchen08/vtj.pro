import { ref, shallowRef } from 'vue';
import {
  devtoolsInspector,
  removeDevToolsAppRecord,
  setIframeServerContext,
  createRpcServer,
  initDevTools,
  setActiveAppRecord
} from '@vue/devtools-kit';
import { rpcServer, functions } from '@vue/devtools-core';
import { delay } from '@vtj/utils';
import { useEngine } from '../../framework';

export function useDevtools() {
  const engine = useEngine();
  const dialogRef = ref();
  const client = shallowRef();
  const hook = shallowRef();
  initDevTools();
  createRpcServer(functions, {
    preset: 'iframe'
  });

  const cleanEngineApp = async () => {
    const skeletonwrapper = 'skeletonwrapper';
    const appRecords = (window as any).__VUE_DEVTOOLS_KIT_APP_RECORDS__ || [];
    const inspectorIndex = devtoolsInspector.findIndex(
      (n: any) => n.appRecord.id === skeletonwrapper
    );

    devtoolsInspector.splice(inspectorIndex, 1);
    const record = appRecords.find((n: any) => n.id === skeletonwrapper);
    const app = appRecords.find((n: any) => n.id !== skeletonwrapper);
    if (app && client.value) {
      await functions.toggleApp(app.id);
      setActiveAppRecord(app);
    }
    if (record) {
      removeDevToolsAppRecord(record.app);
      hook.value.callHook('app:unmount', record.app);
    }
    await delay(500);
    dialogRef.value.$vtjEl.click();
  };

  const cancelInspect = async () => {
    await delay(300);
    const iframe = dialogRef.value?.iframeRef;
    if (iframe?.contentWindow) {
      const evt = new KeyboardEvent('keydown', {
        key: 'Escape'
      });
      iframe.contentWindow.dispatchEvent(evt);
    }
    await client.value?.$functions.cancelInspectComponentInspector();
  };

  const setupDevtools = () => {
    const iframe = dialogRef.value?.iframeRef;
    setIframeServerContext(iframe);

    client.value = rpcServer.value.clients[0];
    hook.value = (window as any).__VUE_DEVTOOLS_HOOK;
    cleanEngineApp();
    client.value.$functions.on('toggle-panel', cancelInspect);
  };

  const destoryDevtools = () => {
    client.value.$functions.off('toggle-panel', cancelInspect);
    removeDevToolsAppRecord(engine.simulator.renderer?.app);
    client.value = null;
    hook.value = null;
  };

  return {
    dialogRef,
    engine,
    setupDevtools,
    destoryDevtools
  };
}
