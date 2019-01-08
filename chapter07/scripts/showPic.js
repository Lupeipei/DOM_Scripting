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

function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

function preparePlaceHolder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imagegallery')) return false;

  var gallery = document.getElementById('imagegallery');

  var placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'placeholder');
  placeholder.setAttribute('src', 'images/roses.jpg');
  placeholder.setAttribute('alt', 'my image gallery');
  // placeholder.setAttribute('width', 300);
  placeholder.style.width = 300;
  var description = document.createElement('p');
  description.setAttribute('id', 'description');

  var text = document.createTextNode('please choose an image');
  description.appendChild(text);

  insertAfter(placeholder, gallery);
  insertAfter(description, placeholder);
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

addLoadEvent(preparePlaceHolder);
addLoadEvent(prepareGallery);
