/**
 * @fileoverview A class implementing dynamic rendering of shapes.
 * @private
 */

goog.provide('xrx.shape.RenderStylable');



goog.require('xrx.engine');
goog.require('xrx.shape.Style');



/**
 * A class implementing dynamic rendering of shapes.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends {xrx.shape.Style}
 * @private
 */
xrx.shape.RenderStylable = function(drawing) {

  goog.base(this);

  /**
   * The current zoom factor to realize constant
   * line width and constant size of dragging elements.
   * @type {number}
   */
  this.zoomFactor_ = 1;

  /**
   * The shape group, if the shape belongs to a group.
   * @type {xrx.shape.ShapeGroup}
   */
  this.shapeGroup_;

  /**
   * Whether this shape has a DOM representation.
   * @type {boolean}
   * @private
   */
  this.hasDom_ = xrx.engine.hasDom(drawing.getEngine().getName());

  /**
   * Object describing whether the fill style did change
   * since the last drawing.
   * @type {Object}
   * @private
   */
  this.fillChanged_ = {
    color: true,
    opacity: true
  };

  /**
   * Object describing whether the stroke style did change
   * since the last drawing.
   * @type {Object}
   * @private
   */
  this.strokeChanged_ = {
    color: true,
    width: true
  };
};
goog.inherits(xrx.shape.RenderStylable, xrx.shape.Style);



/**
 * Returns the current shape group.
 * @return {xrx.shape.ShapeGroup} The shape group.
 * @private
 */
xrx.shape.RenderStylable.prototype.getShapeGroup = function() {
  return this.shapeGroup_;
};



/**
 * Sets this shape to be part of a shape group.
 * @param {xrx.shape.ShapeGroup} shapeGroup The shape group.
 * @private
 */
xrx.shape.RenderStylable.prototype.setShapeGroup = function(shapeGroup) {
  this.shapeGroup_ = shapeGroup;
};



/**
 * Returns the underlying engine element.
 * @return {xrx.engine.Element} The engine element.
 */
xrx.shape.RenderStylable.prototype.getEngineElement = function() {
  return this.engineElement_;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.setZoomFactor = function(factor) {
  this.zoomFactor_ = factor;
};



/**
 * Copy all styles from another shape.
 * @param {xrx.shape.Shape}
 */
xrx.shape.RenderStylable.prototype.setStyles = function(shape) {
  this.setStyle(shape);
  this.getHoverable().setStyle(shape.getHoverable());
  this.getModifiable().setStyle(shape.getModifiable());
  this.getSelectable().setStyle(shape.getSelectable());
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.setStyle = function(style) {
  goog.base(this, 'setStyle', style);
  this.fillChanged_.color = true;
  this.fillChanged_.opacity = true;
  this.strokeChanged_.color = true;
  this.strokeChanged_.width = true;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.setFillColor = function(color) {
  goog.base(this, 'setFillColor', color);
  this.fillChanged_.color = true;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.getRenderingFillColor = function() {
  var color = this.shapeGroup_ ? this.shapeGroup_.getFillColor() :
      ((this.hasDom_ && (this.fillChanged_.color === false)) ? undefined : this.fill_.color);
  this.fillChanged_.color = false;
  return color;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.setFillOpacity = function(factor) {
  goog.base(this, 'setFillOpacity', factor);
  this.fillChanged_.opacity = true;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.getRenderingFillOpacity = function() {
  var opacity = this.shapeGroup_ ? this.shapeGroup_.getFillOpacity() :
      this.hasDom_ && this.fillChanged_.opacity === false ? undefined : this.fill_.opacity;
  this.fillChanged_.opacity = false;
  return opacity;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.setStrokeColor = function(color) {
  goog.base(this, 'setStrokeColor', color);
  this.strokeChanged_.color = true;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.getRenderingStrokeColor = function() {
  var color = this.shapeGroup_ ? this.shapeGroup_.getStrokeColor() :
      this.hasDom_ && this.strokeChanged_.color === false ? undefined : this.stroke_.color;
  this.strokeChanged_.color = false;
  return color;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.setStrokeWidth = function(width) {
  goog.base(this, 'setStrokeWidth', width);
  this.strokeChanged_.width = true;
};



/**
 * Returns the stroke width of this shape.
 * @return {number} The stroke width.
 */
xrx.shape.RenderStylable.prototype.getRenderingStrokeWidth = function() {
  var width = this.shapeGroup_ ? this.shapeGroup_.getStrokeWidth() / this.zoomFactor_ :
      this.hasDom_ && this.strokeChanged_.width === false ? undefined :
      this.stroke_.width / this.zoomFactor_;
  this.strokeChanged_.width = false;
  return width;
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.startDrawing_ = function() {
  this.drawing_.eventBeforeRendering(this);
  this.engineElement_.applyTransform(this.ctm_);
  this.engineElement_.startDrawing();
};



/**
 * @private
 */
xrx.shape.RenderStylable.prototype.finishDrawing_ = function() {
  this.engineElement_.finishDrawing();
};



/**
 * Disposes this rendering style object.
 */
xrx.shape.RenderStylable.prototype.disposeInternal = function() {
  this.engineElement_.dispose();
  this.engineElement_ = null;
  goog.dispose(this.shapeGroup_);
  this.shapeGroup_ = null;
  goog.base(this, 'disposeInternal');
};
