/**
 * @fileoverview An abstract class representing a modifiable
 *   shape.
 * @private
 */

goog.provide('xrx.shape.Modifiable');



goog.require('xrx.shape.Style');



/**
 * An abstract class representing a modifiable shape.
 * @param {xrx.shape.Shape} shape The target shape to be modified.
 * @constructor
 * @private
 */
xrx.shape.Modifiable = function(shape) {

  goog.base(this);

  /**
   * The target shape to be modified.
   * @type {xrx.shape.Shape}
   * @private
   */
  this.shape_ = shape;

  /**
   * Draggers to modify this modifiable shape.
   * @type {Array<xrx.shape.Dragger>}
   * @private
   */
  this.dragger_ = [];

  /**
   * Helper to restore the style when deselected.
   * @type {xrx.shape.Style}
   * @private
   */
  this.store_ = new xrx.shape.Style();

  this.store_.setStyle(this.shape_);
  this.setStyle(this.shape_);
};
goog.inherits(xrx.shape.Modifiable, xrx.shape.Style);



/**
 * Selects this shape.
 */
xrx.shape.Modifiable.prototype.selectOn = function() {
  this.store_.setStyle(this.shape_);
  this.shape_.setStyle(this);
};



/**
 * De-selects this shape.
 */
xrx.shape.Modifiable.prototype.selectOff = function() {
  this.shape_.setStyle(this.store_);
};



/**
 * Abstract function to be implemented by each modifiable shape.
 */
xrx.shape.Modifiable.prototype.setCoords = goog.abstractMethod;



/**
 * Abstract function to be implemented by each modifiable shape.
 */
xrx.shape.Modifiable.prototype.setCoordAt = goog.abstractMethod;



/**
 * Abstract function to be implemented by each modifiable shape.
 */
xrx.shape.Modifiable.prototype.move = goog.abstractMethod;



/**
 * Returns the target shape of this modifiable helper shape.
 * @return {xrx.shape.Shape} The target shape.
 */
xrx.shape.Modifiable.prototype.getShape = function() {
  return this.shape_;
};



/**
 * Returns the dragger elements of this modifiable helper shape.
 * @return {Array<xrx.shape.Dragger>} The dragger elements.
 */
xrx.shape.Modifiable.prototype.getDragger = function() {
  return this.dragger_;
};



/**
 * Returns the target shape of this modifiable helper shape.
 * @return {xrx.shape.Shape} The target shape.
 */
xrx.shape.Modifiable.prototype.setDragger = function(dragger) {
  this.dragger_ = dragger;
};



/**
 * Disposes this modifiable helper shape.
 */
xrx.shape.Modifiable.prototype.disposeInternal = function() {
  var dragger;
  this.shape_.dispose();
  this.shape_ = null;
  while(dragger = this.dragger_.pop()) {
    dragger.dispose();
    dragger = null;
  }
  this.dragger_ = null;
  goog.base(this, 'disposeInternal');
};
