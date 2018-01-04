/**
 * @fileoverview A class representing a pointer to the shape
 * currently selected by the user.
 * @private
 */

goog.provide('xrx.drawing.Selectable');



goog.require('goog.Disposable');



/**
 * A class representing a selectable shape.
 * @constructor
 * @private
 */
xrx.drawing.Selectable = function(drawing) {

  goog.base(this);

  /**
   * The parent drawing canvas.
   * @type {xrx.drawing.Drawing}
   */
  this.drawing_ = drawing;

  /**
   * @type {xrx.shape.Shape}
   */
  this.last_;
};
goog.inherits(xrx.drawing.Selectable, goog.Disposable);



xrx.drawing.Selectable.prototype.getShape = function() {
  return this.last_;
};



xrx.drawing.Selectable.prototype.setSelected = function(shape) {
  if (this.last_) this.last_.getSelectable().selectOff();
  if (shape) {
    shape.getSelectable().selectOn();
    this.last_ = shape;
  } else {
    this.last_ = null;
  }
};



/**
 * Handles down events for this selectable shape.
 * @param {goog.events.BrowserEvent} e The browser event.
 */
xrx.drawing.Selectable.prototype.handleDown = function(e, cursor) {
  this.setSelected(cursor.getShape());
};



xrx.drawing.Selectable.prototype.disposeInternal = function() {
  this.drawing_.dispose();
  this.drawing_ = null;
  goog.dispose(this.last_);
  this.last_ = null;
  goog.base(this, 'disposeInternal');
};
