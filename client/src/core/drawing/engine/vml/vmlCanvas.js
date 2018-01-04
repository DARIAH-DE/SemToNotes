/**
 * @fileoverview VML rendering class representing a canvas.
 * @private
 */

goog.provide('xrx.vml.Canvas');



goog.require('goog.dom.DomHelper');
goog.require('goog.style');
goog.require('xrx.vml');
goog.require('xrx.vml.Container');



/**
 * VML rendering class representing a canvas.
 * @param
 * @constructor
 * @extends xrx.vml.Element
 * @private
 */
xrx.vml.Canvas = function(element) {

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
goog.inherits(xrx.vml.Canvas, xrx.vml.Container);



/**
 * Returns the root element of this canvas to be used as
 * the event target.
 * @return {Object} The event target element.
 */
xrx.vml.Canvas.prototype.getEventTarget = function() {
  return this.element_;
};



/**
 * Returns the width of the canvas.
 * @return {number} The width.
 */
xrx.vml.Canvas.prototype.getWidth = function() {
  return this.width_;
};



/**
 * Sets the width of the canvas.
 * @param {number} width the width.
 */
xrx.vml.Canvas.prototype.setWidth = function(width) {
  this.width_ = width;
  this.element_.parentElement.style['width'] = width + 'px';
  this.element_.style['width'] = width + 'px';
  this.element_['coordorigin'] = '0, 0';
  this.element_['coordsize'] = this.width_ + ', ' + this.height_;
};



/**
 * Returns the height of the canvas.
 * @return {number} The height.
 */
xrx.vml.Canvas.prototype.getHeight = function() {
  return this.height_;
};



/**
 * Sets the height of the canvas.
 * @param {number} width the height.
 */
xrx.vml.Canvas.prototype.setHeight = function(height) {
  this.height_ = height;
  this.element_.parentElement.style['height'] = height + 'px';
  this.element_.style['height'] = height + 'px';
  this.element_['coordorigin'] = '0, 0';
  this.element_['coordsize'] = this.width_ + ', ' + this.height_;
};



xrx.vml.Canvas.prototype.startDrawing = function() {
};



xrx.vml.Canvas.prototype.finishDrawing = function() {
};



/**
 * Creates a new canvas.
 * @param {HTMLElement} parent The parent HTML element to which the canvas
 *     shall be appended.
 */
xrx.vml.Canvas.create = function(parent) {
  xrx.vml.initVmlRendering();
  var element = goog.dom.createElement('div');
  element.style['display'] = 'inline-block';
  element.style['position'] = 'relative';
  element.style['overflow'] = 'hidden';
  element.style['width'] = '100px';
  element.style['height'] = '100px';
  var group = xrx.vml.createElement('group', false);
  goog.dom.appendChild(element, group);
  goog.dom.appendChild(parent, element);
  group.style['position'] = 'absolute';
  group.style['left'] = '0px';
  group.style['top'] = '0px';
  group.style['width'] = '100px';
  group.style['height'] = '100px';
  return new xrx.vml.Canvas(group);
};
