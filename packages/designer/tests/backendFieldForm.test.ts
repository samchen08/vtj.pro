import { afterEach, describe, expect, it } from 'vitest';
import { createApp, defineComponent, h, nextTick } from 'vue';
import type { BackendFieldSchema } from '@vtj/core';
import FieldForm from '../src/components/widgets/backend-models/field-form.vue';

const cleanups: Array<() => void> = [];

afterEach(() => cleanups.splice(0).forEach((cleanup) => cleanup()));

async function flush() {
  await nextTick();
  await Promise.resolve();
  await nextTick();
}

function mount(
  model: BackendFieldSchema,
  onSubmit: (field: BackendFieldSchema) => void = () => {}
) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = createApp(
    defineComponent({
      setup() {
        return () => h(FieldForm, { model, models: [], onSubmit });
      }
    })
  );
  app.mount(root);
  cleanups.push(() => {
    app.unmount();
    root.remove();
  });
  return root;
}

describe('backend field form', () => {
  it('keeps invalid input and explains the field identifier rule', async () => {
    const root = mount({
      id: 'new-field',
      name: 'Bad Name',
      label: '测试字段',
      type: 'string',
      maxLength: 100,
      required: false,
      nullable: true
    });
    [...root.querySelectorAll('button')]
      .find((item) => item.textContent?.trim() === '完成')!
      .click();
    await flush();
    expect(root.textContent).toContain('字段标识须以小写字母开头');
    expect(root.querySelectorAll('input')[1].value).toBe('Bad Name');
  });

  it('submits a valid field without mutating the source object', async () => {
    const source: BackendFieldSchema = {
      id: 'new-field',
      name: 'note',
      label: '备注',
      type: 'string',
      maxLength: 100,
      required: false,
      nullable: true
    };
    let submitted: BackendFieldSchema | undefined;
    const root = mount(source, (field) => {
      submitted = field;
    });
    [...root.querySelectorAll('button')]
      .find((item) => item.textContent?.trim() === '完成')!
      .click();
    await flush();
    expect(submitted).toEqual(source);
    expect(submitted).not.toBe(source);
  });
});
