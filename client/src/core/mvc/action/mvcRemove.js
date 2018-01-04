/**
 * @fileoverview A class representing an XML remove action.
 */

goog.provide('xrx.mvc.Remove');



goog.require('xrx.mvc.AbstractUpdate');
goog.require('xrx.mvc.Controller');



/**
 * @constructor
 */
xrx.mvc.Remove = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Remove, xrx.mvc.AbstractUpdate);



/**
 * @private
 */
xrx.mvc.Remove.prototype.execute_ = function(opt_params) {
  var node = this.getTargetAsNode();
  if (node) xrx.mvc.Controller.removeNode(this, node);
};
