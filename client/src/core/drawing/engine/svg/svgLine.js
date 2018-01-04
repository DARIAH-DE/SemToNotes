/**
 * @fileoverview SVG class representing a line.
 * @private
 */

goog.provide('xrx.svg.Line');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG class representing a line.
 * @param {SVGLineElement} element The SVG line element.
 * @constructor
 * @extends xrx.svg.Stylable
 * @private
 */
xrx.svg.Line = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Line, xrx.svg.Stylable);



/**
 * Sets the coordinates for this line.
 * @param {number} x1 The x coordinate of the start point.
 * @param {number} y1 The y coordinate of the start point.
 * @param {number} x2 The x coordinate of the end point.
 * @param {number} y2 The y coordinate of the end point.
 */
xrx.svg.Line.prototype.setCoords = function(x1, y1, x2, y2) {
  if (x1 !== undefined) this.element_.setAttribute('x1', x1);
  if (y1 !== undefined) this.element_.setAttribute('y1', y1);
  if (x2 !== undefined) this.element_.setAttribute('x2', x2);
  if (y2 !== undefined) this.element_.setAttribute('y2', y2);
};



/**
 * Draws this line.
 * @param {number} x1 The x coordinate of the start point.
 * @param {number} y1 The y coordinate of the start point.
 * @param {number} x2 The x coordinate of the end point.
 * @param {number} y2 The y coordinate of the end point.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.svg.Line.prototype.draw = function(x1, y1, x2, y2, strokeColor, strokeWidth) {
  this.setCoords(x1, y1, x2, y2);
  this.strokeAndFill_(undefined, undefined, strokeColor, strokeWidth);
};



/**
 * Creates a new poly-line.
 */
xrx.svg.Line.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'line');
  return new xrx.svg.Line(element);
};



xrx.svg.Line.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
