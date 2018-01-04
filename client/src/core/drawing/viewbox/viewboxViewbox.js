/**
 * @fileoverview A class representing the view-box of a drawing canvas.
 */

goog.provide('xrx.viewbox.Viewbox');



goog.require('xrx.viewbox.FastAffineTransform');
goog.require('xrx.viewbox.ViewboxTransform');
goog.require('xrx.shape.Group');



/**
 * A class representing the view-box of a drawing canvas.
 * @param {xrx.drawing.Drawing} drawing The parent drawing object.
 * @constructor
 * @extends {xrx.viewbox.ViewboxTransform}
 */
xrx.viewbox.Viewbox = function(drawing) {

  goog.base(this);

  /**
   * The parent drawing object.
   * @type {xrx.drawing.Drawing}
   * @private
   */
  this.drawing_ = drawing;

  /**
   * The group where matrix transformations are applied to.
   * {xrx.shape.Group}
   * @private
   */
  this.group_ = new xrx.shape.Group(this.drawing_);

  /**
   * The state of the drawing canvas, either DRAG or NONE.
   * @type {number}
   * @private
   */
  this.state_ = xrx.drawing.State.NONE;

  /**
   * The last mouse point. This member is used when dragging
   * or panning the view-box.
   * @type {Array<number>}
   * @private
   */
  this.origin_;
};
goog.inherits(xrx.viewbox.Viewbox, xrx.viewbox.ViewboxTransform);



/**
 * Returns the parent drawing object of the view-box.
 * @return {xrx.drawing.Drawing} The drawing object.
 * @private
 */
xrx.viewbox.Viewbox.prototype.getDrawing = function() {
  return this.drawing_;
};



/**
 * Returns the group of the view-box.
 * @return {xrx.shape.Group} The group.
 * @private
 */
xrx.viewbox.Viewbox.prototype.getGroup = function() {
  return this.group_;
};



/**
 * Handles double-click events for the view-box.
 * @param {Array<number>} offsetPoint The offset point.
 * @private
 */
xrx.viewbox.Viewbox.prototype.handleDblClick = function(e, cursor) {
  this.rotateRight(cursor.getPoint());
};



/**
 * Handles mouse-down events for the view-box.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {Array<number>} offsetPoint The offset point.
 * @private
 */
xrx.viewbox.Viewbox.prototype.handleDown = function(e, cursor) {
  this.origin_ = cursor.getPoint();
  this.state_ = xrx.drawing.State.DRAG;
};



/**
 * Handles mouse-move events for the view-box.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {Array<number>} offsetPoint The offset point.
 * @private
 */
xrx.viewbox.Viewbox.prototype.handleMove = function(e, cursor) {
  if (this.state_ !== xrx.drawing.State.DRAG) return;
  var distX = cursor.getPoint()[0] - this.origin_[0];
  var distY = cursor.getPoint()[1] - this.origin_[1];
  this.translate(distX, distY);
  this.origin_ = cursor.getPoint();
};



/**
 * Handles mouse-out events for the view-box.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @private
 */
xrx.viewbox.Viewbox.prototype.handleOut = function(e) {
  this.resetState_();
};



/**
 * Handles mouse-up events for the view-box.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @private
 */
xrx.viewbox.Viewbox.prototype.handleUp = function(e) {
  this.resetState_();
};



/**
 * Handles mouse-wheel events for the view-box.
 * @param {Array<number>} offsetPoint The offset point.
 * @private
 */
xrx.viewbox.Viewbox.prototype.handleWheel = function(e, cursor) {
  e.deltaY < 0 ? this.zoomIn(cursor.getPoint()) :
      this.zoomOut(cursor.getPoint());
};



/**
 * @private
 */
xrx.viewbox.Viewbox.prototype.resetState_ = function() {
  this.state_ = xrx.drawing.State.NONE;
  this.origin_ = null;
};



/**
 * Disposes this view-box.
 */
xrx.viewbox.Viewbox.prototype.disposeInternal = function() {
  this.drawing_.dispose();
  this.drawing_ = null;
  this.group_.dispose();
  this.group_ = null;
  this.origin_ = null;
  goog.base(this, 'disposeInternal');
};
