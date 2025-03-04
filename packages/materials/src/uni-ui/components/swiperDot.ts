import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniSwipeDot',
  label: '轮播图指示点',
  categoryId: 'ext',
  props: [
    {
      name: 'current',
      title: '当前指示点索引',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'mode',
      title: '指示点的类型',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['default', 'round', 'nav', 'indexes']
    },
    {
      name: 'field',
      title: 'mode 为 nav 时，显示的内容字段（mode = nav 时必填）',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'info',
      title: '轮播图的数据，通过数组长度决定指示点个数',
      defaultValue: '',
      setters: 'ArraySetter'
    },
    {
      name: 'dotsStyles',
      title: '指示点样式',
      defaultValue: '',
      setters: 'ObjectSetter'
    }
  ],
  snippet: {
    props: {
      info: [
        {
          colorClass: 'uni-bg-red',
          url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
          content: '内容 A'
        },
        {
          colorClass: 'uni-bg-green',
          url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
          content: '内容 B'
        },
        {
          colorClass: 'uni-bg-blue',
          url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
          content: '内容 C'
        }
      ],
      dotsStyles: {
        backgroundColor: 'rgba(255, 90, 95,0.3)',
        border: '1px rgba(255, 90, 95,0.3) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
        selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
      },
      current: 0,
      mode: 'default'
    },
    children: [
      {
        name: 'Swiper',
        props: {
          current: 0
        },
        children: [
          {
            name: 'SwiperItem',
            children: [
              {
                name: 'View',
                children: [
                  {
                    name: 'Text',
                    props: {
                      style: {
                        color: '#fff',
                        fontSize: '32px'
                      }
                    },
                    children: {
                      type: 'JSExpression',
                      value: 'this.context.item.name'
                    }
                  }
                ]
              }
            ]
          },
          {
            name: 'SwiperItem',
            children: [
              {
                name: 'View',
                children: [
                  {
                    name: 'Text',
                    props: {
                      style: {
                        color: '#fff',
                        fontSize: '32px'
                      }
                    },
                    children: {
                      type: 'JSExpression',
                      value: 'this.context.item.name'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export default desc;
