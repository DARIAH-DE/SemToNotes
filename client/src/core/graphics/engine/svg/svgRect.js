/**
 * @fileoverview SVG class representing a rectangle.
 */

goog.provide('xrx.svg.Rect');



goog.require('xrx.geometry.Rect');
goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG class representing a rectangle.
 * @param {SVGRectElement} element The SVG element.
 * @constructor
 * @extends {xrx.svg.Stylable}
 */
xrx.svg.Rect = function(element) {

  goog.base(this, element, new xrx.geometry.Rect());
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
 * @param {xrx.shape.Shape} graphic The graphic to be drawn.
 */
xrx.svg.Rect.prototype.draw = function(graphic) {
  var geometry = graphic.getGeometry();
  this.setX(graphic.getX());
  this.setY(graphic.getY());
  this.setWidth(graphic.getWidth());
  this.setHeight(graphic.getHeight());
  this.strokeAndFill_(graphic);
};



/**
 * Creates a new rectangle.
 */
xrx.svg.Rect.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'rect');
  return new xrx.svg.Rect(element);
};
