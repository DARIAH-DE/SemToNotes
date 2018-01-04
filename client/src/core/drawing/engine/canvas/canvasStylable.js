/**
 * @fileoverview Canvas class representing a stylable element.
 * @private
 */

goog.provide('xrx.canvas.Stylable');



goog.require('xrx.canvas.Element');
goog.require('xrx.engine');



/**
 * Canvas class representing a stylable element.
 * @param {HTMLCanvasElement} canvas The parent canvas element.
 * @constructor
 * @extends {xrx.canvas.Element}
 * @private
 */
xrx.canvas.Stylable = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Stylable, xrx.canvas.Element);



/**
 * @private
 */
xrx.canvas.Stylable.prototype.strokeAndFill_ = function(fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.context_.fillStyle = fillColor;
  this.context_.globalAlpha = fillOpacity;
  this.context_.fill();
  this.context_.globalAlpha = 1;
  this.context_.strokeStyle = strokeColor;
  this.context_.lineWidth = strokeWidth;
  if (strokeWidth > 0) this.context_.stroke();
};



xrx.canvas.Stylable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
