/**
 * @fileoverview An abstract class representing a path-like shape
 * such as a polygon or poly-line.
 */

goog.provide('xrx.shape.PathLike');



/**
 * @constructor
 * @private
 */
xrx.shape.PathLike = function(drawing, engineElement, geometry) {

  goog.base(this, drawing, engineElement, geometry);
};
goog.inherits(xrx.shape.PathLike, xrx.shape.Geometry);



/**
 * Sets the coordinates for this path-like shape.
 * @param {Array<Array<number>>} coords The coordinates.
 */
xrx.shape.PathLike.prototype.setCoords = function(coords) {
  this.geometry_.coords = coords;
};



/**
 * Returns the coordinates of this path-like shape.
 * @return {Array<Array<number>>} The coordinates.
 */
xrx.shape.PathLike.prototype.getCoords = function(coords) {
  return this.geometry_.coords;
};



/**
 * Updates one coordinate in the list of coordinates.
 * @param {number} pos Index of the coordinate to be updated.
 * @param {Array<number>} coord The new coordinate.
 */
xrx.shape.PathLike.prototype.setCoordAt = function(pos, coord) {
  this.geometry_.coords[pos][0] = coord[0];
  this.geometry_.coords[pos][1] = coord[1];
};



/**
 * Updates one x coordinate in the list of coordinates.
 * @param {number} pos Index of the x coordinate to be updated.
 * @param {number} x The new x coordinate.
 */
xrx.shape.PathLike.prototype.setCoordXAt = function(pos, x) {
  this.geometry_.coords[pos][0] = x;
};



/**
 * Updates one y coordinate in the list of coordinates.
 * @param {number} pos Index of the y coordinate to be updated.
 * @param {number} y The new y coordinate.
 */
xrx.shape.PathLike.prototype.setCoordYAt = function(pos, y) {
  this.geometry_.coords[pos][1] = y;
};



xrx.shape.PathLike.prototype.setLastCoord = function(coord) {
  var last = this.geometry_.coords.length - 1;
  this.geometry_.coords[last][0] = coord[0];
  this.geometry_.coords[last][1] = coord[1];
};



xrx.shape.PathLike.prototype.appendCoord = function(coord) {
  this.geometry_.coords.push(coord);
};
