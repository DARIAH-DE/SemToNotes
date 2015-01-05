/**
 * @fileoverview Class implements an XML console to pretty
 *     print XML instances in the browser.
 */

goog.provide('xrx.widget.Console');


goog.require('goog.dom.DomHelper');
goog.require('goog.string');
goog.require('goog.style');
goog.require('xrx.xml.Indent');
goog.require('xrx.xml.Serialize');
goog.require('xrx.token.Tokens');
goog.require('xrx.mvc');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.mvc.Cursor');



/**
 * @constructor
 */
xrx.widget.Console = function(element) {

  this.tabSize_ = 2;

  this.maxLines_ = 50;

  goog.base(this, element);
};
goog.inherits(xrx.widget.Console, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-widget-console', xrx.widget.Console);



/**
 *
 */
xrx.widget.Console.prototype.createDom = function() {};



/**
 *
 */
xrx.widget.Console.prototype.getValue = function() {
  return goog.dom.getTextContent(this.element_);
};



/**
 *
 */
xrx.widget.Console.prototype.mvcRemove = function() {
  goog.dom.setTextContent(this.element_, '');
};



/**
 *
 */
xrx.widget.Console.prototype.mvcRefresh = function() {
  var node = this.getNode();
  var type = node ? node.getType() : undefined;
  if (!node) {
    goog.dom.setTextContent(this.element_, '');
  } else if (type === xrx.node.ELEMENT || type === xrx.node.DOCUMENT) {
    var text = xrx.xml.Indent.forward(node.getXml(), this.tabSize_, undefined, this.maxLines_);
    goog.dom.setTextContent(this.element_, text);
  } else {
    goog.dom.setTextContent(this.element_, node.getXml());
  }
};
