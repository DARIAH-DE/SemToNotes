/**
 * @fileoverview Class implements an XML console to pretty
 *     print XML instances in the browser.
 */

goog.provide('xrx.component.Console');


goog.require('goog.dom.DomHelper');
goog.require('xrx.node');
goog.require('xrx.xml.Indent');
goog.require('xrx.xml.Serialize');
goog.require('xrx.mvc');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.mvc.Cursor');



/**
 * @constructor
 */
xrx.component.Console = function(element) {

  this.tabSize_ = 2;

  this.maxLines_ = 500;

  goog.base(this, element);
};
goog.inherits(xrx.component.Console, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-console', xrx.component.Console);



/**
 *
 */
xrx.component.Console.prototype.createDom = function() {};



/**
 *
 */
xrx.component.Console.prototype.getValue = function() {
  return goog.dom.getTextContent(this.element_);
};



/**
 *
 */
xrx.component.Console.prototype.mvcRemove = function() {
  goog.dom.setTextContent(this.element_, '');
};



/**
 *
 */
xrx.component.Console.prototype.mvcRefresh = function() {
  var node = this.getResult().getNode(0);
  var type = node ? node.getType() : undefined;
  if (!node) {
    goog.dom.setTextContent(this.element_, '');
  } else if (type === xrx.node.ELEMENT || type === xrx.node.DOCUMENT) {
    var text = xrx.xml.Indent.forward(node.getXml(), this.tabSize_, undefined, this.maxLines_);
    goog.dom.setTextContent(this.element_, text);
  } else {
    goog.dom.setTextContent(this.element_, node.getXml());
  };
};
