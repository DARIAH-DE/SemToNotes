/**
 * @fileoverview A class representing an engine-independent
 * hoverable, selectable, modifiable and creatable polygon shape.
 */

goog.provide('xrx.shape.Polygon');
goog.provide('xrx.shape.PolygonCreatable');
goog.provide('xrx.shape.PolygonHoverable');
goog.provide('xrx.shape.PolygonModifiable');
goog.provide('xrx.shape.PolygonSelectable');



goog.require('goog.array');
goog.require('xrx.geometry.Path');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Dragger');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.PathLike');
goog.require('xrx.shape.Polyline');
goog.require('xrx.shape.Selectable');



/**
 * A class representing an engine-independent polygon shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @extends {xrx.shape.Style} 
 * @constructor
 */
xrx.shape.Polygon = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Path());

  /**
   * The engine element.
   * @type {(xrx.canvas.Polygon|xrx.svg.Polygon|xrx.vml.Polygon)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createPolygon();
};
goog.inherits(xrx.shape.Polygon, xrx.shape.PathLike);



/**
 * Draws this polygon shape.
 * @private
 */
xrx.shape.Polygon.prototype.draw = function() {
  this.startDrawing_();
  this.engineElement_.draw(this.getCoords(), this.getRenderingFillColor(),
      this.getRenderingFillOpacity(), this.getRenderingStrokeColor(),
      this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



/**
 * Returns a helper shape that makes this shape hoverable.
 * @return {xrx.shape.PolygonHoverable} The hoverable polygon shape.
 */
xrx.shape.Polygon.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = new xrx.shape.PolygonHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape selectable.
 * @return {xrx.shape.PolygonSelectable} The selectable polygon shape.
 */
xrx.shape.Polygon.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = new xrx.shape.PolygonSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape modifiable.
 * @return {xrx.shape.PolygonModifiable} The modifiable polygon shape.
 */
xrx.shape.Polygon.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = new xrx.shape.PolygonModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape creatable.
 * @return {xrx.shape.PolygonCreatable} The creatable polygon shape.
 */
xrx.shape.Polygon.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = new xrx.shape.PolygonCreatable(this);
  return this.creatable_;
};



/**
 * Disposes this polygon shape.
 */
xrx.shape.Polygon.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a hoverable polygon shape.
 * @param {xrx.shape.Polygon} polygon The parent polygon shape.
 * @constructor
 * @private
 */
xrx.shape.PolygonHoverable = function(polygon) {

  goog.base(this, polygon);
};
goog.inherits(xrx.shape.PolygonHoverable, xrx.shape.Hoverable);



/**
 * Disposes this hoverable polygon shape.
 */
xrx.shape.PolygonHoverable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a selectable polygon shape.
 * @param {xrx.shape.Polygon} polygon The parent polygon shape.
 * @constructor
 * @private
 */
xrx.shape.PolygonSelectable = function(polygon) {

  goog.base(this, polygon);
};
goog.inherits(xrx.shape.PolygonSelectable, xrx.shape.Selectable);



/**
 * Disposes this selectable polygon shape.
 */
xrx.shape.PolygonSelectable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a modifiable polygon shape.
 * @param {xrx.shape.Polygon} polygon The parent polygon shape.
 * @constructor
 * @private
 */
xrx.shape.PolygonModifiable = function(polygon, helper) {

  goog.base(this, polygon, helper);

  this.init_();
};
goog.inherits(xrx.shape.PolygonModifiable, xrx.shape.Modifiable);



/**
 * @private
 */
xrx.shape.PolygonModifiable.prototype.setCoords = function(coords, position) {
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
xrx.shape.PolygonModifiable.prototype.setCoordAt = function(pos, coord) {
  this.dragger_[pos].setCoordX(coord[0]);
  this.dragger_[pos].setCoordY(coord[1]);
  this.shape_.setCoordXAt(pos, coord[0]);
  this.shape_.setCoordYAt(pos, coord[1]);
};



/**
 * @private
 */
xrx.shape.PolygonModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][0] += distX;
    coords[i][1] += distY;
  }
  this.setCoords(coords);
};



/**
 * Disposes this modifiable polygon shape.
 */
xrx.shape.PolygonModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * @private
 */
xrx.shape.PolygonModifiable.prototype.init_ = function() {
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
 * A class representing a creatable polygon shape.
 * @param {xrx.shape.Polygon} polygon A styled polygon to be drawn.
 * @constructor
 * @private
 */
xrx.shape.PolygonCreatable = function(polygon) {

  goog.base(this, polygon, new xrx.shape.Polyline(polygon.getDrawing()));

  /**
   * The first vertex created by the user, which at the same time
   * closes the polygon when clicked.
   * @type {xrx.shape.Dragger}
   * @private
   */
  this.close_;

  /**
   * Number of vertexes the user has created so far.
   * @type {number}
   * @private
   */
  this.count_ = 0;
};
goog.inherits(xrx.shape.PolygonCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the poly-line currently creating a
 * polygon.
 * @return Array<number> The coordinates.
 * @private
 */
xrx.shape.PolygonCreatable.prototype.getCoords = function() {
  return this.preview_.getCoords();
};



/**
 * @private
 */
xrx.shape.PolygonCreatable.prototype.handleDown = function(e, cursor) {
  var shape = cursor.getShape();
  var point = cursor.getPointTransformed();
  if (this.count_ === 0) { // user creates the first point
    // update the poly-line preview
    this.preview_.setCoords([point, goog.array.clone(point)]);
    // create the closing dragger
    this.close_ = new xrx.shape.Dragger(this.target_.getModifiable(), 0);
    this.close_.setCoords([point]);
    this.count_ += 1;
    this.target_.getDrawing().handleShapeCreate([this.preview_, this.close_]);
  } else if (this.close_ && shape === this.close_ && this.count_ === 1) {
    // Do nothing if the user tries to close the path at the time
    // when there is only one point yet
  } else { // user touches down to move to the next point or to close the polygon
    this.preview_.setLastCoord(point);
  }
};



/**
 * @private
 */
xrx.shape.PolygonCreatable.prototype.handleMove = function(e, cursor) {
  var shape = cursor.getShape();
  var point = cursor.getPointTransformed();
  if (this.count_ === 0) {
    return;
  } else {
    this.preview_.setLastCoord(point);
  }
  if (shape === this.close_) {
    this.close_.setStrokeColor('red');
    this.close_.setStrokeWidth(3);
  } else {
    this.close_.setStrokeColor('black');
    this.close_.setStrokeWidth(1);
  }
};



/**
 * @private
 */
xrx.shape.PolygonCreatable.prototype.handleUp = function(e, cursor) {
  var shape = cursor.getShape();
  var point = cursor.getPointTransformed();
  if (this.close_ && shape === this.close_) { // user closes the polygon
    // create a polygon
    var polygon = new xrx.shape.Polygon(this.target_.getDrawing());
    polygon.setStyle(this.target_);
    polygon.setCoords(this.preview_.getCoordsCopy().splice(0, this.count_));
    this.target_.getDrawing().handleShapeCreated(polygon);
    // reset for next drawing
    this.close_ = null;
    this.count_ = 0;
  } else { // user creates another point
    // extend the poly-line preview
    this.preview_.setLastCoord(point);
    this.preview_.appendCoord(point);
    this.count_ += 1;
  } 
};



/**
 * Disposes this creatable polygon shape.
 */
xrx.shape.PolygonCreatable.prototype.disposeInternal = function() {
  this.close_.dispose();
  this.close_ = null;
  goog.base(this, 'disposeInternal');
};
