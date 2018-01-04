/**
 * @fileoverview Canvas class representing a line.
 * @private
 */

goog.provide('xrx.canvas.Line');



goog.require('xrx.canvas.Stylable');


/**
 * Canvas class representing a line.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.canvas.Line = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Line, xrx.canvas.Stylable);



/**
 * @private
 */
xrx.canvas.Line.prototype.drawPath_ = function(x1, y1, x2, y2) {
  this.context_.beginPath();
  this.context_.moveTo(x1, y1);
  this.context_.lineTo(x2, y2);
};



/**
 * Draws this line.
 * @param {number} x1 The x coordinate of the start point.
 * @param {number} y1 The y coordinate of the start point.
 * @param {number} x2 The x coordinate of the end point.
 * @param {number} y2 The y coordinate of the end point.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.canvas.Line.prototype.draw = function(x1, y1, x2, y2, strokeColor, strokeWidth) {
  this.drawPath_(x1, y1, x2, y2);
  this.strokeAndFill_(undefined, undefined, strokeColor, strokeWidth);
};



/**
 * Creates a new line.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Line.create = function(canvas) {
  return new xrx.canvas.Line(canvas);
};



xrx.canvas.Line.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
