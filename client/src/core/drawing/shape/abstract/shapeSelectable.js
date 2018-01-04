/**
 * @fileoverview An abstract class representing an engine-independent
 * selectable shape.
 * @private
 */

goog.provide('xrx.shape.Selectable');



goog.require('xrx.shape.Style');



/**
 * An abstract class representing an engine-independent
 * selectable shape.
 * @param {xrx.shape.Shape} shape The target shape to be selected.
 * @constructor
 * @private
 */
xrx.shape.Selectable = function(shape) {

  goog.base(this);

  /**
   * The target shape to be selected.
   * @type {xrx.shape.Shape}
   * @private
   */
  this.shape_ = shape;

  /**
   * Helper to restore the style when deselected.
   * @type {xrx.shape.Style}
   * @private
   */
  this.store_ = new xrx.shape.Style();
};
goog.inherits(xrx.shape.Selectable, xrx.shape.Style);



/**
 * Selects this shape.
 */
xrx.shape.Selectable.prototype.selectOn = function() {
  this.store_.setStyle(this.shape_);
  this.shape_.setStyle(this);
};



/**
 * De-selects this shape.
 */
xrx.shape.Selectable.prototype.selectOff = function() {
  this.shape_.setStyle(this.store_);
};



/**
 * Disposes this selectable shape.
 */
xrx.shape.Selectable.prototype.disposeInternal = function() {
  this.shape_.dispose();
  this.shape_ = null;
  this.store_.dispose();
  this.store_ = null;
  goog.base(this, 'disposeInternal');
};
