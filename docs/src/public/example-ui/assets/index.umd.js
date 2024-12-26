(function(t,e){typeof exports=="object"&&typeof module!="undefined"?module.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis!="undefined"?globalThis:t||self,t.VtjExampleUIMaterial=e())})(this,function(){"use strict";var p=Object.defineProperty,c=Object.defineProperties;var d=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var o=(t,e,n)=>e in t?p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,i=(t,e)=>{for(var n in e||(e={}))u.call(e,n)&&o(t,n,e[n]);if(a)for(var n of a(e))f.call(e,n)&&o(t,n,e[n]);return t},s=(t,e)=>c(t,d(e));function t(r,l){return r.map(m=>s(i({},m),{package:l}))}/**!
 * Copyright (c) 2024, VTJ.PRO All rights reserved.
 * @name @vtj/example-ui 
 * @author CHC chenhuachun1549@dingtalk.com 
 * @version 0.1.0
 * @license <a href="https://vtj.pro/license.html">MIT License</a>
 */return{name:"@vtj/example-ui",version:"0.1.0",label:"ExampleUI",library:"VtjExampleUIMaterial",order:1,categories:[{id:"base",category:"基础"}],components:t([{name:"VExample",label:"示例组件",categoryId:"base",props:[{name:"title",setters:["StringSetter"]}]}],"@vtj/example-ui")}});
