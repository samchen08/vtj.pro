import { defineComponent, h } from 'vue';
import { Startup } from '../components';
export const StartupContainer = defineComponent({
  name: 'VtjStartupContainer',
  render() {
    return h(Startup);
  }
});
