import { type BlockPropDataType } from '@vtj/core';

export enum ContextMode {
  /**
   * 运行时
   */
  Runtime = 'Runtime',

  /**
   * 设计模式
   */
  Design = 'Design',

  /**
   * 源码模式
   */
  Raw = 'Raw',

  /**
   * 虚拟节点
   */
  VNode = 'VNode'
}

/**
 * vue 组件实例提供的属性名
 */
export const CONTEXT_HOST = [
  '$el',
  '$emit',
  '$nextTick',
  '$parent',
  '$root',
  '$attrs',
  '$slots',
  '$watch',
  '$props',
  '$options',
  '$forceUpdate'
];

// 组件生命周期
export const LIFE_CYCLES_LIST = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeUnmount',
  'unmounted',
  'errorCaptured',
  'renderTracked',
  'renderTriggered',
  'activated',
  'deactivated'
];

/**
 * 内置指令
 */
export const BUILT_IN_DIRECTIVES = [
  'vIf',
  'vElseIf',
  'vElse',
  'vShow',
  'vModel',
  'vFor',
  'vBind',
  'vHtml'
];

/**
 * 数据类型
 */
export const DATA_TYPES: Record<BlockPropDataType, any> = {
  String: String,
  Number: Number,
  Boolean: Boolean,
  Array: Array,
  Object: Object,
  Function: Function,
  Date: Date
};

/**
 * 页面路由名称
 */
export const PAGE_ROUTE_NAME = 'VtjPage';

/**
 * 主页路由名称
 */
export const HOMEPAGE_ROUTE_NAME = 'VtjHomepage';

export const HTML_TAGS =
  'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot'.split(
    ','
  );

export const BUILD_IN_TAGS = 'component,slot'.split(',');
