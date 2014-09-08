***REMOVED***
***REMOVED*** @fileoverview
***REMOVED***

goog.provide('xrx.vml.Circle');



goog.require('xrx.graphic.Circle');
goog.require('xrx.vml');
goog.require('xrx.vml.Element');
goog.require('xrx.vml.Stylable');



***REMOVED***
***REMOVED***
***REMOVED***
xrx.vml.Circle = function(raphael) {

  goog.base(this, raphael);

  this.graphic_ = new xrx.graphic.Circle();
***REMOVED***
goog.inherits(xrx.vml.Circle, xrx.vml.Stylable);



xrx.vml.Circle.prototype.getCenter = function() {
  return [this.graphic_.cx, this.graphic_.cy];
***REMOVED***



xrx.vml.Circle.prototype.setCenter = function(cx, cy) {
  this.graphic_.cx = cx;
  this.graphic_.cy = cy;
  this.raphael_.attr({'cx': cx, 'cy': cy});
***REMOVED***



xrx.vml.Circle.prototype.getRadius = function() {
  return this.graphic_.r;
***REMOVED***



xrx.vml.Circle.prototype.setRadius = function(r) {
  this.graphic_.r = r;
  this.raphael_.attr({'r': r});
***REMOVED***



xrx.vml.Circle.prototype.draw = function() {
  this.raphael_.show();
***REMOVED***



xrx.vml.Circle.create = function(canvas) {
  var raphael = canvas.getRaphael().circle(0, 0, 0);
  raphael.hide();
  return new xrx.vml.Circle(raphael);
***REMOVED***
