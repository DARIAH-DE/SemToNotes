/**
 * @fileoverview SVG class representing a group.
 * @private
 */

goog.provide('xrx.svg.Group');



goog.require('goog.dom.DomHelper');
goog.require('xrx.svg');
goog.require('xrx.svg.Container');



/**
 * SVG class representing a group.
 * @param {SVGGroupElement} element The SVG group element.
 * @constructor
 * @extends xrx.svg.Element
 * @private
 */
xrx.svg.Group = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.svg.Group, xrx.svg.Container);



/**
 * Creates a new group.
 */
xrx.svg.Group.create = function(undefined_) {
  var element = document.createElementNS(xrx.svg.Namespace['svg'], 'g');
  return new xrx.svg.Group(element);
};



xrx.svg.Group.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
