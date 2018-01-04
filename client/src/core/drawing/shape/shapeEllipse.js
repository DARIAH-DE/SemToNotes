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
 * @extends {xrx.shape.Style}
 * @constructor
 */
xrx.shape.Ellipse = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Ellipse());

  /**
   * The engine element.
   * @type {(xrx.canvas.Ellipse|xrx.svg.Ellipse|xrx.vml.Ellipse)}
   * @private
   */
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
 * @return {Array<Array<Number>>} The coordinates.
 * @private
 */
xrx.shape.Ellipse.prototype.getCoords = function() {
  return [this.getCenter()];
};



/**
 * Sets the coordinates of this ellipse. We assume the center point.
 * @param {Array<Array<Number>>} coords The coordinates.
 * @private
 */
xrx.shape.Ellipse.prototype.setCoords = function(coords) {
  this.setCenter(coords[0][0], coords[0][1]);
};



/**
 * Draws this ellipse.
 * @private
 */
xrx.shape.Ellipse.prototype.draw = function() {
  this.startDrawing_();
  var center = this.getCenter();
  this.engineElement_.draw(center[0], center[1], this.getRadiusX(),
      this.getRadiusY(), this.getRenderingFillColor(),
      this.getRenderingFillOpacity(), this.getRenderingStrokeColor(),
      this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



/**
 * Returns a helper shape that makes this shape hoverable.
 * @return {xrx.shape.EllipseHoverable} The hoverable ellipse shape.
 */
xrx.shape.Ellipse.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = new xrx.shape.EllipseHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape selectable.
 * @return {xrx.shape.EllipseSelectable} The selectable ellipse shape.
 */
xrx.shape.Ellipse.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = new xrx.shape.EllipseSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape modifiable.
 * @return {xrx.shape.EllipseModifiable} The modifiable ellipse shape.
 */
xrx.shape.Ellipse.prototype.getModifiable = function() {
  if (!this.modifiable_) this.modifiable_ = new xrx.shape.EllipseModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape creatable.
 * @return {xrx.shape.EllipseCreatable} The creatable ellipse shape.
 */
xrx.shape.Ellipse.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = new xrx.shape.EllipseCreatable(this);
  return this.creatable_;
};



/**
 * Disposes this ellipse shape.
 */
xrx.shape.Ellipse.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a hoverable ellipse shape.
 * @param {xrx.shape.Ellipse} ellipse The parent ellipse shape.
 * @constructor
 * @private
 */
xrx.shape.EllipseHoverable = function(ellipse) {

  goog.base(this, ellipse);
};
goog.inherits(xrx.shape.EllipseHoverable, xrx.shape.Hoverable);



/**
 * Disposes this hoverable ellipse shape.
 */
xrx.shape.EllipseHoverable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};




/**
 * A class representing a selectable ellipse shape.
 * @param {xrx.shape.Ellipse} ellipse The parent ellipse shape.
 * @constructor
 * @private
 */
xrx.shape.EllipseSelectable = function(ellipse) {

  goog.base(this, ellipse);
};
goog.inherits(xrx.shape.EllipseSelectable, xrx.shape.Selectable);



/**
 * Disposes this selectable ellipse shape.
 */
xrx.shape.EllipseSelectable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a modifiable ellipse shape.
 * @param {xrx.shape.Ellipse} ellipse The parent ellipse shape.
 * @constructor
 * @private
 */
xrx.shape.EllipseModifiable = function(ellipse) {

  goog.base(this, ellipse);

  this.init_();
};
goog.inherits(xrx.shape.EllipseModifiable, xrx.shape.Modifiable);



/**
 * @private
 */
xrx.shape.EllipseModifiable.prototype.setCoords = function(coords) {
  this.shape_.setCoords(coords);
  this.dragger_[0].setCoordX(coords[0][0] + this.shape_.getRadiusX());
  this.dragger_[0].setCoordY(coords[0][1]);
  this.dragger_[1].setCoordX(coords[0][0]);
  this.dragger_[1].setCoordY(coords[0][1] + this.shape_.getRadiusY());
};



/**
 * @private
 */
xrx.shape.EllipseModifiable.prototype.setCoordAt = function(pos, coord) {
  if (pos === 0) {
    this.dragger_[0].setCoordX(coord[0]);
    this.shape_.setRadiusX(Math.abs(coord[0] - this.shape_.getCenter()[0]));
  } else {
    this.dragger_[1].setCoordY(coord[1]);
    this.shape_.setRadiusY(Math.abs(coord[1] - this.shape_.getCenter()[1]));
  }
};



/**
 * @private
 */
xrx.shape.EllipseModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  coords[0][0] += distX;
  coords[0][1] += distY;
  this.setCoords(coords);
};



/**
 * @private
 */
xrx.shape.EllipseModifiable.prototype.init_ = function() {
  var center = this.shape_.getCenter();
  var radiusX = this.shape_.getRadiusX();
  var radiusY = this.shape_.getRadiusY();
  var draggerX = new xrx.shape.Dragger(this, 0);
  draggerX.setCoords([[center[0] + radiusX, center[1]]]);
  var draggerY = new xrx.shape.Dragger(this, 1);
  draggerY.setCoords([[center[0], center[1] + radiusY]]);
  this.setDragger([draggerX, draggerY]);
};



/**
 * Disposes this modifiable ellipse shape.
 */
xrx.shape.EllipseModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a creatable ellipse shape.
 * @param {xrx.shape.Ellipse} ellipse The parent ellipse shape.
 * @constructor
 * @private
 */
xrx.shape.EllipseCreatable = function(ellipse) {

  goog.base(this, ellipse, new xrx.shape.Ellipse(ellipse.getDrawing()));

  /**
   * Center point helper.
   * @type {Array<number>}
   */
  this.point_ = new Array(2);
};
goog.inherits(xrx.shape.EllipseCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the ellipse currently created.
 * @return Array<number> The coordinates.
 * @private
 */
xrx.shape.EllipseCreatable.prototype.getCoords = function() {
  return this.helper_.getCoords();
};



/**
 * Handles down gestures.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {xrx.drawing.Cursor} cursor The drawing cursor.
 * @private
 */
xrx.shape.EllipseCreatable.prototype.handleDown = function(e, cursor) {
  var point = cursor.getPointTransformed();
  this.point_[0] = point[0];
  this.point_[1] = point[1];
  this.preview_.setCenter(point[0], point[1]);
  this.preview_.setRadiusX(0);
  this.preview_.setRadiusY(0);
  this.target_.getDrawing().handleShapeCreate([this.preview_]);
};


/**
 * Handles <em>move</em> gestures.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {xrx.drawing.Cursor} cursor The drawing cursor.
 * @private
 */
xrx.shape.EllipseCreatable.prototype.handleMove = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var distX = point[0] - this.point_[0];
  var distY = point[1] - this.point_[1];
  this.preview_.setCenter(point[0] - distX / 2, point[1] - distY / 2);
  this.preview_.setRadiusX(Math.abs(distX / 2));
  this.preview_.setRadiusY(Math.abs(distY / 2));
};


/**
 * Handles <em>up</em> gestures.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @param {xrx.drawing.Cursor} cursor The drawing cursor.
 * @private
 */
xrx.shape.EllipseCreatable.prototype.handleUp = function(e, cursor) {
  var ellipse = new xrx.shape.Ellipse(this.target_.getDrawing());
  var center = this.preview_.getCenter();
  ellipse.setStyle(this.target_);
  ellipse.setCenter(center[0], center[1]);
  ellipse.setRadiusX(this.preview_.getRadiusX());
  ellipse.setRadiusY(this.preview_.getRadiusY());
  this.target_.getDrawing().handleShapeCreated(ellipse);
};


/**
 * Disposes this creatable ellipse shape.
 * @private
 */
xrx.shape.EllipseCreatable.prototype.disposeInternal = function() {
  this.point_ = null;
  goog.base(this, 'disposeInternal');
};
