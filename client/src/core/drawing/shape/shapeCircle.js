/**
 * @fileoverview A class representing an engine-independent
 * hoverable, selectable, modifiable and creatable circle shape.
 */

goog.provide('xrx.shape.Circle');
goog.provide('xrx.shape.CircleCreatable');
goog.provide('xrx.shape.CircleHoverable');
goog.provide('xrx.shape.CircleModifiable');
goog.provide('xrx.shape.CircleSelectable');



goog.require('xrx.geometry.Circle');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Geometry');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.Selectable');



/**
 * A class representing an engine-independent hoverable, selectable,
 * modifiable and creatable circle shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends {xrx.shape.Style}
 */
xrx.shape.Circle = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Circle());

  /**
   * The engine element.
   * @type {(xrx.canvas.Circle|xrx.svg.Circle|xrx.vml.Circle)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createCircle();
};
goog.inherits(xrx.shape.Circle, xrx.shape.Geometry);



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
 * @return {Array<Array<number>>} The coordinates.
 * @private
 */
xrx.shape.Circle.prototype.getCoords = function() {
  return [this.getCenter()];
};



/**
 * Sets the coordinates of this circle. We assume the center point.
 * @param {Array<Array<number>>} coords The coordinate.
 * @private
 */
xrx.shape.Circle.prototype.setCoords = function(coords) {
  this.setCenter(coords[0][0], coords[0][1]);
};



/**
 * Sets the x coordinate of this circle. We assume the center point.
 * @param {number} coords The x coordinate.
 * @private
 */
xrx.shape.Circle.prototype.setCoordX = function(x) {
  this.geometry_.cx = x;
};



/**
 * Sets the y coordinate of this circle. We assume the center point.
 * @param {number} coords The y coordinate.
 * @private
 */
xrx.shape.Circle.prototype.setCoordY = function(y) {
  this.geometry_.cy = y;
};



/**
 * Draws this circle shape.
 * @private
 */
xrx.shape.Circle.prototype.draw = function() {
  this.startDrawing_();
  var center = this.getCenter();
  this.engineElement_.draw(center[0], center[1], this.getRadius(),
      this.getRenderingFillColor(), this.getRenderingFillOpacity(),
      this.getRenderingStrokeColor(), this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



/**
 * Returns a helper shape that makes this shape hoverable.
 * @return {xrx.shape.CircleHoverable} The hoverable circle shape.
 */
xrx.shape.Circle.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = new xrx.shape.CircleHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape selectable.
 * @return {xrx.shape.CircleSelectable} The selectable circle shape.
 */
xrx.shape.Circle.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = new xrx.shape.CircleSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape modifiable.
 * @return {xrx.shape.CircleModifiable} The modifiable circle shape.
 */
xrx.shape.Circle.prototype.getModifiable = function() {
  if (!this.modifiable_) this.modifiable_ = new xrx.shape.CircleModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape creatable.
 * @return {xrx.shape.CircleCreatable} The creatable circle shape.
 */
xrx.shape.Circle.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = new xrx.shape.CircleCreatable(this);
  return this.creatable_;
};



/**
 * Disposes this circle shape.
 */
xrx.shape.Circle.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a hoverable circle shape.
 * @param {xrx.shape.Circle} circle The parent circle shape.
 * @constructor
 * @private
 */
xrx.shape.CircleHoverable = function(circle) {

  goog.base(this, circle);
};
goog.inherits(xrx.shape.CircleHoverable, xrx.shape.Hoverable);



/**
 * Disposes this hoverable circle shape.
 */
xrx.shape.CircleHoverable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};




/**
 * A class representing a selectable circle shape.
 * @param {xrx.shape.Circle} circle The circle to be selected.
 * @constructor
 * @private
 */
xrx.shape.CircleSelectable = function(circle) {

  goog.base(this, circle);
};
goog.inherits(xrx.shape.CircleSelectable, xrx.shape.Selectable);



/**
 * Disposes this selectable circle shape.
 * @private
 */
xrx.shape.CircleSelectable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a modifiable circle shape.
 * @param {xrx.shape.Circle} circle The circle to be modified.
 * @constructor
 * @private
 */
xrx.shape.CircleModifiable = function(circle) {

  goog.base(this, circle);

  this.init_();
};
goog.inherits(xrx.shape.CircleModifiable, xrx.shape.Modifiable);



/**
 * @private
 */
xrx.shape.CircleModifiable.prototype.setCoords = function(coords) {
  this.shape_.setCoords(coords);
  this.dragger_[0].setCoordX(coords[0][0] + this.shape_.getRadius());
  this.dragger_[0].setCoordY(coords[0][1]);
};



/**
 * @private
 */
xrx.shape.CircleModifiable.prototype.setCoordAt = function(pos, coord) {
  this.shape_.setRadius(Math.abs(coord[0] - this.shape_.getCenter()[0]));
  this.dragger_[0].setCoordX(coord[0]);
};



/**
 * @private
 */
xrx.shape.CircleModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  coords[0][0] += distX;
  coords[0][1] += distY;
  this.setCoords(coords);
};



/**
 * @private
 */
xrx.shape.CircleModifiable.prototype.init_ = function() {
  var center = this.shape_.getCenter();
  var radius = this.shape_.getRadius();
  var dragger = new xrx.shape.Dragger(this, 0);
  dragger.setCoords([[center[0] + radius, center[1]]]);
  this.setDragger([dragger]);
};



/**
 * Disposes this modifiable circle shape.
 * @private
 */
xrx.shape.CircleModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a creatable circle shape.
 * @param {xrx.shape.Circle} circle The target circle to be created.
 * @constructor
 * @private
 */
xrx.shape.CircleCreatable = function(circle) {

  goog.base(this, circle, new xrx.shape.Circle(circle.getDrawing()));

  /**
   * Center point helper.
   * @type {Array<number>}
   */
  this.point_ = new Array(2);
};
goog.inherits(xrx.shape.CircleCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the circle currently created.
 * @return Array<number> The coordinates.
 * @private
 */
xrx.shape.CircleCreatable.prototype.getCoords = function() {
  return this.preview_.getCoords();
};



/**
 * Handles down gestures.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {xrx.drawing.Cursor} cursor The drawing cursor.
 * @private
 */
xrx.shape.CircleCreatable.prototype.handleDown = function(e, cursor) {
  var point = cursor.getPointTransformed();
  this.point_[0] = point[0];
  this.point_[1] = point[1];
  this.preview_.setCenter(point[0], point[1]);
  this.preview_.setRadius(0);
  this.target_.getDrawing().handleShapeCreate([this.preview_]);
};



/**
 * Handles <em>move</em> gestures.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {xrx.drawing.Cursor} cursor The drawing cursor.
 * @private
 */
xrx.shape.CircleCreatable.prototype.handleMove = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var distX = point[0] - this.point_[0];
  var distY = point[1] - this.point_[1];
  this.preview_.setCenter(point[0] - distX / 2, point[1] - distY / 2);
  this.preview_.setRadius(Math.sqrt(distX * distX + distY * distY) / 2);
};



/**
 * Handles <em>up</em> gestures.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {xrx.drawing.Cursor} cursor The drawing cursor.
 * @private
 */
xrx.shape.CircleCreatable.prototype.handleUp = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var circle = new xrx.shape.Circle(this.target_.getDrawing());
  var center = this.preview_.getCenter();
  circle.setStyle(this.target_);
  circle.setCenter(center[0], center[1]);
  circle.setRadius(this.preview_.getRadius());
  this.target_.getDrawing().handleShapeCreated(circle);
};


/**
 * Disposes this creatable circle shape.
 * @private
 */
xrx.shape.CircleCreatable.prototype.disposeInternal = function() {
  this.point_ = null;
  goog.base(this, 'disposeInternal');
};
