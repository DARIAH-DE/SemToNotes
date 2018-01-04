/**
 * @fileoverview Class implements data binding for the
 *     model-view-controller.
 */

goog.provide('xrx.mvc.Bind');



goog.require('xrx.mvc.ComponentModel');
goog.require('xrx.xpath');



/**
 * @constructor
 */
xrx.mvc.Bind = function(element) {

  this.result_;

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Bind, xrx.mvc.ComponentModel);



xrx.mvc.Bind.prototype.createDom = function() {};



xrx.mvc.Bind.prototype.getResult = function() {
  return this.result_;
};



/**
 * @override
 */
xrx.mvc.Bind.prototype.mvcRemove = function() {
  this.result_ = null;
};



/**
 * (Re)calculates the component's node-set.
 * @override
 */
xrx.mvc.Bind.prototype.mvcRecalculate = function() {
  this.result_ = this.xpath_.evaluate(undefined,
      xrx.xpath.XPathResultType.ANY_TYPE);
};
