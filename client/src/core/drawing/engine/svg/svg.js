/**
 * @fileoverview Namespace for the SVG rendering engine.
 */

goog.provide('xrx.svg');
goog.provide('xrx.svg.Namespace');



/**
 * Namespace for the SVG rendering engine. Also a
 * a static class providing utility functions.
 * @constructor
 * @namespace xrx.svg
 * @memberof xrx
 */
xrx.svg = function() {};



/**
 * Enumeration of SVG related namespaces.
 * @enum {string}
 * @private
 */
xrx.svg.Namespace = {

  /**
   * The SVG namespace.
   */
  'svg': 'http://www.w3.org/2000/svg',

  /**
   * The XLINK namespace.
   */
  'xlink': 'http://www.w3.org/1999/xlink'
};



/**
 * Returns whether SVG rendering is supported by the current user agent.
 * @return {boolean} Whether SVG rendering is supported.
 */
xrx.svg.isSupported = function() {
  return !!document.createElementNS &&
      !!document.createElementNS(xrx.svg.Namespace['svg'], 'svg').createSVGRect;
};



/**
 * Sets the coordinates for various SVG elements such as polygons.
 * @param {Element} element The SVG element.
 * @param {Array<number>} points Array of coordinates.
 * @private
 */
xrx.svg.setCoords = function(element, coordinates) {
  var s = '';
  for(var i = 0, len = coordinates.length; i < len; i++) {
    s += Math.round(coordinates[i][0]) + ',' + Math.round(coordinates[i][1]) + ' ';
  }
  element.setAttribute('points', s);
};
