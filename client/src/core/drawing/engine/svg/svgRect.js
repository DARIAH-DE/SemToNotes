/**
 * @fileoverview SVG class representing a rectangle.
 * @private
 */

goog.provide('xrx.svg.Rect');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG class representing a rectangle.
 * @param {SVGRectElement} element The SVG element.
 * @constructor
 * @extends {xrx.svg.Stylable}
 * @private
 */
xrx.svg.Rect = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Rect, xrx.svg.Stylable);



/**
 * Sets the X coordinate of the rectangle.
 * @param {number} x The coordinate.
 */
xrx.svg.Rect.prototype.setX = function(x) {
  this.element_.setAttribute('x', x);
};



/**
 * Sets the Y coordinate of the rectangle.
 * @param {number} y The coordinate.
 */
xrx.svg.Rect.prototype.setY = function(y) {
  this.element_.setAttribute('y', y);
};



/**
 * Sets the width of the rectangle.
 * @param {number} width The width.
 */
xrx.svg.Rect.prototype.setWidth = function(width) {
  this.element_.setAttribute('width', width);
};



/**
 * Sets the height of the rectangle.
 * @param {height} height The height.
 */
xrx.svg.Rect.prototype.setHeight = function(height) {
  this.element_.setAttribute('height', height);
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
xrx.svg.Rect.prototype.draw = function(x, y, width, height, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (x !== undefined) this.setX(x);
  if (y !== undefined) this.setY(y);
  if (width !== undefined) this.setWidth(width);
  if (height !== undefined) this.setHeight(height);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new rectangle.
 */
xrx.svg.Rect.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'rect');
  return new xrx.svg.Rect(element);
};



xrx.svg.Rect.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
