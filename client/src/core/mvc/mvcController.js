***REMOVED***
***REMOVED*** @fileoverview A class representing the controller of
***REMOVED*** the model-view-controller.
***REMOVED***

goog.provide('xrx.mvc.Controller');



goog.require('xrx.node');
goog.require('xrx.nodeB');
goog.require('xrx.rebuild');
goog.require('xrx.token.Tokens');
goog.require('xrx.update');



xrx.mvc.Controller = function() {***REMOVED***



***REMOVED***
***REMOVED*** 
***REMOVED***
xrx.mvc.Controller.update = function(control, operation, token, update) {
  var node = control.getNode();
  var tok = token || node.getToken();

  var diff = xrx.update[operation](node.getInstance(), tok, update);

  if (node instanceof xrx.nodeB) xrx.rebuild[operation](node.getInstance().getIndex(),
      tok, diff);

  xrx.mvc.Controller.refresh(control, diff, update);
***REMOVED***



xrx.mvc.Controller.updateValueLike = function(control, update) {
  var node = control.getNode();
  var token = node.getToken();
  var pilot = node.getInstance().getPilot();
  switch(node.getType()) {
  case xrx.node.ATTRIBUTE:
    var attrValue = new xrx.token.AttrValue(token.label().clone());
    attrValue = pilot.attrValue(node.parent_.getToken(), attrValue);
    xrx.mvc.Controller.replaceAttrValue(control, attrValue, update);
    break;
  default:
    throw Error('Value update not supported for this node-type.');
    break;
  }
***REMOVED***



xrx.mvc.Controller.replaceNotTag = function(control, token, update) {
  var node = control.getNode();
  var diff = xrx.update.replaceNotTag(node.getInstance(), token, update);
  if (node instanceof xrx.nodeB) xrx.rebuild.replaceNotTag(node.getInstance().getIndex(),
      token, diff);
  xrx.mvc.Controller.refresh(control);
***REMOVED***



xrx.mvc.Controller.replaceAttrValue = function(control, token, update) {
  var node = control.getNode();
  var parent = node.getParent();
  var instance = node.getInstance();
  var diff = xrx.update.replaceAttrValue(instance, token, update);
  xrx.rebuild.replaceAttrValue(instance.getIndex(), token, diff);
  xrx.mvc.Controller.refresh(control);
  return diff;
***REMOVED***



xrx.mvc.Controller.insertNotTag = function(control, token, offset, update) {
  var node = control.getNode();
  var tok = token || node.getToken();

  var diff = xrx.update.insertNotTag(node.getInstance(), tok, offset, update);

  if (node instanceof xrx.nodeB) xrx.rebuild.insertNotTag(node.getInstance().getIndex(),
      tok, diff);

  xrx.mvc.Controller.refresh(control, diff, update);
***REMOVED***



xrx.mvc.Controller.reduceNotTag = function(control, token, offset, length) {
  var node = control.getNode();
  var tok = token || node.getToken();

  var diff = xrx.update.reduceNotTag(node.getInstance(), tok, offset, length);

  //if (node instanceof xrx.nodeB) xrx.rebuild.reduceNotTag(node.getInstance().getIndex(),
  //    tok, diff);

  xrx.mvc.Controller.refresh(control, diff, '');
***REMOVED***



xrx.mvc.Controller.removeEmptyTag = function(control, token) {
  var node = control.getNode();

  var diff = xrx.update.removeEmptyTag(node.getInstance(), token);

  if (node instanceof xrx.nodeB) xrx.rebuild.removeEmptyTag(node.getInstance().getIndex(),
      token, diff);

  xrx.mvc.Controller.refresh(control);
***REMOVED***



xrx.mvc.Controller.removeStartEndTag = function(control, token1, token2) {
  var node = control.getNode();

  var diff = xrx.update.removeStartEndTag(node.getInstance(), token1, token2);

  //if (node instanceof xrx.nodeB) xrx.rebuild.removeStartEndTag(node.getInstance().getIndex(),
  //    token1, diff);

  xrx.mvc.Controller.refresh(control);
***REMOVED***



***REMOVED***
***REMOVED*** Refreshes all other controls that are affected by the update.
***REMOVED***
xrx.mvc.Controller.refresh = function(control) {
  var nIter;
  var node = control.getNode();

  for (var c in xrx.mvc.Mvc.getViewComponents()) {
    var contr = xrx.mvc.Mvc.getViewComponent(c);
    if (contr) nIter = contr.getNode();
    if (contr && nIter && node.getInstance() === nIter.getInstance()) {

      if (nIter.isSameAs(node) && c != control.getId()) {
        contr.refresh()
      } else if (node.getLabel().isDescendantOf(nIter.getLabel())
          && c != control.getId()) {
        contr.refresh();
      } else {}
    }
  }
***REMOVED***



