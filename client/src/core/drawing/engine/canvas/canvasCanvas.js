/**
 * @fileoverview Canvas rendering class representing a canvas.
 * @private
 */

goog.provide('xrx.canvas.Canvas');



goog.require('goog.dom.DomHelper');
goog.require('xrx.canvas.Container');



/**
 * Canvas rendering class representing a canvas.
 * @param {HTMLCanvasElement} element The HTML canvas element.
 * @constructor
 * @private
 */
xrx.canvas.Canvas = function(element) {

  /**
   * The HTML canvas element.
   * @type {HTMLCanvasElement}
   */
  this.element_ = element;

  /**
   * The canvas width.
   * @type {number}
   */
  this.width_ = 0;

  /**
   * The canvas height.
   * @type {number}
   */
  this.height_ = 0;

  goog.base(this, this);
};
goog.inherits(xrx.canvas.Canvas, xrx.canvas.Container);



/**
 * Returns the HTML canvas element.
 * @return {HTMLCanvasElement} The HTML canvas element.
 */
xrx.canvas.Canvas.prototype.getElement = function() {
  return this.element_;
};



/**
 * Returns the root element of this canvas to be used as
 * the event target.
 * @return {HTMLCanvasElement} The event target element.
 */
xrx.canvas.Canvas.prototype.getEventTarget = function() {
  return this.element_;
};



/**
 * Returns the width of the canvas.
 * @return {number} The width.
 */
xrx.canvas.Canvas.prototype.getWidth = function() {
  return this.width_;
};



/**
 * Sets the width of the canvas.
 * @param {number} width the width.
 */
xrx.canvas.Canvas.prototype.setWidth = function(width) {
  this.width_ = width;
  this.element_.setAttribute('width', width);
};



/**
 * Returns the height of the canvas.
 * @return {number} The height.
 */
xrx.canvas.Canvas.prototype.getHeight = function() {
  return this.height_;
};



/**
 * Sets the height of the canvas.
 * @param {number} width the height.
 */
xrx.canvas.Canvas.prototype.setHeight = function(height) {
  this.height_ = height;
  this.element_.setAttribute('height', height);
};



/**
 * Starts drawing this canvas.
 */
xrx.canvas.Canvas.prototype.startDrawing = function() {
  this.context_.save();
  this.context_.clearRect(0, 0, this.width_, this.height_);
  this.context_.beginPath();
};



/**
 * Finishes drawing this canvas.
 */
xrx.canvas.Canvas.prototype.finishDrawing = function() {
  this.context_.closePath();
  this.context_.restore();
};



/**
 * Creates a new canvas.
 * @param {Element} parent The parent HTML element to which the canvas
 *     shall be appended.
 */
xrx.canvas.Canvas.create = function(parent) {
  var element = goog.dom.createElement('canvas');
  return new xrx.canvas.Canvas(element);
};



xrx.canvas.Canvas.prototype.disposeInternal = function() {
  goog.dom.removeNode(this.element_);
  this.element_ = null;
  goog.base(this, 'disposeInternal');
};
