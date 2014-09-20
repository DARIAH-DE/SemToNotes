/**
 * @fileoverview
 */

goog.provide('xrx.shape.VertexDragger');



goog.require('xrx.drawing.State');
goog.require('xrx.engine.Engines');
goog.require('xrx.shape.Shape');



/**
 * @constructor
 */
xrx.shape.VertexDragger = function(drawing) {

  goog.base(this, drawing);

  this.pos_;
};
goog.inherits(xrx.shape.VertexDragger, xrx.shape.Shape);



xrx.shape.VertexDragger.prototype.primitiveClass_ = 'Circle';



xrx.shape.VertexDragger.prototype.getPosition = function() {
  return this.pos_;
};



xrx.shape.VertexDragger.prototype.setPosition = function(pos) {
  this.pos_ = pos;
};



xrx.shape.VertexDragger.prototype.getCoords = function() {
  return [this.primitiveShape_.getCenter()];
};



xrx.shape.VertexDragger.prototype.getCoordsCopy = function() {
  var coords = [this.primitiveShape_.getCenter()];
  var len = coords.length;
  var newCoords = new Array(len);
  var coord;
  for (var i = 0; i < len; i++) {
    newCoords[i] = [coords[i][0], coords[i][1]];
  }
  return newCoords;
};



xrx.shape.VertexDragger.prototype.setCoords = function(coords) {
  this.primitiveShape_.setCenter(coords[0][0], coords[0][1]);
};



xrx.shape.VertexDragger.prototype.getRadius = function() {
  return this.primitiveShape_.getRadius();
};



xrx.shape.VertexDragger.prototype.setRadius = function(radius) {
  this.primitiveShape_.setRadius(radius);
};




xrx.shape.VertexDragger.create = function(drawing) {
  var dragger = new xrx.shape.VertexDragger(drawing);
  dragger.setRadius(2);
  dragger.setStrokeColor('black');
  dragger.setStrokeWidth(1);
  dragger.setFillColor('white');
  dragger.setFillOpacity(1.0);
  return dragger;
};



goog.exportProperty(xrx.shape, 'VertexDragger', xrx.shape.VertexDragger);
