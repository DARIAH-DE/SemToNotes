/**
 * @fileoverview 
 */

goog.provide('xrx.mvc.Target');



goog.require('xrx.mvc.Component');



xrx.mvc.Target = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Target, xrx.mvc.Component);



xrx.mvc.Target.prototype.createDom = function() {};
