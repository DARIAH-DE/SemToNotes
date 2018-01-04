/**
 * @fileoverview A class representing a MVC child component. Child
 *   components share the DOM element with their parent components
 *   but have their own XPath expressions and result sets.
 */

goog.provide('xrx.mvc.ChildComponent');



goog.require('xrx.mvc');
goog.require('xrx.mvc.Component');



/**
 * @constructor
 */
xrx.mvc.ChildComponent = function(parent) {

  this.parent_ = parent;

  this.xpath_;

  this.compileXpath_();
};



xrx.mvc.ChildComponent.prototype.getRefExpression = goog.abstractMethod;



xrx.mvc.ChildComponent.prototype.getBindId = goog.abstractMethod;



xrx.mvc.ChildComponent.prototype.getCalculateId =
    xrx.mvc.Component.prototype.getCalculateId;



xrx.mvc.ChildComponent.prototype.getCalculate =
    xrx.mvc.Component.prototype.getCalculate;



xrx.mvc.ChildComponent.prototype.getDataset = function(dataset) {
  return this.parent_.getDataset(dataset);
};



/**
 * @private
 */
xrx.mvc.ChildComponent.prototype.getBind =
    xrx.mvc.Component.prototype.getBind;



/**
 * @private
 */
xrx.mvc.ChildComponent.prototype.compileXpath_ =
    xrx.mvc.Component.prototype.compileXpath_;



/**
 * 
 */
xrx.mvc.ChildComponent.prototype.getRepeatIndex = function() {
  return this.parent_.getRepeatIndex();
};



/**
 * 
 */
xrx.mvc.ChildComponent.prototype.getRepeat = function() {
  var element = goog.dom.getAncestorByClass(this.parent_.getElement(), 'xrx-repeat');
  return element ? xrx.mvc.getViewComponent(element.id) : undefined;
};



/**
 * @private
 */
xrx.mvc.ChildComponent.prototype.getResultByRef_ =
    xrx.mvc.Component.prototype.getResultByRef_;



/**
 *
 */
xrx.mvc.ChildComponent.prototype.getResult =
    xrx.mvc.Component.prototype.getResult;
