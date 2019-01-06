function displayAccesskeys() {
  if (!document.getElementById) return false;
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  var akeys = new Array();
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length ; i ++) {
    if (!links[i].getAttribute('accesskey')) continue;
    var accesskey = links[i].getAttribute('accesskey');
    var title = links[i].lastChild.nodeValue;
    akeys[accesskey] = title;
  }

  var ulist = document.createElement('ul');
  for (key in akeys) {
    var str = key + ': ' + akeys[key];
    var li = document.createElement('li');
    var text = document.createTextNode(str);
    li.appendChild(text);
    ulist.appendChild(li);
  }
  var header = document.createElement('h1');
  var title = document.createTextNode('Accesskeys');
  header.appendChild(title);
  document.body.appendChild(header);
  document.body.appendChild(ulist);
}

addLoadEvent(displayAccesskeys);
