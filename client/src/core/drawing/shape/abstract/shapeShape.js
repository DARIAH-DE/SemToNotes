/**
 * @fileoverview Super-class representing an engine-independent
 * shape.
 * @private
 */

goog.provide('xrx.shape.Shape');



goog.require('xrx.engine.Engines');
goog.require('xrx.shape.RenderStylable');
goog.require('xrx.shape');



/**
 * Super-class representing an engine-independent shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends {xrx.shape.RenderStylable}
 * @private
 */
xrx.shape.Shape = function(drawing) {

  goog.base(this, drawing);

  /**
   * The parent drawing canvas.
   * @type {xrx.drawing.Drawing}
   * @private
   */
  this.drawing_ = drawing;

  /**
   * A creatable helper shape.
   * @type {xrx.shape.Creatable}
   * @private
   */
  this.creatable_;

  /**
   * A hoverable helper shape.
   * @type {xrx.shape.Hoverable}
   * @private
   */
  this.hoverable_;

  /**
   * A modifiable helper shape.
   * @type {xrx.shape.Modifiable}
   * @private
   */
  this.modifiable_;

  /**
   * A selectable helper shape.
   * @type {xrx.shape.Selectable}
   * @private
   */
  this.selectable_;

  /**
   * Whether this shape is set modifiable. Defaults to true.
   * @type {boolean}
   */
  this.isModifiable_ = true;
};
goog.inherits(xrx.shape.Shape, xrx.shape.RenderStylable);



/**
 * Returns the parent drawing canvas of this shape.
 * @return {xrx.drawing.Drawing} The parent drawing canvas.
 */ 
xrx.shape.Shape.prototype.getDrawing = function() {
  return this.drawing_;
};



/**
 * Abstract function to be implemented by each shape class. Returns
 * a creatable helper shape.
 * @return {xrx.shape.Creatable} A creatable helper shape.
 */
xrx.shape.Shape.prototype.getCreatable = goog.abstractMethod;



/**
 * Abstract function to be implemented by each shape class. Returns
 * a hoverable helper shape.
 * @return {xrx.shape.Hoverable} A hoverable helper shape.
 */
xrx.shape.Shape.prototype.getHoverable = goog.abstractMethod;



/**
 * Abstract function to be implemented by each shape class. Returns
 * a modifiable helper shape.
 * @return {xrx.shape.Modifiable} A modifiable helper shape.
 */
xrx.shape.Shape.prototype.getModifiable = goog.abstractMethod;



/**
 * Abstract function to be implemented by each shape class. Returns
 * a selectable helper shape.
 * @return {xrx.shape.Selectable} A selectable helper shape.
 */
xrx.shape.Shape.prototype.getSelectable = goog.abstractMethod;



/**
 * Sets whether this shape shall be modifiable or not. Defaults
 * to true.
 * @param {boolean} modifiable Whether modifiable or not.
 */
xrx.shape.Shape.prototype.setModifiable = function(modifiable) {
  modifiable === false ? this.isModifiable_ = false : this.isModifiable_ = true;
};



/**
 * Whether this shape is set modifiable.
 * @return {boolean} Is modifiable.
 */
xrx.shape.Shape.prototype.isModifiable = function() {
  return this.isModifiable_;
};



/**
 * Disposes this shape.
 */
xrx.shape.Shape.prototype.disposeInternal = function() {
  this.drawing_.dispose();
  this.drawing_ = null;
  goog.dispose(this.hoverable_);
  this.hoverable_ = null;
  goog.dispose(this.selectable_);
  this.selectable_ = null;
  goog.dispose(this.modifiable_);
  this.modifiable_ = null;
  goog.dispose(this.creatable_);
  this.creatable_ = null;
  goog.base(this, 'disposeInternal');
};
