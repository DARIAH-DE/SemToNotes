/**
 * @fileoverview SVG rendering class representing a circle.
 * @private
 */

goog.provide('xrx.svg.Circle');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG rendering class representing a circle.
 * @param {SVGCircleElement} element The SVG circle element.
 * @constructor
 * @extends xrx.svg.Stylable
 * @private
 */
xrx.svg.Circle = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Circle, xrx.svg.Stylable);



/**
 * Sets the centre point of a circle.
 * @param {number} cx The X coordinate of the centre point.
 * @param {number} cy The Y coordinate of the centre point.
 */
xrx.svg.Circle.prototype.setCenter = function(cx, cy) {
  if (cx !== undefined) this.element_.setAttribute('cx', cx);
  if (cy !== undefined) this.element_.setAttribute('cy', cy);
};



/**
 * Sets the radius of the circle.
 * @param {number} r The radius.
 */
xrx.svg.Circle.prototype.setRadius = function(r) {
  this.element_.setAttribute('r', r);
};



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
xrx.svg.Circle.prototype.draw = function(cx, cy, r, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.setCenter(cx, cy);
  if (r !== undefined) this.setRadius(r);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new circle.
 */
xrx.svg.Circle.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'circle');
  return new xrx.svg.Circle(element);
};



xrx.svg.Circle.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
