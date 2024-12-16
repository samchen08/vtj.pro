(function () {
  const el = document.createElement('div');
  el.id = 'vtjLink';
  el.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"></path></svg>';
  document.body.appendChild(el);
  let dragging = false;
  let diffX;
  let diffY;
  let timer = null;
  let isDragged = false;
  let startPosition = null;
  const size = 50;
  const update = function (e) {
    if (dragging) {
      const x = Math.min(
        Math.max(0, e.clientX - diffX),
        window.innerWidth - size
      );
      const y = Math.min(
        Math.max(0, e.clientY - diffX),
        window.innerHeight - size
      );

      el.style.left = x + 'px';
      el.style.top = y + 'px';
    }
  };
  el.addEventListener('mousedown', function (e) {
    const rect = el.getBoundingClientRect();
    diffX = e.clientX - rect.left;
    diffY = e.clientY - rect.top;
    document.body.classList.add('vtj-link-dragging');
    startPosition = {
      x: e.clientX,
      y: e.clientY
    };
    isDragged = false;
    dragging = true;
  });

  window.addEventListener('mouseup', function (e) {
    dragging = false;
    e.stopPropagation();
    e.preventDefault();
    document.body.classList.remove('vtj-link-dragging');
    if (
      startPosition &&
      Math.abs(startPosition.x - e.clientX) < 10 &&
      Math.abs(startPosition.y - e.clientY) < 10
    ) {
      isDragged = false;
    } else {
      isDragged = true;
    }
  });

  window.addEventListener('mousemove', function (e) {
    update(e);
  });

  el.addEventListener('click', function (e) {
    if (!isDragged) {
      const { hash, pathname } = location;
      const section = hash
        ? hash.split('?')[0].split('/')
        : pathname.split('/');
      const id = section.pop() || '';
      const options = window.__VTJ_LINK__ || {};
      let path = options.href || window.location.pathname + '__vtj__/#/';
      if (id) {
        path += '?id=' + id;
      }
      window.open(path, 'VTJDesigner');
    }
  });
})();
