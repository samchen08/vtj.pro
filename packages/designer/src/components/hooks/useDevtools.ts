import { ref, shallowRef, watch } from 'vue';
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
  const visible = ref(false);
  const client = shallowRef();
  const hook = shallowRef();

  functions.inspectComponentInspector = async () => {
    return new Promise((resolve) => {
      const stopHover = watch(
        () => engine.simulator.designer.value?.hover.value,
        (v) => {
          if (visible.value && v && v.el) {
            const id = (v.el as any).__vueParentComponent
              .__VUE_DEVTOOLS_NEXT_UID__;
            functions.highlighComponent(id);
          }
        }
      );
      const stopSelected = watch(
        () => engine.simulator.designer.value?.selected.value,
        (v) => {
          if (v && v.el) {
            stopHover();
            stopSelected();
            const id = (v.el as any).__vueParentComponent
              .__VUE_DEVTOOLS_NEXT_UID__;
            resolve(JSON.stringify({ id }));
          } else {
            functions.cancelInspectComponentInspector();
          }
        }
      );
    });
  };

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

  const setupDevtools = () => {
    const iframe = dialogRef.value?.iframeRef;
    setIframeServerContext(iframe);
    client.value = rpcServer.value.clients[0];
    hook.value = (window as any).__VUE_DEVTOOLS_HOOK;
    cleanEngineApp();
  };

  const destoryDevtools = () => {
    removeDevToolsAppRecord(engine.simulator.renderer?.app);
    client.value = null;
    hook.value = null;
  };

  return {
    dialogRef,
    engine,
    setupDevtools,
    destoryDevtools,
    visible
  };
}
