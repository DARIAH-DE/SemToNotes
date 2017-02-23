/**
 * @fileoverview SVG class representing an image.
 * @private
 */

goog.provide('xrx.svg.Image');



goog.require('xrx.svg');
goog.require('xrx.svg.Stylable');



/**
 * SVG class representing an image.
 * @param {SVGImageElement} element The SVG image element.
 * @constructor
 * @extends xrx.svg.Stylable
 * @private
 */
xrx.svg.Image = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Image, xrx.svg.Stylable);



/**
 * @private
 */
xrx.svg.Image.prototype.setWidth = function(width) {
  this.element_.setAttribute('width', width);
};



/**
 * @private
 */
xrx.svg.Image.prototype.setHeight = function(height) {
  this.element_.setAttribute('height', height);
};



/**
 * Sets a new HTML image element.
 * @param {Image} image The HTML image element.
 */
xrx.svg.Image.prototype.setImage = function(image) {
  this.element_.setAttributeNS(xrx.svg.Namespace['xlink'], 'xlink:href', image.src);
};



/**
 * Draws the image.
 * @param {HTMLImageElement} image The image to draw. Make sure
 *     that image has naturalWidth and naturalHeight attributes.
 */
xrx.svg.Image.prototype.draw = function(image) {
  if (image === undefined) return;
  this.setImage(image);
//  this.setWidth(image.naturalWidth);
//  this.setHeight(image.naturalHeight);
};



/**
 * Creates a new image.
 */
xrx.svg.Image.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'image');
  return new xrx.svg.Image(element);
};



xrx.svg.Image.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
