/**
 * @fileoverview A class implementing a rotation model for
 * a drawing view-box.
 */

goog.provide('xrx.viewbox.ViewboxRotate');



goog.require('goog.object');
goog.require('xrx.drawing.Orientation');
goog.require('xrx.viewbox.ViewboxGeometry');



/**
 * A class implementing the rotation model for a drawing view-box.
 * @constructor
 * @extends {xrx.viewbox.ViewboxGeometry}
 * @private
 */
xrx.viewbox.ViewboxRotate = function() {

  goog.base(this);
};
goog.inherits(xrx.viewbox.ViewboxRotate, xrx.viewbox.ViewboxGeometry);



/**
 * Returns the current rotation in degrees.
 * @return {number} The current rotation in degrees.
 */
xrx.viewbox.ViewboxRotate.prototype.getRotation = function() {
  return this.ctm_.getRotation();
};



/**
 * Checks whether the rotation value is valid.
 * @param {number} rotation The rotation in degrees.
 * @return {boolean} Whether the rotation is valid.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.isValidRotation = function(rotation) {
  var abs = Math.abs(rotation);
  return abs === 0 || abs === 90 || abs === 180 || abs === 270;
};



/**
 * Whether the view-box currently is in vertical orientation.
 * @return {boolean} Whether the view-box is oriented vertically.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.isVertical = function() {
  var rotation = this.ctm_.getRotation();
  return rotation === 0 || rotation === 180;
};



/**
 * Whether the view-box currently is in horizontal orientation.
 * @return {boolean} Whether the view-box is oriented horizontally.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.isHorizontal = function() {
  var rotation = this.ctm_.getRotation();
  return rotation === 90 || rotation === 270;
};



/**
 * Utility enumeration for view-box orientations.
 * @enum {number}
 * @private
 */
xrx.viewbox.ViewboxRotate.Direction_ = {
  '0':    0,
  '90':   1,
  '180':  2,
  '270':  3
};



/**
 * Returns a positional utility number representing the current orientation
 * of the view-box.
 * @return {number} The orientation.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.direction_ = function() {
  var rotation = this.ctm_.getRotation();
  return xrx.viewbox.ViewboxRotate.Direction_[parseInt(rotation)];
};



/**
 * Rotates the view-box by an angle, respecting a fix-point or an orientation.
 * @param {?number} angle The angle of rotation in degrees, e.g. 90 or 180.
 * @param {?(Array<number>|string)} opt_fixPoint A fix-point or an orientation.
 *   Defaults to the center of the view-box.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.rotateBy = function(angle, opt_fixPoint) {
  if (opt_fixPoint === undefined) {
    this.rotateBy_(angle, undefined, undefined);
  } else if (this.isFixPoint_(opt_fixPoint)) {
    this.rotateBy_(angle, undefined, opt_fixPoint);
  } else if (this.isOrientation_(opt_fixPoint)) {
    this.rotateBy_(angle, opt_fixPoint, undefined);
  } else {
    throw Error('Invalid fix-point. Array[2] or xrx.drawing.Orientation.* expected.');
  }
  this.drawing_.draw();
};



/**
 * Rotates the view-box by 90° in left direction, optionally respecting
 * a fix-point or an orientation.
 * @param {?(Array<number>|string)} opt_fixPoint The fix-point.
 */
xrx.viewbox.ViewboxRotate.prototype.rotateLeft = function(opt_fixPoint) {
  this.rotateBy(-90, opt_fixPoint);
};



/**
 * Rotates the view-box by 90° in right direction, optionally respecting
 * a fix-point or an orientation.
 * @param {?(Array<number>|string)} opt_fixPoint The fix-point.
 */
xrx.viewbox.ViewboxRotate.prototype.rotateRight = function(opt_fixPoint) {
  this.rotateBy(90, opt_fixPoint);
};



/**
 * Whether the fix-point is a point, that is an Array of length 2.
 * @param {?} fixPoint The fix-point.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.isFixPoint_ = function(fixPoint) {
  return (fixPoint instanceof Array && fixPoint.length === 2);
};



/**
 * Whether the fix-point is an orientation, that is one of
 * xrx.drawing.Orientation.*.
 * @param {?} fixPoint The fix-point.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.isOrientation_ = function(fixPoint) {
  return (typeof fixPoint === 'string' && goog.object.containsValue(
      xrx.drawing.Orientation, fixPoint));
};



/**
 * Rotates the view-box by an angle, respecting a fix-point or an
 * orientation.
 * @param {?number} angle The angle of rotation in degrees, e.g. 90 or 180.
 * @param {?string} opt_orientation An orientation, defaults to
 *   xrx.drawing.Orientation.C.
 * @param {?Array<number>} opt_fixPoint A fix-point, defaults to the center
 *   of the view-box.
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.rotateBy_ = function(angle, opt_orientation,
      opt_fixPoint) {
  if (angle === 0) return;
  if (!this.isValidRotation(angle))
      throw Error('Invalid rotation. 0, 90, 180 or 270 expected.');

  var fixPoint;
  var reverse = angle > 0 ? false : true;

  if (opt_orientation !== undefined)
      fixPoint = this.getPivotPoint_(opt_orientation, reverse, true);
  if (opt_fixPoint !== undefined) {
    if (this.containsPoint(opt_fixPoint)) {
      fixPoint = this.ctm_.transformPoint(opt_fixPoint);
    } else {
      fixPoint = this.getPivotPoint_(xrx.drawing.Orientation.C, reverse, true);
    }
  }
  if (fixPoint === undefined)
      fixPoint = this.getPivotPoint_(xrx.drawing.Orientation.C, reverse, true);
  
  this.ctm_.rotate(goog.math.toRadians(angle), fixPoint[0], fixPoint[1]);

  this.dispatchExternal(xrx.drawing.EventType.VIEWBOX_CHANGE, this.drawing_);
};



/**
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.getPivotPoint_ = function(orientation,
    reverse, opt_transformed) {
  var pivotPoints = this.getPivotPoints_(reverse);
  var point_ = {
    'C': function(pp, vb) {
      return vb.getCenterPoint_();
    },
    'NE': function(pp, vb, reverse) {
      var order = [0, 1, 2, 3];
      console.log(vb.direction_());
      return pp[order[vb.direction_()]];
    },
    'SE': function(pp, vb, reverse) {
      var order = [3, 0, 1, 2];
      return pp[order[vb.direction_()]];
    },
    'SW': function(pp, vb, reverse) {
      var order = [2, 3, 0, 1];
      return pp[order[vb.direction_()]];
    },
    'NW': function(pp, vb, reverse) {
      var order = [1, 2, 3, 0];
      return pp[order[vb.direction_()]];
    }
  };
  var point = point_[orientation](pivotPoints, this, reverse);
  if (opt_transformed === true) this.ctm_.transformPoint(point);
  return point;
};



/**
 * Returns the four pivot points of this view-box.
 * @param {boolean} reverse If we rotate in right or left direction.
 *   If reverse is true we assume left direction otherwise right direction.
 * @return {Array<number>}
 * @private
 */
xrx.viewbox.ViewboxRotate.prototype.getPivotPoints_ = function(reverse) {
  var width = this.getWidth();
  var height = this.getHeight();
  return !reverse ? [
    [width / 2, width / 2], // north
    [height / 2, height / 2], // east 
    [width / 2, width / 2 + height / 2], // south
    [-height / 2 + width, height / 2] // west
  ] : [
    [-height / 2 + width, height / 2], // west
    [width / 2, width / 2], // north
    [height / 2, height / 2], // east 
    [width / 2, width / 2 + height / 2] // south
  ];
};



/**
 * Disposes this view-box.
 */
xrx.viewbox.ViewboxRotate.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
