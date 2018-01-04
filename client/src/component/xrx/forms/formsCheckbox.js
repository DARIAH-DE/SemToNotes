/**
 * @fileoverview
 */

goog.provide('xrx.forms.Checkbox');



goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('xrx.event.Type');
goog.require('xrx.mvc.ComponentView');



xrx.forms.Checkbox = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.forms.Checkbox, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-checkbox', xrx.forms.Checkbox);



xrx.forms.Checkbox.prototype.createDom = function() {
  var self = this;
  this.registerEvent(xrx.event.Type.CHANGE);
  goog.events.listen(self.element_, xrx.event.Type.CLICK, function(e) {
    !!e.target.checked ? self.dispatch('xrx-event-checked') :
        self.dispatch('xrx-event-unchecked');
  });
};



xrx.forms.Checkbox.prototype.mvcRefresh = function() {
  var node = this.getResult().getNode(0);
  if (!node) return;
  var checked = node.getValueAsString().toLowerCase() === 'true';
  checked ? this.element_.setAttribute('checked', 'checked') :
      this.element_.removeAttribute('checked');
};



xrx.forms.Checkbox.prototype.mvcRemove = function() {};



xrx.forms.Checkbox.prototype.mvcModelUpdateData = function() {
  var node = this.getResult().getNode(0);
  if (!node) return;
  var checked = !!this.element_.checked;
  xrx.mvc.Controller.updateNode(this, node, checked.toString());
};
