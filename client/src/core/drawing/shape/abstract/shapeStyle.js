/**
 * @fileoverview An abstract class describing style information for shapes.
 * @private
 */

goog.provide('xrx.shape.Style');



goog.require('goog.Disposable');
goog.require('xrx.shape');



/**
 * A class describing style information for shapes.
 * @constructor
 */
xrx.shape.Style = function() {

  goog.base(this);

  /**
   * Object describing the fill style.
   * @type {Object}
   * @private
   */
  this.fill_ = {
    color: '',
    opacity: 0
  };

  /**
   * Object describing the stroke style.
   * @type {Object}
   * @private
   */
  this.stroke_ = {
    color: 'black',
    width: 1
  };
};
goog.inherits(xrx.shape.Style, goog.Disposable);



/**
 * Sets a stylable object for this shape.
 * @param {xrx.shape.Style} style 
 */
xrx.shape.Style.prototype.setStyle = function(stylable) {
  this.stroke_.color = stylable.getStrokeColor();
  this.stroke_.width = stylable.getStrokeWidth();
  this.fill_.color = stylable.getFillColor();
  this.fill_.opacity = stylable.getFillOpacity();
};



/**
 * Returns the stroke width of this shape.
 * @return {number} The stroke width.
 */
xrx.shape.Style.prototype.getStrokeWidth = function() {
  return this.stroke_.width;
};



/**
 * Sets the stroke width of this shape.
 * @param {number} width The stroke width.
 */
xrx.shape.Style.prototype.setStrokeWidth = function(width) {
  if (width !== undefined) this.stroke_.width = width;
};



/**
 * Returns the stroke color of this shape.
 * @return {string} The stroke color.
 */
xrx.shape.Style.prototype.getStrokeColor = function() {
  return this.stroke_.color;
};



/**
 * Sets the stroke color of this shape.
 * @param {string} color The stroke color.
 */
xrx.shape.Style.prototype.setStrokeColor = function(color) {
  if (color !== undefined) this.stroke_.color = color;
};



/**
 * Returns the fill color of this shape.
 * @return {string} The fill color.
 */
xrx.shape.Style.prototype.getFillColor = function() {
  return this.fill_.color;
};



/**
 * Sets the fill color of this shape.
 * @param {string} color The fill color.
 */
xrx.shape.Style.prototype.setFillColor = function(color) {
  if (this.fill_.opacity === 0) this.fill_.opacity = 1;
  if (color !== undefined) this.fill_.color = color;
};



/**
 * Returns the fill opacity of this shape.
 * @return {number} The fill opacity.
 */
xrx.shape.Style.prototype.getFillOpacity = function() {
  return this.fill_.opacity;
};



/**
 * Sets the fill opacity of this shape.
 * @param {number} factor The fill opacity.
 */
xrx.shape.Style.prototype.setFillOpacity = function(factor) {
  if (factor !== undefined) this.fill_.opacity = factor;
};



/**
 * Disposes this style information object.
 */
xrx.shape.Style.prototype.disposeInternal = function() {
  this.fill_ = null;
  this.stroke_ = null;
  goog.base(this, 'disposeInternal');
};
