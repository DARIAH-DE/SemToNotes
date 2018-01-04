/**
 * @fileoverview An abstract class representing the geometry
 *   of a shape.
 * @private
 */

goog.provide('xrx.shape.Geometry');



goog.require('goog.object');
goog.require('xrx.shape.Shape');



/**
 * An abstract class representing the geometry
 * of a shape.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @param {xrx.geometry.Geometry} geometry The geometry object for
 *   this shape.
 * @constructor
 * @extends {xrx.shape.Shape}
 * @private
 */
xrx.shape.Geometry = function(drawing, geometry) {

  goog.base(this, drawing);

  /**
   * Object describing the geometry of this shape.
   * @type {xrx.geometry.Geometry}
   * @private
   */
  this.geometry_ = geometry;

  /**
   * The current zoom factor that, e.g., influences stroke width.
   * @type {number}
   * @private
   */
  this.zoomFactor_ = 1;

  /**
   * The current transformation matrix of this shape.
   * @type {goog.math.AffineTransform}
   * @private
   */
  this.ctm_;
};
goog.inherits(xrx.shape.Geometry, xrx.shape.Shape);



/**
 * Sets the current zoom factor, useful to realize shapes with constant
 * size or constant stroke width.
 * @param {number} factor The zoom factor.
 */
xrx.shape.Geometry.prototype.setZoomFactor = function(factor) {
  this.zoomFactor_ = factor;
};



/**
 * Returns the geometry object of this shape.
 * @return {xrx.geometry.Geometry} The geometry object.
 */
xrx.shape.Geometry.prototype.getGeometry = function() {
  return this.geometry_;
};


/**
 * Sets a transformation matrix for this shape.
 * @param {goog.math.AffineTransform} matrix The matrix.
 */
xrx.shape.Geometry.prototype.setCTM = function(matrix) {
  this.ctm_ = matrix;
};



/**
 * Returns a copy of the shape's coordinate array.
 * @return {Array<number>} A new coordinate array.
 */
xrx.shape.Geometry.prototype.getCoordsCopy = function() {
  var coords = this.getCoords();
  var len = coords.length;
  var newCoords = new Array(len);
  var coord;
  for (var i = 0; i < len; i++) {
    newCoords[i] = new Array(2);
    newCoords[i][0] = coords[i][0];
    newCoords[i][1] = coords[i][1];
  }
  return newCoords;
};



/**
 * Disposes this geometry.
 */
xrx.shape.Geometry.prototype.disposeInternal = function() {
  goog.dispose(this.geometry_);
  this.geometry_ = null;
  goog.dispose(this.ctm_);
  this.ctm_ = null;
  goog.base(this, 'disposeInternal');
};
