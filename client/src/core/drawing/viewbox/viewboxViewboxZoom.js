/**
 * @fileoverview A class implementing a zooming model for
 * the drawing view-box.
 */

goog.provide('xrx.viewbox.ViewboxZoom');



goog.require('xrx.viewbox.ViewboxRotate');



/**
 * A class implementing a zooming model for the drawing view-box.
 * @constructor
 * @extends {xrx.viewbox.ViewboxRotate}
 * @private
 */
xrx.viewbox.ViewboxZoom = function() {

  goog.base(this);
};
goog.inherits(xrx.viewbox.ViewboxZoom, xrx.viewbox.ViewboxRotate);



/**
 * The current zoom factor, defaults to .1.
 * @type {number}
 * @private
 */
xrx.viewbox.ViewboxZoom.prototype.zoomFactor_ = .1;



/**
 * Returns the current zoom factor, defaults to .1.
 * @return {number} The zoom factor.
 */
xrx.viewbox.ViewboxZoom.prototype.getZoomFactor = function() {
  return this.zoomFactor_;
};



/**
 * Sets a new zoom factor, e.g. 0.1.
 * @param {number} factor The new zoom factor.
 */
xrx.viewbox.ViewboxZoom.prototype.setZoomFactor = function(factor) {
  this.zoomFactor_ = factor;
};



/**
 * Returns the current zoom value.
 * @return {number}
 */
xrx.viewbox.ViewboxZoom.prototype.getZoomValue = function(opt_zoomStep) {
  if (opt_zoomStep === undefined) {
    return this.ctm_.getScale();
  } else {
    return this.zoomMin_ + opt_zoomStep * this.zoomFactor_;
  }
};



/**
 * The minimum zoom value, defaults to 0.1.
 * @type {number}
 * @private
 */
xrx.viewbox.ViewboxZoom.prototype.zoomMin_ = .1;



/**
 * Returns the current minimum zoom value.
 * @return {number} The minimum zoom value.
 */
xrx.viewbox.ViewboxZoom.prototype.getZoomMin = function() {
  return this.zoomMin_;
};



/**
 * Sets the minimum zoom value.
 * @param {number} value The minimum zoom value.
 */
xrx.viewbox.ViewboxZoom.prototype.setZoomFactorMin = function(value) {
  this.zoomMin_ = value;
};



/**
 * The maximum zoom value, defaults to 2.
 * @type {number}
 * @private
 */
xrx.viewbox.ViewboxZoom.prototype.zoomMax_ = 2;



/**
 * Returns the current maximum zoom value.
 * @return {number} The maximum zoom value.
 */
xrx.viewbox.ViewboxZoom.prototype.getZoomMax = function() {
  return this.zoomMax_;
};



/**
 * Sets the maximum zoom value.
 * @param {number} value The maximum zoom value.
 */
xrx.viewbox.ViewboxZoom.prototype.setZoomFactorMax = function(value) {
  this.zoomMax_ = value;
};



/**
 * Returns the current zoom step or the zoom step of a zoom value if
 * opt_zoomValue is defined. 
 * @param {?number} opt_zoomValue A zoom value.
 * @return {number} The zoom step.
 */
xrx.viewbox.ViewboxZoom.prototype.getZoomStep = function(opt_zoomValue) {
  var value = opt_zoomValue !== undefined ? opt_zoomValue : this.getZoomValue();
  return Math.round((value - this.zoomMin_) / this.zoomFactor_);
};



/**
 * @private
 */
xrx.viewbox.ViewboxZoom.prototype.zoomOffset_ = function(point, zoomValue) {
  this.ctm_.setTransform(
    this.ctm_.getScaleX(), this.ctm_.getShearY(), 
    this.ctm_.getShearX(), this.ctm_.getScaleY(),
    (this.ctm_.getTranslateX() - point[0]) * zoomValue + point[0],
    (this.ctm_.getTranslateY() - point[1]) * zoomValue + point[1]
  );
};



/**
 * Zooms the view-box to a value, optionally respecting a fix-point.
 * @param {number} zoomValue The zoom value.
 * @param {?number} opt_fixPoint A fix-point.
 */
xrx.viewbox.ViewboxZoom.prototype.zoomTo = function(zoomValue, opt_fixPoint) {
  var fixPoint;
  if (opt_fixPoint !== undefined) {
    if (!this.containsPoint(opt_fixPoint)) {
      fixPoint = this.getCenterPoint_(true);
    } else {
      fixPoint = opt_fixPoint;
    }
  } else {
    fixPoint = this.getCenterPoint_(true);
  }
	if(zoomValue < this.zoomMin_) zoomValue = this.zoomMin_;
	if(zoomValue > this.zoomMax_) zoomValue = this.zoomMax_;

  var scale = 1 / this.getZoomValue() * zoomValue;
	this.zoomOffset_(fixPoint, scale);
	this.ctm_.scale(scale, scale);

  this.drawing_.draw();
  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * Zoom in on the view-box, optionally respecting a fix-point.
 * @param {Array<number>} opt_fixPoint A fix-point.
 */
xrx.viewbox.ViewboxZoom.prototype.zoomIn = function(opt_fixPoint) {
  this.zoomTo(this.ctm_.getScale() + this.zoomFactor_, opt_fixPoint);
};



/**
 * Zoom out the view-box, optionally respecting a fix-point.
 * @param {Array<number>} opt_fixPoint A fix-point.
 */
xrx.viewbox.ViewboxZoom.prototype.zoomOut = function(opt_fixPoint) {
  this.zoomTo(this.ctm_.getScale() - this.zoomFactor_, opt_fixPoint);
};



/**
 * Disposes this view-box.
 */
xrx.viewbox.ViewboxZoom.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
