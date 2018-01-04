/**
 * @fileoverview SVG class representing a stylable element.
 * @private
 */

goog.provide('xrx.svg.Stylable');



goog.require('xrx.svg.Element');
goog.require('xrx.engine');



/**
 * SVG class representing a stylable element.
 * @param {SVGElement} element An SVG element.
 * @constructor
 * @extends {xrx.svg.Element}
 * @private
 */
xrx.svg.Stylable = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Stylable, xrx.svg.Element);



/**
 * @private
 */
xrx.svg.Stylable.prototype.strokeAndFill_ = function(fillColor,
    fillOpacity, strokeColor, strokeWidth) {
  if (fillColor !== undefined) this.setFillColor(fillColor);
  if (fillOpacity !== undefined) this.setFillOpacity(fillOpacity);
  if (strokeColor !== undefined) this.setStrokeColor(strokeColor);
  if (strokeWidth !== undefined) this.setStrokeWidth(strokeWidth);
};



/**
 * Sets the stroke width of the stylable element.
 * @param {number} width The stroke width.
 */
xrx.svg.Stylable.prototype.setStrokeWidth = function(width) {
  this.element_.setAttribute('stroke-width', Math.round(width));
};



/**
 * Sets the stroke color of the stylable element.
 * @param {string} color The stroke color.
 */
xrx.svg.Stylable.prototype.setStrokeColor = function(color) {
  this.element_.setAttribute('stroke', color);
  this.element_.setAttribute('stroke-color', color);
};



/**
 * Sets the fill color of the stylable element.
 * @param {string} color The fill color.
 */
xrx.svg.Stylable.prototype.setFillColor = function(color) {
  this.element_.setAttribute('fill', color);
};



/**
 * Sets the fill opacity of the stylable element.
 * @param {number} factor The fill opacity.
 */
xrx.svg.Stylable.prototype.setFillOpacity = function(factor) {
  this.element_.setAttribute('fill-opacity', factor);
};



xrx.svg.Stylable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
