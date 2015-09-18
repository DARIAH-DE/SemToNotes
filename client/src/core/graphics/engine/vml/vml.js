/**
 * @fileoverview VML base class providing enumerations and static functions
 *     for the VML sub-classes.
 */

goog.provide('xrx.vml');



/**
 * VML base class providing enumerations and static functions
 * for the VML sub-classes.
 * @constructor
 */
xrx.vml = function() {};



/**
 * Returns whether VML rendering is supported by the current user agent.
 * @return {boolean} Whether VML rendering is supported.
 */
xrx.vml.isSupported = function() {
  return !!document.namespaces;
};



/**
 * Sets the coordinates for various VML elements such as polygons using
 * the Raphael library.
 * @param {Object} raphael The Raphael object.
 * @param {Array<Array<number>>} points Array of coordinates.
 */
xrx.vml.setCoords = function(raphael, coordinates, closePath) {
  var s = 'M' + coordinates[0][0].toString() + ' ' + coordinates[0][1].toString();
  for(var i = 1, len = coordinates.length; i < len; i++) {
    s += 'L' + coordinates[i][0].toString() + ' ' + coordinates[i][1].toString();
  }
  if (closePath) s += 'Z';
  raphael.attr({'path': s});
};
