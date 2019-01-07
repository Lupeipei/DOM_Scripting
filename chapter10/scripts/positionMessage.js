function positionMessage() {
  if (!document.getElementById) return false;
  if (!document.getElementById('message')) return false;
  var message = document.getElementById('message');
  message.style.position = "relative";
  message.style.top = "0px";
  message.style.left = "0px";
  moveElement('message', 200, 100, 10);
}

addLoadEvent(positionMessage);
