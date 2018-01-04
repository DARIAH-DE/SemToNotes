/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Rect');



goog.require('xrx.geometry');
goog.require('xrx.geometry.Geometry');
goog.require('goog.math.Box');



/**
 * @constructor
 * @private
 */
xrx.geometry.Rect = function() {

  goog.base(this);

  this.x = 0;

  this.y = 0;

  this.width = 0;

  this.height = 0;
};
goog.inherits(xrx.geometry.Rect, xrx.geometry.Geometry);



xrx.geometry.Rect.prototype.getBox = function() {
  return new goog.math.Box(this.y, this.x + this.width, this.y + this.height,
      this.x);
};



xrx.geometry.Rect.prototype.containsPoint = function(point) {
  return point[0] >= this.x && point[1] >= this.y &&
      point[0] <= this.x + this.width && point[1] <= this.y + this.height; 
};



xrx.geometry.Rect.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
