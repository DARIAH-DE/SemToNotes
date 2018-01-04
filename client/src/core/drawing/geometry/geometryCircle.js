/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Circle');



goog.require('xrx.geometry');
goog.require('xrx.geometry.Geometry');



/**
 * @constructor
 * @private
 */
xrx.geometry.Circle = function() {

  goog.base(this);

  this.cx = 0;

  this.cy = 0;

  this.r = 0;
};
goog.inherits(xrx.geometry.Circle, xrx.geometry.Geometry);



xrx.geometry.Circle.prototype.containsPoint = function(point) {
  return ((this.cx - point[0]) * (this.cx - point[0]) + (this.cy - point[1]) *
      (this.cy - point[1]) <= this.r * this.r) 
};



xrx.geometry.Circle.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
