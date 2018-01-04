/**
 * @fileoverview VML rendering class representing a circle.
 * @private
 */

goog.provide('xrx.vml.Circle');



goog.require('goog.style');
goog.require('xrx.vml');
goog.require('xrx.vml.Stylable');



/**
 * VML rendering class representing a circle.
 * @param {HTMLElement} The HTML element.
 * @constructor
 * @extends xrx.vml.Stylable
 * @private
 */
xrx.vml.Circle = function(element) {

  goog.base(this, element);

  this.r_;
};
goog.inherits(xrx.vml.Circle, xrx.vml.Stylable);



/**
 * Sets the center point of this circle.
 * @param {number} cx The x coordinate of the center point.
 * @param {number} cy The y coordinate of the center point.
 */
xrx.vml.Circle.prototype.setCenter = function(cx, cy, r) {
  var offsetX = cx - this.r_;
  var offsetY = cy - this.r_;
  if (cx !== undefined) this.element_.style['left'] = offsetX + 'px';
  if (cy !== undefined) this.element_.style['top'] = offsetY + 'px';
};



/**
 * Sets the radius of the circle.
 * @param {number} r The radius.
 */
xrx.vml.Circle.prototype.setRadius = function(r) {
  this.r_ = r;
  var size = this.r_ * 2;
  this.element_.style['width'] = size + 'px';
  this.element_.style['height'] = size + 'px';
};



/**
 * Draws the circle on the canvas.
 * @param {number} cx x coordinate of the circle's center point.
 * @param {number} cy y coordinate of the circle's center point.
 * @param {number} r Radius of the circle.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.vml.Circle.prototype.draw = function(cx, cy, r, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (r !== undefined) this.setRadius(r);
  this.setCenter(cx, cy, r);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new circle.
 * @param {xrx.vml.Canvas} canvas The parent canvas object.
 */
xrx.vml.Circle.create = function(canvas) {
  var element = xrx.vml.createElement('oval');
  element.style['position'] = 'absolute';
  return new xrx.vml.Circle(element);
};
