/**
 * @fileoverview A class implementing translation functions for
 * a drawing view-box.
 */

goog.provide('xrx.viewbox.ViewboxTranslate');



goog.require('xrx.drawing.EventType');
goog.require('xrx.drawing.Orientation');
goog.require('xrx.drawing.Position');
goog.require('xrx.viewbox.ViewboxZoom');



/**
 * A class implementing translation functions for a drawing view-box.
 * @constructor
 * @extends {xrx.viewbox.ViewboxZoom}
 * @private
 */
xrx.viewbox.ViewboxTranslate = function() {

  goog.base(this);
};
goog.inherits(xrx.viewbox.ViewboxTranslate, xrx.viewbox.ViewboxZoom);



/**
 * Translates the view-box.
 * @param {number} x The distance to translate in the x direction.
 * @param {number} y The distance to translate in the y direction.
 */
xrx.viewbox.ViewboxTranslate.prototype.translate = function(x, y) {
  var identity = this.ctm_.getIdentity();
  var point = identity.transformPoint([x, y]);
  this.ctm_ = identity.translate(point[0], point[1]).concatenate(this.ctm_);
  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Translates the view-box to the center of the drawing canvas.
 * @private
 */
xrx.viewbox.ViewboxTranslate.prototype.center = function() {
  this.centerHorizontally();
  this.centerVertically();
};



/**
 * Translates the view-box to the horizontal center of the drawing canvas.
 * @private
 */
xrx.viewbox.ViewboxTranslate.prototype.centerHorizontally = function() {
  var upperLeft = this.getFixPoint_(xrx.drawing.Orientation.NW, true, true);
  var width = this.getWidth(true, true);
  var dx = this.getDrawing().getWidth() / 2 - (upperLeft[0] + width / 2);
  this.translate(dx, 0);
  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Translates the view-box to the vertical center of the drawing canvas.
 * @private
 */
xrx.viewbox.ViewboxTranslate.prototype.centerVertically = function() {
  var upperLeft = this.getFixPoint_(xrx.drawing.Orientation.NW, true, true);
  var height = this.getHeight(true, true);
  var dy = this.getDrawing().getHeight() / 2 - (upperLeft[1] + height / 2);
  this.translate(0, dy);
  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Translates the view-box to a certain position of the drawing canvas.
 * @param {string} position A position as declared in {xrx.drawing.Position}.
 */
xrx.viewbox.ViewboxTranslate.prototype.setPosition = function(position) {
  var width = this.drawing_.getWidth();
  var height = this.drawing_.getHeight();
  var fixPoint = this.getFixPoint_(position, true, true);
  if (position === xrx.drawing.Position.NW) {
    this.translate(-fixPoint[0], -fixPoint[1]);
  } else if (position === xrx.drawing.Position.NE) {
    this.translate(width - fixPoint[0], -fixPoint[1]);
  } else if (position === xrx.drawing.Position.SE) {
    this.translate(width - fixPoint[0], height - fixPoint[1]);
  } else if (position === xrx.drawing.Position.SW) {
    this.translate(-fixPoint[0], height - fixPoint[1]);
  } else {
    throw Error('Unknown position.');
  }
  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Disposes this view-box.
 */
xrx.viewbox.ViewboxTranslate.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
