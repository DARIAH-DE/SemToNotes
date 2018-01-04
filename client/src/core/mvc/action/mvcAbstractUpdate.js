/**
 * @fileoverview
 */

goog.provide('xrx.mvc.AbstractUpdate');



goog.require('goog.dom.classes');
goog.require('goog.dom.DomHelper');
goog.require('xrx.mvc');
goog.require('xrx.mvc.AbstractAction');



/**
 * @constructor
 */
xrx.mvc.AbstractUpdate = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.AbstractUpdate, xrx.mvc.AbstractAction);



xrx.mvc.AbstractUpdate.prototype.getTargetAsNode = function() {
  var element = goog.dom.getElementByClass('xrx-target', this.element_);
  return xrx.mvc.getComponent(element.id).getResult().getNode(0);
};



xrx.mvc.AbstractUpdate.prototype.getOriginAsNode = function() {
  var element = goog.dom.getElementByClass('xrx-origin', this.element_);
  return xrx.mvc.getComponent(element.id).getResult().getNode(0);
};



xrx.mvc.AbstractUpdate.prototype.getOriginAsString = function() {
  var element = goog.dom.getElementByClass('xrx-origin', this.element_);
  return xrx.mvc.getComponent(element.id).getResult().castAsString();
};



xrx.mvc.AbstractUpdate.prototype.createDom = function() {
  var origin = goog.dom.getElementByClass('xrx-origin', this.element_);
  var target = goog.dom.getElementByClass('xrx-target', this.element_);
  if (!origin && !goog.dom.classes.has(this.element_, 'xrx-remove'))
      throw Error('Missing .xrx-origin element.');
  if (!target) throw Error('Missing .xrx-target element.');
};
