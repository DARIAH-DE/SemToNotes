/**
 * @fileoverview
 */

goog.provide('xrx.forms.Select');



goog.require('goog.dom.DomHelper');
goog.require('goog.dom.forms');
goog.require('xrx.event.Type');
goog.require('xrx.mvc.ComponentView');



xrx.forms.Select = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.forms.Select, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-select', xrx.forms.Select);



xrx.forms.Select.prototype.createDom = function() {
  this.registerEvent(xrx.event.Type.CHANGE);
};



xrx.forms.Select.prototype.mvcRefresh = function() {
  var option;
  var map = xrx.mvc.getModelComponent(this.getDataset('xrxMap')).getMap();
  var value = this.getResult().castAsString();
  goog.dom.removeChildren(this.element_);
  map.forEach(function(label, key) {
    option = goog.dom.createDom('option', {value: key});
    goog.dom.setTextContent(option, label);
    if (value === key) option.setAttribute('selected', 'selected');
    goog.dom.appendChild(this.element_, option);
  }, this);
};



xrx.forms.Select.prototype.mvcRemove = function() {
  goog.dom.removeChildren(this.element_);
};



xrx.forms.Select.prototype.mvcModelUpdateData = function() {
  xrx.mvc.Controller.updateNode(this, this.getResult().getNode(0),
      goog.dom.forms.getValue(this.element_));
};
