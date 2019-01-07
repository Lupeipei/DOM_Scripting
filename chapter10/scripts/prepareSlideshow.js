function prepareSlideshow() {
  if (!document.getElementById) return false;
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById('linklist')) return false;
  if (!document.createElement) return false;

  var link = document.getElementById('linklist');
  var links = link.getElementsByTagName('a');

  var slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  var preview = document.createElement('img');
  preview.setAttribute('id', 'preview');
  preview.setAttribute('src', 'images/topic.png');
  preview.setAttribute('alt', 'building blocks of web design');
  preview.setAttribute('width', '300');
  preview.setAttribute('height', '100');
  preview.style.top = "0px";
  preview.style.left = "0px";
  preview.style.position = "relative";

  slideshow.appendChild(preview);
  insertAfter(slideshow, link);

  links[0].onmouseover = function() {
    moveElement('preview', 0, 0, 100);
  }

  links[1].onmouseover = function() {
    moveElement('preview', -100, 0, 100);
  }

  links[2].onmouseover = function() {
    moveElement('preview', -200, 0, 100);
  }


}

addLoadEvent(prepareSlideshow);
