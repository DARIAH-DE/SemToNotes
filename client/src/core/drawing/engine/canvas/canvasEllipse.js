/**
 * @fileoverview Canvas rendering class representing an ellipse.
 * @private
 */

goog.provide('xrx.canvas.Ellipse');



goog.require('xrx.canvas.Stylable');



/**
 * Canvas rendering class representing an ellipse.
 * @param {xrx.canvas.Canvas} element The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.canvas.Ellipse = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Ellipse, xrx.canvas.Stylable);



/**
 * Draws this ellipse on the canvas.
 * @param {number} cx X-coordinate of the circle's center point.
 * @param {number} cy Y-coordinate of the circle's center point.
 * @param {number} rx Major-radius of the ellipse.
 * @param {number} ry Minor-radius of the ellipse.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.canvas.Ellipse.prototype.draw = function(cx, cy, rx, ry, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (this.context_.ellipse) {
    this.context_.beginPath();
    this.context_.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI, true);
    this.context_.closePath();
  } else {
    var x;
    var y;
    for (var i = 0 ; i <= 2 * Math.PI; i += 0.01) {
      x = cx + (rx * Math.sin(i));
      y = cy - (ry * Math.cos(i));
      if (i === 0) {
        this.context_.moveTo(x, y);
      } else {
        this.context_.lineTo(x, y);
      }
    }
  }
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new ellipse.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Ellipse.create = function(canvas) {
  return new xrx.canvas.Ellipse(canvas);
};



xrx.canvas.Ellipse.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
