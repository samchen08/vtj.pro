import type { ComponentPropsType } from '../shared';

export const startupProps = {
  name: {
    type: String,
    default: 'VTJ.PRO'
  },
  tagline: {
    type: String,
    default: '基于 Vue3 + TypeScript 快速打造高生产力的低代码研发平台'
  },
  actionText: {
    type: String,
    default: '开始设计'
  },
  actionLink: {
    type: String,
    default: '/@vtj/pro/'
  }
};

export type StartupProps = ComponentPropsType<typeof startupProps>;
