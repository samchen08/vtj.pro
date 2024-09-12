(function () {
  let hasDevTools = false;
  let clientPath = '/__vtj__/entry/';
  const entry = '/__vtj__/entry/index.js';
  const scripts = document.querySelectorAll('script');
  if (scripts && scripts.length) {
    for (let i = 0; i < scripts.length; i++) {
      const el = scripts[i];
      if (el.src.indexOf('vue-devtools-path') > -1) {
        hasDevTools = true;
      }
      if (el.src.indexOf(entry) > -1) {
        clientPath = el.src.replace('index.js', '');
      }
    }
  }

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = clientPath + 'style.css';
  document.head.appendChild(style);

  const link = document.createElement('script');
  link.src = clientPath + (hasDevTools ? 'inject-devtools.js' : 'link.js');
  document.body.appendChild(link);
})();
