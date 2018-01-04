/**
 * @fileoverview SVG rendering class representing an ellipse.
 * @private
 */

goog.provide('xrx.svg.Ellipse');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG rendering class representing an ellipse.
 * @param {SVGEllipseElement} element The SVG ellipse element.
 * @constructor
 * @extends xrx.svg.Stylable
 * @private
 */
xrx.svg.Ellipse = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Ellipse, xrx.svg.Stylable);



/**
 * Sets the center point of this ellipse.
 * @param {number} cx The X coordinate of the center point.
 * @param {number} cy The Y coordinate of the center point.
 */
xrx.svg.Ellipse.prototype.setCenter = function(cx, cy) {
  if (cx !== undefined) this.element_.setAttribute('cx', cx);
  if (cy !== undefined) this.element_.setAttribute('cy', cy);
};



/**
 * Sets the ellipse's major-axis radius.
 * @param {number} rx The major-axis radius.
 */
xrx.svg.Ellipse.prototype.setRadiusX = function(rx) {
  this.element_.setAttribute('rx', rx);
};



/**
 * Sets the ellipse's minor-axis radius.
 * @param {number} ry The minor-axis radius.
 */
xrx.svg.Ellipse.prototype.setRadiusY = function(ry) {
  this.element_.setAttribute('ry', ry);
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
xrx.svg.Ellipse.prototype.draw = function(cx, cy, rx, ry, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  this.setCenter(cx, cy);
  if (rx !== undefined) this.setRadiusX(rx);
  if (ry !== undefined) this.setRadiusY(ry);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new circle.
 */
xrx.svg.Ellipse.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'ellipse');
  return new xrx.svg.Ellipse(element);
};



xrx.svg.Ellipse.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
