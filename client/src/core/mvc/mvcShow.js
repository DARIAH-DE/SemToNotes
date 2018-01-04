/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Show');



goog.require('goog.style');
goog.require('xrx.mvc.ComponentView');



xrx.mvc.Show = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Show, xrx.mvc.ComponentView);



xrx.mvc.Show.prototype.createDom = function() {
  goog.style.setElementShown(this.element_, true);
};



xrx.mvc.Show.prototype.mvcRemove = function() {
  goog.style.setElementShown(this.element_, true);
};



xrx.mvc.Show.prototype.mvcRefresh = function() {
  var result = this.getResult().castAsBoolean();
  result ? goog.style.setElementShown(this.element_, true) :
      goog.style.setElementShown(this.element_, false);
};
