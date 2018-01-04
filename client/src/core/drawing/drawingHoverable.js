/**
 * @fileoverview A class representing a pointer to the shape
 * currently hovered by the user.
 * @private
 */

goog.provide('xrx.drawing.Hoverable');



goog.require('goog.array');
goog.require('xrx.drawing.EventType');
goog.require('xrx.engine');
goog.require('xrx.EventTarget');



/**
 * A class representing a pointer to the shape currently hovered by
 * the user.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @private
 */
xrx.drawing.Hoverable = function(drawing) {

  goog.base(this);

  /**
   * The parent drawing canvas.
   * @type {xrx.drawing.Drawing}
   */
  this.drawing_ = drawing;

  /**
   * Reference to the last shape(s) hovered.
   * @type {Array<xrx.shape.Shape>}
   * @private
   */
  this.last_ = [];

  
  this.multiple_ = false;
};
goog.inherits(xrx.drawing.Hoverable, xrx.EventTarget);



/**
 * Activates or deactivates this hoverable for multiple hovering of shapes.
 * @param {boolean} flag Whether to hover multiple shapes.
 */
xrx.drawing.Hoverable.prototype.setMultiple = function(flag) {
  this.multiple_ = !!flag;
};



/**
 * @private
 */
xrx.drawing.Hoverable.prototype.pop_ = function() {
  var shape;
  var length = this.last_.length;
  if (this.last_.length > 0) {
    for(var i = 0; i < length; i++) {
      shape = this.last_[i];
      if (shape) shape.getHoverable().hoverOff();
    }
    this.dispatchExternal(xrx.drawing.EventType.SHAPE_HOVER_OUT,
        this.drawing_, this.last_);
  };
};



/**
 * @private
 */
xrx.drawing.Hoverable.prototype.push_ = function(shapes) {
  var shape;
  var length = shapes.length;
  if (length > 0) {
    for (var i = 0; i < length; i++) {
      shape = shapes[i];
      if (shape) shape.getHoverable().hoverOn();
    }
    this.last_ = shapes;
    this.dispatchExternal(xrx.drawing.EventType.SHAPE_HOVER_IN,
        this.drawing_, shapes);
  } else {
    this.last_ = [];
  }
};



/**
 * @private
 */
xrx.drawing.Hoverable.prototype.hover_ = function(shapes) {
  if (!goog.array.equals(shapes, this.last_)) {
    // reset the style of the shape lastly hovered
    this.pop_();
    // cache the style of the shape currently hovered
    this.push_(shapes);
  }
  if (shapes.length > 0) this.dispatchExternal(
      xrx.drawing.EventType.SHAPE_HOVER_MOVE, this.drawing_, shapes);
};



/**
 * Function handles mouse move events.
 */
xrx.drawing.Hoverable.prototype.handleMove = function(e, cursor) {
  var shapes;
  this.multiple_ ? shapes = cursor.getShapes() : shapes = cursor.getShape();
  if (!goog.isArray(shapes)) shapes = [shapes];
  this.hover_(shapes);
};



/**
 * Function handles mouse out events.
 */
xrx.drawing.Hoverable.prototype.handleOut = function(e) {
  this.pop_();
};



xrx.drawing.Hoverable.prototype.disposeInternal = function() {
  this.drawing_.dispose();
  this.drawing_ = null;
  var shape;
  while(shape = this.last_.pop()) {
    shape.dispose();
    shape = null;
  }
  this.last_ = null;
  goog.base(this, 'disposeInternal');
};
