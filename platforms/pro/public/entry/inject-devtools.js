function injectLink() {
  const panel = document.querySelector('.vue-devtools__panel');
  const link = document.createElement('div');
  link.classList.add('vue-devtools__anchor-btn', 'vtj-link');
  link.title = '打开设计器';
  link.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"></path></svg>';
  panel.appendChild(link);
  link.addEventListener('click', function (e) {
    const { hash, pathname } = location;
    const section = hash ? hash.split('?')[0].split('/') : pathname.split('/');
    const id = section.pop() || '';
    const options = window.__VTJ_LINK__ || {};
    let path = options.href || window.location.pathname + '__vtj__/#/';
    if (id) {
      path += '?id=' + id;
    }
    window.open(path, 'VTJDesigner');
  });
}

window.addEventListener('load', injectLink);
