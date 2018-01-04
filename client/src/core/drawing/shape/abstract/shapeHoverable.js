/**
 * @fileoverview An abstract class representing an engine-independent
 *   hoverable shape.
 * @private
 */

goog.provide('xrx.shape.Hoverable');



goog.require('xrx.shape.Style');



/**
 * An abstract class representing an engine-independent
 * hoverable shape.
 * @param {xrx.shape.Shape} shape The target shape to be hovered.
 * @constructor
 * @private
 */
xrx.shape.Hoverable = function(shape) {

  goog.base(this);

  /**
   * The target shape to be hovered.
   * @type {xrx.shape.Shape}
   * @private
   */
  this.shape_ = shape;

  /**
   * Style helper to restore the original style when
   * de-hovering this shape.
   * @type {xrx.shape.Style}
   * @private
   */
  this.store_ = new xrx.shape.Style();
};
goog.inherits(xrx.shape.Hoverable, xrx.shape.Style);



/**
 * Hovers this shape.
 */
xrx.shape.Hoverable.prototype.hoverOn = function() {
  this.store_.setStyle(this.shape_);
  this.shape_.setStyle(this);
};



/**
 * De-hovers this shape.
 */
xrx.shape.Hoverable.prototype.hoverOff = function() {
  this.shape_.setStyle(this.store_);
};



/**
 * Disposes this hoverable helper shape.
 */
xrx.shape.Hoverable.prototype.disposeInternal = function() {
  this.shape_.dispose();
  this.shape_ = null;
  this.store_.dispose();
  this.store_ = null;
  goog.base(this, 'disposeInternal');
};
