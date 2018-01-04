/**
 * @fileoverview A class offering information
 * about the mouse point or the touch point.
 * @private
 */

goog.provide('xrx.drawing.Cursor');



goog.require('goog.Disposable');



/**
 * @constructor A class offering information
 * about the mouse point or the touch point.
 * @private
 */
xrx.drawing.Cursor = function(drawing) {

  goog.base(this);

  /**
   * The parent drawing canvas.
   * @type {xrx.drawing.Drawing}
   */
  this.drawing_ = drawing;

  /**
   * The mouse or touch point relative to the drawing canvas,
   * ignoring view-box transformations.
   * @type {Array<number>}
   */
  this.point = null;

  /**
   * The mouse or touch point relative to the view-box,
   * respecting view-box transformations.
   * @type {Array<number>}
   */
  this.pointTransformed_ = null;

  /**
   * The foremost shape currently selected by the mouse or touch point.
   * @type {xrx.shape.Shape}
   */
  this.shape_ = null;

  /**
   * The shapes currently selected by the mouse or touch point,
   * including overlapping shapes.
   * @type {Array<xrx.shape.Shape>}
   */
  this.shapes_ = null;
  
  /**
   * The current browser event.
   * @type {goog.events.BrowserEvent}
   */
  this.event_ = null;
};
goog.inherits(xrx.drawing.Cursor, goog.Disposable);



/**
 * Returns the mouse or touch point relative to the drawing canvas,
 * ignoring view-box transformations.
 * @return {Array<number>}
 */
xrx.drawing.Cursor.prototype.getPoint = function() {
  if (this.point_ === null) this.calculatePoint_(); 
  return this.point_;
};



/**
 * Returns the mouse or touch point relative to the view-box,
 * respecting view-box transformations.
 * @return {Array<number>}
 */
xrx.drawing.Cursor.prototype.getPointTransformed = function() {
  if (this.pointTransformed_ === null) this.calculatePointTransformed_(); 
  return this.pointTransformed_;
};



/**
 * Returns the foremost shape currently selected by the mouse or touch point.
 * @type {xrx.shape.Shape}
 */
xrx.drawing.Cursor.prototype.getShape = function() {
  if (this.shape_ === null) this.calculateShape_();
  return this.shape_;
};



/**
 * Returns the shapes currently selected by the mouse or touch point,
 * including overlapping shapes.
 * @type {Array<xrx.shape.Shape>}
 */
xrx.drawing.Cursor.prototype.getShapes = function() {
  if (this.shapes_ === null) this.calculateShapes_();
  return this.shapes_;
};



/**
 * @private
 */
xrx.drawing.Cursor.prototype.calculatePoint_ = function() {
  this.point_ = this.drawing_.getOffsetPoint(this.event_);
};



/**
 * @private
 */
xrx.drawing.Cursor.prototype.calculatePointTransformed_ = function() {
  if (this.point_ === null) this.calculatePoint_();
  this.pointTransformed_ = this.drawing_.getViewbox().getCTM().transformPoint(this.point_);
};



/**
 * @private
 */
xrx.drawing.Cursor.prototype.calculateShape_ = function() {
  if (this.pointTransformed_ === null) this.calculatePointTransformed_();
  this.shape_ = this.drawing_.getShapeSelected(this.pointTransformed_);
};



/**
 * @private
 */
xrx.drawing.Cursor.prototype.calculateShapes_ = function() {
  if (this.pointTransformed_ === null) this.calculatePointTransformed_();
  this.shapes_ = this.drawing_.getShapesSelected(this.pointTransformed_);
};



/**
 * Initializes the cursor with a new event.
 */
xrx.drawing.Cursor.prototype.init = function(e) {
  this.point_ = null;
  this.pointTransformed_ = null;
  this.shape_ = null;
  this.shapes_ = null;
  this.event_ = e;
};
