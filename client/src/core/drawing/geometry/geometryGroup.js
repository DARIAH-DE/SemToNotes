/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Group');



goog.require('xrx.geometry');
goog.require('xrx.geometry.Geometry');



xrx.geometry.Group = function() {

  goog.base(this);

  this.childs_ = [];
};
goog.inherits(xrx.geometry.Group, xrx.geometry.Geometry);



xrx.geometry.Group.prototype.addChild = function(child) {
  this.childs_.push(child);
};



xrx.geometry.Group.prototype.containsPoint = function(point) {
  for (var i = 0, len = this.childs_.length; i < len; i++) {
    if (this.childs_[i].containsPoint(point)) return true;
  }
  return false;
};
