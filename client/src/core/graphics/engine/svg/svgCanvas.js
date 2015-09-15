/**
 * @fileoverview SVG rendering class representing a canvas.
 */

goog.provide('xrx.svg.Canvas');



goog.require('goog.dom.DomHelper');
goog.require('xrx.svg');
goog.require('xrx.svg.Container');



/**
 * SVG rendering class representing a canvas.
 * @param {SVGElement} element The SVG element.
 * @constructor
 * @extends xrx.svg.Element
 */
xrx.svg.Canvas = function(element) {

  goog.base(this, element);

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
};
goog.inherits(xrx.svg.Canvas, xrx.svg.Container);



/**
 * Returns the root element of this canvas to be used as
 * the event target.
 * @return {SVGElement} The event target element.
 */
xrx.svg.Canvas.prototype.getEventTarget = function() {
  return this.element_;
};



/**
 * Returns the width of the canvas.
 * @return {number} The width.
 */
xrx.svg.Canvas.prototype.getWidth = function() {
  return this.width_;
};



/**
 * Sets the width of the canvas.
 * @param {number} width the width.
 */
xrx.svg.Canvas.prototype.setWidth = function(width) {
  this.width_ = width;
  this.element_.setAttribute('width', width);
};



/**
 * Returns the height of the canvas.
 * @return {number} The height.
 */
xrx.svg.Canvas.prototype.getHeight = function() {
  return this.height_;
};



/**
 * Sets the height of the canvas.
 * @param {number} width the height.
 */
xrx.svg.Canvas.prototype.setHeight = function(height) {
  this.height_ = height;
  this.element_.setAttribute('height', height);
};



/**
 * Creates a new canvas.
 * @param {HTMLElement} parent The parent HTML element to which the canvas
 *     shall be appended.
 */
xrx.svg.Canvas.create = function(parent) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'svg');
  var canvas = new xrx.svg.Canvas(element);
  goog.dom.appendChild(parent, canvas.getElement());
  return canvas;
};
