/**
 * @fileoverview Canvas class representing a group.
 * @private
 */

goog.provide('xrx.canvas.Group');



goog.require('xrx.canvas.Container');



/**
 * Canvas class representing a group.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Element
 * @private
 */
xrx.canvas.Group = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Group, xrx.canvas.Container);



/**
 * Creates a new group.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object of the group.
 */
xrx.canvas.Group.create = function(canvas) {
  return new xrx.canvas.Group(canvas);
};



xrx.canvas.Group.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
