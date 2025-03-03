import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Video',
  label: '视频播放组件',
  categoryId: 'media',
  props: [
    {
      name: 'src',
      title: '要播放视频的资源地址',
      setters: 'StringSetter'
    },
    {
      name: 'autoplay',
      title: '是否自动播放',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loop',
      title: '是否循环播放',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'muted',
      title: '是否静音播放',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'initial-time',
      title: '指定视频初始播放位置，单位为秒（s）',
      setters: 'NumberSetter'
    },
    {
      name: 'duration',
      title: '指定视频时长，单位为秒（s）',
      setters: 'NumberSetter'
    },
    {
      name: 'controls',
      title: '是否显示默认播放控件（播放/暂停按钮、播放进度、时间）',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'danmu-list',
      title: '弹幕列表',
      setters: 'ExpressionSetter'
    },
    {
      name: 'danmu-btn',
      title: '是否显示弹幕按钮，只在初始化时有效，不能动态变更',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-danmu',
      title: '是否展示弹幕，只在初始化时有效，不能动态变更',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'page-gesture',
      title: '在非全屏模式下，是否开启亮度与音量调节手势',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'direction',
      title: '设置全屏时视频的方向，不指定则根据宽高比自动判断',
      setters: 'SelectSetter',
      options: [
        { label: '0', value: 0 },
        { label: '90', value: 90 },
        { label: '-90', value: -90 }
      ]
    },
    {
      name: 'show-progress',
      title: '若不设置，宽度大于240时才会显示',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-fullscreen-btn',
      title: '是否显示全屏按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-play-btn',
      title: '是否显示视频底部控制栏的播放按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-center-play-btn',
      title: '是否显示视频中间的播放按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-loading',
      title: '是否显示loading控件',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-progress-gesture',
      title: '是否开启控制进度的手势',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'object-fit',
      title: '视频的表现形式',
      defaultValue: 'contain',
      setters: 'SelectSetter',
      options: ['contain', 'fill', 'cover']
    },
    {
      name: 'poster',
      title:
        '视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效	',
      setters: 'StringSetter'
    },
    {
      name: 'show-mute-btn',
      title: '是否显示静音按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'title',
      title: '视频的标题，全屏时在顶部展示',
      setters: 'StringSetter'
    },
    {
      name: 'play-btn-position',
      title: '播放按钮的位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: ['bottom', 'center']
    },
    {
      name: 'mobilenet-hint-type',
      title: '移动网络提醒样式：0是不提醒，1是提醒，默认值为1',
      defaultValue: 1,
      setters: 'SelectSetter',
      options: [
        { label: '0', value: 0 },
        { label: '1', value: 1 }
      ]
    },
    {
      name: 'enable-play-gesture',
      title: '是否开启播放手势，即双击切换播放/暂停',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-pause-if-navigate',
      title: '当跳转到其它小程序页面时，是否自动暂停本页面的视频',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-pause-if-open-native',
      title: '当跳转到其它微信原生页面时，是否自动暂停本页面的视频',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'vslide-gesture',
      title: '在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'vslide-gesture-in-fullscreen',
      title: '在全屏模式下，是否开启亮度与音量调节手势',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'ad-unit-id',
      title: '视频前贴广告单元ID',
      setters: 'StringSetter'
    },
    {
      name: 'poster-for-crawler',
      title: '用于给搜索等场景作为视频封面展示',
      setters: 'StringSetter'
    },
    {
      name: 'codec',
      title: '解码器选择',
      defaultValue: 'hardware',
      setters: 'SelectSetter',
      options: ['hardware', 'software']
    },
    {
      name: 'http-cache',
      title: '是否对 http、https 视频源开启本地缓存',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'play-strategy',
      title: '播放策略',
      defaultValue: 0,
      setters: 'SelectSetter',
      options: [
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 }
      ]
    },
    {
      name: 'header',
      title: 'HTTP 请求 Header',
      setters: 'ObjectSetter'
    },
    {
      name: 'is-live',
      title: '是否为直播源',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'play',
    'pause',
    'ended',
    'timeupdate',
    'fullscreenchange',
    'waiting',
    'error',
    'progress',
    'loadeddata',
    'loadstart',
    'seeked',
    'seeking',
    'loadedmetadata',
    'fullscreenclick',
    'controlstoggle'
  ],
  snippet: {
    props: {
      style: {
        width: '300px',
        height: '225px'
      },
      src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4',
      'enable-danmu': true,
      'danmu-btn': true,
      controls: true,
      'danmu-list': [
        {
          text: '第 1s 出现的弹幕',
          color: '#ff0000',
          time: 1
        },
        {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3
        }
      ]
    }
  }
};

export default desc;
