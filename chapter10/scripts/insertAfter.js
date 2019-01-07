function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement)
  }

  if (targetElement.nextSibling) {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}
