/**
 * @fileoverview
 */

goog.provide('xrx.mvc.ComponentModel');



goog.require('xrx.mvc.Component');



/**
 * @constructor
 */
xrx.mvc.ComponentModel = function(element, uidl) {

  goog.base(this, element, uidl);

  this.mvcRecalculate();
};
goog.inherits(xrx.mvc.ComponentModel, xrx.mvc.Component);



xrx.mvc.ComponentModel.prototype.addComponent = function() {
  xrx.mvc.addModelComponent(this.getId(), this);
};
