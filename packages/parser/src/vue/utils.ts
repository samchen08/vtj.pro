import {
  type JSExpression,
  type JSFunction,
  type PlatformType
} from '@vtj/core';
import { upperFirstCamelCase } from '@vtj/base';
export interface ExpressionOptions {
  platform: PlatformType;
  context: Record<string, Set<string>>;
  computed: string[];
  libs: Record<string, string>;
  members: string[];
}

export function replacer(content: string, key: string, to: string) {
  const r1 = new RegExp(`${key}`, 'g');
  // 关键字前的字符
  const r2 = /(\@\_|\$|\.|\,|\w)$/;
  // 关键字后的字符
  const r3 = /^\w/;
  const r4 = new RegExp(`^this\.${key}$`, 'g');
  const result = content.replace(r1, (str, index, source) => {
    const start = source.substring(0, index);
    const end = source.substring(index + key.length);
    // 前后字符符合正则的不替换
    if (r2.test(start.trim()) || r3.test(end.trim())) {
      return str;
    }
    return to;
  });

  return result.replace(r4, to);

  return result;
}

export function patchCode(
  content: string,
  id: string,
  options: ExpressionOptions
) {
  const {
    context = {},
    computed = [],
    libs = {},
    members = [],
    platform
  } = options || {};
  const contextKeys = Array.from(context[id || ''] || new Set());

  if (contextKeys) {
    for (const key of contextKeys) {
      content = replacer(content, key, `this.context.${key}`);
    }
  }

  for (const key of computed) {
    content = replacer(content, key, `this.${key}.value`);
  }

  for (const [key, value] of Object.entries(libs)) {
    content = replacer(content, key, `this.$libs.${value}.${key}`);
  }

  for (const key of members) {
    content = replacer(content, key, `this.${key}`);
  }

  if (platform === 'uniapp') {
    const uniRegex = /\buni\./g;
    content = content.replace(uniRegex, 'this.$libs.UniH5.uni.');
  }

  // 兜底
  content = content.replace(/_ctx\./g, 'this.');

  return content;
}

export function getJSExpression(content: string) {
  const regex = /^\{[\w\W]*\}$/;
  const code = regex.test(content) ? `(${content})` : content;
  return {
    type: 'JSExpression',
    value: code
  } as JSExpression;
}

export function getJSFunction(content: string) {
  return {
    type: 'JSFunction',
    value: content
  } as JSFunction;
}

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

export const HTML_TAGS =
  'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot'.split(
    ','
  );

export const BUILD_IN_TAGS = 'component,slot,template'.split(',');

export const UNI_TAGS =
  'view,swiper,progress,icon,text,button,checkbox,editor,form,input,label,picker,radio,slider,switch,textarea,audio,camera,image,video,map,canvas'.split(
    ','
  );

export function isUniTags(tag: string, platform: PlatformType = 'web') {
  return platform === 'uniapp' && UNI_TAGS.includes(tag);
}

export function formatTagName(tag: string, platform: PlatformType = 'web') {
  if (
    (HTML_TAGS.includes(tag) || BUILD_IN_TAGS.includes(tag)) &&
    !isUniTags(tag, platform)
  ) {
    return tag;
  }
  return upperFirstCamelCase(tag);
}

export function isScss(source: string) {
  const regex = /style lang=\"scss\"/;
  return regex.test(source);
}

export function styleToJson(style: string) {
  const cleaned = style.replace(/\s+/g, ' ');
  return cleaned.split(';').reduce((acc: Record<string, string>, current) => {
    const [property, value] = current.split(':').map((item) => item.trim());
    if (property && value) {
      acc[property] = value;
    }
    return acc;
  }, {});
}

export function validate(content: string) {
  const errors: string[] = [];
  const r1 = /保持不变/g;

  if (r1.test(content)) {
    errors.push('部分保持不变的代码需要完整输出');
  }

  return errors;
}

export function mergeClass(
  staticClass: string,
  expSource: string,
  type: 'ObjectExpression' | 'ArrayExpression'
) {
  if (type === 'ObjectExpression') {
    const staticStr = staticClass
      .split(' ')
      .map((item) => {
        return `'${item}': true`;
      })
      .join(',');
    return `(Object.assign({${staticStr}}, ${expSource}))`;
  } else if (type === 'ArrayExpression') {
    const staticStr = staticClass
      .split(' ')
      .map((item) => {
        return `'${item}'`;
      })
      .join(',');
    return `([${staticStr}].concat(${expSource}))`;
  }
}
