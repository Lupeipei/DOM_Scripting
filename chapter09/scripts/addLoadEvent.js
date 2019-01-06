function addLoadEvent(func) {
  var oldLoad = window.load;
  if (typeof window.load != 'function') {
    window.load = func();
  } else {
    window.load = function() {
      oldLoad();
      func();
    }
  }
}
