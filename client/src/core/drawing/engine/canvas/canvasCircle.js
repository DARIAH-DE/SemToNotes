/**
 * @fileoverview Canvas rendering class representing a circle.
 * @private
 */

goog.provide('xrx.canvas.Circle');



goog.require('xrx.canvas.Stylable');



/**
 * Canvas rendering class representing a circle.
 * @param {xrx.canvas.Canvas} element The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.canvas.Circle = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Circle, xrx.canvas.Stylable);



/**
 * Draws the circle on the canvas.
 * @param {number} cx X-coordinate of the circle's center point.
 * @param {number} cy Y-coordinate of the circle's center point.
 * @param {number} r Radius of the circle.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.canvas.Circle.prototype.draw = function(cx, cy, r, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.context_.beginPath();
  this.context_.arc(cx, cy, r, 0, 2 * Math.PI);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new circle.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Circle.create = function(canvas) {
  return new xrx.canvas.Circle(canvas);
};



xrx.canvas.Circle.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
