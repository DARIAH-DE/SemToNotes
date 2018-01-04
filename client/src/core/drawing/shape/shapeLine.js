/**
 * @fileoverview A class representing an engine-independent
 * hoverable, selectable, modifiable and creatable line shape.
 */

goog.provide('xrx.shape.Line');
goog.provide('xrx.shape.LineCreatable');
goog.provide('xrx.shape.LineHoverable');
goog.provide('xrx.shape.LineModifiable');
goog.provide('xrx.shape.LineSelectable');



goog.require('xrx.geometry.Line');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Geometry');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.Selectable');



/**
 * Classes representing an engine-independent line shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @extends {xrx.shape.Style}
 * @constructor
 */
xrx.shape.Line = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Line());

  /**
   * The engine element.
   * @type {(xrx.canvas.Line|xrx.svg.Line|xrx.vml.Line)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createLine();
};
goog.inherits(xrx.shape.Line, xrx.shape.Geometry);



/**
 * Returns the x coordinate of the line's start point.
 * @return {number} The x coordinate of the line's start point.
 */
xrx.shape.Line.prototype.getX1 = function() {
  return this.geometry_.x1;
};



/**
 * Sets the x coordinate of the line's start point.
 * @param {number} x1 The x coordinate.
 */
xrx.shape.Line.prototype.setX1 = function(x1) {
  this.geometry_.x1 = x1;
};



/**
 * Returns the y coordinate of the line's start point.
 * @return {number} The y coordinate of the line's start point.
 */
xrx.shape.Line.prototype.getY1 = function() {
  return this.geometry_.y1;
};



/**
 * Sets the y coordinate of the line's start point.
 * @param {number} y1 The y coordinate.
 */
xrx.shape.Line.prototype.setY1 = function(y1) {
  this.geometry_.y1 = y1;
};



/**
 * Returns the x coordinate of the line's end point.
 * @return {number} The x coordinate of the line's end point.
 */
xrx.shape.Line.prototype.getX2 = function() {
  return this.geometry_.x2;
};



/**
 * Sets the x coordinate of the line's end point.
 * @param {number} x2 The x coordinate.
 */
xrx.shape.Line.prototype.setX2 = function(x2) {
  this.geometry_.x2 = x2;
};



/**
 * Returns the x coordinate of the line's end point.
 * @return {number} The x coordinate of the line's end point.
 */
xrx.shape.Line.prototype.getY2 = function() {
  return this.geometry_.y2;
};



/**
 * Sets the y coordinate of the line's end point.
 * @param {number} y2 The y coordinate.
 */
xrx.shape.Line.prototype.setY2 = function(y2) {
  this.geometry_.y2 = y2;
};



/**
 * Returns the coordinates of this line.
 * @return {Array<Array<Number>>} The coordinates.
 */
xrx.shape.Line.prototype.getCoords = function() {
  return [[this.geometry_.x1, this.geometry_.y1], [this.geometry_.x2,
      this.geometry_.y2]];
};



/**
 * Sets the coordinates of this line.
 * @param {Array<Array<Number>>} coords The coordinates.
 */
xrx.shape.Line.prototype.setCoords = function(coords) {
  this.geometry_.x1 = coords[0][0];
  this.geometry_.y1 = coords[0][1];
  this.geometry_.x2 = coords[1][0];
  this.geometry_.y2 = coords[1][1];
};



/**
 * Draws this line shape.
 * @private
 */
xrx.shape.Line.prototype.draw = function() {
  this.startDrawing_();
  this.engineElement_.draw(this.geometry_.x1, this.geometry_.y1, this.geometry_.x2,
      this.geometry_.y2, this.getRenderingStrokeColor(), this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



/**
 * Returns a helper shape that makes this shape hoverable.
 * @return {xrx.shape.LineHoverable} The hoverable line shape.
 */
xrx.shape.Line.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = new xrx.shape.LineHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape selectable.
 * @return {xrx.shape.LineSelectable} The selectable line shape.
 */
xrx.shape.Line.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = new xrx.shape.LineSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape modifiable.
 * @return {xrx.shape.LineModifiable} The modifiable line shape.
 */
xrx.shape.Line.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = new xrx.shape.LineModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape creatable.
 * @return {xrx.shape.LineCreatable} The creatable line shape.
 */
xrx.shape.Line.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = new xrx.shape.LineCreatable(this);
  return this.creatable_;
};



/**
 * Disposes this line shape.
 */
xrx.shape.Line.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a hoverable line shape.
 * @param {xrx.shape.Line} line The parent line shape.
 * @constructor
 * @private
 */
xrx.shape.LineHoverable = function(line) {

  goog.base(this, line);
};
goog.inherits(xrx.shape.LineHoverable, xrx.shape.Hoverable);



/**
 * Disposes this hoverable line shape.
 */
xrx.shape.LineHoverable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a selectable line shape.
 * @param {xrx.shape.Line} line The parent line shape.
 * @constructor
 * @private
 */
xrx.shape.LineSelectable = function(line) {

  goog.base(this, line);
};
goog.inherits(xrx.shape.LineSelectable, xrx.shape.Selectable);



/**
 * Disposes this selectable line shape.
 */
xrx.shape.LineSelectable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a modifiable line shape.
 * @param {xrx.shape.Line} line The parent line shape.
 * @constructor
 * @private
 */
xrx.shape.LineModifiable = function(line, dragger) {

  goog.base(this, line, dragger);

  this.init_();
};
goog.inherits(xrx.shape.LineModifiable, xrx.shape.Modifiable);



/**
 * Disposes this modifiable line shape.
 */
xrx.shape.LineModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * @private
 */
xrx.shape.LineModifiable.prototype.setCoords = function(coords) {
  this.shape_.setCoords(coords);
  this.dragger_[0].setCoordX(coords[0][0]);
  this.dragger_[0].setCoordY(coords[0][1]);
  this.dragger_[1].setCoordX(coords[1][0]);
  this.dragger_[1].setCoordY(coords[1][1]);
};



/**
 * @private
 */
xrx.shape.LineModifiable.prototype.setCoordAt = function(pos, coord) {
  if (pos === 0) {
    this.dragger_[0].setCoordX(coord[0]);
    this.dragger_[0].setCoordY(coord[1]);
    this.shape_.setX1(coord[0]);
    this.shape_.setY1(coord[1]);
  } else {
    this.dragger_[1].setCoordX(coord[0]);
    this.dragger_[1].setCoordY(coord[1]);
    this.shape_.setX2(coord[0]);
    this.shape_.setY2(coord[1]);
  }
};



/**
 * @private
 */
xrx.shape.LineModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  coords[0][0] += distX;
  coords[0][1] += distY;
  coords[1][0] += distX;
  coords[1][1] += distY;
  this.setCoords(coords);
};



/**
 * @private
 */
xrx.shape.LineModifiable.prototype.init_ = function() {
  var dragger1 = new xrx.shape.Dragger(this, 0);
  dragger1.setCoords([[this.shape_.getX1(), this.shape_.getY1()]]);
  var dragger2 = new xrx.shape.Dragger(this, 1);
  dragger2.setCoords([[this.shape_.getX2(), this.shape_.getY2()]]);
  this.setDragger([dragger1, dragger2]);
};



/**
 * Disposes this modifiable line shape.
 */
xrx.shape.LineModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a creatable line shape.
 * @param {xrx.shape.Line} line The parent line shape.
 * @constructor
 * @private
 */
xrx.shape.LineCreatable = function(line) {

  goog.base(this, line, new xrx.shape.Line(line.getDrawing()));
};
goog.inherits(xrx.shape.LineCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the line currently created.
 * @return Array<number> The coordinates.
 */
xrx.shape.LineCreatable.prototype.getCoords = function() {
  return this.helper_.getCoords();
};



/**
 * Handles down events for a creatable line shape.
 * @param {goog.events.BrowserEvent} e The browser event.
 */
xrx.shape.LineCreatable.prototype.handleDown = function(e, cursor) {
  var point = cursor.getPointTransformed();
  this.preview_.setX1(point[0]);
  this.preview_.setY1(point[1]);
  this.preview_.setX2(point[0]);
  this.preview_.setY2(point[1]);
  this.target_.getDrawing().handleShapeCreate([this.preview_]);
};



/**
 * @private
 */
xrx.shape.LineCreatable.prototype.handleMove = function(e, cursor) {
  var point = cursor.getPointTransformed();
  this.preview_.setX2(point[0]);
  this.preview_.setY2(point[1]);
};



/**
 * @private
 */
xrx.shape.LineCreatable.prototype.handleUp = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var line = new xrx.shape.Line(this.target_.getDrawing());
  line.setStyle(this.target_);
  line.setX1(this.preview_.getX1());
  line.setY1(this.preview_.getY1());
  line.setX2(point[0]);
  line.setY2(point[1]);
  this.target_.getDrawing().handleShapeCreated(line);
};



/**
 * Disposes this creatable line shape.
 */
xrx.shape.LineCreatable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
