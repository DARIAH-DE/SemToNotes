/**
 * @fileoverview Canvas class representing a polygon.
 * @private
 */

goog.provide('xrx.canvas.Polygon');



goog.require('xrx.canvas.Stylable');



/**
 * Canvas class representing a polygon.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.canvas.Polygon = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Polygon, xrx.canvas.Stylable);



/**
 * @private
 */
xrx.canvas.Polygon.prototype.drawPath_ = function(coords) {
  if (!coords[0]) return;
  this.context_.beginPath();
  this.context_.moveTo(coords[0][0], coords[0][1]);
  for(var i = 1, len = coords.length; i < len; i++) {
    this.context_.lineTo(coords[i][0], coords[i][1]);
  }
  this.context_.lineTo(coords[0][0], coords[0][1]);
  this.context_.closePath();
};



/**
 * Draws the polygon.
 * @param {Array<number>} coords The polygon's coordinates.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.canvas.Polygon.prototype.draw = function(coords, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.drawPath_(coords);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new polygon.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Polygon.create = function(canvas) {
  return new xrx.canvas.Polygon(canvas);
};



xrx.canvas.Polygon.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
