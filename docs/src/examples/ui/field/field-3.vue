<template>
  <div class="page">
    <XField label="Number" editor="number"> </XField>
    <XField label="日期" editor="date"> </XField>
    <XField label="日期时间" editor="datetime"> </XField>
    <XField label="时间" editor="time" width="400px"> </XField>
    <XField label="投票" editor="rate"> </XField>
    <XField label="开关" editor="switch"> </XField>
    <XField label="滑块" editor="slider"> </XField>
    <XField label="级联" editor="cascader" :options="TreeData"> </XField>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XField } from '@vtj/ui';

  const TreeData = ref([
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency'
            },
            {
              value: 'feedback',
              label: 'Feedback'
            },
            {
              value: 'efficiency',
              label: 'Efficiency'
            },
            {
              value: 'controllability',
              label: 'Controllability'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation'
            },
            {
              value: 'top nav',
              label: 'Top Navigation'
            }
          ]
        }
      ]
    },
    {
      value: 'component',
      label: 'Component',
      children: [
        {
          value: 'basic',
          label: 'Basic',
          children: [
            {
              value: 'layout',
              label: 'Layout'
            },
            {
              value: 'color',
              label: 'Color'
            },
            {
              value: 'typography',
              label: 'Typography'
            },
            {
              value: 'icon',
              label: 'Icon'
            },
            {
              value: 'button',
              label: 'Button'
            }
          ]
        },
        {
          value: 'form',
          label: 'Form',
          children: [
            {
              value: 'radio',
              label: 'Radio'
            },
            {
              value: 'checkbox',
              label: 'Checkbox'
            },
            {
              value: 'input',
              label: 'Input'
            },
            {
              value: 'input-number',
              label: 'InputNumber'
            },
            {
              value: 'select',
              label: 'Select'
            },
            {
              value: 'cascader',
              label: 'Cascader'
            },
            {
              value: 'switch',
              label: 'Switch'
            },
            {
              value: 'slider',
              label: 'Slider'
            },
            {
              value: 'time-picker',
              label: 'TimePicker'
            },
            {
              value: 'date-picker',
              label: 'DatePicker'
            },
            {
              value: 'datetime-picker',
              label: 'DateTimePicker'
            },
            {
              value: 'upload',
              label: 'Upload'
            },
            {
              value: 'rate',
              label: 'Rate'
            },
            {
              value: 'form',
              label: 'Form'
            }
          ]
        },
        {
          value: 'data',
          label: 'Data',
          children: [
            {
              value: 'table',
              label: 'Table'
            },
            {
              value: 'tag',
              label: 'Tag'
            },
            {
              value: 'progress',
              label: 'Progress'
            },
            {
              value: 'tree',
              label: 'Tree'
            },
            {
              value: 'pagination',
              label: 'Pagination'
            },
            {
              value: 'badge',
              label: 'Badge'
            }
          ]
        },
        {
          value: 'notice',
          label: 'Notice',
          children: [
            {
              value: 'alert',
              label: 'Alert'
            },
            {
              value: 'loading',
              label: 'Loading'
            },
            {
              value: 'message',
              label: 'Message'
            },
            {
              value: 'message-box',
              label: 'MessageBox'
            },
            {
              value: 'notification',
              label: 'Notification'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'menu',
              label: 'Menu'
            },
            {
              value: 'tabs',
              label: 'Tabs'
            },
            {
              value: 'breadcrumb',
              label: 'Breadcrumb'
            },
            {
              value: 'dropdown',
              label: 'Dropdown'
            },
            {
              value: 'steps',
              label: 'Steps'
            }
          ]
        },
        {
          value: 'others',
          label: 'Others',
          children: [
            {
              value: 'dialog',
              label: 'Dialog'
            },
            {
              value: 'tooltip',
              label: 'Tooltip'
            },
            {
              value: 'popover',
              label: 'Popover'
            },
            {
              value: 'card',
              label: 'Card'
            },
            {
              value: 'carousel',
              label: 'Carousel'
            },
            {
              value: 'collapse',
              label: 'Collapse'
            }
          ]
        }
      ]
    },
    {
      value: 'resource',
      label: 'Resource',
      children: [
        {
          value: 'axure',
          label: 'Axure Components'
        },
        {
          value: 'sketch',
          label: 'Sketch Templates'
        },
        {
          value: 'docs',
          label: 'Design Documentation'
        }
      ]
    }
  ]);
</script>
