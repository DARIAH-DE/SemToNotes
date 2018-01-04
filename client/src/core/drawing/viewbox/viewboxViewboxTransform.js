/**
 * @fileoverview A class implementing transformation functions for
 * a drawing view-box.
 */

goog.provide('xrx.viewbox.ViewboxTransform');



goog.require('xrx.viewbox.FastAffineTransform');
goog.require('xrx.drawing.Orientation');
goog.require('xrx.viewbox.ViewboxTranslate');



/**
 * A class implementing transformation functions for
 * a drawing view-box.
 * @constructor
 * @extends {xrx.viewbox.ViewboxTranslate}
 * @private
 */
xrx.viewbox.ViewboxTransform = function() {

  /**
   * The current transformation matrix of this viewbox.
   * @type {xrx.viewbox.FastAffineTransform}
   * @private
   */
  this.ctm_ = new xrx.viewbox.FastAffineTransform();

  goog.base(this);
};
goog.inherits(xrx.viewbox.ViewboxTransform, xrx.viewbox.ViewboxTranslate);



/**
 * Returns the current transformation matrix of this view-box.
 * @return {xrx.viewbox.FastAffineTransform} The transformation matrix.
 */
xrx.viewbox.ViewboxTransform.prototype.getCTM = function() {
  return this.ctm_;
};



/**
 * Sets the current transformation matrix of the view-box.
 * @param {xrx.viewbox.FastAffineTransform} ctm The matrix object.
 */
xrx.viewbox.ViewboxTransform.prototype.setCTM = function(ctm) {
  this.ctm_ = ctm;
  this.drawing_.draw();
};



/**
 * Returns a dump of the current transformation matrix as an array.
 * @return {Array<number>} The number array.
 */
xrx.viewbox.ViewboxTransform.prototype.ctmDump = function() {
  return [this.ctm_.m00_, this.ctm_.m10_, this.ctm_.m01_,
      this.ctm_.m11_, this.ctm_.m02_, this.ctm_.m12_];
};



/**
 * Restores the current transformation matrix from an array.
 * @param {Array<number>} dump The number array.
 */
xrx.viewbox.ViewboxTransform.prototype.ctmRestore = function(dump) {
  if (dump.length !== 6) throw Error('Invalid CTM dump.');
  this.ctm_.setTransform(dump[0], dump[1], dump[2], dump[3],
      dump[4], dump[5]);
  this.drawing_.draw();
};



/**
 * Makes the whole width of the view-box visible and optionally centers it.
 * @param {boolean} opt_center Whether to also center the canvas, defaults
 *   to true.
 */
xrx.viewbox.ViewboxTransform.prototype.fitToWidth = function(opt_center) {
  var viewboxWidth = this.getWidth(true, true);
  var canvasWidth = this.drawing_.getCanvas().getWidth();
  var scale = canvasWidth / viewboxWidth;
  this.ctm_.scale(scale, scale);
  if (!(opt_center === false)) this.center();
  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Makes the whole height of the view-box visible and optionally centers it.
 * @param {boolean} opt_center Whether to also center the canvas, defaults
 *   to true.
 */
xrx.viewbox.ViewboxTransform.prototype.fitToHeight = function(opt_center) {
  var viewboxHeight = this.getHeight(true, true);
  var canvasHeight = this.drawing_.getCanvas().getHeight();
  var scale = canvasHeight / viewboxHeight;
  this.ctm_.scale(scale, scale);
  if (!(opt_center === false)) this.center();
  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Makes the whole view-box visible and optionally centers it.
 * @param {boolean} opt_center Whether to also center the canvas, defaults
 *   to true.
 */
xrx.viewbox.ViewboxTransform.prototype.fit = function(opt_center) {
  var width = this.getWidth(true, true);
  var height = this.getHeight(true, true);
  width > height ? this.fitToWidth() : this.fitToHeight();
  if (!(opt_center === false)) this.center();
  this.drawing_.draw();
};



/**
 * Disposes this view-box.
 */
xrx.viewbox.ViewboxTransform.prototype.disposeInternal = function() {
  this.ctm_.disposeInternal();
  this.ctm_ = null;
  goog.base(this, 'disposeInternal');
};
