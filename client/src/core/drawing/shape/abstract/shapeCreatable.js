/**
 * @fileoverview An abstract class representing a creatable
 *   shape.
 * @private
 */

goog.provide('xrx.shape.Creatable');



/**
 * An abstract class representing a creatable
 *   shape.
 * @param {xrx.shape.Shape} target The target shape to be created.
 * @param {xrx.shape.Shape} preview The preview of the shape during
 *   creation.
 * @constructor
 * @private
 */
xrx.shape.Creatable = function(target, preview) {

  /**
   * The target shape to be created.
   * @type {xrx.shape.Shape}
   * @private
   */
  this.target_ = target;

  /**
   * A preview of the shape currently created.
   * @type {xrx.shape.Shape}
   * @private
   */
  this.preview_ = preview;
};



xrx.shape.Creatable.prototype.getTarget = function() {
  return this.target_;
};



xrx.shape.Creatable.prototype.getPreview = function() {
  return this.preview_;
};



xrx.shape.Creatable.prototype.setStyle = function(style) {
  this.preview_.setStyle(style);
};



xrx.shape.Creatable.prototype.setFillColor = function(color) {
  this.preview_.setFillColor(color);
};



xrx.shape.Creatable.prototype.setFillOpacity = function(factor) {
  this.preview_.setFillOpacity(factor);
};



xrx.shape.Creatable.prototype.setStrokeColor = function(color) {
  this.preview_.setStrokeColor(color);
};



xrx.shape.Creatable.prototype.setStrokeWidth = function(width) {
  this.preview_.setStrokeWidth(width);
};
