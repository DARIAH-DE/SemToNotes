/**
 * @fileoverview A class representing an action.
 */

goog.provide('xrx.mvc.Action');



goog.require('goog.array');
goog.require('goog.dom.DomHelper');
goog.require('xrx.mvc.AbstractAction');



/**
 * @constructor
 */
xrx.mvc.Action = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Action, xrx.mvc.AbstractAction);



xrx.mvc.Action.prototype.execute_ = function(opt_params) {
  var children = goog.dom.getChildren(this.element_);
  goog.array.forEach(children, function(e) {
    console.log(e);
    xrx.mvc.getComponent(e.id).execute(opt_params);
  });
};
