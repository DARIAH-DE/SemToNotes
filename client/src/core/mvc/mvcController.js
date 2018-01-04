/**
 * @fileoverview A class representing the controller of
 * a model-view-controller.
 */

goog.provide('xrx.mvc.Controller');



goog.require('xrx.mvc.Recalculate');
goog.require('xrx.mvc.Refresh');
goog.require('xrx.node');
goog.require('xrx.node.Binary');
goog.require('xrx.index.Rebuild');
goog.require('xrx.token');
goog.require('xrx.token.Tokens');
goog.require('xrx.xml.Update');



xrx.mvc.Controller = function() {};



xrx.mvc.Controller.updateNode = function(control, opt_node, update) {
  var node = opt_node || control.getResult().getNode(0);
  var token = node.getToken();
  var pilot = node.getInstance().getPilot();
  switch(node.getType()) {
  case xrx.node.ATTRIBUTE:
    var attrValue = new xrx.token.AttrValue(token.label().clone());
    attrValue = pilot.attrValue(node.parent_.getToken(), attrValue);
    xrx.mvc.Controller.replaceAttrValue(control, node, attrValue, update);
    break;
  case xrx.node.TEXT:
    xrx.mvc.Controller.replaceNotTag(control, node, token, update);
    break;
  case xrx.node.ELEMENT:
    if (token.type() === xrx.token.EMPTY_TAG) return;
    var label = token.label().clone();
    if (token.type() === xrx.token.START_TAG) label.push(0);
    var notTag = new xrx.token.NotTag(label);
    notTag = pilot.notTag(token, notTag);
    xrx.mvc.Controller.replaceNotTag(control, node, notTag, update);
    break;
  default:
    throw Error('Value update not supported for this node-type.');
    break;
  }
};



xrx.mvc.Controller.insertNode = function(control, opt_node, newNode) {
  var node = opt_node || control.getResult().getNode(0);
  var pilot = node.getInstance().getPilot();
  var token = node.getToken();
  switch(token.type()) {
  case xrx.token.EMPTY_TAG:
    var notTag = new xrx.token.NotTag(token.label().clone());
    notTag = pilot.notTag(token, notTag);
    xrx.mvc.Controller.insertFragment(control, node, notTag, 0, newNode.getXml());
    break;
  case xrx.token.START_TAG:
    var notTag = new xrx.token.NotTag(token.label().clone());
    notTag = pilot.notTag(token, notTag);
    xrx.mvc.Controller.insertFragment(control, node, notTag, 0, newNode.getXml());
    break;
  default:
    throw Error('Insert operation not supported for this token-type.');
    break;
  }
};



xrx.mvc.Controller.removeNode = function(control, opt_node) {
  var node = opt_node || control.getResult().getNode(0);
  var pilot = node.getInstance().getPilot();
  var token = node.getToken();
  switch(token.type()) {
  case xrx.token.EMPTY_TAG:
    xrx.mvc.Controller.removeEmptyTag(control, node, token);
    break;
  case xrx.token.START_TAG:
    var token2 = pilot.location(token, new xrx.token.EndTag(token.label()));
    var fragment = new xrx.token.Fragment(token, token2);
    xrx.mvc.Controller.removeFragment(control, node, fragment);
    break;
  default:
    throw Error('Remove operation not supported for this token-type.');
    break;
  }
};



xrx.mvc.Controller.insertAttribute = function() {
};



xrx.mvc.Controller.insertEmptyTag = function(control, node, notTag, offset, emptyTag) {
  var diff = xrx.xml.Update.insertEmptyTag(node.getInstance(), notTag, offset, emptyTag);
  xrx.index.Rebuild.insertEmptyTag(node.getInstance().getIndex(), notTag, offset, diff);
  var binds = xrx.mvc.Recalculate.insertEmptyTag(node.getInstance().getId());
  xrx.mvc.Refresh.insertEmptyTag(control, node, binds);
};



xrx.mvc.Controller.insertFragment = function(control, node, notTag, offset, xml) {
  var diff = xrx.xml.Update.insertFragment(node.getInstance(), notTag, offset, xml);
  xrx.index.Rebuild.insertFragment(node.getInstance().getIndex(), node.getInstance().xml());
  var binds = xrx.mvc.Recalculate.insertFragment(node.getInstance().getId());
  xrx.mvc.Refresh.insertFragment(control, node, binds);
};



xrx.mvc.Controller.insertMixed = function() {
  var binds = xrx.mvc.Recalculate.insertMixed();
};



xrx.mvc.Controller.insertNotTag = function(control, token, offset, update) {
  var node = control.getResult().getNode(0);
  var tok = token || node.getToken();
  var diff = xrx.xml.Update.insertNotTag(node.getInstance(), tok, offset, update);
  xrx.index.Rebuild.insertNotTag(node.getInstance().getIndex(), tok, diff);
  var binds = xrx.mvc.Recalculate.insertNotTag(node.getInstance().getId());
  xrx.mvc.Refresh.insertNotTag(control, node, binds);
};



xrx.mvc.Controller.insertStartEndTag = function() {
  var binds = xrx.mvc.Recalculate.insertStartEndTag(node.getInstance().getId());
};



xrx.mvc.Controller.removeAttribute = function() {
  var binds = xrx.mvc.Recalculate.removeAttribute(node.getInstance().getId());
};



xrx.mvc.Controller.removeEmptyTag = function(control, node, token) {
  var diff = xrx.xml.Update.removeEmptyTag(node.getInstance(), token);
  xrx.index.Rebuild.removeEmptyTag(node.getInstance().getIndex(), token, diff);
  var binds = xrx.mvc.Recalculate.removeEmptyTag(node.getInstance().getId());
  xrx.mvc.Refresh.removeEmptyTag(control, node, binds);
};



xrx.mvc.Controller.removeFragment = function(control, node, token) {
  var diff = xrx.xml.Update.removeFragment(node.getInstance(), token);
  xrx.index.Rebuild.removeFragment(node.getInstance().getIndex(), node.getInstance().xml());
  var binds = xrx.mvc.Recalculate.removeFragment(node.getInstance().getId());
  xrx.mvc.Refresh.removeFragment(control, node, binds);
};



xrx.mvc.Controller.removeMixed = function() {
  var binds = xrx.mvc.Recalculate.removeMixed(node.getInstance().getId());
};



xrx.mvc.Controller.removeStartEndTag = function(control, token1, token2) {
  var node = control.getResult().getNode(0);
  var diff = xrx.xml.Update.removeStartEndTag(node.getInstance(), token1, token2);
  xrx.index.Rebuild.removeStartEndTag(node.getInstance().getIndex(), token1, diff);
  var binds = xrx.mvc.Recalculate.removeStartEndTag(node.getInstance().getId());
  xrx.mvc.Refresh.removeStartEndTag(control, node, binds);
};



xrx.mvc.Controller.replaceAttrValue = function(control, node, token, update) {
  var parent = node.getParent();
  var instance = node.getInstance();
  var diff = xrx.xml.Update.replaceAttrValue(instance, token, update);
  xrx.index.Rebuild.replaceAttrValue(instance.getIndex(), token, diff);
  var binds = xrx.mvc.Recalculate.replaceAttrValue(node.getInstance().getId());
  xrx.mvc.Refresh.replaceAttrValue(control, node, binds);
};



xrx.mvc.Controller.replaceNotTag = function(control, node, token, update) {
  var instance = node.getInstance();
  var diff = xrx.xml.Update.replaceNotTag(instance, token, update);
  xrx.index.Rebuild.replaceNotTag(instance.getIndex(), token, diff);
  var binds = xrx.mvc.Recalculate.replaceNotTag(node.getInstance().getId());
  xrx.mvc.Refresh.replaceNotTag(control, node, binds);
};



xrx.mvc.Controller.replaceTagName = function() {
  var binds = xrx.mvc.Recalculate.replaceTagName(node.getInstance().getId());
};
