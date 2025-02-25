import { type App } from 'vue';

// import { toKebabCase } from '../utils';
export function install(app: App, UniH5?: any) {
  if (!UniH5) return;

  const components = [
    'View',
    'ScrollView',
    'Swiper',
    'MovableArea',
    'MovableView',
    'CoverView',
    'CoverImage',
    'Icon',
    'Text',
    'RichText',
    'Progress',
    'Button',
    'CheckboxGroup',
    'Checkbox',
    'Editor',
    'Form',
    'Input',
    'Label',
    'Picker',
    'PickerView',
    'RadioGroup',
    'Radio',
    'Slider',
    'Switch',
    'Textarea',
    'Navigator',
    'Image',
    'Video',
    'Map',
    'Canvas',
    'WebView',
    'PickerViewColumn',
    'ResizeSensor',
    'SwiperItem'
  ];

  components.forEach((k) => {
    const v = UniH5[k];
    app.component(k, v);
    // customElements.define(toKebabCase(k), defineCustomElement(v));
    // defineCustomElement.app.component(toKebabCase(k), v);
  });
}
