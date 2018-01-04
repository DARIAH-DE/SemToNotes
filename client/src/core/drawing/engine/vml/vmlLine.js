/**
 * @fileoverview VML class representing a line.
 * @private
 */

goog.provide('xrx.vml.Line');



goog.require('xrx.vml');
goog.require('xrx.vml.Stylable');



/**
 * VML class representing a line.
 * @param {HTMLElement} The HTML element.
 * @constructor
 * @extends xrx.vml.Stylable
 * @private
 */
xrx.vml.Line = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.vml.Line, xrx.vml.Stylable);



/**
 * Sets the coordinates for this line.
 * @param {Array<number>} coords The coordinates.
 */
xrx.vml.Line.prototype.setCoords = function(coords) {
  xrx.vml.setPath(this.element_, coords, false);
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
xrx.vml.Line.prototype.draw = function(x1, y1, x2, y2, strokeColor, strokeWidth) {
  this.setCoords([[x1, y1], [x2, y2]]);
  this.strokeAndFill_(undefined, undefined, strokeColor, strokeWidth);
};



/**
 * Creates a new line.
 * @param {xrx.vml.Canvas} canvas The parent canvas object.
 */
xrx.vml.Line.create = function(canvas) {
  var element = xrx.vml.createElement('shape');
  element.style['position'] = 'absolute';
  element.style['top'] = '0px';
  element.style['left'] = '0px';
  element.style['width'] = canvas.getWidth() + 'px';
  element.style['height'] = canvas.getHeight() + 'px';
  return new xrx.vml.Line(element);
};
