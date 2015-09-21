/**
 * @fileoverview Classes representing a modifiable and creatable
 *     engine-independent polygon shape.
 */

goog.provide('xrx.shape.Polygon');
goog.provide('xrx.shape.PolygonModify');
goog.provide('xrx.shape.PolygonCreate');



goog.require('goog.dom.DomHelper');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('xrx.engine.Engines');
goog.require('xrx.geometry.Path');
goog.require('xrx.mvc');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.Polyline');
goog.require('xrx.shape.Stylable');
goog.require('xrx.shape.VertexDragger');



/**
 * A class representing an engine-independent polygon shape.
 * @param {xrx.shape.Canvas} canvas The parent canvas object.
 * @param {xrx.engine.Element} engineElement The engine element
 *   used to render this shape.
 * @constructor
 */
xrx.shape.Polygon = function(canvas, engineElement) {

  goog.base(this, canvas, engineElement, new xrx.geometry.Path());
};
goog.inherits(xrx.shape.Polygon, xrx.shape.Stylable);



/**
 * Draws this polygon shape.
 */
xrx.shape.Polygon.prototype.draw = function() {
  this.startDrawing_();
  this.engineElement_.draw(this.getCoords(), this.getFillColor(),
      this.getFillOpacity(), this.getStrokeColor(), this.getStrokeWidth());
  this.finishDrawing_();
};



/**
 * Creates a new polygon shape.
 * @param {xrx.shape.Canvas} canvas The parent canvas object.
 */
xrx.shape.Polygon.create = function(canvas) {
  var engineElement;
  var engine = canvas.getEngine();
  var canvasElement = canvas.getEngineElement();
  if (engine.typeOf(xrx.engine.CANVAS)) {
    engineElement = xrx.canvas.Polygon.create(canvasElement);
  } else if (engine.typeOf(xrx.engine.SVG)) {
    engineElement = xrx.svg.Polygon.create(canvasElement);
  } else if (engine.typeOf(xrx.engine.VML)) {
    engineElement = xrx.vml.Polygon.create(canvasElement);
  } else {
    throw Error('Unknown engine.');
  }
  return new xrx.shape.Polygon(canvas, engineElement);
};



/**
 * Returns a modifiable polygon shape. Create it lazily if not existent.
 * @param {xrx.drawing.Drawing} drawing The parent drawing object.
 * @return {xrx.shape.PolygonModify} The modifiable polygon shape.
 */
xrx.shape.Polygon.prototype.getModifiable = function(drawing) {
  if (!this.modifiable_) this.modifiable_ = xrx.shape.PolygonModify.create(this);
  return this.modifiable_;
};



/**
 * Returns a creatable polygon shape. Create it lazily if not existent.
 * @return {xrx.shape.PolygonCreate} The creatable polygon shape.
 */
xrx.shape.Polygon.prototype.getCreatable = function() {
  if (!this.creatable_) this.creatable_ = xrx.shape.PolygonCreate.create(this);
  return this.creatable_;
};



/**
 * A class representing a modifiable polygon shape.
 * @constructor
 */
xrx.shape.PolygonModify = function() {

  goog.base(this);
};
goog.inherits(xrx.shape.PolygonModify, xrx.shape.Modifiable);



/**
 * Creates a new modifiable polygon shape.
 * @param {xrx.shape.Polygon} polygon The related polygon shape.
 */
xrx.shape.PolygonModify.create = function(polygon) {
  var coords = polygon.getCoords();
  var draggers = [];
  var dragger;
  for(var i = 0, len = coords.length; i < len; i++) {
    dragger = xrx.shape.VertexDragger.create(polygon.getCanvas());
    dragger.setCoords([coords[i]]);
    dragger.setPosition(i);
    draggers.push(dragger);
  }
  return draggers;
};



/**
 * A class representing a creatable polygon shape.
 * @param {xrx.shape.Polygon} polygon A styled polygon to be drawn.
 * @constructor
 */
xrx.shape.PolygonCreate = function(polygon) {

  goog.base(this, polygon, xrx.shape.Polyline.create(polygon.getCanvas()));

  /**
   * The first vertex created by the user, which at the same time
   * closes the polygon when clicked.
   * @type {xrx.shape.VertexDragger}
   * @private
   */
  this.close_;

  /**
   * An array of vertexes the user has created so far.
   * @type {xrx.shape.VertexDragger}
   * @private
   */
  this.vertexes_ = [];

  /**
   * Number of vertexes the user has created so far.
   * @type {number}
   * @private
   */
  this.count_ = 0;
};
goog.inherits(xrx.shape.PolygonCreate, xrx.shape.Creatable);



/**
 * Returns the coordinates of the poly-line currently creating a
 * polygon.
 * @return Array<Array<number>> The coordinates.
 */
xrx.shape.PolygonCreate.prototype.getCoords = function() {
  return this.helper_.getCoords();
};



/**
 * Handles click events for a creatable polygon shape.
 * @param {goog.events.BrowserEvent} e The browser event.
 */
xrx.shape.PolygonCreate.prototype.handleClick = function(e, point, shape) {
  var vertex;
  var polygon;
  var coords;
  if (this.count_ === 0) { // user creates the first point
    // update the poly-line
    this.helper_.setCoords([point, point]);
    // insert a vertex
    this.close_ = xrx.shape.VertexDragger.create(this.target_.getCanvas());
    this.close_.setCoords([point]);
    this.vertexes_.push(this.close_);
    this.count_ += 1;
    this.eventHandler_.eventShapeCreate([this.helper_, this.close_]);
  } else if (shape === this.close_ && this.count_ === 1) {
    // Do nothing if the user tries to close the path at the time
    // when there is only one point yet
  } else if (shape === this.close_) { // user closes the polygon
    var polygon;
    // get the coordinates
    coords = new Array(this.vertexes_.length + 1);
    for (var i = 0; i < this.vertexes_.length; i++) {
      coords[i] = this.vertexes_[i].getCoordsCopy()[0];
    }
    coords[this.vertexes_.length] = this.vertexes_[0].getCoordsCopy()[0];
    // update the polygon
    this.target_.setCoords(coords);
    // reset for next drawing
    this.close_ = null;
    this.vertexes_ = [];
    this.count_ = 0;
    polygon = xrx.shape.Polygon.create(this.target_.getCanvas());
    polygon.setStylable(this.target_);
    polygon.setCoords(this.target_.getCoordsCopy());
    this.eventHandler_.eventShapeCreated(polygon);
  } else { // user creates another vertex
    // extend the poly-line
    this.helper_.setLastCoord(point);
    this.helper_.appendCoord(point);
    // create another vertex
    vertex = xrx.shape.VertexDragger.create(this.target_.getCanvas());
    vertex.setCoords([point]);
    this.vertexes_.push(vertex);
    this.count_ += 1;
    this.eventHandler_.eventShapeCreate(vertex);
  } 
};



xrx.shape.PolygonCreate.prototype.handleMove = function(e, point, shape) {
  if (this.count_ === 0) {
    return;
  } else {
    this.helper_.setLastCoord(point);
  }
  if (shape === this.close_) {
    this.close_.setStrokeColor('red');
    this.close_.setStrokeWidth(3);
  } else {
    this.close_.setStrokeColor('black');
    this.close_.setStrokeWidth(1);
  }
};



xrx.shape.PolygonCreate.create = function(polygon) {
  return new xrx.shape.PolygonCreate(polygon);
};
