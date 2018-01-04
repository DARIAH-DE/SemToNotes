/**
 * @fileoverview A class representing an engine-independent
 * image graphic.
 * @private
 */

goog.provide('xrx.shape.Image');



goog.require('xrx.geometry.Rect');
goog.require('xrx.shape.Geometry');



/**
 * A class representing an engine-independent image graphic.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @private
 */
xrx.shape.Image = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Rect());

  /**
   * The engine element.
   * @type {(xrx.canvas.Image|xrx.svg.Image|xrx.vml.Image)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createImage();

  /**
   * The HTML image element.
   * @type {HTMLImage}
   */
  this.image_;
};
goog.inherits(xrx.shape.Image, xrx.shape.Geometry);



/**
 * Returns the HTML image element used to create the image.
 * @return {HTMLImage} The HTML image element.
 */
xrx.shape.Image.prototype.getImage = function() {
  return this.image_;
};



/**
 * Sets a new HTML image element.
 * @param {HTMLImage} image The HTML image element.
 */
xrx.shape.Image.prototype.setImage = function(image) {
  this.image_ = image;
  this.geometry_.width = image.naturalWidth;
  this.geometry_.height = image.naturalHeight;
};



/**
 * Returns the height of this image.
 * @return {number} The height.
 */
xrx.shape.Image.prototype.getHeight = function() {
  return this.geometry_.height;
};



/**
 * Returns the width of this image.
 * @return {number} The width.
 */
xrx.shape.Image.prototype.getWidth = function() {
  return this.geometry_.width;
};



/**
 * Draws this image.
 * @private
 */
xrx.shape.Image.prototype.draw = function() {
  this.startDrawing_();
  if (this.image_) this.engineElement_.draw(this.image_);
  this.finishDrawing_();
};



xrx.shape.Image.prototype.disposeInternal = function() {
  this.image_ = null;
  goog.base(this, 'disposeInternal');
};
