/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Ellipse');



goog.require('xrx.geometry');
goog.require('xrx.geometry.Geometry');



/**
 * @constructor
 * @private
 */
xrx.geometry.Ellipse = function() {

  goog.base(this);

  this.cx = 0;

  this.cy = 0;

  this.rx = 0;

  this.ry = 0;
};
goog.inherits(xrx.geometry.Ellipse, xrx.geometry.Geometry);



xrx.geometry.Ellipse.prototype.containsPoint = function(point) {
  return (((point[0] - this.cx) * (point[0] - this.cx)) / (this.rx * this.rx) + 
      ((point[1] - this.cy) * (point[1] - this.cy)) / (this.ry * this.ry)) <= 1;
};



xrx.geometry.Ellipse.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
