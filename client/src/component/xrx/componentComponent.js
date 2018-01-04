/**
 * @fileoverview 
 */

goog.provide('xrx.component.Component');



goog.require('xrx.mvc.Component');



/**
 * @constructor
 */
xrx.component.Component = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.component.Component, xrx.mvc.Component);
xrx.mvc.registerComponent('xrx-component', xrx.component.Component);



xrx.component.Component.prototype.createDom = function() {
  this.registerEvent(xrx.event.Type.IN);
  this.registerEvent(xrx.event.Type.OUT);
};
