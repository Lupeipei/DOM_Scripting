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

function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

function addClass(element, value) {
  if (element.className) {
    newClassName = element.className;
    newClassName += ' ';
    newClassName += value;
    element.className = newClassName;
  } else {
    element.className = value;
  }
}

function hightlightPage() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var headers = document.getElementsByTagName('header');
  if (headers.length == 0) return false;
  var navs = headers[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;
  var links = navs[0].getElementsByTagName('a');
  var linkurl;

  for(var i=0; i< links.length; i++) {
    linkurl = links[i].getAttribute('href');
    if (window.location.href.indexOf(linkurl) != -1) {
      addClass(links[i], "here");
      var linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute("id", linktext);
    }
  }
}

function moveElement(elementID, final_x, final_y, interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);

  if (elem.movement) {
    clearTimeout(elem.movement);
  }

  if (!elem.style.left || !elem.style.top) {
    elem.style.left = "0px";
    elem.style.top = "0px";
  }

  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }

  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos += dist;
  }

  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos -= dist;
  }

  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos += dist;
  }

  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos -= dist;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  var repeat = "moveElement(`" + elementID + "`, " + final_x + ", " + final_y + ", " + interval + ")";
  elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById('intro')) return false;
  if (!document.createElement) return false;
  var intro = document.getElementById('intro');

  var slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');

  // 美美的加上了相框
  var frame = document.createElement('img');
  frame.setAttribute('src', 'images/frame.png');
  frame.setAttribute('id', 'frame');
  frame.setAttribute('alt', '');
  slideshow.appendChild(frame);

  var preview = document.createElement('img');
  preview.setAttribute('id', 'preview');
  preview.setAttribute('src', 'images/slideshow.jpg');
  preview.setAttribute('alt', 'a glimpse of what awaits for you');
  slideshow.appendChild(preview);
  insertAfter(slideshow, intro);

  var links = intro.getElementsByTagName('a');
  for(var i=0; i< links.length; i++) {
    links[i].onmouseover = function() {
      destination = this.getAttribute('href');
      if (destination.indexOf('index.html') != -1) {
        moveElement('preview', 0, 0, 5);
      }

      if (destination.indexOf('about.html') != -1) {
        moveElement('preview', -300, 0, 50);
      }

      if (destination.indexOf('photos.html') != -1) {
        moveElement('preview', -600, 0, 50);
      }

      if (destination.indexOf('live.html') != -1) {
        moveElement('preview', -900, 0, 50);
      }

      if (destination.indexOf('contact.html') != -1) {
        moveElement('preview', -1200, 0, 50);
      }
    }
  }
}

addLoadEvent(hightlightPage);
addLoadEvent(prepareSlideshow);