/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Polyline');



goog.require('xrx.geometry');
goog.require('xrx.geometry.Geometry');
goog.require('xrx.geometry.Line');



/**
 * @constructor
 * @private
 */
xrx.geometry.Polyline = function(opt_length) {

  goog.base(this);

  this.coords = opt_length === undefined ? [] : new Array(opt_length);

  if (opt_length !== undefined) {
    for (var i = 0; i < opt_length; i++) {
      this.coords[i] = new Array(2);
    }
  };
};
goog.inherits(xrx.geometry.Polyline, xrx.geometry.Geometry);
 


xrx.geometry.Polyline.prototype.containsPoint = function(point) {
  var contains = false;
  for (var i = 0, len = this.coords.length - 1; i < len; i++) {
    contains = xrx.geometry.Line.containsPoint([this.coords[i], this.coords[i + 1]], point);
    if (contains === true) break;
  }
  return contains;
};



xrx.geometry.Polyline.prototype.disposeInternal = function() {
  this.coords = null;
  goog.base(this, 'disposeInternal');
};
