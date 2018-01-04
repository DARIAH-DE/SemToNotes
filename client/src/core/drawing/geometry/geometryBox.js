/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Box');



goog.require('xrx.geometry.Geometry');



/**
 * @constructor
 * @private
 */
xrx.geometry.Box = function() {

  goog.base(this);
};
goog.inherits(xrx.geometry.Box, xrx.geometry.Geometry);



xrx.geometry.Box.containsPoint = function(box, point) {
  return point[0] >= box[3] && point[0] <= box[1] &&
      point[1] >= box[0] && point[1] <= box[2];
};
