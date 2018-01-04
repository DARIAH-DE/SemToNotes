/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Recalculate');



xrx.mvc.Recalculate = function() {};



xrx.mvc.Recalculate.recalculate_ = function(instance, opt_test) {
  var recalculated = [];
  var test = opt_test || function() { return false; };
  var component;
  for (var c in xrx.mvc.getModelComponents()) {
    component = xrx.mvc.getModelComponent(c);
    if (!(component instanceof xrx.mvc.Bind) || !component.mvcRecalculate) {
    } else if (!component.getXpath().hasInstance(instance)) {
    } else if (!component.getResult().snapshotItem) {
      component.mvcRecalculate();
      recalculated.push(component.getId());
    } else if (test(component)) {
    } else {
      component.mvcRecalculate();
      recalculated.push(component.getId());
    }
  }
  return recalculated;
};



xrx.mvc.Recalculate.insertAttribute = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.insertEmptyTag = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.insertFragment = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.insertMixed = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.insertStartEndTag = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.removeAttribute = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.removeEmptyTag = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.removeFragment = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.removeMixed = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.removeStartEndTag = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};



xrx.mvc.Recalculate.replaceAttrValue = function(instance) {
  return [];
  return xrx.mvc.Recalculate.recalculate_(instance, function(control) {
    return !control.getXpath().hasNotTag();
  });
};



xrx.mvc.Recalculate.replaceNotTag = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance, function(control) {
    return !control.getXpath().hasNotTag();
  });
};



xrx.mvc.Recalculate.replaceTagName = function(instance) {
  return xrx.mvc.Recalculate.recalculate_(instance);
};
