/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.geometry.Line');



goog.require('xrx.geometry');
goog.require('xrx.geometry.Geometry');



/**
 * @constructor
 * @private
 */
xrx.geometry.Line = function() {

  goog.base(this);

  this.x1 = 0;

  this.y1 = 0;

  this.x2 = 0;

  this.y2 = 0;

  this.arr_ = [[this.x1, this.y1], [this.x2, this.y2]];
};
goog.inherits(xrx.geometry.Line, xrx.geometry.Geometry);



xrx.geometry.Line.containsPoint = function(line, point) {
  var xMin;
  var xMax;
  var yMin;
  var yMax;
  var x1 = line[0][0];
  var y1 = line[0][1];
  var x2 = line[1][0];
  var y2 = line[1][1];
  var tolerance = 7;
  if (x1 < x2) {
    xMin = x1;
    xMax = x2;
  } else {
    xMin = x2;
    xMax = x1;
  }
  if (y1 < y2) {
    yMin = y1;
    yMax = y2;
  } else {
    yMin = y2;
    yMax = y1;
  }
  if (point[0] < xMin - tolerance || point[0] > xMax + tolerance ||
      point[1] < yMin - tolerance || point[1] > yMax + tolerance) {
    return false;
  } else if (Math.abs(x1 - x2) < tolerance) { // vertical line
    return (Math.abs(point[0] - x1) < tolerance);
  } else if (Math.abs(y1 - y2) < tolerance) { // horizontal line
    return (Math.abs(point[1] - y1) < tolerance);
  } else {
    var m = (y2 - y1) / (x2 - x1);
    var b = y1 - m * x1;
    return (Math.abs(point[1] - (m * point[0] + b)) < tolerance);
  }
};



xrx.geometry.Line.prototype.containsPoint = function(point) {
  this.arr_[0][0] = this.x1;
  this.arr_[0][1] = this.y1;
  this.arr_[1][0] = this.x2;
  this.arr_[1][1] = this.y2;
  return xrx.geometry.Line.containsPoint(this.arr_, point);
};



xrx.geometry.Line.prototype.disposeInternal = function() {
  this.arr_ = null;
  goog.base(this, 'disposeInternal');
};
