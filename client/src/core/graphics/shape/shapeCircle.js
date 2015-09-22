/**
 * @fileoverview A class representing an engine-independent
 * circle graphic.
 */

goog.provide('xrx.shape.Circle');
goog.provide('xrx.shape.CircleModify');
goog.provide('xrx.shape.CircleCreate');



goog.require('goog.array');
goog.require('xrx.geometry.Circle');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.Stylable');



/**
 * A class representing an engine-independent circle graphic.
 * @param {xrx.shape.Canvas} canvas The parent canvas object.
 * @constructor
 */
xrx.shape.Circle = function(canvas) {

  goog.base(this, canvas,
      canvas.getEngine().createCircle(canvas.getEngineElement()),
      new xrx.geometry.Circle());
};
goog.inherits(xrx.shape.Circle, xrx.shape.Stylable);



/**
 * Returns the center point of this circle.
 * @return {Array<number>}
 */
xrx.shape.Circle.prototype.getCenter = function() {
  return [this.geometry_.cx, this.geometry_.cy];
};



/**
 * Returns the coordinates of this circle. We assume the center point.
 * @return {Array<Array<<number>>}
 */
xrx.shape.Circle.prototype.getCoords = function() {
  return [this.getCenter()];
};



/**
 * Sets the coordinates of this circle. We assume the center point.
 * @param {Array<Array<<number>>} coords The coordinate.
 */
xrx.shape.Circle.prototype.setCoords = function(coords) {
  this.setCenter(coords[0][0], coords[0][1]);
};



/**
 * Sets the center point of this circle.
 * @param {number} cx The X coordinate of the center point.
 * @param {number} cy The Y coordinate of the center point.
 */
xrx.shape.Circle.prototype.setCenter = function(cx, cy) {
  this.geometry_.cx = cx;
  this.geometry_.cy = cy;
};



/**
 * Returns the radius of this circle.
 * @return {number} The radius.
 */
xrx.shape.Circle.prototype.getRadius = function() {
  return this.geometry_.r;
};



/**
 * Sets the radius of this circle.
 * @param {number} r The radius.
 */
xrx.shape.Circle.prototype.setRadius = function(r) {
  this.geometry_.r = r;
};



/**
 * Draws this circle.
 */
xrx.shape.Circle.prototype.draw = function() {
  this.startDrawing_();
  var center = this.getCenter();
  this.engineElement_.draw(center[0], center[1], this.getRadius(),
      this.getFillColor(), this.getFillOpacity(), this.getStrokeColor(),
      this.getStrokeWidth());
  this.finishDrawing_();
};



/**
 * Creates a new circle.
 * @param {xrx.shape.Canvas} The parent canvas object.
 */
xrx.shape.Circle.create = function(canvas) {
  return new xrx.shape.Circle(canvas);
};



/**
 * Returns a modifiable circle shape. Create it lazily if not existent.
 * @param {xrx.drawing.Drawing} drawing The parent drawing object.
 * @return {xrx.shape.CircleModify} The modifiable circle shape.
 */
xrx.shape.Circle.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = xrx.shape.CircleModify.create(this);
  return this.modifiable_;
};



/**
 * Returns a creatable circle shape. Create it lazily if not existent.
 * @return {xrx.shape.CircleCreate} The creatable circle shape.
 */
xrx.shape.Circle.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = xrx.shape.CircleCreate.create(this);
  return this.creatable_;
};



/**
 * @constructor
 */
xrx.shape.CircleModify = function(circle, helper) {

  goog.base(this, circle, helper);
};
goog.inherits(xrx.shape.CircleModify, xrx.shape.Modifiable);



xrx.shape.CircleModify.prototype.setCoords = function(coords) {
  var helperCoords;
  this.shape_.setCoords(coords);
  helperCoords = this.shape_.getCoordsCopy();
  helperCoords[0][0] += this.shape_.getRadius();
  this.helper_[0].setCoords(helperCoords);
};



xrx.shape.CircleModify.prototype.setCoordAt = function(pos, coords) {
  var helperCoords = this.helper_[0].getCoordsCopy();
  helperCoords[0][0] = coords[0];
  this.helper_[0].setCoords(helperCoords);
  this.shape_.setRadius(Math.abs(coords[0] - this.shape_.getCenter()[0]));
};



xrx.shape.CircleModify.create = function(circle) {
  var center = circle.getCenter();
  var radius = circle.getRadius();
  var dragger = xrx.shape.VertexDragger.create(circle.getCanvas());
  dragger.setCoords([[center[0] + radius, center[1]]]);
  dragger.setPosition(0);
  return new xrx.shape.CircleModify(circle, [dragger]);
};
