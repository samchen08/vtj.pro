import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Audio',
  label: '音频',
  categoryId: 'media',
  props: [
    {
      name: 'id',
      title: 'audio 组件的唯一标识符',
      setters: 'StringSetter'
    },
    {
      name: 'src',
      title: '要播放音频的资源地址',
      setters: 'StringSetter'
    },
    {
      name: 'loop',
      title: '是否循环播放',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'controls',
      title: '是否显示默认控件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'poster',
      title: '默认控件上的音频封面的图片资源地址',
      setters: 'StringSetter'
    },
    {
      name: 'name',
      title: '默认控件上的音频名字',
      defaultValue: '未知音频',
      setters: 'StringSetter'
    },
    {
      name: 'author',
      title: '默认控件上的作者名字',
      defaultValue: '未知作者',
      setters: 'StringSetter'
    },
    {
      name: 'action',
      setters: 'ObjectSetter'
    }
  ],
  events: ['error', 'play', 'pause', 'timeupdate', 'ended'],
  snippet: {
    props: {
      src: 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3',
      poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
      name: '致爱丽丝',
      author: '暂无',
      controls: true,
      action: {
        audioAction: {
          method: 'pause'
        }
      }
    }
  }
};

export default desc;
