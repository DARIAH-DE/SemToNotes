/**
 * @fileoverview 
 */

goog.provide('xrx.forms.Input');



goog.require('goog.dom.forms');
goog.require('xrx.event.Type');
goog.require('goog.userAgent');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.node');
goog.require('xrx.token');
goog.require('xrx.token.NotTag');



xrx.forms.Input = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.forms.Input, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-input', xrx.forms.Input);



xrx.forms.Input.prototype.createDom = function() {
  this.registerEvent(xrx.event.Type.INPUT);
};



xrx.forms.Input.prototype.mvcRefresh = function() {
  var node = this.getResult().getNode(0);
  if (node) {
    goog.dom.forms.setValue(this.element_, node.getStringValue());
    goog.dom.forms.setDisabled(this.element_, false);
  } else {
    goog.dom.forms.setValue(this.element_, '');
    goog.dom.forms.setDisabled(this.element_, true);
  }
};



xrx.forms.Input.prototype.mvcRemove = function() {
  goog.dom.forms.setValue(this.element_, '');
};



xrx.forms.Input.prototype.mvcModelUpdateData = function() {
  xrx.mvc.Controller.updateNode(this, this.getResult().getNode(0),
      goog.dom.forms.getValue(this.element_));
};
