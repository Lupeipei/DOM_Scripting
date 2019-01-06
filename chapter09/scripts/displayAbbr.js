function displayAbbr() {
  if (!document.getElementsByTagName) return false;
  var abbrs = document.getElementsByTagName('abbr');
  if (abbrs.length == 0) return false;
  var defs = new Array();
  for (var i=0; i< abbrs.length; i ++) {
    var current_abbr = abbrs[i];
    if (current_abbr.childNodes.length < 1) continue;
    var key = current_abbr.getAttribute('title');
    defs[key] = current_abbr.lastChild.nodeValue;
  }

  var dlist = document.createElement('dl');
  for (key in defs) {
    var dt = document.createElement('dt');
    var dtitle = document.createTextNode(defs[key]);
    var dd = document.createElement('dd');
    var dtitle_text = document.createTextNode(key);
    dt.appendChild(dtitle);
    dd.appendChild(dtitle_text);
    dlist.appendChild(dt);
    dlist.appendChild(dd);
  }
  var header = document.createElement('h1');
  var title = document.createTextNode('Abbreviations');
  header.appendChild(title);
  document.body.appendChild(header);
  document.body.appendChild(dlist);
}

addLoadEvent(displayAbbr);
