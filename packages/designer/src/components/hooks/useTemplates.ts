import { computed, ref, type Ref } from 'vue';
import { groupBy } from '@vtj/utils';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useOpenApi } from './useOpenApi';
import { type TemplateDto } from '../../framework';

export function useTemplates() {
  const {
    engine,
    access,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl,
    removeTemplate
  } = useOpenApi();

  const templates: Ref<TemplateDto[]> = ref([]);
  const loading = ref(false);

  const installTemplate = async (templateId: string) => {
    const current = engine.current.value;
    const project = engine.project.value;
    if (!project) return;
    if (!current) {
      ElMessage.warning({
        message: '设计区无文件，请先打开页面或区块'
      });
      return;
    }
    const dsl = await getTemplateDsl(templateId);
    if (!dsl) {
      return await ElMessageBox.alert('模板不可用，可能该模板没发布过版本', {
        type: 'error',
        title: '提示'
      });
    }

    const old = current.toDsl();
    const { id, name } = old;
    const newDsl = { ...dsl, id, name };
    const file = project.currentFile;

    engine.onSaveBlockFileFinish(() => {
      current.update(newDsl);
      ElMessage.success({
        message: '模板已加载完成'
      });
    });

    if (file) {
      file.market = {
        id: templateId
      };
      file.dsl = newDsl;
      if (project.isPageFile(file)) {
        project.updatePage(file);
      } else {
        project.updateBlock(file);
      }
    }
  };

  const groups = computed(() => {
    const userId = access?.getData()?.id;
    return groupBy(templates.value, (template) => {
      return template.author === userId ? '我的' : template.category;
    });
  });

  const refreshTemplates = () => {
    const project = engine.project.value;
    loading.value = true;
    getTemplates(project?.platform)
      .then((res) => {
        templates.value = res;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  refreshTemplates();

  return {
    engine,
    templates,
    toRemoteAuth,
    isLogined,
    getTemplates,
    getTemplateDsl,
    installTemplate,
    removeTemplate,
    groups,
    access,
    refreshTemplates,
    loading
  };
}
