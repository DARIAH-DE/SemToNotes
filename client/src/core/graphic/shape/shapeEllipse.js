/**
 * @fileoverview A class representing an engine-independent
 * hoverable, selectable, modifiable and creatable ellipse shape.
 */

goog.provide('xrx.shape.Ellipse');
goog.provide('xrx.shape.EllipseCreatable');
goog.provide('xrx.shape.EllipseHoverable');
goog.provide('xrx.shape.EllipseModifiable');
goog.provide('xrx.shape.EllipseSelectable');



goog.require('xrx.geometry.Ellipse');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Geometry');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.Selectable');



/**
 * A class representing an engine-independent ellipse shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 */
xrx.shape.Ellipse = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Ellipse());

  this.engineElement_ = this.drawing_.getEngine().createEllipse();
};
goog.inherits(xrx.shape.Ellipse, xrx.shape.Geometry);



/**
 * Returns the center point of this ellipse.
 * @return {Array<number>}
 */
xrx.shape.Ellipse.prototype.getCenter = function() {
  return [this.geometry_.cx, this.geometry_.cy];
};



/**
 * Sets the center point of this ellipse.
 * @param {number} cx The X coordinate of the center point.
 * @param {number} cy The Y coordinate of the center point.
 */
xrx.shape.Ellipse.prototype.setCenter = function(cx, cy) {
  this.geometry_.cx = cx;
  this.geometry_.cy = cy;
};



/**
 * Returns the major-radius of this ellipse.
 * @return {number} The radius.
 */
xrx.shape.Ellipse.prototype.getRadiusX = function() {
  return this.geometry_.rx;
};



/**
 * Sets the major-radius of this ellipse.
 * @param {number} r The radius.
 */
xrx.shape.Ellipse.prototype.setRadiusX = function(rx) {
  this.geometry_.rx = rx;
};



/**
 * Returns the minor-radius of this ellipse.
 * @return {number} The radius.
 */
xrx.shape.Ellipse.prototype.getRadiusY = function() {
  return this.geometry_.ry;
};



/**
 * Sets the minor-radius of this ellipse.
 * @param {number} ry The radius.
 */
xrx.shape.Ellipse.prototype.setRadiusY = function(ry) {
  this.geometry_.ry = ry;
};



/**
 * Returns the coordinates of this ellipse. We assume the center point.
 * @return {Array<Array<<number>>} The coordinates.
 */
xrx.shape.Ellipse.prototype.getCoords = function() {
  return [this.getCenter()];
};



/**
 * Sets the coordinates of this ellipse. We assume the center point.
 * @param {Array<Array<<number>>} coords The coordinates.
 */
xrx.shape.Ellipse.prototype.setCoords = function(coords) {
  this.setCenter(coords[0][0], coords[0][1]);
};



/**
 * Draws this ellipse.
 */
xrx.shape.Ellipse.prototype.draw = function() {
  this.startDrawing_();
  var center = this.getCenter();
  this.engineElement_.draw(center[0], center[1], this.getRadiusX(),
      this.getRadiusY(), this.getFillColor(), this.getFillOpacity(),
      this.getStrokeColor(), this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



xrx.shape.Ellipse.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = xrx.shape.EllipseHoverable.create(this);
  return this.hoverable_;
};



xrx.shape.Ellipse.prototype.setHoverable = function(hoverable) {
  if (!hoverable instanceof xrx.shape.EllipseHoverable)
      throw Error('Instance of xrx.shape.EllipseHoverable expected.');
  this.hoverable_ = hoverable;
};



xrx.shape.Ellipse.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = xrx.shape.EllipseSelectable.create(this);
  return this.selectable_;
};



xrx.shape.Ellipse.prototype.setSelectable = function(selectable) {
  if (!selectable instanceof xrx.shape.EllipseSelectable)
      throw Error('Instance of xrx.shape.EllipseSelectable expected.');
  this.selectable_ = selectable;
};



/**
 * Returns a modifiable ellipse shape. Create it lazily if not existent.
 * @param {xrx.drawing.Drawing} drawing The parent drawing object.
 * @return {xrx.shape.EllipseModifiable} The modifiable ellipse shape.
 */
xrx.shape.Ellipse.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = xrx.shape.EllipseModifiable.create(this);
  return this.modifiable_;
};



xrx.shape.Ellipse.prototype.setModifiable = function(modifiable) {
  if (!modifiable instanceof xrx.shape.EllipseModifiable)
      throw Error('Instance of xrx.shape.EllipseModifiable expected.');
  this.modifiable_ = modifiable;
};



/**
 * Returns a creatable ellipse shape. Create it lazily if not existent.
 * @return {xrx.shape.EllipseCreatable} The creatable ellipse shape.
 */
xrx.shape.Ellipse.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = xrx.shape.EllipseCreatable.create(this);
  return this.creatable_;
};



xrx.shape.Ellipse.prototype.setCreatable = function(creatable) {
  if (!creatable instanceof xrx.shape.EllipseCreatable)
      throw Error('Instance of xrx.shape.EllipseCreatable expected.');
  this.creatable_ = creatable;
};



/**
 * @constructor
 */
xrx.shape.EllipseHoverable = function(ellipse) {

  goog.base(this, ellipse);
};
goog.inherits(xrx.shape.EllipseHoverable, xrx.shape.Hoverable);



xrx.shape.EllipseHoverable.create = function(ellipse) {
  return new xrx.shape.EllipseHoverable(ellipse);
};




/**
 * @constructor
 */
xrx.shape.EllipseSelectable = function(ellipse) {

  goog.base(this, ellipse);
};
goog.inherits(xrx.shape.EllipseSelectable, xrx.shape.Selectable);



xrx.shape.EllipseSelectable.create = function(ellipse) {
  return new xrx.shape.EllipseSelectable(ellipse);
};



/**
 * @constructor
 */
xrx.shape.EllipseModifiable = function(ellipse) {

  goog.base(this, ellipse);
};
goog.inherits(xrx.shape.EllipseModifiable, xrx.shape.Modifiable);



xrx.shape.EllipseModifiable.prototype.setCoords = function(coords) {
  this.shape_.setCoords(coords);
  this.dragger_[0].setCoordX(coords[0][0] + this.shape_.getRadiusX());
  this.dragger_[0].setCoordY(coords[0][1]);
  this.dragger_[1].setCoordX(coords[0][0]);
  this.dragger_[1].setCoordY(coords[0][1] + this.shape_.getRadiusY());
};



xrx.shape.EllipseModifiable.prototype.setCoordAt = function(pos, coord) {
  if (pos === 0) {
    this.dragger_[0].setCoordX(coord[0]);
    this.shape_.setRadiusX(Math.abs(coord[0] - this.shape_.getCenter()[0]));
  } else {
    this.dragger_[1].setCoordY(coord[1]);
    this.shape_.setRadiusY(Math.abs(coord[1] - this.shape_.getCenter()[1]));
  }
};



xrx.shape.EllipseModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  coords[0][0] += distX;
  coords[0][1] += distY;
  this.setCoords(coords);
};



/**
 * @constructor
 */
xrx.shape.EllipseModifiable.create = function(ellipse) {
  var center = ellipse.getCenter();
  var radiusX = ellipse.getRadiusX();
  var radiusY = ellipse.getRadiusY();
  var modifiable = new xrx.shape.EllipseModifiable(ellipse)
  var draggerX = xrx.shape.Dragger.create(modifiable, 0);
  draggerX.setCoords([[center[0] + radiusX, center[1]]]);
  var draggerY = xrx.shape.Dragger.create(modifiable, 1);
  draggerY.setCoords([[center[0], center[1] + radiusY]]);
  modifiable.setDragger([draggerX, draggerY]);
  return modifiable;
};



/**
 * A class representing a creatable ellipse shape.
 * @param
 * @constructor
 */
xrx.shape.EllipseCreatable = function(ellipse) {

  goog.base(this, ellipse, xrx.shape.Ellipse.create(ellipse.getDrawing()));

  this.point_ = new Array(2);
};
goog.inherits(xrx.shape.EllipseCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the ellipse currently created.
 * @return Array<Array<number>> The coordinates.
 */
xrx.shape.EllipseCreatable.prototype.getCoords = function() {
  return this.helper_.getCoords();
};



/**
 * Handles down events for a creatable ellipse shape.
 * @param {goog.events.BrowserEvent} e The browser event.
 */
xrx.shape.EllipseCreatable.prototype.handleDown = function(e, cursor) {
  var point = cursor.getPointTransformed();
  this.point_[0] = point[0];
  this.point_[1] = point[1];
  this.preview_.setCenter(point[0], point[1]);
  this.target_.getDrawing().eventShapeCreate([this.preview_]);
};



xrx.shape.EllipseCreatable.prototype.handleMove = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var distX = point[0] - this.point_[0];
  var distY = point[1] - this.point_[1];
  this.preview_.setCenter(point[0] - distX / 2, point[1] - distY / 2);
  this.preview_.setRadiusX(Math.abs(distX / 2));
  this.preview_.setRadiusY(Math.abs(distY / 2));
};



xrx.shape.EllipseCreatable.prototype.handleUp = function(e, cursor) {
  var ellipse = xrx.shape.Ellipse.create(this.target_.getDrawing());
  var center = this.preview_.getCenter();
  ellipse.setStyle(this.target_);
  ellipse.setCenter(center[0], center[1]);
  ellipse.setRadiusX(this.preview_.getRadiusX());
  ellipse.setRadiusY(this.preview_.getRadiusY());
  this.target_.getDrawing().eventShapeCreated(ellipse);
};



xrx.shape.EllipseCreatable.create = function(ellipse) {
  return new xrx.shape.EllipseCreatable(ellipse);
};
