/**
 * @fileoverview SVG class representing a polygon.
 * @private
 */

goog.provide('xrx.svg.Polygon');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG class representing a polygon.
 * @param {SVGPolygonElement} element The SVG polygon element.
 * @constructor
 * @extends xrx.svg.Stylable
 * @private
 */
xrx.svg.Polygon = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Polygon, xrx.svg.Stylable);



/**
 * Sets the coordinates for the polygon.
 * @param {Array<number>} coords The coordinates.
 */
xrx.svg.Polygon.prototype.setCoords = function(coords) {
  xrx.svg.setCoords(this.element_, coords);
};



/**
 * Draws the polygon.
 * @param {Array<number>} coords The polygon's coordinates.
 * @param {string} fillColor The fill color.
 * @param {number} fillOpacity Opacity of the fill color.
 * @param {string} strokeColor The stroke color.
 * @param {number} strokeWidth The stroke width.
 */
xrx.svg.Polygon.prototype.draw = function(coords, fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (coords !== undefined) this.setCoords(coords);
  this.strokeAndFill_(fillColor, fillOpacity, strokeColor, strokeWidth);
};



/**
 * Creates a new polygon.
 */
xrx.svg.Polygon.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'polygon');
  return new xrx.svg.Polygon(element);
};



xrx.svg.Polygon.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
