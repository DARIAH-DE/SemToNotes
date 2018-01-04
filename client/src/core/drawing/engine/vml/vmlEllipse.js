/**
 * @fileoverview VML rendering class representing an ellipse.
 * @private
 */

goog.provide('xrx.vml.Ellipse');



goog.require('xrx.vml.Stylable');



/**
 * VML rendering class representing an ellipse.
 * @param {HTMLElement} The HTML element.
 * @constructor
 * @extends xrx.vml.Stylable
 * @private
 */
xrx.vml.Ellipse = function(element) {

  goog.base(this, element);

  this.rx_;

  this.ry_;
};
goog.inherits(xrx.vml.Ellipse, xrx.vml.Stylable);



/**
 * Sets the center point of this ellipse.
 * @param {number} cx The X coordinate of the centre point.
 * @param {number} cy The Y coordinate of the centre point.
 */
xrx.vml.Ellipse.prototype.setCenter = function(cx, cy) {
  var offsetX = cx - this.rx_;
  var offsetY = cy - this.ry_;
  if (cx !== undefined) this.element_.style['left'] = offsetX + 'px';
  if (cy !== undefined) this.element_.style['top'] = offsetY + 'px';
};



/**
 * Sets the ellipse's major-axis radius.
 * @param {number} rx The radius.
 */
xrx.vml.Ellipse.prototype.setRadiusX = function(rx) {
  this.rx_ = rx;
  this.element_.style['width'] = this.rx_ * 2 + 'px';
};



/**
 * Sets the ellipse's minor-axis radius.
 * @param {number} ry The radius.
 */
xrx.vml.Ellipse.prototype.setRadiusY = function(ry) {
  this.ry_ = ry;
  this.element_.style['height'] = this.ry_ * 2 + 'px';
};



/**
 * Draws this ellipse on the canvas.
 * @param {number} cx X-coordinate of the ellipse's center point.
 * @param {number} cy Y-coordinate of the ellipse's center point.
 * @param {number} rx Major-radius of the ellipse.
 * @param {number} ry Minor-radius of the ellipse.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.vml.Ellipse.prototype.draw = function(cx, cy, rx, ry, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (rx !== undefined) this.setRadiusX(rx);
  if (ry !== undefined) this.setRadiusY(ry);
  this.setCenter(cx, cy);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new ellipse.
 * @param {xrx.vml.Canvas} canvas The parent canvas object.
 */
xrx.vml.Ellipse.create = function(canvas) {
  var element = xrx.vml.createElement('oval');
  element.style['position'] = 'absolute';
  return new xrx.vml.Ellipse(element);
};
