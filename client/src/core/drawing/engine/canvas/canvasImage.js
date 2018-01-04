/**
 * @fileoverview Canvas class representing an image.
 * @private
 */

goog.provide('xrx.canvas.Image');



goog.require('xrx.canvas.Stylable');



/**
 * Canvas class representing an image.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @extends xrx.canvas.Stylable
 * @private
 */
xrx.canvas.Image = function(canvas) {

  goog.base(this, canvas);
};
goog.inherits(xrx.canvas.Image, xrx.canvas.Stylable);



/**
 * Draws the image.
 * @param {HTMLImageElement} image The image to draw. Make sure
 *     that image has naturalWidth and naturalHeight attributes.
 */
xrx.canvas.Image.prototype.draw = function(image) {
  if (image) this.context_.drawImage(image, 0, 0, image.naturalWidth,
      image.naturalHeight);
};



/**
 * Creates a new image.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 */
xrx.canvas.Image.create = function(canvas) {
  return new xrx.canvas.Image(canvas);
};



xrx.canvas.Image.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
