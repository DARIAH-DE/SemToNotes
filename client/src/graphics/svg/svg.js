/**
 * @fileoverview
 */

goog.provide('xrx.svg');
goog.provide('xrx.svg.Namespace');



goog.require('goog.dom');
goog.require('goog.math.AffineTransform');



xrx.svg = function() {};



xrx.svg.Namespace = {
  'svg': 'http://www.w3.org/2000/svg',
  'xlink': 'http://www.w3.org/1999/xlink'
};



xrx.svg.addCoordsX = function(coords, value) {
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][0] += value;
  }
};



xrx.svg.addCoordsY = function(coords, value) {
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][1] += value;
  }
};



xrx.svg.getBBox = function(coords) {
  var x;
  var y;
  var bbox = {
    x: coords[0][0],
    y: coords[0][1],
    x2: coords[0][0],
    y2: coords[0][1],
    width: 0,
    height: 0
  };

  for (var i = 1, len = coords.length; i < len; i++) {
    x = coords[i][0];
    y = coords[i][1];
    if (x < bbox.x) bbox.x = x;
    if (y < bbox.y) bbox.y = y;
    if (x > bbox.x2) bbox.x2 = x;
    if (y > bbox.y2) bbox.y2 = y;
  }
  
  bbox.width = bbox.x2 - bbox.x;
  bbox.height = bbox.y2 - bbox.y;

  return bbox;
};



xrx.svg.getPoints = function(element) {
  var points = [];
  var point;
  var xy = 0;
  var token;

  var string = element.getAttribute('points');

  var tokens = string.split(/\s|\,/);

  for(var i = 0, len = tokens.length; i < len; i++) {
    if (xy === 0) point = [];
    token = tokens[i];
    
    if (token !== '') {
      point[xy] = parseInt(token);
      if (xy === 1) points.push(point);
      xy === 0 ? xy = 1 : xy = 0;
    }
  }

  return points;
};



xrx.svg.setPoints = function(element, points) {
  var s = '';

  for(var i = 0, len = points.length; i < len; i++) {
    s += points[i][0].toString() + ',' + points[i][1].toString() + ' ';
  }

  element.setAttribute('points', s);
};



/**
 * @private
 */
xrx.svg.ctmPatternString_ = '(matrix)\\(\\s*([+-]?[\\d\\.]+)\\s*' +
  '(?:[\\s,]\\s*([+-]?[\\d\\.]+)\\s*' +
  '(?:[\\s,]\\s*([+-]?[\\d\\.]+)\\s*' +
  '(?:[\\s,]\\s*([+-]?[\\d\\.]+)\\s*' +
  '[\\s,]\\s*([+-]?[\\d\\.]+)\\s*' +
  '[\\s,]\\s*([+-]?[\\d\\.]+)\\s*)?)?)?\\)';



/**
 * @private
 */
xrx.svg.ctmPattern_ = new RegExp(xrx.svg.ctmPatternString_);




/**
 * @private
 */
xrx.svg.ctmParse_ = function(string) {
  var token;
  var matrix;

  token = xrx.svg.ctmPattern_.exec(string);

  if (token) {
    matrix = new Array(6);
    matrix[0] = parseFloat(token[2]);
    matrix[1] = parseFloat(token[3]);
    matrix[2] = parseFloat(token[4]);
    matrix[3] = parseFloat(token[5]);
    matrix[4] = parseFloat(token[6]);
    matrix[5] = parseFloat(token[7]);
  }

  return matrix;
};



xrx.svg.getCTM = function(element) {

  var string = element.getAttribute('transform');

  var coords = xrx.svg.ctmParse_(string);

  return !coords ? new goog.math.AffineTransform() :
      new goog.math.AffineTransform(coords[0], coords[1], coords[2],
          coords[3], coords[4], coords[5]);
};



xrx.svg.setCTM = function(element, affineTransform) {

  var s = 'matrix(' + affineTransform.m00_ + ',' + affineTransform.m10_ +
      ',' + affineTransform.m01_ + ',' + affineTransform.m11_ +
      ',' + affineTransform.m02_ + ',' + affineTransform.m12_ + ')';

  element.setAttribute('transform', s);  
};




goog.exportProperty(xrx, 'svg', xrx.svg);
