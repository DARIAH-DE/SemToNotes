/**
 * @fileoverview Canvas super class.
 * @private
 */

goog.provide('xrx.canvas.Element');



goog.require('xrx.canvas');
goog.require('xrx.engine.Element');



/**
 * Canvas super class.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @private
 */
xrx.canvas.Element = function(canvas) {

  goog.base(this);

  /**
   * The parent canvas object.
   * @type {xrx.canvas.Canvas}
   */
  this.canvas_ = canvas;

  /**
   * The rendering context.
   * @type {CanvasRenderingContext2D}
   */
  this.context_ = this.canvas_.getElement().getContext('2d');
};
goog.inherits(xrx.canvas.Element, xrx.engine.Element);



/**
 * Returns the parent canvas object.
 * @return {xrx.canvas.Canvas} The parent canvas object.
 */
xrx.canvas.Element.prototype.getCanvas = function() {
  return this.canvas_;
};



/**
 * Returns the HTML canvas rendering context.
 * @return {CanvasRenderingContext2D} The rendering context.
 */
xrx.canvas.Element.prototype.getContext = function() {
  return this.context_;
};



/**
 * Applies a transformation matrix on this element.
 * @param {goog.math.AffineTransform} matrix The transformation matrix.
 */
xrx.canvas.Element.prototype.applyTransform = function(matrix) {
  if (!matrix) return;
  this.context_.setTransform(matrix.m00_, matrix.m10_, matrix.m01_,
      matrix.m11_, matrix.m02_, matrix.m12_);
};



xrx.canvas.Element.prototype.disposeInternal = function() {
  this.canvas_.dispose();
  this.context_ = null;
  goog.base(this, 'disposeInternal');
};
