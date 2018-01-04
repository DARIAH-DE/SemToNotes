/**
 * @fileoverview A class implementing geometry related
 * functions for a drawing view-box.
 */

goog.provide('xrx.viewbox.ViewboxGeometry');



goog.require('goog.array');
goog.require('goog.object');
goog.require('xrx.geometry.Box');
goog.require('xrx.geometry.Point');
goog.require('xrx.EventTarget');



/**
 * A class implementing geometry related functions for a drawing view-box.
 * @constructor
 * @private
 */
xrx.viewbox.ViewboxGeometry = function() {

  goog.base(this);

  this.box_ = new Array(4);
  
  this.xy_ = new Array(2);
  
  this.wh_ = new Array(2);
};
goog.inherits(xrx.viewbox.ViewboxGeometry, xrx.EventTarget);



/**
 * Returns the width of this view-box, optionally the transformed
 * width (respecting the current scale) and / or the visible width
 * (respecting the current rotation).
 * @param {boolean} opt_transformed Whether to return the transformed
 *   width respecting the current scale.
 * @param {boolean} opt_visible Whether to return the visible width
 *   respecting the current rotation.
 * @return {number} The width.
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getWidth = function(opt_transformed,
    opt_visible) {
  if (opt_visible === true && this.isHorizontal()) {
    return this.getHeight(opt_transformed);
  } else {
    var image = this.getDrawing().getLayerBackground().getImage();
    var width = image.getImage() ? image.getWidth() : this.drawing_.getWidth();
    return !opt_transformed ? width : width * this.ctm_.getScale();
  }
};



/**
 * Returns the height of this view-box, optionally the transformed
 * height (respecting the current scale) and / or the visible height
 * (respecting the current rotation).
 * @param {boolean} opt_transformed Whether to return the transformed
 *   height respecting the current scale.
 * @param {boolean} opt_visible Whether to return the visible height
 *   respecting the current rotation.
 * @return {number} The height.
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getHeight = function(opt_transformed, opt_visible) {
  if (opt_visible === true && this.isHorizontal()) {
    return this.getWidth(opt_transformed);
  } else {
    var image = this.getDrawing().getLayerBackground().getImage();
    var height = image.getImage() ? image.getHeight() : this.drawing_.getHeight();
    return !opt_transformed ? height : height * this.ctm_.getScale();
  }
};



/**
 * Returns the bounding-box for this view-box, respecting transformation.
 * @return {goog.math.Box} The bounding box, coordinates are the visibles
 * and are transformed.
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getBox = function() {
  var rotation = this.getRotation();
  var width = this.getWidth(false, false);
  var height = this.getHeight(false, false);
  this.ctm_.transform([0, 0], 0, this.xy_, 0, 1);
  this.ctm_.transform([width, height], 0, this.wh_, 0, 1);
  if (rotation === 0) {
    this.box_[0] = this.xy_[1];
    this.box_[1] = this.wh_[0];
    this.box_[2] = this.wh_[1];
    this.box_[3] = this.xy_[0];
  } else if (rotation === 90) {
    this.box_[0] = this.xy_[1];
    this.box_[1] = this.xy_[0];
    this.box_[2] = this.wh_[1];
    this.box_[3] = this.wh_[0];
  } else if (rotation === 180) {
    this.box_[0] = this.wh_[1];
    this.box_[1] = this.xy_[0];
    this.box_[2] = this.xy_[1];
    this.box_[3] = this.wh_[0];
  } else {
    this.box_[0] = this.wh_[1];
    this.box_[1] = this.wh_[0];
    this.box_[2] = this.xy_[1];
    this.box_[3] = this.xy_[0];
  }
  return this.box_;
};



/**
 * Whether a point is contained in this view-box.
 * @param {Array<number>} point The native point, without translation.
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.containsPoint = function(point) {
  var box = this.getBox();
  return xrx.geometry.Box.containsPoint(box, point);
};



/**
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getCenterPoint_ = function(opt_transformed) {
  var natural = [this.getWidth() / 2, this.getHeight() / 2];
  var transformed;
  if (opt_transformed !== true) {
    return natural;
  } else {
    transformed = new Array(2);
    this.ctm_.transform(natural, 0, transformed, 0, 1);
    return transformed;
  }
};



/**
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getVisibleOrientation_ = function(orientation) {
  var orientations = ['NW', 'SW', 'SE', 'NE'];
  var index = goog.array.indexOf(orientations, orientation);
  var rotations = this.getRotation() / 90;
  return orientations[(index + rotations) % 4];
};



/**
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.FixPoints_ = {
  'C': [0, 0],
  'NE': [0, 0], 
  'SE': [0, 0],
  'SW': [0, 0],
  'NW': [0, 0]
};



/**
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getFixPoints_ = function() {
  var width = this.getWidth();
  var height = this.getHeight();
  this.FixPoints_.C = [width / 2, height / 2];
  this.FixPoints_.NE = [width, 0];
  this.FixPoints_.SE = [width, height];
  this.FixPoints_.SW = [0, height];
  this.FixPoints_.NW = [0, 0];
  return this.FixPoints_;
};



/**
 * @private
 */
xrx.viewbox.ViewboxGeometry.prototype.getFixPoint_ = function(orientation,
    opt_transformed, opt_visible) {
  var fixPoints = this.getFixPoints_();
  var fixPoint = !opt_visible ? fixPoints[orientation] :
      fixPoints[this.getVisibleOrientation_(orientation)];
  if (opt_transformed === true) {
    var point = new Array(2);
    this.ctm_.transform(fixPoint, 0, point, 0, 1);
    return point;
  }
  return fixPoint;
};



/**
 * Disposes this view-box.++
 */
xrx.viewbox.ViewboxGeometry.prototype.disposeInternal = function() {
  this.box_ = null;
  goog.base(this, 'disposeInternal');
};
