/**
 * @fileoverview VML class representing a group.
 * @private
 */

goog.provide('xrx.vml.Group');



goog.require('goog.dom.DomHelper');
goog.require('xrx.vml');
goog.require('xrx.vml.Container');



/**
 * VML class representing a group.
 * @param {HTMLElement} The HTML element.
 * @constructor
 * @extends xrx.vml.Element
 * @private
 */
xrx.vml.Group = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.vml.Group, xrx.vml.Container);



/**
 * Creates a new group.
 * @param {xrx.vml.Canvas} canvas The parent canvas of the group.
 */
xrx.vml.Group.create = function(canvas) {
  var element = xrx.vml.createElement('group', false);
  element.style['position'] = 'absolute';
  element.style['left'] = '0px';
  element.style['top'] = '0px';
  element.style['width'] = canvas.getWidth() + 'px';
  element.style['height'] = canvas.getHeight() + 'px';
  return new xrx.vml.Group(element);
};
