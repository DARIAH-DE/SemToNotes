/**
 * @fileoverview Canvas class representing a rectangle.
 * @private
 */

goog.provide('xrx.canvas.Rect');



goog.require('xrx.canvas.Stylable');



/**
 * Canvas class representing a rectangle.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @extends {xrx.canvas.Stylable}
 * @private
 */
xrx.canvas.Rect = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Rect, xrx.canvas.Stylable);



/**
 * @private
 */
xrx.canvas.Rect.prototype.drawPath_ = function(x, y, width, height) {
  this.context_.beginPath();
  this.context_.moveTo(x, y);
  this.context_.lineTo(x + width, y);
  this.context_.lineTo(x + width, y + height);
  this.context_.lineTo(x, y + height);
  this.context_.closePath();
};



/**
 * Draws the rectangle.
 * @param {number} x The X offset.
 * @param {number} y The Y offset.
 * @param {number} width The width.
 * @param {number} height The height.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.canvas.Rect.prototype.draw = function(x, y, width, height, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.drawPath_(x, y, width, height);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new rectangle.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Rect.create = function(canvas) {
  return new xrx.canvas.Rect(canvas);
};



xrx.canvas.Rect.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
