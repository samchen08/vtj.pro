<template>
  <div class="x-ckeditor" :class="classes">
    <component
      v-if="ckeditor?.CKEditor"
      :is="ckeditor.CKEditor"
      :disabled="!props.editable || props.disabled"
      :editor="ckeditor.ClassicEditor"
      :config="config"
      :model-value="content"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @ready="onReady"></component>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { ckeditorProps, type CKEditorEmits } from './types';
  import { ImageUploadAdapter } from './ImageUploadAdapter';
  import { useAdapter } from '../../adapter';
  import { useCkLoader } from './loader';
  const ckeditor = useCkLoader();

  defineOptions({
    name: 'XCKEditor'
  });

  const props = defineProps(ckeditorProps);
  const emit = defineEmits<CKEditorEmits>();
  const content = ref(props.modelValue);
  const adapter = useAdapter();
  const config = {
    language: 'zh-cn',
    mediaEmbed: {
      providers: [
        {
          name: 'mp4',
          url: /\.mp4$/gi,
          html: (match: any) =>
            `<video src="${match}" controls style="width:100%; height:400px;"></video>`
        }
      ]
    }
  };

  const classes = computed(() => {
    return {
      'is-editable': props.editable,
      'is-no-border': !props.editable && !props.border
    };
  });

  watch(
    () => props.modelValue,
    (v) => {
      content.value = v;
    }
  );

  const onInput = (e: string) => {
    content.value = e;
    emit('change', e);
  };

  const onFocus = (e: any) => {
    emit('focus', e);
  };

  const onBlur = (e: any) => {
    emit('blur', content.value, e);
    if (props.modelValue !== content.value) {
      emit('update:modelValue', content.value);
    }
  };

  const onReady = (ckeditor: any) => {
    ckeditor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new ImageUploadAdapter(loader, props.uploader ?? adapter.uploader);
    };
    emit('ready', ckeditor);
  };
</script>
