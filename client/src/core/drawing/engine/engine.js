/**
 * @fileoverview Namespace for the rendering engine. Also a
 * static class providing constants and static functions.
 */

goog.provide('xrx.engine');



goog.require('goog.userAgent');



/**
 * Engine base class.
 * @constructor
 * @namespace xrx.engine
 * @memberof xrx
 */
xrx.engine = function() {};



/**
 * <a href="http://www.w3.org/TR/2014/CR-2dcontext-20140821/">The 2D Canvas rendering engine.</a>
 * @type {string}
 * @const
 */
xrx.engine.CANVAS = 'canvas';



/**
 * <a href="http://www.w3.org/TR/SVG/">The SVG rendering engine.</a>
 * @type {string}
 * @const
 */
xrx.engine.SVG = 'svg';



/**
 * <a href="http://www.w3.org/TR/NOTE-VML">The VML rendering engine.</a>
 * @type {string}
 * @const
 */
xrx.engine.VML = 'vml';



/**
 * Whether an eninge uses a DOM representation.
 * @param {(xrx.engine.CANVAS|xrx.engine.SVG|xrx.engine.VML)} engine The engine to test.
 * @return {boolean} Whether the engine uses a DOM representation.
 */
xrx.engine.hasDom = function(engine) {
  return engine === xrx.engine.SVG || engine === xrx.engine.VML;
};



/**
 * Whether an engine is supported by the current browser.
 * @param {(xrx.engine.CANVAS|xrx.engine.SVG|xrx.engine.VML)} engine The engine to test.
 */
xrx.engine.isSupported = function(engine) {
  if (engine === xrx.engine.CANVAS) {
    return !!document.createElement('canvas').getContext;
  } else if (engine === xrx.engine.SVG) {
    return !!document.createElementNS &&
      !!document.createElementNS(xrx.svg.Namespace['svg'], 'svg').createSVGRect;
  } else if (engine === xrx.engine.VML) {
    return !!document.namespaces;
  } else {
    throw Error('Unknown engine.');
  }
};
