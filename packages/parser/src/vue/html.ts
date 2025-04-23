import { type NodeSchema } from '@vtj/core';
import { Parser } from 'htmlparser2';

export function htmlToNodes(html: string): NodeSchema[] {
  let root: NodeSchema = { name: '', children: [] };
  const stack: NodeSchema[] = [root];

  const parser = new Parser(
    {
      onopentag: (name, attrs) => {
        const props = Object.entries(attrs || {}).reduce(
          (pre, cur) => {
            let [key = '', value = ''] = cur;
            key = key.replace(/\\\"/g, '');
            value = value.replace(/\\\"/g, '');
            if (key) {
              pre[key] = value;
            }
            return pre;
          },
          {} as Record<string, any>
        );
        const currentNode: NodeSchema = {
          name: name,
          props: props,
          children: ''
        };

        // 将当前节点添加到父节点的子数组中
        const parent = stack[stack.length - 1];
        if (!parent.children) {
          parent.children = [];
        }
        if (Array.isArray(parent.children)) {
          parent.children.push(currentNode);
        }

        // 将当前节点推入栈
        stack.push(currentNode);
      },
      ontext: (text) => {
        const trimmedText = text.trim();
        if (trimmedText && trimmedText !== '"') {
          const parent = stack[stack.length - 1];

          if (!parent.children) {
            parent.children = trimmedText;
          } else {
            parent.children = [
              {
                name: 'span',
                children: parent.children
              }
            ];
            parent.children.push({
              name: 'span',
              children: trimmedText
            });
          }
        }
      },
      onclosetag: () => {
        // 弹出当前节点（仅当非自闭合标签时）
        stack.pop();
      }
    },
    { recognizeSelfClosing: true }
  );

  parser.write(html);
  parser.end();

  // 返回第一个有效子节点（跳过根容器）
  return (root.children || []) as NodeSchema[];
}
