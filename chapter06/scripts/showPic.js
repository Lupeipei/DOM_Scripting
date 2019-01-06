function showPic(whichPic) {
  if (!document.getElementById('placeholder')) return false;
  var placeholder = document.getElementById('placeholder');
  var source = whichPic.getAttribute('href');
  if (placeholder.nodeName != 'IMG') return false;
  placeholder.setAttribute('src', source);
  if (document.getElementById('description')) {
    var description = document.getElementById('description');
    var text = whichPic.getAttribute('title') ? whichPic.getAttribute('title') : '';
    if (description.firstChild.nodeType == 3) {
      description.firstChild.nodeValue = text;
    }
  }
  return true;
}

function prepareGallery() {
  if (!document.getElementById) return false;
  if (!document.getElementsByTagName) return false;
  var imagegallery = document.getElementById('imagegallery');
  if (!imagegallery) return false;
  var links = imagegallery.getElementsByTagName('a');
  for (var i=0 ; i < links.length; i ++) {
    links[i].onclick = function() {
      return !showPic(this);
    }
  }
}

function addLoadEvent(func) {
  var oldLoad = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload =function() {
      oldLoad();
      func();
    }
  }
}

addLoadEvent(prepareGallery);

// window.onload = function() {
//   prepareGallery();
// }
