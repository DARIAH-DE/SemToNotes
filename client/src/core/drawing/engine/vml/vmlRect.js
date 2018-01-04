/**
 * @fileoverview VML class representing a rectangle.
 * @private
 */

goog.provide('xrx.vml.Rect');



goog.require('goog.style');
goog.require('xrx.vml');
goog.require('xrx.vml.Stylable');



/**
 * VML class representing a rectangle.
 * @param {HTMLElement} The HTML element.
 * @constructor
 * @extends {xrx.vml.Stylable}
 * @private
 */
xrx.vml.Rect = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.vml.Rect, xrx.vml.Stylable);



/**
 * Sets the X coordinate of the rectangle.
 * @param {number} x The coordinate.
 */
xrx.vml.Rect.prototype.setX = function(x) {
  this.element_.style['left'] = x + 'px';
};



/**
 * Sets the Y coordinate of the rectangle.
 * @param {number} y The coordinate.
 */
xrx.vml.Rect.prototype.setY = function(y) {
  this.element_.style['top'] = y + 'px';
};



/**
 * Sets the width of the rectangle.
 * @param {number} width The width.
 */
xrx.vml.Rect.prototype.setWidth = function(width) {
  this.element_.style['width'] = width + 'px';
};



/**
 * Sets the height of the rectangle.
 * @param {height} height The height.
 */
xrx.vml.Rect.prototype.setHeight = function(height) {
  this.element_.style['height'] = height + 'px';
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
xrx.vml.Rect.prototype.draw = function(x, y, width, height, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (x !== undefined) this.setX(x);
  if (y !== undefined) this.setY(y);
  if (width !== undefined) this.setWidth(width);
  if (height !== undefined) this.setHeight(height);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new rectangle.
 * @param {xrx.vml.Canvas} canvas The parent canvas object.
 */
xrx.vml.Rect.create = function(canvas) {
  var element = xrx.vml.createElement('rect');
  element.style['position'] = 'absolute';
  return new xrx.vml.Rect(element);
};
