/**
 * @fileoverview A class representing an engine-independent
 * graphic canvas.
 * @private
 */

goog.provide('xrx.shape.Canvas');



goog.require('goog.dom.DomHelper');
goog.require('xrx.shape');
goog.require('xrx.shape.Container');



/**
 * A class representing an engine-independent graphic canvas.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @private
 */
xrx.shape.Canvas = function(drawing) {

  goog.base(this, drawing);

  this.engineElement_ = this.drawing_.getEngine().getCanvas();

  goog.dom.append(this.drawing_.getElement(), this.engineElement_.getElement());
};
goog.inherits(xrx.shape.Canvas, xrx.shape.Container);



/**
 * Returns the HTML element on which the canvas was created.
 * @return {HTMLElement} The HTML element.
 */
xrx.shape.Canvas.prototype.getElement = function() {
  return this.drawing_.getElement();
};



/**
 * Returns the rendering engine.
 * @return {xrx.engine.Engine} The rendering engine.
 */
xrx.shape.Canvas.prototype.getEngine = function() {
  return this.drawing_.getEngine();
};



/**
 * Returns the height of the canvas.
 * @return {number} The height.
 */
xrx.shape.Canvas.prototype.getHeight = function() {
  return this.engineElement_.getHeight();
};



/**
 * Sets the height of the canvas.
 * @param {number} The height.
 */
xrx.shape.Canvas.prototype.setHeight = function(height) {
  this.engineElement_.setHeight(height);
};



/**
 * Returns the width of the canvas.
 * @return {number} The width.
 */
xrx.shape.Canvas.prototype.getWidth = function() {
  return this.engineElement_.getWidth();
};



/**
 * Sets the width of the canvas.
 * @param {number} The width.
 */
xrx.shape.Canvas.prototype.setWidth = function(width) {
  this.engineElement_.setWidth(width);
};



/**
 * Draws this canvas and all its containers and shapes contained.
 */
xrx.shape.Canvas.prototype.draw = function() {
  this.startDrawing_();
  for (var i = 0, len = this.childs_.length; i < len; i++) {
    this.childs_[i].draw();
  }
  this.finishDrawing_();
};



xrx.shape.Canvas.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
