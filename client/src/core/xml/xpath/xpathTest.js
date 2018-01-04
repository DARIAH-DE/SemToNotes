/**
 * @fileoverview Utilities for XPath JSUnit tests.
 */

goog.provide('xrx.xpath.Test');



goog.require('goog.dom.DomHelper');
goog.require('goog.testing.jsunit');
goog.require('xrx');
goog.require('xrx.mvc');
goog.require('xrx.mvc.Components');
goog.require('xrx.mvc.Instance');
goog.require('xrx.node');
goog.require('xrx.node.Nodes');
goog.require('xrx.xpath');



xrx.xpath.Test = {};



xrx.xpath.Test.query_ = function(expression) {
  var element = goog.dom.createElement('div');
  var element2 = goog.dom.createElement('div');
  goog.dom.classes.set(element2, 'xrx-document');
  goog.dom.setTextContent(element2, '<dummy/>');
  goog.dom.append(element, element2);
  var instance = new xrx.mvc.Instance(element);
  var node = new xrx.node.DocumentS(instance.getId());
  return xrx.xpath.evaluate(expression, node, null, xrx.xpath.XPathResultType.ANY_TYPE);
};



xrx.xpath.Test.assertEquals = function(expected, expression) {
  var result = xrx.xpath.Test.query_(expression);
  switch (result.resultType) {
  case xrx.xpath.XPathResultType.NUMBER_TYPE:
    assertEquals(expected, result.numberValue);
    break;
  case xrx.xpath.XPathResultType.STRING_TYPE:
    assertEquals(expected, result.stringValue);
    break;
  case xrx.xpath.XPathResultType.BOOLEAN_TYPE:
    assertEquals(expected, result.booleanValue);
    break;
  default:
    assertEquals('Missing XPath Result Type', '');
    break;
  }
};



xrx.xpath.Test.assertTrue = function(test, expression) {
  var result = xrx.xpath.Test.query_(expression);
  switch (result.resultType) {
  case xrx.xpath.XPathResultType.NUMBER_TYPE:
    assertTrue(test(result.numberValue));
    break;
  case xrx.xpath.XPathResultType.STRING_TYPE:
    assertTrue(test(result.stringValue));
    break;
  case xrx.xpath.XPathResultType.BOOLEAN_TYPE:
    assertTrue(test(result.booleanValue));
    break;
  default:
    assertTrue('Missing XPath Result Type', '');
    break;
  }
};
