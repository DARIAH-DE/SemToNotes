/**
 * @fileoverview 
 */

goog.provide('xrx.forms.Button');



goog.require('xrx.event.Type');
goog.require('xrx.mvc.Component');



xrx.forms.Button = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.forms.Button, xrx.mvc.Component);
xrx.mvc.registerComponent('xrx-button', xrx.forms.Button);



xrx.forms.Button.prototype.createDom = function() {
  this.registerEvent(xrx.event.Type.CLICK);
};
