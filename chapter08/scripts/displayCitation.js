function displayCitation() {
  if (!document.getElementsByTagName) return false;
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  var quotes = document.getElementsByTagName('blockquote');
  for (var i=0 ; i < quotes.length; i++) {
    var title = quotes[i].getAttribute('cite');
    if (quotes[i].getElementsByTagName('*').length < 1) return false;
    var quoteChilden = quotes[i].getElementsByTagName('*');
    var elem = quoteChilden[quoteChilden.length - 1];
    var link = document.createElement('a');
    var source = document.createTextNode('source');
    link.appendChild(source);
    link.setAttribute('href', title);
    var sup = document.createElement('sup');
    sup.appendChild(link);
    elem.appendChild(sup);
  }
}

addLoadEvent(displayCitation);
