/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Refresh');



goog.require('goog.array');
goog.require('xrx.mvc.Repeat');



xrx.mvc.Refresh = function() {};



/**
 * Refreshes all view components affected by an update.
 */
xrx.mvc.Refresh.refresh_ = function(control, binds, opt_test) {
  var component;
  var test = opt_test || function() { return false; };
  for (var c in xrx.mvc.getViewComponents()) {
    component = xrx.mvc.getViewComponent(c);
    if (test(component)) {
      component.mvcRefresh();
    } else if (goog.array.contains(binds, component.getBindId())) {
      component.mvcRefresh();
    } else {}
  }
};



xrx.mvc.Refresh.insertAttribute = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.insertEmptyTag = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.insertFragment = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.insertMixed = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.insertStartEndTag = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.removeAttribute = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.removeEmptyTag = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.removeFragment = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.removeMixed = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.removeStartEndTag = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.replaceAttrValue = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};



xrx.mvc.Refresh.replaceNotTag = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds, function(component) {
    var n = component.getNode();
    return node && n ? node.getLabel().isDescendantOf(n.getLabel()) : false;
  });
};



xrx.mvc.Refresh.replaceTagName = function(control, node, binds) {
  xrx.mvc.Refresh.refresh_(control, binds);
};
