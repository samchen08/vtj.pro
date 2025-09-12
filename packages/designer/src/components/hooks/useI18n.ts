import { ref, watch } from 'vue';
import { type I18nConfig, I18N_LOCALES } from '@vtj/core';
import { useProject } from './useProject';
export function useI18n() {
  const { project } = useProject();

  const formVisible = ref(false);
  const formModel = ref({});

  const locales = [...I18N_LOCALES];

  watch(formVisible, (v) => {
    if (v) {
      const i18n = project.value?.i18n;
      if (i18n) {
        formModel.value = {
          ...i18n
        };
      }
    }
  });

  const submitMethod: any = async (i18n: I18nConfig) => {
    project.value?.setI18n(i18n);
    return true;
  };

  return {
    project,
    formModel,
    formVisible,
    submitMethod,
    locales
  };
}
