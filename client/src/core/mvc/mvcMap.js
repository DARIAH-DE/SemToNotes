/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Map');



goog.require('goog.dom.DomHelper');
goog.require('goog.structs.Map');
goog.require('xrx.mvc.ComponentModel');
goog.require('xrx.xpath');



xrx.mvc.Map = function(element) {

  this.map_ = new goog.structs.Map();

  goog.base(this, element);

  this.keyExpr_;

  this.valueExpr_;
};
goog.inherits(xrx.mvc.Map, xrx.mvc.ComponentModel);



xrx.mvc.Map.prototype.createDom = function() {
  var entryElement = goog.dom.getElementByClass('xrx-entry', this.element_);
  this.keyExpr_ = this.getDataset('xrxKey', entryElement);
  this.valueExpr_ = this.getDataset('xrxValue', entryElement);
};



xrx.mvc.Map.prototype.getMap = function(num) {
  return this.map_;
};



xrx.mvc.Map.prototype.mvcRecalculate = function() {
  var node;
  var value;
  var key;
  var i = 0;
  this.map_.clear();
  while(node = this.getResult().getNode(i)) {
    key = xrx.xpath.evaluate(this.keyExpr_, node, null,
        xrx.xpath.XPathResultType.STRING_TYPE).stringValue;
    value = xrx.xpath.evaluate(this.valueExpr_, node, null,
        xrx.xpath.XPathResultType.STRING_TYPE).stringValue;
    this.map_.set(key, value);
    i++;
  };
};
