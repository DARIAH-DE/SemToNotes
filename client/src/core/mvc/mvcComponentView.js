/**
 * @fileoverview Abstract class which represents a
 * control of the model-view-controller.
 */

goog.provide('xrx.mvc.ComponentView');



goog.require('goog.dom');
goog.require('xrx.mvc.Component');
goog.require('xrx.mvc.Mvc');
goog.require('xrx.node.ElementS');



/**
 * @constructor
 */
xrx.mvc.ComponentView = function(element) {

  goog.base(this, element);

  xrx.mvc.Mvc.addViewComponent(this.getId(), this);

  this.createDom();

  this.refresh();
};
goog.inherits(xrx.mvc.ComponentView, xrx.mvc.Component);



xrx.mvc.ComponentView.prototype.getRepeat = function() {
  var element = goog.dom.getAncestorByClass(this.element_, 'xrx-mvc-repeat');
  var id = element.getAttribute('id');
  return xrx.mvc.Mvc.getViewComponent(id);
};



xrx.mvc.ComponentView.prototype.getRepeatIndex = function() {
  var repeatItem = goog.dom.getAncestorByClass(this.element_,
      'xrx-repeat-item');
  if (goog.dom.classes.has(this.element_, 'xrx-repeat-item')) {
    return this.element_.getAttribute('data-xrx-repeat-index');
  } else if (repeatItem) {
    return repeatItem.getAttribute('data-xrx-repeat-index');
  } else {
    throw Error('Repeat item could not be found.');
  }
}; 



xrx.mvc.ComponentView.prototype.getNodeBind = function(num) {
  return this.getBind().getNode(num);
};



xrx.mvc.ComponentView.prototype.getNodeRef = function() {
  var context = this.getRepeat().getNode(this.getRepeatIndex());
  // TODO: Node conversion function
  var nodeS = new xrx.node.ElementS(context.getInstance(), context.getToken());
  var result = xrx.xpath.evaluate(this.getRefExpression(), nodeS, null,
      xrx.xpath.XPathResultType.ANY_TYPE);
  var next = result.iterateNext();
  return next;
};



/**
 * Returns the node referenced by the control.
 * @return {xrx.node} The node.
 */
xrx.mvc.ComponentView.prototype.getNode = function(num) {
  var n = num || 0;

  if (this.getBind()) {
    return this.getNodeBind(n);
  } else if (this.getRefExpression()) {
    return this.getNodeRef(n);
  } else {
    throw Error('A control must define a data-xrx-mvc-bind or a data-xrx-mvc-ref ' +
        'attribute.');
  }
};
