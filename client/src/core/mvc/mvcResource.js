/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Resource');



goog.require('xrx.mvc.Component');



xrx.mvc.Resource = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Resource, xrx.mvc.Component);



xrx.mvc.Resource.prototype.createDom = function() {};
