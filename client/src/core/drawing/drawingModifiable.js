/**
 * @fileoverview A class representing the shape currently modified
 * by the user. 
 * @private
 */

goog.provide('xrx.drawing.Modifiable');



goog.require('xrx.EventTarget');
goog.require('xrx.geometry');
goog.require('xrx.shape.Dragger');



/**
 * A class representing the shape currently modified by the user. 
 * @constructor
 * @private
 */
xrx.drawing.Modifiable = function(drawing) {

  goog.base(this);

  this.drawing_ = drawing;

  this.mode_ = xrx.drawing.Modifiable.Mode.SHAPEHOVER;

  this.dragger_;

  this.shape_;

  this.origin_;

  this.propageted_ = false;
};
goog.inherits(xrx.drawing.Modifiable, xrx.EventTarget);



xrx.drawing.Modifiable.Mode = {
  DRAGSHAPE: 1,
  HOVERSHAPE: 2,
  DRAGDRAGGER: 3
};



xrx.drawing.Modifiable.prototype.getShape = function() {
  return this.shape_;
};



xrx.drawing.Modifiable.prototype.handleDown = function(e, cursor) {
  var modifiable;
  var shape = cursor.getShape();
  if (!shape) {
    this.drawing_.getViewbox().handleDown(e, cursor);
    this.propageted_ = true;
    this.drawing_.getLayerShapeModify().removeShapes();
    if (this.shape_) this.shape_.getModifiable().selectOff();
    this.shape_ = null;
    this.resetState_();
    return;
  }
  this.origin_ = cursor.getPointTransformed();
  if (shape && shape.isModifiable()) {
    this.state_ = xrx.drawing.State.DRAG;
    if (shape instanceof xrx.shape.Dragger) {
      this.mode_ = xrx.drawing.Modifiable.Mode.DRAGDRAGGER;
      this.dragger_ = shape;
    } else {
      this.mode_ = xrx.drawing.Modifiable.Mode.DRAGSHAPE;
      if (this.shape_) this.shape_.getModifiable().selectOff();
      this.shape_ = shape;
      modifiable = this.shape_.getModifiable();
      this.drawing_.getLayerShapeModify().activate(modifiable);
      this.shape_.getModifiable().selectOn();
    }
  } else {
    this.drawing_.getLayerShapeModify().removeShapes();
    if (this.shape_) this.shape_.getModifiable().selectOff();
    this.resetState_();
  }
};



xrx.drawing.Modifiable.prototype.handleHover_ = function(e, cursor) {
};



xrx.drawing.Modifiable.prototype.handleDragShape_ = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var distX = point[0] - this.origin_[0];
  var distY = point[1] - this.origin_[1];
  this.shape_.getModifiable().move(distX, distY);
  this.origin_ = point;
};



xrx.drawing.Modifiable.prototype.handleMove = function(e, cursor) {
  var shape = cursor.getShape();
  if (this.propageted_) {
    this.drawing_.getViewbox().handleMove(e, cursor);
    return;
  }
  var point = cursor.getPointTransformed();
  if (this.mode_ === xrx.drawing.Modifiable.Mode.SHAPEHOVER) {
    this.handleHover_(e, cursor);
  } else if (this.mode_ === xrx.drawing.Modifiable.Mode.DRAGDRAGGER) {
    this.dragger_.setCoord(point);
    this.dispatchExternal(xrx.drawing.EventType.SHAPE_MODIFY, this.drawing_, this.shape_);
  } else if (this.mode_ === xrx.drawing.Modifiable.Mode.DRAGSHAPE) {
    this.handleDragShape_(e, cursor);
    this.dispatchExternal(xrx.drawing.EventType.SHAPE_MODIFY, this.drawing_, this.shape_);
  } else {
    return;
  }
};



xrx.drawing.Modifiable.prototype.handleUp = function(e, cursor) {
  var shape = cursor.getShape();
  if (!shape) {
    this.drawing_.getViewbox().handleUp(e, cursor);
  }
  this.resetState_();
  this.propageted_ = false;
};



xrx.drawing.Modifiable.prototype.resetState_ = function() {
  this.mode_ = xrx.drawing.Modifiable.Mode.SHAPEHOVER;
};



xrx.drawing.Modifiable.prototype.disposeInternal = function() {
  this.drawing_.dispose();
  this.drawing_ = null;
  goog.dispose(this.dragger_);
  goog.dispose(this.shape_);
  this.origin_ = null;
  goog.base(this, 'disposeInternal');
};
