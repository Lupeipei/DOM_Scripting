function showPic(whichPic) {
  var placeholder = document.getElementById('placeholder');
  var description = document.getElementById('description');
  var source = whichPic.getAttribute('href');
  var text = whichPic.getAttribute('title');
  placeholder.setAttribute('src', source);
  description.firstChild.nodeValue = text;
}
