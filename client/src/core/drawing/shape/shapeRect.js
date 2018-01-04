/**
 * @fileoverview A class representing an engine-independent
 * hoverable, selectable, modifiable and creatable rectangle shape.
 */

goog.provide('xrx.shape.Rect');
goog.provide('xrx.shape.RectCreatable');
goog.provide('xrx.shape.RectHoverable');
goog.provide('xrx.shape.RectModifiable');
goog.provide('xrx.shape.RectSelectable');



goog.require('goog.array');
goog.require('xrx.geometry.Path');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Dragger');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.PathLike');
goog.require('xrx.shape.Selectable');



/**
 * A class representing an engine-independent rectangle shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @extends {xrx.shape.Style}
 * @constructor
 */
xrx.shape.Rect = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Path(4));

  /**
   * The engine element.
   * @type {(xrx.canvas.Rect|xrx.svg.Rect|xrx.vml.Rect)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createRect();
};
goog.inherits(xrx.shape.Rect, xrx.shape.PathLike);



/**
 * Sets the X coordinate of this rectangle.
 * @param {number} x The coordinate.
 */
xrx.shape.Rect.prototype.setX = function(x) {
  this.geometry_.coords[0][0] = x;
  this.geometry_.coords[3][0] = x;
};



/**
 * Returns the X coordinate of this rectangle.
 * @return {number} The coordinate.
 */
xrx.shape.Rect.prototype.getX = function() {
  return this.geometry_.coords[0][0];
};



/**
 * Sets the Y coordinate of this rectangle.
 * @param {number} y The coordinate.
 */
xrx.shape.Rect.prototype.setY = function(y) {
  this.geometry_.coords[0][1] = y;
  this.geometry_.coords[1][1] = y;
};



/**
 * Returns the Y coordinate of this rectangle.
 * @return {number} The coordinate.
 */
xrx.shape.Rect.prototype.getY = function() {
  return this.geometry_.coords[0][1];
};



/**
 * Sets the width of this rectangle.
 * @param {number} width The width.
 */
xrx.shape.Rect.prototype.setWidth = function(width) {
  var x = this.geometry_.coords[0][0];
  this.geometry_.coords[1][0] = x + width;
  this.geometry_.coords[2][0] = x + width;
};



/**
 * Returns the width of this rectangle.
 * @return {number} The width.
 */
xrx.shape.Rect.prototype.getWidth = function() {
  var coords = this.geometry_.coords;
  return coords[1][0] - coords[0][0];
};



/**
 * Sets the height of this rectangle.
 * @param {height} height The height.
 */
xrx.shape.Rect.prototype.setHeight = function(height) {
  var y = this.geometry_.coords[0][1];
  this.geometry_.coords[2][1] = y + height;
  this.geometry_.coords[3][1] = y + height;
};



/**
 * Returns the height of this rectangle.
 * @return {number} The height.
 */
xrx.shape.Rect.prototype.getHeight = function() {
  var coords = this.geometry_.coords;
  return coords[3][1] - coords[0][1];
};



/**
 * Function makes sure that the underlying polygon rendering class
 * stays a rectangle.
 * @param {number} position The nth vertex currently modified.
 * @private
 */
xrx.shape.Rect.prototype.setAffineCoords = function(position) {
  var coords = this.getCoords();
  if (position === 0 || position === 2) {
    coords[1][0] = coords[2][0];
    coords[1][1] = coords[0][1];
    coords[3][0] = coords[0][0];
    coords[3][1] = coords[2][1];
  } else {
    coords[0][0] = coords[3][0];
    coords[0][1] = coords[1][1];
    coords[2][0] = coords[1][0];
    coords[2][1] = coords[3][1];
  }
  return coords;
};



/**
 * Draws this rectangle.
 * @private
 */
xrx.shape.Rect.prototype.draw = function() {
  this.startDrawing_();
  this.engineElement_.draw(this.getCoords(), this.getRenderingFillColor(),
      this.getRenderingFillOpacity(), this.getRenderingStrokeColor(),
      this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



/**
 * Returns a helper shape that makes this shape hoverable.
 * @return {xrx.shape.RectHoverable} The hoverable rectangle shape.
 */
xrx.shape.Rect.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = new xrx.shape.RectHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape selectable.
 * @return {xrx.shape.RectSelectable} The selectable rectangle shape.
 */
xrx.shape.Rect.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = new xrx.shape.RectSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape modifiable.
 * @return {xrx.shape.RectHoverable} The modifiable rectangle shape.
 */
xrx.shape.Rect.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = new xrx.shape.RectModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape creatable.
 * @return {xrx.shape.RectHoverable} The creatable rectangle shape.
 */
xrx.shape.Rect.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = new xrx.shape.RectCreatable(this);
  return this.creatable_;
};



/**
 * Disposes this rectangle shape.
 */
xrx.shape.Rect.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a hoverable rectangle shape.
 * @param {xrx.shape.Rect} rect The parent rectangle shape.
 * @constructor
 * @private
 */
xrx.shape.RectHoverable = function(rect) {

  goog.base(this, rect);
};
goog.inherits(xrx.shape.RectHoverable, xrx.shape.Hoverable);



/**
 * Disposes this hoverable rectangle shape.
 */
xrx.shape.RectHoverable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};




/**
 * A class representing a selectable rectangle shape.
 * @param {xrx.shape.Rect} rect The parent rectangle shape.
 * @constructor
 * @private
 */
xrx.shape.RectSelectable = function(rect) {

  goog.base(this, rect);
};
goog.inherits(xrx.shape.RectSelectable, xrx.shape.Selectable);



/**
 * Disposes this selectable shape.
 */
xrx.shape.RectSelectable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a modifiable rectangle shape.
 * @param {xrx.shape.Rect} rect The parent rectangle shape.
 * @constructor
 * @private
 */
xrx.shape.RectModifiable = function(rect, helper) {

  goog.base(this, rect, helper);

  this.init_();
};
goog.inherits(xrx.shape.RectModifiable, xrx.shape.Modifiable);



/**
 * @private
 */
xrx.shape.RectModifiable.prototype.setCoords = function(coords, position) {
  for(var i = 0, len = this.dragger_.length; i < len; i++) {
    if (i !== position) {
      this.dragger_[i].setCoordX(coords[i][0]);
      this.dragger_[i].setCoordY(coords[i][1]);
    }
  }
  this.shape_.setCoords(coords);
};



/**
 * @private
 */
xrx.shape.RectModifiable.prototype.setCoordAt = function(pos, coord) {
  var coords;
  this.shape_.setCoordAt(pos, coord);
  this.shape_.setAffineCoords(pos);
  coords = this.shape_.getCoords();
  this.dragger_[0].setCoordX(coords[0][0]);
  this.dragger_[0].setCoordY(coords[0][1]);
  this.dragger_[1].setCoordX(coords[1][0]);
  this.dragger_[1].setCoordY(coords[1][1]);
  this.dragger_[2].setCoordX(coords[2][0]);
  this.dragger_[2].setCoordY(coords[2][1]);
  this.dragger_[3].setCoordX(coords[3][0]);
  this.dragger_[3].setCoordY(coords[3][1]);
};



/**
 * @private
 */
xrx.shape.RectModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][0] += distX;
    coords[i][1] += distY;
  }
  this.setCoords(coords);
};



/**
 * Disposes this modifiable rectangle shape.
 */
xrx.shape.RectModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * @private
 */
xrx.shape.RectModifiable.prototype.init_ = function() {
  var coords = this.shape_.getCoords();
  var draggers = [];
  var dragger;
  for(var i = 0, len = coords.length; i < len; i++) {
    dragger = new xrx.shape.Dragger(this, i);
    dragger.setCoords([coords[i]]);
    draggers.push(dragger);
  }
  this.setDragger(draggers);
};



/**
 * A class representing a creatable rectangle shape.
 * @param {xrx.shape.Rect} rect The parent rectangle shape.
 * @constructor
 * @private
 */
xrx.shape.RectCreatable = function(rect) {

  goog.base(this, rect, new xrx.shape.Rect(rect.getDrawing()));
};
goog.inherits(xrx.shape.RectCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the rectangle currently created.
 * @return Array<number> The coordinates.
 * @private
 */
xrx.shape.RectCreatable.prototype.getCoords = function() {
  return this.preview_.getCoords();
};



/**
 * @private
 */
xrx.shape.RectCreatable.prototype.handleDown = function(e, cursor) {
  var point = cursor.getPointTransformed();
  var coords = new Array(4);
  coords[0] = goog.array.clone(point);
  coords[1] = goog.array.clone(point);
  coords[2] = goog.array.clone(point);
  coords[3] = goog.array.clone(point);
  this.preview_.setCoords(coords);
  this.target_.getDrawing().handleShapeCreate([this.preview_]);
};



/**
 * @private
 */
xrx.shape.RectCreatable.prototype.handleMove = function(e, cursor) {
  var point = cursor.getPointTransformed();
  this.preview_.setCoordAt(2, point);
  this.preview_.setAffineCoords(2);
};



/**
 * @private
 */
xrx.shape.RectCreatable.prototype.handleUp = function(e, cursor) {
  var rect = new xrx.shape.Rect(this.target_.getDrawing());
  rect.setStyle(this.target_);
  rect.setCoords(this.preview_.getCoordsCopy());
  this.target_.getDrawing().handleShapeCreated(rect);
};



/**
 * Disposes this creatable rectangle shape.
 */
xrx.shape.RectCreatable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
