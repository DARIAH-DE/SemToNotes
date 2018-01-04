/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry');



/**
 * @constructor
 * @namespace xrx.geometry
 * @memberof xrx
 * @private
 */
xrx.geometry = function() {};



xrx.geometry.addCoordsX = function(coords, value) {
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][0] += value;
  }
};



xrx.geometry.addCoordsY = function(coords, value) { 
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][1] += value;
  }
};



xrx.geometry.getBBox = function(coords) {
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
