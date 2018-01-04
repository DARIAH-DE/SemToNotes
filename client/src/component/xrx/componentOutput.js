/**
 * @fileoverview Class implements an output control.
 */

goog.provide('xrx.component.Output');



goog.require('goog.dom.DomHelper');
goog.require('xrx.mvc');



/**
 * @constructor
 */
xrx.component.Output = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.component.Output, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-output', xrx.component.Output);



xrx.component.Output.prototype.createDom = function() {};



xrx.component.Output.prototype.mvcRemove = function() {
  goog.dom.setTextContent(this.element_, '');
};



xrx.component.Output.prototype.mvcRefresh = function() {
  var value = this.getResult().castAsString();
  goog.dom.setTextContent(this.getElement(), value);
};
