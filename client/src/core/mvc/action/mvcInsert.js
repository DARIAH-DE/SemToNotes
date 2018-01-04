/**
 * @fileoverview A class representing an XML insert action.
 */

goog.provide('xrx.mvc.Insert');



goog.require('xrx.mvc.AbstractUpdate');
goog.require('xrx.mvc.Controller');



/**
 * @constructor
 */
xrx.mvc.Insert = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Insert, xrx.mvc.AbstractUpdate);



/**
 * @private
 */
xrx.mvc.Insert.prototype.execute_ = function(opt_params) {
  xrx.mvc.Controller.insertNode(this, this.getTargetAsNode(),
      this.getOriginAsNode());
};