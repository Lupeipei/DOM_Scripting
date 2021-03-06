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

function showSection(id) {
  var sections = document.getElementsByTagName('section');
  for(var i=0; i< sections.length; i++) {
    if (sections[i].getAttribute('id') != id) {
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
  }
}

function prepareIntervalnav() {
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var articles = document.getElementsByTagName('article');
  if (articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName('nav');
  if (navs.length ==0) return false;
  var nav = navs[0];
  var links = nav.getElementsByTagName('a');
  for (var i=0 ; i<links.length; i++) {
    var sectionId = links[i].getAttribute('href').split('#')[1];
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function() {
      showSection(this.destination);
      return false;
    }
  }
}

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

function preparePlaceHolder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById('imagegallery')) return false;

  var gallery = document.getElementById('imagegallery');

  var placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'placeholder');
  placeholder.setAttribute('src', 'images/photos/1.jpg');
  placeholder.setAttribute('alt', 'my image gallery');
  placeholder.style.width = "400px";
  var description = document.createElement('p');
  description.setAttribute('id', 'description');

  var text = document.createTextNode('please choose an image');
  description.appendChild(text);

  insertAfter(placeholder, gallery);
  insertAfter(description, placeholder);
}

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
  var articles = document.getElementsByTagName('article');
  if (articles.length == 0) return false;
  var container = articles[0];
  container.appendChild(header);
  container.appendChild(dlist);
}

function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName('table');
  var odd, rows;
  for (var i=0; i < tables.length; i++) {
    odd = false;
    rows = tables[i].getElementsByTagName('tr');
    for (var j=0; j < rows.length; j++) {
      if(odd == true) {
        addClass(rows[j], 'odd');
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

function hightlightRows() {
  if (!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName('tr');
  for (var i=0; i < rows.length; i++) {
    rows[i].onmouseover = function() {
      this.style.fontWeight = "bold";
    }
    rows[i].onmouseout = function() {
      this.style.fontWeight = "normal";
    }
  }
}

function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName('label');
  for (var i=0; i < labels.length; i++) {
    if (!labels[i].getAttribute('for')) continue;
    labels[i].hover = function() {
      var id = this.getAttribute('for');
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function resetFields(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    var check = element.placeholder || element.getAttribute('placeholder');
    if (!check) continue;
    element.onfocus = function() {
      var text = this.placeholder || this.getAttribute('placeholder');
      if (this.value == text) {
        this.className = '';
        this.value = "";
      }
    }
    element.onblur = function() {
      if (this.value == ""){
        this.className = 'placeholder';
        this.value = this.placeholder || this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}

function isFilled(field) {
  if (field.value.replace(' ', '').length == 0) return false;
  var placeholder = field.placeholder || field.getAttribute('placeholder');
  return (field.value != placeholder);
}

function isEmail(field) {
  return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1)
}

function validateForm(whichform) {
  var elements = whichform.elements;
  for (var i=0; i< elements.length; i++) {
    var elem = elements[i];
    if (elem.getAttribute('required') == "required") {
      if(!isFilled(elem)) {
        alert("Please fill in the " + elem.name + "field.");
        return false;
      }
    }
    if (elem.type == "email") {
      if(!isEmail(elem)) {
        alert("The " + elem.name + "field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function() {
      try { return new ActiveObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
      try { return new ActiveObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
      try { return new ActiveObject("Msxml2.XMLHTTP"); }
      catch (e) {}
      return false;
    }
  }
  return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
  var loading = document.createElement('img');
  loading.setAttribute('src', 'images/loading.jpg');
  loading.setAttribute('alt', '');
  element.appendChild(loading);
}

function submitFormWithAjax(whichform, thetarget) {
  var request = getHTTPObject();
  if (!request) return false;
  displayAjaxLoading(thetarget);
  var dataParts = [];
  var element;
  for (var i=0; i< whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.getAttribute('value'));
  }
  var data = dataParts.join('&');
  request.open('POST', whichform.getAttribute('action'), true);
  request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  request.onreadstatechange = function() {
    if (request.readState == 4) {
      if (request.status == 200 || request.status == 0 ) {
        var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
        if (matches.length > 0) {
          theTarget.innerHTML = matches[1];
        } else {
          theTarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>'
        }
      } else {
        theTarget.innerHTML = '<p>' + request.statusText + '</p>';
      }
    }
  };
  request.send(data);
  return true;
}

function prepareForms() {
  var forms = document.forms;
  for(var i=0; i< forms.length; i++) {
    resetFields(forms[i]);
    forms[i].onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      alert(article);
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}


addLoadEvent(hightlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareIntervalnav);
addLoadEvent(preparePlaceHolder);
addLoadEvent(prepareGallery);
addLoadEvent(displayAbbr);
addLoadEvent(stripeTables);
addLoadEvent(hightlightRows);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
