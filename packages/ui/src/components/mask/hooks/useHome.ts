import { computed } from 'vue';
import { MaskProps, MaskTab } from '../types';
import { HomeFilled } from '@element-plus/icons-vue';
import { uid } from '@vtj/utils';

export function useHome(props: MaskProps) {
  const id = uid();
  return computed<MaskTab>(() => {
    const home = props.home;
    return Object.assign(
      { id, url: '/', name: 'MaskHome', icon: HomeFilled, closable: false },
      typeof home === 'string' ? { url: home } : home || {}
    );
  });
}
