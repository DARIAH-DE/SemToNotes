/**
 * @fileoverview A class representing an engine-independent
 * graphic canvas.
 */

goog.provide('xrx.shape.Canvas');



goog.require('xrx.engine');
goog.require('xrx.engine.Engines');
goog.require('xrx.shape');
goog.require('xrx.shape.Container');



/**
 * A class representing an engine-independent graphic canvas.
 * @param {HTMLElement} element The HTML element to create
 *   the canvas.
 * @param {xrx.engine.Element} engineElement The engine element
 *   used to render this shape.
 * @constructor
 */
xrx.shape.Canvas = function(element, engine, engineElement) {

  goog.base(this, this, engineElement);

  /**
   * HTML element to create the canvas.
   * @type {HTMLElement}
   */
  this.element_ = element;

  /**
   * The engine to be used for rendering.
   * @type {xrx.engine.Engine}
   */
  this.engine_ = engine;

  /**
   * An event handler object to propagate
   * events such as 'eventShapeBeforeDraw'
   * @type {Object}
   */
  this.eventHandler_;
};
goog.inherits(xrx.shape.Canvas, xrx.shape.Container);



/**
 * Returns the event handler object to which events such as
 * 'eventShapeBeforeDraw' are propagated.
 * @param {Object} handler The handler object.
 */
xrx.shape.Canvas.prototype.setEventHandler = function(handler) {
  this.eventHandler_ = handler;
};



/**
 * Returns the event handler object.
 * @return {Object}
 */
xrx.shape.Canvas.prototype.getEventHandler = function() {
  return this.eventHandler_ || this;
};



/**
 * Returns the HTML element on which the canvas was created.
 * @return {HTMLElement} The HTML element.
 */
xrx.shape.Canvas.prototype.getElement = function() {
  return this.element_;
};



/**
 * Returns the rendering engine.
 * @return {xrx.engine.Engine} The rendering engine.
 */
xrx.shape.Canvas.prototype.getEngine = function() {
  return this.engine_;
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



/**
 * Creates a new canvas element.
 * @param {HTMLElement} element The HTML element on which the canvas
 *   shall be created.
 * @param {xrx.engine.Engine} The engine to be used for rendering.
 */
xrx.shape.Canvas.create = function(element, engine) {
  var engineElement;
  if (engine.typeOf(xrx.engine.CANVAS)) {
    engineElement = xrx.canvas.Canvas.create(element);
  } else if (engine.typeOf(xrx.engine.SVG)) {
    engineElement = xrx.svg.Canvas.create(element);
  } else if (engine.typeOf(xrx.engine.VML)) {
    engineElement = xrx.vml.Canvas.create(element);
  } else {
    throw Error('Unknown engine.');
  }
  return new xrx.shape.Canvas(element, engine, engineElement);
};
