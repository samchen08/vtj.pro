import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Map',
  label: '地图组件',
  categoryId: 'media',
  props: [
    {
      name: 'longitude',
      title: '中心经度',
      setters: 'NumberSetter'
    },
    {
      name: 'latitude',
      title: '中心纬度',
      setters: 'NumberSetter'
    },
    {
      name: 'scale',
      title: '缩放级别，取值范围为3-20',
      defaultValue: 16,
      setters: 'NumberSetter'
    },
    {
      name: 'theme',
      title: '主题',
      defaultValue: 'normal',
      setters: 'SelectSetter',
      options: ['satellite', 'normal']
    },
    {
      name: 'min-scale',
      title: '最小缩放级别',
      defaultValue: 3,
      setters: 'NumberSetter'
    },
    {
      name: 'max-scale',
      title: '最大缩放级别',
      defaultValue: 20,
      setters: 'NumberSetter'
    },
    {
      name: 'layer-style',
      title: '个性化地图',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'markers',
      title: '标记点',
      setters: 'ArraySetter'
    },
    {
      name: 'polyline',
      title: '路线',
      setters: 'ArraySetter'
    },
    {
      name: 'circles',
      title: '圆',
      setters: 'ArraySetter'
    },
    {
      name: 'controls',
      title: '控件',
      setters: 'ArraySetter'
    },
    {
      name: 'include-points',
      title: '缩放视野以包含所有给定的坐标点',
      setters: 'ArraySetter'
    },
    {
      name: 'zIndex',
      title: '显示层级',
      defaultValue: false,
      setters: 'NumberSetter'
    },
    {
      name: 'enable-3D',
      title: '是否显示3D楼块',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-compass',
      title: '是否显示指南针',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-zoom',
      title: '是否支持缩放',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-scroll',
      title: '是否支持拖动',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-rotate',
      title: '是否支持旋转',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'rotate',
      title: '旋转角度(范围0-360)地图正北和设备 y 轴角度的夹角',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'skew',
      title: '倾斜角度，范围 0 ~ 40 , 关于 z 轴的倾角',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'enable-overlooking',
      title: '是否开启俯视',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-satellite',
      title: '是否开启卫星图',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-traffic',
      title: '是否开启实时路况',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-poi',
      title: '是否展示 POI 点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'enable-building',
      title: '是否展示建筑物',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-location',
      title: '显示带有方向的当前定位点',
      setters: 'BooleanSetter'
    },
    {
      name: 'polygons',
      title: '多边形',
      setters: 'ArraySetter'
    },
    {
      name: 'polygon',
      title: '多边形(支付宝)',
      setters: 'ArraySetter'
    },
    {
      name: 'enable-indoorMap',
      title: '是否展示室内地图',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'markertap',
    'labeltap',
    'callouttap',
    'controltap',
    'regionchange',
    'tap',
    'updated',
    'anchorpointtap',
    'poitap'
  ],
  snippet: {
    props: {
      style: {
        width: '100%',
        height: '300px'
      },
      latitude: '39.909',
      longitude: '116.39742',
      markers: [
        {
          latitude: 39.909,
          longitude: 116.39742
        },
        {
          latitude: 39.9,
          longitude: 116.39
        }
      ]
    }
  }
};

export default desc;
