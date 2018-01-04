/**
 * @fileoverview SVG class representing a poly-line.
 * @private
 */

goog.provide('xrx.svg.Polyline');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG class representing a poly-line.
 * @param {SVGPolylineElement} element The SVG polyline element.
 * @constructor
 * @extends xrx.svg.Stylable
 * @private
 */
xrx.svg.Polyline = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Polyline, xrx.svg.Stylable);



/**
 * Sets the coordinates for the poly-line.
 * @param {Array<number>} coords The coordinates.
 */
xrx.svg.Polyline.prototype.setCoords = function(coords) {
  xrx.svg.setCoords(this.element_, coords);
};



/**
 * Draws the poly-line.
 * @param {Array<number>} coords The coordinates of the poly-line.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.svg.Polyline.prototype.draw = function(coords, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (coords !== undefined) this.setCoords(coords);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new poly-line.
 */
xrx.svg.Polyline.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'polyline');
  return new xrx.svg.Polyline(element);
};



xrx.svg.Polyline.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
