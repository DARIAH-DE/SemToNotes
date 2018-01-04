/**
 * @fileoverview Canvas class representing a poly-line.
 * @private
 */

goog.provide('xrx.canvas.Polyline');



goog.require('xrx.canvas.Stylable');


/**
 * Canvas class representing a poly-line.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.canvas.Polyline = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Polyline, xrx.canvas.Stylable);



/**
 * @private
 */
xrx.canvas.Polyline.prototype.drawPath_ = function(coords) {
  this.context_.beginPath();
  this.context_.moveTo(coords[0][0], coords[0][1]);
  for(var i = 1, len = coords.length; i < len; i++) {
    this.context_.lineTo(coords[i][0], coords[i][1]);
  }
};



/**
 * Draws the poly-line.
 * @param {Array<number>} coords The coordinates of the poly-line.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.canvas.Polyline.prototype.draw = function(coords, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.drawPath_(coords);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new poly-line.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Polyline.create = function(canvas) {
  return new xrx.canvas.Polyline(canvas);
};



xrx.canvas.Polyline.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
