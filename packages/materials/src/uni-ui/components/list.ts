import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniList',
    label: '列表',
    categoryId: 'ext',
    props: [
      {
        name: 'border',
        title: '是否显示边框',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'UniListItem',
          props: {
            title: '列表文字'
          }
        },
        {
          name: 'UniListItem',
          props: {
            title: '列表禁用状态',
            disabled: 'true'
          }
        }
      ]
    }
  },
  {
    name: 'UniListItem',
    label: '列表项',
    categoryId: 'ext',
    props: [
      {
        name: 'title',
        title: '标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'note',
        title: '描述',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'ellipsis',
        title: 'title 是否溢出隐藏',
        defaultValue: 0,
        setters: 'SelectSetter',
        options: [
          { label: '0', value: 0 },
          { label: '1', value: 1 },
          { label: '2', value: 2 }
        ]
      },
      {
        name: 'thumb',
        title: '左侧缩略图，若thumb有值，则不会显示扩展图标',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'thumbSize',
        title: '略缩图尺寸',
        defaultValue: 'medium',
        setters: 'SelectSetter',
        options: ['lg', 'medium', 'sm']
      },
      {
        name: 'showBadge',
        title: '是否显示数字角标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badgeText',
        title: '数字角标内容',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'badgeType',
        title: '数字角标类型',
        defaultValue: '',
        setters: 'ObjectSetter'
      },
      {
        name: 'rightText',
        title: '右侧文字内容',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showArrow',
        title: '是否显示箭头图标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'link',
        title: '新页面跳转方式',
        defaultValue: 'navigateTo',
        setters: 'SelectSetter',
        options: ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
      },
      {
        name: 'to',
        title: '新页面跳转地址',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'clickable',
        title: '是否开启点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showSwitch',
        title: '是否显示Switch',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'switchChecked',
        title: 'Switch是否被选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'showExtraIcon',
        title: '左侧是否显示扩展图标',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'extraIcon',
        title: '扩展图标参数',
        defaultValue: '',
        setters: 'ObjectSetter'
      },
      {
        name: 'direction',
        title: '排版方向',
        defaultValue: 'row',
        setters: 'SelectSetter',
        options: ['row', 'column']
      }
    ],
    events: ['click', 'switchChange'],
    slots: ['header', 'body', 'footer'],
    snippet: {
      props: {
        title: '列表文字'
      }
    }
  },
  {
    name: 'UniListChat',
    label: '列表聊天项',
    categoryId: 'ext',
    props: [
      {
        name: 'title',
        title: '标题',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'note',
        title: '描述',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'clickable',
        title: '是否开启点击反馈',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'badgeText',
        title: '数字角标内容，设置为 dot 将显示圆点',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'badgePositon',
        title: '角标位置',
        defaultValue: 'right',
        setters: 'StringSetter'
      },
      {
        name: 'link',
        title: '是否展示右侧箭头并开启点击反馈，可选值见下表',
        defaultValue: 'navigateTo',
        setters: 'SelectSetter',
        options: ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
      },
      {
        name: 'to',
        title: '跳转页面地址',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'time',
        title: '右侧时间显示',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'avatarCircle',
        title: '是否显示圆形头像',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'avatar',
        title: '头像地址，avatarCircle 不填时生效',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'avatarList',
        title: '头像组，格式为 [{url:""}]',
        defaultValue: '',
        setters: 'ArraySetter'
      }
    ],
    events: ['click'],
    slots: ['default'],
    snippet: {
      props: {
        avatarCircle: true,
        badgeText: 12,
        title: 'uni-app',
        avatar:
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        note: '您收到一条新的消息',
        time: '2020-02-02 20:20'
      }
    }
  }
];

export default desc;
