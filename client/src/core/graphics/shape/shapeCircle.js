/**
 * @fileoverview A class representing an engine-independent
 * circle graphic.
 */

goog.provide('xrx.shape.Circle');
goog.provide('xrx.shape.CircleModifiable');
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
 * Sets the x coordinate of this circle. We assume the center point.
 * @param {number} coords The x coordinate.
 */
xrx.shape.Circle.prototype.setCoordX = function(x) {
  this.geometry_.cx = x;
};



/**
 * Sets the y coordinate of this circle. We assume the center point.
 * @param {number} coords The y coordinate.
 */
xrx.shape.Circle.prototype.setCoordY = function(y) {
  this.geometry_.cy = y;
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
 * @return {xrx.shape.CircleModifiable} The modifiable circle shape.
 */
xrx.shape.Circle.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = xrx.shape.CircleModifiable.create(this);
  return this.modifiable_;
};



/**
 * Returns a creatable circle shape. Create it lazily if not existent.
 * @return {xrx.shape.CircleCreatable} The creatable circle shape.
 */
xrx.shape.Circle.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = xrx.shape.CircleCreate.create(this);
  return this.creatable_;
};



/**
 * @constructor
 */
xrx.shape.CircleModifiable = function(circle, dragger) {

  goog.base(this, circle, dragger);
};
goog.inherits(xrx.shape.CircleModifiable, xrx.shape.Modifiable);



xrx.shape.CircleModifiable.prototype.setCoords = function(coords) {
  this.shape_.setCoords(coords);
  this.dragger_[0].setCoordX(coords[0][0] + this.shape_.getRadius());
  this.dragger_[0].setCoordY(coords[0][1]);
};



xrx.shape.CircleModifiable.prototype.setCoordAt = function(pos, coord) {
  this.shape_.setRadius(Math.abs(coord[0] - this.shape_.getCenter()[0]));
  this.dragger_[0].setCoordX(coord[0]);
};



xrx.shape.CircleModifiable.create = function(circle) {
  var center = circle.getCenter();
  var radius = circle.getRadius();
  var dragger = xrx.shape.VertexDragger.create(circle.getCanvas());
  dragger.setCoords([[center[0] + radius, center[1]]]);
  dragger.setPosition(0);
  return new xrx.shape.CircleModifiable(circle, [dragger]);
};
