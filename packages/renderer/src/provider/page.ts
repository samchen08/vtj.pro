import { defineComponent, h, ref, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProvider } from './provider';
export const PageContainer = defineComponent({
  name: 'VtjPageContainer',
  async setup() {
    const provider = useProvider();
    const route = useRoute();
    const file = shallowRef();
    const component = shallowRef();
    const sid = ref(Symbol());
    let generation = 0;

    const loadPage = async () => {
      const currentGeneration = ++generation;
      const id = (route.meta.__vtj__ || route.params.id) as string;
      const nextFile = id ? provider.getPage(id) : provider.getHomepage();
      const nextComponent = nextFile
        ? await provider.getRenderComponent(nextFile.id)
        : null;
      if (currentGeneration !== generation) return;

      file.value = nextFile;
      component.value = nextComponent;
      sid.value = Symbol();
      if (!nextFile) return;

      Object.assign(route.meta, nextFile.meta || {}, { cache: nextFile.cache });
      const { useTitle } = provider?.adapter;
      if (useTitle) {
        const title: string =
          (route.meta.title as string) || nextFile.title || 'VTJ.PRO';
        useTitle(title);
      }
    };

    const initialLoad = loadPage();
    watch(
      () => [route.meta.__vtj__, route.params.id],
      () => loadPage()
    );
    await initialLoad;

    return {
      provider,
      component,
      file,
      meta: route.meta,
      sid,
      route
    };
  },
  render() {
    const { component, sid, route } = this;
    if (component) {
      return h(component, { ...route.query, key: sid });
    } else {
      return h(
        'div',
        { style: { padding: '10px' } },
        '找不到组件，组件不存在或未发布！'
      );
    }
  },
  activated() {
    if (this.meta.cache === false) {
      this.sid = Symbol();
    }
  }
});
