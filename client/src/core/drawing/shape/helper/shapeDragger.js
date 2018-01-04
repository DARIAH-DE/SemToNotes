/**
 * @fileoverview A class representing a vertex dragging element to
 *   modify the vertexes of a shape.
 * @private
 */

goog.provide('xrx.shape.Dragger');



goog.require('xrx.shape.Circle');



/**
 * A class representing a dragger to modify the size or the vertexes
 * of a shape.
 * @param {xrx.shape.Modifiable} shape The parent modifiable shape.
 * @param {number} pos The nth dragger of a shape.
 * @constructor
 * @private
 */
xrx.shape.Dragger = function(modifiable, pos) {

  var drawing = modifiable.getShape().getDrawing();
  goog.base(this, drawing,
      drawing.getEngine().createCircle(drawing.getCanvas().getEngineElement()));

  /**
   * The parent modifiable shape.
   * @type {xrx.shape.Modifiable}
   * @private
   */
  this.modifiable_ = modifiable;

  /**
   * The nth dragger of a shape.
   * @type {number}
   * @private
   */
  this.pos_ = pos;

  this.init_();
};
goog.inherits(xrx.shape.Dragger, xrx.shape.Circle);



/**
 * @private
 */
xrx.shape.Dragger.prototype.setCoord = function(coord) {
  this.modifiable_.setCoordAt(this.pos_, coord)
};



/**
 * Returns the position n of the vertex dragging element in the list
 * of dragging elements.
 * @return {number} The position.
 * @private
 */
xrx.shape.Dragger.prototype.getPosition = function() {
  return this.pos_;
};



/**
 * @private
 */
xrx.shape.Dragger.prototype.getRadius = function() {
  return this.geometry_.r / this.zoomFactor_;
};



/**
 * @private
 */
xrx.shape.Dragger.prototype.init_ = function(modifiable, pos) {
  this.setRadius(3);
  this.setStrokeColor('black');
  this.setStrokeWidth(1);
  this.setFillColor('white');
  this.setFillOpacity(1.0);
};



/**
 * Disposes this dragger.
 */
xrx.shape.Dragger.prototype.disposeInternal = function() {
  goog.dispose(this.modifiable_);
  this.modifiable_ = null;
  goog.base(this, 'disposeInternal');
};
