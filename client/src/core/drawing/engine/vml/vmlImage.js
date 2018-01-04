/**
 * @fileoverview VML class representing an image.
 * @private
 */

goog.provide('xrx.vml.Image');



goog.require('goog.dom.DomHelper');
goog.require('goog.style');
goog.require('xrx.vml');
goog.require('xrx.vml.Stylable');



/**
 * VML class representing an image.
 * @param {HTMLElement} The HTML element.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.vml.Image = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.vml.Image, xrx.vml.Stylable);



/**
 * Sets a new HTML image element.
 * @param {Image} image The HTML image element.
 */
xrx.vml.Image.prototype.setImage = function(image) {
  var size = goog.style.getSize(image);
  this.element_.src = image.src;
  this.element_.style['width'] = size.width + 'px';
  this.element_.style['height'] = size.height + 'px';
};



/**
 * Draws the image.
 * @param {HTMLImageElement} image The image to draw. Make sure
 *     that image has naturalWidth and naturalHeight attributes.
 */
xrx.vml.Image.prototype.draw = function(image) {
  if (image !== undefined) this.setImage(image);
};



/**
 * Creates a new image.
 * @param {Raphael} canvas The parent Raphael object.
 */
xrx.vml.Image.create = function(canvas) {
  var element = xrx.vml.createElement('image', false);
  element.setAttribute('class', 'xrx-vml');
  element.setAttribute('src', 'about:blank');
  element.style['position'] = 'absolute';
  element.style['left'] = '0px';
  element.style['top'] = '0px';
  return new xrx.vml.Image(element);
};
