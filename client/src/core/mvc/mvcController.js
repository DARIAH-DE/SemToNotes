/**
 * @fileoverview A class representing the controller of
 *    a model-view-controller.
 */

goog.provide('xrx.mvc.Controller');



goog.require('xrx.mvc.Cursor');
goog.require('xrx.node');
goog.require('xrx.node.Binary');
goog.require('xrx.index.Rebuild');
goog.require('xrx.token');
goog.require('xrx.token.Tokens');
goog.require('xrx.xml.Update');



xrx.mvc.Controller = function() {};



xrx.mvc.Controller.INSERT = 'insert';



xrx.mvc.Controller.REMOVE = 'remove';



xrx.mvc.Controller.UPDATE = 'update';



xrx.mvc.Controller.currentOperation = '';



xrx.mvc.Controller.updateNode = function(control, opt_node, update) {
  var node = opt_node || control.getNode();
  var token = node.getToken();
  var pilot = node.getInstance().getPilot();
  xrx.mvc.Controller.currentOperation_ = xrx.mvc.Controller.UPDATE;
  switch(node.getType()) {
  case xrx.node.ATTRIBUTE:
    var attrValue = new xrx.token.AttrValue(token.label().clone());
    attrValue = pilot.attrValue(node.parent_.getToken(), attrValue);
    xrx.mvc.Controller.replaceAttrValue(control, node, attrValue, update);
    break;
  case xrx.node.TEXT:
    xrx.mvc.Controller.replaceNotTag(control, node, token, update);
    break;
  default:
    throw Error('Value update not supported for this node-type.');
    break;
  }
};



xrx.mvc.Controller.insertNode = function(control, opt_node, newNode) {
  var node = opt_node || control.getNode();
  var pilot = node.getInstance().getPilot();
  var token = node.getToken();
  xrx.mvc.Controller.currentOperation_ = xrx.mvc.Controller.INSERT;
  switch(token.type()) {
  case xrx.token.EMPTY_TAG:
    var notTag = new xrx.token.NotTag(token.label().clone());
    notTag = pilot.notTag(token, notTag);
    xrx.mvc.Controller.insertEmptyTag(control, node, notTag, 0, newNode.getXml());
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
  var node = opt_node || control.getNode();
  var token = node.getToken();
  xrx.mvc.Controller.currentOperation_ = xrx.mvc.Controller.REMOVE;
  switch(token.type()) {
  case xrx.token.EMPTY_TAG:
    xrx.mvc.Controller.removeEmptyTag(control, node, token);
    break;
  default:
    throw Error('Remove operation not supported for this token-type.');
    break;
  }
};



xrx.mvc.Controller.replaceNotTag = function(control, node, token, update) {
  var instance = node.getInstance();
  var diff = xrx.xml.Update.replaceNotTag(instance, token, update);
  xrx.index.Rebuild.replaceNotTag(instance.getIndex(), token, diff);
  xrx.mvc.Controller.mvcRefresh(control, node);
};



xrx.mvc.Controller.replaceAttrValue = function(control, node, token, update) {
  var parent = node.getParent();
  var instance = node.getInstance();
  var diff = xrx.xml.Update.replaceAttrValue(instance, token, update);
  xrx.index.Rebuild.replaceAttrValue(instance.getIndex(), token, diff);
  xrx.mvc.Controller.mvcRefresh(control, node);
  return diff;
};



xrx.mvc.Controller.insertNotTag = function(control, token, offset, update) {
  var node = control.getNode();
  var tok = token || node.getToken();

  var diff = xrx.xml.Update.insertNotTag(node.getInstance(), tok, offset, update);

  if (node instanceof xrx.node.Binary) xrx.index.Rebuild.insertNotTag(node.getInstance().getIndex(),
      tok, diff);

  xrx.mvc.Controller.mvcRefresh(control, diff, update);
};



xrx.mvc.Controller.reduceNotTag = function(control, token, offset, length) {
  var node = control.getNode();
  var tok = token || node.getToken();

  var diff = xrx.xml.Update.reduceNotTag(node.getInstance(), tok, offset, length);

  //if (node instanceof xrx.node.Binary) xrx.index.Rebuild.reduceNotTag(node.getInstance().getIndex(),
  //    tok, diff);

  xrx.mvc.Controller.mvcRefresh(control, diff, '');
};



xrx.mvc.Controller.insertEmptyTag = function(control, node, notTag, offset, emptyTag) {
  var diff = xrx.xml.Update.insertEmptyTag(node.getInstance(), notTag, offset, emptyTag);
  xrx.index.Rebuild.insertEmptyTag(node.getInstance().getIndex(), notTag, offset, diff);
  xrx.mvc.Controller.mvcRecalculate();
  xrx.mvc.Controller.mvcRefresh(control, node);
};



xrx.mvc.Controller.insertFragment = function(control, node, notTag, offset, xml) {
  var diff = xrx.xml.Update.insertFragment(node.getInstance(), notTag, offset, xml);
  xrx.index.Rebuild.insertFragment(node.getInstance().getIndex(), node.getInstance().xml());
  xrx.mvc.Controller.mvcRecalculate();
  xrx.mvc.Controller.mvcRefresh(control, node);
};



xrx.mvc.Controller.removeEmptyTag = function(control, node, token) {
  var diff = xrx.xml.Update.removeEmptyTag(node.getInstance(), token);
  xrx.index.Rebuild.removeEmptyTag(node.getInstance().getIndex(), token, diff);
  xrx.mvc.Controller.mvcRecalculate();
  xrx.mvc.Controller.mvcRefresh(control, node);
};



xrx.mvc.Controller.removeStartEndTag = function(control, token1, token2) {
  var node = control.getNode();

  var diff = xrx.xml.Update.removeStartEndTag(node.getInstance(), token1, token2);

  //if (node instanceof xrx.node.Binary) xrx.index.Rebuild.removeStartEndTag(node.getInstance().getIndex(),
  //    token1, diff);

  xrx.mvc.Controller.mvcRefresh(control);
};



/**
 * Recalculates all model components affected by the update.
 */
xrx.mvc.Controller.mvcRecalculate = function() {
  var contr;
  for (var c in xrx.mvc.getModelComponents()) {
    contr = xrx.mvc.getModelComponent(c);
    if (contr.mvcRecalculate) contr.mvcRecalculate();
  }
};



/**
 * @private
 */
xrx.mvc.Controller.mvcRefreshDynamicView_ = function(control) {
  if (xrx.mvc.Controller.currentOperation_ === xrx.mvc.Controller.UPDATE) return;
  var repeat = control.getRepeat();
  if (repeat) {
    repeat.mvcRefresh();
  };
};



/**
 * @private
 */
xrx.mvc.Controller.mvcRefreshStaticView_ = function(control, node) {
  var component;
  var nIter;
  for (var c in xrx.mvc.getViewComponents()) {
    component = xrx.mvc.getViewComponent(c);
    nIter = component.getNode(0);
    if (component instanceof xrx.mvc.Repeat) {
    } else if (component === control) {
    } else if (component && node && nIter && xrx.mvc.Controller.currentOperation_ === xrx.mvc.Controller.UPDATE) {
      if (nIter.getInstance() === node.getInstance() && node.getLabel().isDescendantOf(nIter.getLabel())) {
        component.mvcRefresh();
      }
    } else {
      component.mvcRefresh();
    }
  }
};



/**
 * Refreshes all view components affected by the update.
 */
xrx.mvc.Controller.mvcRefresh = function(control, node) {
  xrx.mvc.Controller.mvcRefreshDynamicView_(control);
  xrx.mvc.Controller.mvcRefreshStaticView_(control, node);
};
