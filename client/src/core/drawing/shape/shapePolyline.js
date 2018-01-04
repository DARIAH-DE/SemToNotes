/**
 * @fileoverview A class representing an engine-independent
 * hoverable, selectable, modifiable and creatable poly-line shape.
 */

goog.provide('xrx.shape.Polyline');
goog.provide('xrx.shape.PolylineCreatable');
goog.provide('xrx.shape.PolylineHoverable');
goog.provide('xrx.shape.PolylineModifiable');
goog.provide('xrx.shape.PolylineSelectable');



goog.require('goog.array');
goog.require('xrx.geometry.Polyline');
goog.require('xrx.shape.PathLike');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.PathLike');
goog.require('xrx.shape.Selectable');



/**
 * A class representing an engine-independent poly-line shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @extends {xrx.shape.Style}
 * @constructor
 */
xrx.shape.Polyline = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Polyline());

  /**
   * The engine element.
   * @type {(xrx.canvas.Polyline|xrx.svg.Polyline|xrx.vml.Polyline)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createPolyline();
};
goog.inherits(xrx.shape.Polyline, xrx.shape.PathLike);



/**
 * Draws this poly-line shape.
 * @private
 */
xrx.shape.Polyline.prototype.draw = function() {
  this.startDrawing_();
  this.engineElement_.draw(this.getCoords(), this.getRenderingFillColor(),
      0, this.getRenderingStrokeColor(), this.getRenderingStrokeWidth());
  this.finishDrawing_();
};



/**
 * Returns a helper shape that makes this shape hoverable.
 * @return {xrx.shape.PolylineHoverable} The hoverable poly-line shape.
 */
xrx.shape.Polyline.prototype.getHoverable = function() {
  if (!this.hoverable_) this.hoverable_ = new xrx.shape.PolylineHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape selectable.
 * @return {xrx.shape.PolylineSelectable} The selectable poly-line shape.
 */
xrx.shape.Polyline.prototype.getSelectable = function() {
  if (!this.selectable_) this.selectable_ = new xrx.shape.PolylineSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape modifiable.
 * @return {xrx.shape.PolylineModifiable} The modifiable poly-line shape.
 */
xrx.shape.Polyline.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = new xrx.shape.PolylineModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape creatable.
 * @return {xrx.shape.PolylineCreatable} The creatable poly-line shape.
 */
xrx.shape.Polyline.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = new xrx.shape.PolylineCreatable(this);
  return this.creatable_;
};



/**
 * Disposes this poly-line shape.
 */
xrx.shape.Polyline.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a hoverable poly-line shape.
 * @param {xrx.shape.Polyline} poly-line The parent poly-line shape.
 * @constructor
 * @private
 */
xrx.shape.PolylineHoverable = function(polyline) {

  goog.base(this, polyline);
};
goog.inherits(xrx.shape.PolylineHoverable, xrx.shape.Hoverable);



/**
 * Disposes this hoverable poly-line shape.
 */
xrx.shape.PolylineHoverable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a selectable poly-line shape.
 * @param {xrx.shape.Polyline} poly-line The parent poly-line shape.
 * @constructor
 * @private
 */
xrx.shape.PolylineSelectable = function(polyline) {

  goog.base(this, polyline);
};
goog.inherits(xrx.shape.PolylineSelectable, xrx.shape.Selectable);



/**
 * Disposes this selectable poly-line shape.
 */
xrx.shape.PolylineSelectable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * A class representing a modifiable poly-line shape.
 * @param {xrx.shape.Polyline} poly-line The parent poly-line shape.
 * @constructor
 * @private
 */
xrx.shape.PolylineModifiable = function(polyline, helper) {

  goog.base(this, polyline, helper);

  this.init_();
};
goog.inherits(xrx.shape.PolylineModifiable, xrx.shape.Modifiable);



/**
 * @private
 */
xrx.shape.PolylineModifiable.prototype.setCoords = function(coords, position) {
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
xrx.shape.PolylineModifiable.prototype.setCoordAt = function(pos, coord) {
  this.dragger_[pos].setCoordX(coord[0]);
  this.dragger_[pos].setCoordY(coord[1]);
  this.shape_.setCoordXAt(pos, coord[0]);
  this.shape_.setCoordYAt(pos, coord[1]);
};



/**
 * @private
 */
xrx.shape.PolylineModifiable.prototype.init_ = function() {
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
 * Disposes this modifiable poly-line shape.
 */
xrx.shape.PolylineModifiable.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};



/**
 * @private
 */
xrx.shape.PolylineModifiable.prototype.move = function(distX, distY) {
  var coords = this.shape_.getCoordsCopy();
  for (var i = 0, len = coords.length; i < len; i++) {
    coords[i][0] += distX;
    coords[i][1] += distY;
  }
  this.setCoords(coords);
};



/**
 * A class representing a creatable poly-line shape.
 * @param {xrx.shape.Polyline} poly-line The parent poly-line shape.
 * @constructor
 * @private
 */
xrx.shape.PolylineCreatable = function(polyline) {

  goog.base(this, polyline, new xrx.shape.Polyline(polyline.getDrawing()));

  /**
   * The last point created by the user, which closes the poly-line when clicked.
   * @type {xrx.shape.Dragger}
   * @private
   */
  this.close_;

  /**
   * Number of points the user has created so far.
   * @type {number}
   * @private
   */
  this.count_ = 0;
};
goog.inherits(xrx.shape.PolylineCreatable, xrx.shape.Creatable);



/**
 * Returns the coordinates of the poly-line created so far.
 * @return Array<number> The coordinates.
 * @private
 */
xrx.shape.PolylineCreatable.prototype.getCoords = function() {
  return this.preview_.getCoords();
};



/**
 * @private
 */
xrx.shape.PolylineCreatable.prototype.handleDown = function(e, cursor) {
  var shape = cursor.getShape();
  var point = cursor.getPointTransformed();
  if (this.count_ === 0) { // user creates the first point
    // update the poly-line preview
    this.preview_.setCoords([point, goog.array.clone(point)]);
    this.count_ += 1;
    this.target_.getDrawing().handleShapeCreate([this.preview_]);
  } else if (this.close_ && shape === this.close_ && this.count_ === 1) {
    // Do nothing if the user tries to close the path at the time
    // when there is only one point yet
  } else { // user touches down to move to the next point or end point
    this.preview_.setLastCoord(point);
  }
};



/**
 * @private
 */
xrx.shape.PolylineCreatable.prototype.handleMove = function(e, cursor) {
  var shape = cursor.getShape();
  var point = cursor.getPointTransformed();
  if (this.count_ === 0) {
    return;
  } else {
    this.preview_.setLastCoord(point);
  }
  if (this.close_ && shape === this.close_) {
    this.close_.setStrokeColor('red');
    this.close_.setStrokeWidth(3);
  } else if (this.close_) {
    this.close_.setStrokeColor('black');
    this.close_.setStrokeWidth(1);
  } else {}
};



/**
 * @private
 */
xrx.shape.PolylineCreatable.prototype.handleUp = function(e, cursor) {
  var shape = cursor.getShape();
  var point = cursor.getPointTransformed();
  if (this.close_ && shape === this.close_) { // user closes the poly-line
    // create a poly-line
    var polyline = new xrx.shape.Polyline(this.target_.getDrawing());
    polyline.setStyle(this.target_);
    polyline.setCoords(this.preview_.getCoordsCopy().splice(0, this.count_));
    this.target_.getDrawing().handleShapeCreated(polyline);
    // reset for next drawing
    this.close_ = null;
    this.count_ = 0;
  } else { // user creates another point
    // extend the poly-line
    this.preview_.appendCoord(point);
    // create the closing point as soon as the user creates the second point
    if (this.count_ === 1) {
      this.close_ = new xrx.shape.Dragger(this.target_.getModifiable(), 0);
      this.target_.getDrawing().handleShapeCreate([this.close_]);
    }
    this.close_.setCoords([point]);
    this.count_ += 1;
  } 
};



/**
 * Disposes this creatable poly-line shape.
 */
xrx.shape.PolylineCreatable.prototype.disposeInternal = function() {
  this.close_.dispose();
  this.close_ = null;
  goog.base(this, 'disposeInternal');
};

