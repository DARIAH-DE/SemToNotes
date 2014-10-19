***REMOVED***
***REMOVED*** @fileoverview Class implements an XML console to pretty
***REMOVED***     print XML instances in the browser.
***REMOVED***

goog.provide('xrx.widget.Console');


***REMOVED***
goog.require('goog.string');
goog.require('goog.style');
goog.require('xrx.mvc.Cursor');
goog.require('xrx.xml.Serialize');
goog.require('xrx.token.StartTag');
goog.require('xrx.token.EndTag');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.mvc');



***REMOVED***
***REMOVED***
***REMOVED***
xrx.widget.Console = function(element) {

  this.tabSize_ = 2;

***REMOVED***
***REMOVED***
goog.inherits(xrx.widget.Console, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-widget-console', xrx.widget.Console);



xrx.widget.Console.prototype.createDom = function() {
  goog.style.setStyle(this.element_, 'white-space', 'pre-wrap');
  goog.style.setStyle(this.element_, 'white-space', '-moz-pre-wrap');
  goog.style.setStyle(this.element_, 'white-space', '-o-pre-wrap');
  goog.style.setStyle(this.element_, 'word-wrap', 'break-word');
***REMOVED***



xrx.widget.Console.prototype.getValue = function() {
  return goog.dom.getTextContent(this.element_);
***REMOVED***



xrx.widget.Console.prototype.setValue = function(xml) {
  var cursor = xrx.mvc.Cursor.getNode(0);
  if (!cursor) {
    var text = xrx.xml.Serialize.indent.forward(xml, this.tabSize_, undefined, 30);
    goog.dom.setTextContent(this.element_, text);
  } else {
    var pilot = cursor.getInstance().getPilot();
    var token = cursor.getToken();
    var text = '';
    text += goog.string.trimRight(xrx.xml.Serialize.indent.backward(xml, this.tabSize_, token, 15));
    if (text.match('\n') && !text.match('\n').length < 15) text = '... ' + text;
    text += xrx.xml.Serialize.indent.forward(xml, this.tabSize_, token, 15);
    text += ' ...';
    goog.dom.setTextContent(this.element_, text);
  }
***REMOVED***



***REMOVED***
***REMOVED***
***REMOVED***
xrx.widget.Console.prototype.mvcRemove = function() {
  goog.dom.setTextContent(this.element_, '');
***REMOVED***



***REMOVED***
***REMOVED***
***REMOVED***
xrx.widget.Console.prototype.mvcRefresh = function() {
  var node = this.getNode();
  var xml = node ? node.getXml() : '';
  this.setValue(xml);
***REMOVED***
