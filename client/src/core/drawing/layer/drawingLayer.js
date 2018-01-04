/**
 * @fileoverview An abstract class representing a layer of a
 *   drawing canvas.
 * @private
 */

goog.provide('xrx.drawing.Layer');



goog.require('goog.Disposable');
goog.require('xrx.shape.Group');



/**
 * An abstract class representing a layer of a drawing canvas.
 * @param {xrx.drawing.Drawing} drawing The parent drawing object.
 * @constructor
 * @private
 */
xrx.drawing.Layer = function(drawing) {

  goog.base(this);

  /**
   * @private
   */
  this.drawing_ = drawing;

  /**
   * @private
   */
  this.locked_ = false;

  /**
   * @private
   */
  this.group_;

  /**
   * @private
   */
  this.shapes_ = [];

  this.create_();
};
goog.inherits(xrx.drawing.Layer, goog.Disposable);



/**
 * Returns the drawing object.
 * @return {xrx.drawing.Drawing}
 */
xrx.drawing.Layer.prototype.getDrawing = function() {
  return this.drawing_;
};



/**
 * Locks or unlocks the layer so that the shapes are ignored by
 * xrx.drawing.EventTarget.
 * @param {boolean} flag Whether to lock or unlock the layer.
 */
xrx.drawing.Layer.prototype.setLocked = function(flag) {
  flag === true ? this.locked_ = true : this.locked_ = false;
};



/**
 * Returns whether the layer is locked currently.
 * @return {boolean} Locked or not.
 */
xrx.drawing.Layer.prototype.isLocked = function() {
  return this.locked_;
};



/**
 * Returns the layers' group.
 * @return {Object} The group.
 */
xrx.drawing.Layer.prototype.getGroup = function() {
  return this.group_;
};



/**
 * Returns the shapes of the layer.
 * @return {xrx.shape.Shape} The shapes.
 */
xrx.drawing.Layer.prototype.getShapes = function() {
  return this.shapes_;
};



/**
 * Draws all shapes of the layer.
 */
xrx.drawing.Layer.prototype.draw = function() {
  for(var i = 0, len = this.shapes_.length; i < len; i++) {
    this.shapes_[i].draw(this.drawing_.getViewbox().getZoomValue());
  }
};



/**
 * Adds shapes to the layer.
 * @param {xrx.shape.Shape} shapes The shapes.
 */
xrx.drawing.Layer.prototype.addShapes = function(shapes) {
  if (!goog.isArray(shapes)) shapes = [shapes];
  for(var i = 0, len = shapes.length; i < len; i++) {
    this.shapes_.push(shapes[i]);
  }
  this.group_.addChildren(shapes);
};



/**
 * Removes all shapes from the layer;
 */
xrx.drawing.Layer.prototype.removeShapes = function() {
  this.shapes_ = [];
  this.group_.removeChildren();
};



/**
 * Removes one shape from the layer.
 * @param {xrx.shape.Shape} shape The shape to remove.
 */
xrx.drawing.Layer.prototype.removeShape = function(shape) {
  var s;
  for (var i = 0, len = this.shapes_.length; i < len; i++) {
    s = this.shapes_[i];
    if (s === shape) {
      this.group_.removeChildAt(i);
      this.shapes_.splice(i, 1);
      break;
    }
  }
};



/**
 * @private
 */
xrx.drawing.Layer.prototype.create_ = function() {
  this.group_ = new xrx.shape.Group(this.drawing_);
};



/**
 * Disposes this layer.
 */
xrx.drawing.Layer.prototype.disposeInternal = function() {
  this.drawing_.dispose();
  this.drawing_ = null;
  this.group_.dispose();
  this.group_ = null;
  var shape;
  while(shape = this.shapes_.pop()) {
    shape.dispose();
    shape = null;
  }
  this.shapes_ = null;
  goog.base(this, 'disposeInternal');
};
