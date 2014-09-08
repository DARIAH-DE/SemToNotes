/**
 * @fileoverview
 */

goog.provide('xrx.vml');



goog.require('xrx');



/**
 * @constructor
 */
xrx.vml = function() {};



xrx.vml.PREFIX = 'g_vml_';



xrx.vml.NAMESPACE = 'urn:schemas-microsoft-com:vml';



xrx.vml.IMPORT = '#default#VML';



xrx.vml.isSupported = function() {
  return !!document.namespaces
};



xrx.vml.isModeIE8 = function() {
  return document.documentMode && document.documentMode >= 8;
};



xrx.vml.setCTM = function(raphael, at) {
  raphael.forEach(function(el) {
    el.transform(['m', at.m00_, at.m10_, at.m01_, at.m11_, at.m02_, at.m12_]);
  });
};



xrx.vml.setAttribute = function(element, name, value) {
  if (xrx.vml.isModeIE8()) {
    element[name] = value;
  } else {
    element.setAttribute(name, value);
  }
};



xrx.vml.setCoords = function(raphael, points) {
  var s = 'M' + points[0][0].toString() + ' ' + points[0][1].toString();

  for(var i = 1, len = points.length; i < len; i++) {
    s += 'L' + points[i][0].toString() + ' ' + points[i][1].toString();
  }
  s += 'Z';
  raphael.attr({'path': s});
};



goog.exportProperty(xrx, 'vml', xrx.vml);

