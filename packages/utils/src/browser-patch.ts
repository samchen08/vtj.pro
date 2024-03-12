(function () {
  if (typeof window === 'undefined' || typeof EventTarget === 'undefined') {
    return;
  }
  const func = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, capture) {
    if (typeof capture !== 'boolean') {
      capture = capture || {};
      capture.passive = false;
    }
    func.call(this, type, fn, capture);
  };
})();
