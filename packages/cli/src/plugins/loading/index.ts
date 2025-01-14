import { type Plugin } from 'vite';

const style = `
<style>
.dark {
  background-color: #141414;
}
#vtj-ide-loading {
  width: 240px;
  height: 100px;
  position: fixed;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 9999;
  border-radius: 4px;
  background-color: rgba(255,255,255,0.1);
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  padding: 20px;
  font-size: 12px;
  box-sizing: border-box;
}
.vtj-ide-loading__bar {
  height: 14px;
  border-radius: 4px;
  margin-top: 10px;
  border: 1px solid #eee;
  overflow: hidden;
}
.vtj-ide-loading__title {
  display: flex;
  justify-content: space-between;
}
.dark .vtj-ide-loading__title {
  color:#fff;
}
.vtj-ide-loading__value {
  display: block;
  height: 100%;
  background-color: #409eff;
  border-radius: 4px;
  font-size: 0;
}
</style>
`;

const mask = `
<div id="vtj-ide-loading">
<div class="vtj-ide-loading__title"><span>正在加载资源.... </span><span id="vtj-ide-loading-count"></span></div>
<div class="vtj-ide-loading__bar">
  <span class="vtj-ide-loading__value" id="vtj-ide-loading-value" style="width:0%"></span>
</div>
</div>
`;

const script = `
<script>
(function(){
  var loading = document.querySelector('#vtj-ide-loading');
  var countEl = document.querySelector('#vtj-ide-loading-count');
  var valueEl = document.querySelector('#vtj-ide-loading-value');
  var links = document.querySelectorAll('link,script');
  var total = links.length;
  var setValue = function(current) {
    countEl.innerHTML = current + '/' +total;
    valueEl.style.width = (current * 100 / total) + '%';
    if(!total || current === total) {
      setTimeout(function() {
         loading.parentNode.removeChild(loading);
         loading = null;
         countEl = null;
         valueEl = null;
      }, 100);
    }
  }

  var current = 0;
  links.forEach(function(link) {
    link.onload = function() {
        ++current;
        setValue(current);
        link.onload = null;
    }
  })
  window.addEventListener('load',function() {
    current = total
    setValue(current)
  });

})()

</script> 
`;
export function loadingPlugin(): Plugin {
  return {
    name: 'vtj-loading-plugin',
    transformIndexHtml(html: string) {
      return html
        .replace('</head>', `${style}</head>`)
        .replace('<body>', `<body>${mask}`)
        .replace('</body>', `${script}</body>`);
    }
  };
}
