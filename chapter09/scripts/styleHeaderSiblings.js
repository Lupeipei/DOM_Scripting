function styleHeaderSilbings() {
  if (!document.getElementsByTagName) return false;
  var headers = document.getElementsByTagName('h1');
  for (var i=0 ; i < headers.length; i ++) {
    var elem = getNextElement(headers[i].nextSibling);
    elem.className = 'intro';
  }
}

function getNextElement(node) {
  if ( node.nodeType == 1) {
    return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling);
  }
}

addLoadEvent(styleHeaderSilbings);
