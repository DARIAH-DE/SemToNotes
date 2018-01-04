/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Hide');



goog.require('goog.style');
goog.require('xrx.mvc.ComponentView');



xrx.mvc.Hide = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Hide, xrx.mvc.ComponentView);



xrx.mvc.Hide.prototype.createDom = function() {
  goog.style.setElementShown(this.element_, false);
};



xrx.mvc.Hide.prototype.mvcRemove = function() {
  goog.style.setElementShown(this.element_, false);
};



xrx.mvc.Hide.prototype.mvcRefresh = function() {
  var result = this.getResult().castAsBoolean();
  result ? goog.style.setElementShown(this.element_, false) :
      goog.style.setElementShown(this.element_, true);
};
