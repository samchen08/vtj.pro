import { type NodeSchema } from '@vtj/core';
import { Parser } from 'htmlparser2';
import { styleToJson } from './utils';

export function htmlToNodes(html: string): NodeSchema[] {
  const root: NodeSchema = { name: '', children: [] };
  const stack: NodeSchema[] = [root];
  let currentText = '';

  const parser = new Parser(
    {
      onopentag: (name, attrs, isSelfClosing) => {
        const parent = stack[stack.length - 1];

        // 将之前累积的文本存入父节点
        if (currentText.trim()) {
          if (Array.isArray(parent.children)) {
            parent.children.push({
              name: 'text',
              children: currentText.trim()
            });
          } else {
            parent.children = currentText.trim();
          }

          currentText = '';
        }

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

        if (props.style) {
          props.style = styleToJson(props.style);
        }

        // 创建新节点
        const node: NodeSchema = {
          name,
          props
        };

        // 添加到父节点的子元素
        if (Array.isArray(parent.children)) {
          parent.children.push(node);
        } else if (parent.children) {
          parent.children = [
            {
              name: 'span',
              children: parent.children
            },
            node
          ];
        } else {
          parent.children = [node];
        }

        // 非自闭合标签才入栈
        if (!isSelfClosing) {
          stack.push(node);
        }
      },
      ontext: (text) => {
        const trimmedText = text.trim();
        if (trimmedText && trimmedText !== '"') {
          currentText += trimmedText;
        }
      },
      onclosetag: () => {
        const node = stack.pop();

        // 关闭标签前处理累积的文本
        if (currentText.trim()) {
          if (Array.isArray(node?.children)) {
            node.children.push({
              name: 'span',
              children: currentText.trim()
            });
          } else {
            if (node) {
              node.children = currentText.trim();
            }
          }

          currentText = '';
        }
      }
    },
    { decodeEntities: true }
  );

  parser.write(html);
  parser.end();

  // 返回第一个有效子节点（跳过根容器）
  return (root.children || []) as NodeSchema[];
}
