(function(e,t){typeof exports=="object"&&typeof module<"u"?module.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self,e.VtjChartsMaterial=t())})(this,function(){"use strict";/**!
 * Copyright (c) 2024, VTJ.PRO All rights reserved.
 * @name @vtj/materials 
 * @author CHC chenhuachun1549@dingtalk.com 
 * @version 0.8.8
 * @license <a href="https://vtj.pro/license.html">MIT License</a>
 */const e="0.8.8";function t(o,r){return o.map(s=>({...s,package:r}))}const n={name:"XChart",label:"图表",categoryId:"base",props:[{name:"option",label:"option",title:"ECharts option",setters:"ObjectSetter"},{name:"width",label:"width",setters:["StringNumber"]},{name:"height",label:"height",setters:["StringNumber"]}],snippet:{props:{width:"100%",height:"400px",option:{xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[150,230,224,218,135,147,260],type:"line"}]}}}},a="@vtj/charts",i=[n].flat();return{name:a,version:e,label:"图表",library:"VtjChartsMaterial",order:3,categories:[{id:"base",category:"基础图表"},{id:"map",category:"地图"},{id:"3D",category:"3D"}],components:t(i,a)}});
