/**
 * @fileoverview
 */

goog.provide('xrx.mvc');



goog.require('goog.dom.DomHelper');
goog.require('goog.object');



/**
 * @constructor
 */
xrx.mvc = function() {};



/** @const */ xrx.mvc.MODEL = 'model';



/** @const */ xrx.mvc.VIEW = 'view';



/**
 * Stack of model components.
 */
xrx.mvc[xrx.mvc.MODEL] = {};



/**
 * Stack of view components.
 */
xrx.mvc[xrx.mvc.VIEW] = {};



/**
 * @private
 */
xrx.mvc.addComponent_ = function(id, component, mv) {
  xrx.mvc[mv][id] = component;
};



/**
 * Add a model component to the MVC stack.
 */
xrx.mvc.addModelComponent = function(id, component) {
  xrx.mvc.addComponent_(id, component, xrx.mvc.MODEL);
};



/**
 * Add a view component to the MVC stack.
 */
xrx.mvc.addViewComponent = function(id, component) {
  xrx.mvc.addComponent_(id, component, xrx.mvc.VIEW);
};



xrx.mvc.getComponent = function(id) {
  return xrx.mvc[xrx.mvc.MODEL][id] ||
      xrx.mvc[xrx.mvc.VIEW][id];
};



xrx.mvc.getModelComponent = function(id) {
  return xrx.mvc[xrx.mvc.MODEL][id];
};



xrx.mvc.getViewComponent = function(id) {
  return xrx.mvc[xrx.mvc.VIEW][id];
};



xrx.mvc.getModelComponents = function() {
  return xrx.mvc[xrx.mvc.MODEL];
};



xrx.mvc.getViewComponents = function() {
  return xrx.mvc[xrx.mvc.VIEW];
};



xrx.mvc.removeModelComponent = function(id) {
  var component = xrx.mvc[xrx.mvc.MODEL][id];
  component.mvcRemove();
  if (component) goog.object.remove(xrx.mvc[xrx.mvc.MODEL], id);
};



xrx.mvc.removeModelComponents = function(parent) {
  goog.object.forEach(xrx.mvc[xrx.mvc.MODEL], function(component, id) {
    if (goog.dom.contains(parent, component.getElement()))
        if (parent !== component.getElement()) xrx.mvc.removeModelComponent(id);
  }, this);
};



xrx.mvc.removeViewComponent = function(id) {
  var component = xrx.mvc[xrx.mvc.VIEW][id];
  component.mvcRemove();
  if (component) goog.object.remove(xrx.mvc[xrx.mvc.VIEW], id);
};



xrx.mvc.removeViewComponents = function(parent) {
  goog.object.forEach(xrx.mvc[xrx.mvc.VIEW], function(component, id) {
    if (goog.dom.contains(parent, component.getElement())) {
      if (parent !== component.getElement()) xrx.mvc.removeViewComponent(id);
    }
  }, this);
};



xrx.mvc.getInstanceDefault = function() {
  var instance;
  for(var i in xrx.mvc[xrx.mvc.MODEL]) {
    var component = xrx.mvc[xrx.mvc.MODEL][i];
    if (component instanceof xrx.mvc.Instance) {
      instance = component;
      break;
    }
  }
  return instance;
};
