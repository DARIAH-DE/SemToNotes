/**
 * @fileoverview Namespace for the VML rendering engine.
 */

goog.provide('xrx.vml');



goog.require('goog.dom.DomHelper');
goog.require('goog.style');



/**
 * Namespace for the VML rendering engine. Also a
 * a static class providing utility functions.
 * @constructor
 * @namespace xrx.vml
 * @memberof xrx
 */
xrx.vml = function() {};



/**
 * Whether the browser already has VML rendering enabled.
 * @type {boolean}
 * @private
 */
xrx.vml.browserEnabled = false;



/**
 * Initialize the browser for VML rendering.
 * @private
 */
xrx.vml.initVmlRendering = function() {
  if (xrx.vml.browserEnabled) return;
  goog.style.installStyles('.xrx-vml{behavior:url(#default#VML);' +
      'display:inline-block}');
  xrx.vml.browserEnabled = true;
};



xrx.vml.createFillAndCo = function(element) {
  var fill = document.createElement('xrxvml:fill');
  var stroke = document.createElement('xrxvml:stroke');
  var skew = document.createElement('xrxvml:skew');
  fill.setAttribute('class', 'xrx-vml');
  stroke.setAttribute('class', 'xrx-vml');
  skew.setAttribute('class', 'xrx-vml');
  goog.dom.appendChild(element, fill);
  goog.dom.appendChild(element, stroke);
  goog.dom.appendChild(element, skew);
};



/**
 * Creates a new VML element including fill, stroke and skew.
 * @param {string} tagName The tag name of the HTML element.
 * @param {boolean} opt_fillAndCo Whether to append fill, stroke and
 *    skew element.
 * @return {HTMLElement} The HTML element.
 * @private
 */
xrx.vml.createElement = function(tagName, opt_fillAndCo) {
  var element;
  !document.namespaces.xrxvml &&
      document.namespaces.add('xrxvml', 'urn:schemas-microsoft-com:vml');
  element = document.createElement('xrxvml:' + tagName);
  element.setAttribute('class', 'xrx-vml');
  if (opt_fillAndCo !== false) xrx.vml.createFillAndCo(element);
  return element;
};



xrx.vml.setPath = function(element, coords, close) {
  var str = 'm ';
  for (var i = 0, len = coords.length; i < len; i++) {
    str += coords[i][0] + ',' + coords[i][1];
    if (i !== 0 && i !== len - 1) str += ', '
    if (i === 0) str += ' l ';
  }
  if (close) str += ' x '; 
  str += ' e';
  element['path'] = str;
};
