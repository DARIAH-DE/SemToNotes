/**
 * @fileoverview 
 */

goog.provide('xrx.forms.Textarea');



goog.require('xrx.forms.Input');



xrx.forms.Textarea = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.forms.Textarea, xrx.forms.Input);
xrx.mvc.registerComponent('xrx-componentarea', xrx.forms.Textarea);
