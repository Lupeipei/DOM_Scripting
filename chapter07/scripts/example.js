window.onload = function() {
  // for innerHTML
  if (!document.getElementById) return false;
  if (!document.getElementById('testdiv')) return false;
  var testdiv = document.getElementById('testdiv');
  alert(testdiv.innerHTML);
  testdiv.innerHTML = "<p>I inserted <em>this</em> content</p>";

  // for createElement
  var para = document.createElement('p');
  var info = "nodeName: ";
  info += para.nodeName;
  info += " nodeType: ";
  info += para.nodeType;
  alert(info);

  //for createTextNode
  var text = document.createTextNode('hello world');
  para.appendChild(text);
  testdiv.appendChild(para);

  // more complex
  var paragraph = document.createElement('p');
  var text1 = document.createTextNode('this is ');
  var emphasis = document.createElement('em');
  var text2 = document.createTextNode('my');
  var text3 = document.createTextNode(' content');
  emphasis.appendChild(text2);
  paragraph.appendChild(text1);
  paragraph.appendChild(emphasis);
  paragraph.appendChild(text3);
  testdiv.appendChild(paragraph);
}
