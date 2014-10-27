/**
 * @fileoverview An abstract class which represents
 *   a component of the model-view-controller.
 */

goog.provide('xrx.mvc.Component');



goog.require('goog.dom.DomHelper');
goog.require('goog.dom.dataset');
goog.require('goog.ui.IdGenerator');



/**
 * Constructs a new model-view-controller component.
 * @constructor
 */
xrx.mvc.Component = function(element) {

  this.element_ = element;
};



xrx.mvc.Component.prototype.getAction = function(eventKey) {
  xrx.mvc.getComponent
};



/**
 * Function is called by the model-view-controller when the component
 * is initialized the first time. Each component must implement this.
 */
xrx.mvc.Component.prototype.createDom = goog.abstractMethod;



/**
 * Unique ID of the component, lazily initialized in {@link
 * xrx.mvc.Component#getId}.
 * @type {?string}
 * @private
 */
xrx.mvc.Component.prototype.id_ = null;




/**
 * Returns the component's element.
 * @return {Element} The element for the component.
 */
xrx.mvc.Component.prototype.getElement = function() {
  return this.element_;
};



/**
 * Returns the unique ID of this component. If the instance
 * doesn't already have an ID generate one on the fly.
 * @return {string} Unique component ID.
 */
xrx.mvc.Component.prototype.getId = function() {
  if (!this.id_) {
    if (this.element_.id && this.element_.id !== '') {
      this.id_ = this.element_.id;
    } else {
      this.id_ = goog.ui.IdGenerator.getInstance().getNextUniqueId();
      this.element_.id = this.id_;
    }
  }
  return this.id_;
};



/**
 * Whether the component has its own context other than a
 * repeat context.
 * @return {boolean}
 */
xrx.mvc.Component.prototype.hasContext = function() {
  return !!this.getContext;
};



/**
 * Returns the parent repeat component of the component.
 * @return {xrx.mvc.Repeat} The repeat component.
 */
xrx.mvc.Component.prototype.getRepeat = function() {
  var element = goog.dom.getAncestorByClass(this.element_, 'xrx-mvc-repeat');
  return element ? xrx.mvc.getViewComponent(element.id) : undefined;
};



/**
 * Returns the index of a dynamically repeated component.
 * @return {number} The index.
 */
xrx.mvc.Component.prototype.getRepeatIndex = function() {
  var value;
  var repeatItem = goog.dom.getAncestorByClass(this.element_,
      'xrx-mvc-repeat-item');
  if (goog.dom.classes.has(this.element_, 'xrx-mvc-repeat-item')) {
    value = goog.dom.dataset.get(this.element_, 'xrxRepeatIndex');
  } else if (repeatItem) {
    value = goog.dom.dataset.get(repeatItem, 'xrxRepeatIndex');
  } else {
    throw Error('Repeat item could not be found.');
  }
  return parseInt(value);
}; 



/**
 * Returns the XPath expression found in the component's data-xrx-ref attribute.
 * @return {string} The expression.
 */
xrx.mvc.Component.prototype.getRefExpression = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxRef';
  return goog.dom.dataset.get(this.getElement(), dataset);
};



/**
 * Returns the bind ID found in the component's data-xrx-bind attribute.
 * @return {string} The bind ID.
 */
xrx.mvc.Component.prototype.getBindId = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxBind';
  return goog.dom.dataset.get(this.getElement(), dataset);
};



/**
 * Returns the source URI found in the component's data-xrx-src attribute.
 * @return {?string} The source URI.
 */
xrx.mvc.Component.prototype.getSrcUri = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxSrc';
  return goog.dom.dataset.get(this.getElement(), dataset);
};



/**
 * Returns the bind component referenced by the component.
 * @return {xrx.mvc.Bind} The bind component.
 */
xrx.mvc.Component.prototype.getBind = function(opt_dataset) {
  return xrx.mvc.getModelComponent(this.getBindId(opt_dataset));
};



/**
 * Returns the n'th node held by the component by means of a
 * bind expression.
 * @return {xrx.node.Node} The node.
 */
xrx.mvc.Component.prototype.getNodeBind = function(num, opt_dataset) {
  return this.getBind(opt_dataset).getNode(num);
};



/**
 * Returns the node held by the component by means of a repeat component
 * and a ref expression.
 * @return {xrx.node.Node} The node.
 */
xrx.mvc.Component.prototype.getNodeRefWithRepeat = function(opt_dataset, opt_context) {
  var repeat = this.getRepeat();
  var context = repeat.getNode(this.getRepeatIndex());
  if (!context) return;
  // TODO: Node conversion function
  var nodeS = new xrx.node.ElementS(context.getDocument(), context.getToken());
  var result = xrx.xpath.evaluate(this.getRefExpression(opt_dataset), nodeS, null,
      xrx.xpath.XPathResultType.ANY_TYPE);
  var next = result.iterateNext();
  return next;
};



/**
 * Returns the node held by the component by means of a context node
 * and a ref expression.
 * @return {xrx.node.Node} The node.
 */
xrx.mvc.Component.prototype.getNodeRefWithContext = function(opt_dataset, opt_context) {
  var context = this.getContext();
  if (!context) return;
  // TODO: Node conversion function
  var nodeS = new xrx.node.ElementS(context.getDocument(), context.getToken());
  var result = xrx.xpath.evaluate(this.getRefExpression(opt_dataset), nodeS, null,
      xrx.xpath.XPathResultType.ANY_TYPE);
  var next = result.iterateNext();
  return next;
};



/**
 * Returns the node referenced by the component.
 * @return {xrx.node.Node} The node.
 */
xrx.mvc.Component.prototype.getNode = function(num, opt_dataset) {
  var node;
  var n = num || 0;
  if (this.hasContext()) {
    node = this.getNodeRefWithContext(opt_dataset, this.getContext());
  } else if (this.getBind(opt_dataset)) {
    node = this.getNodeBind(n, opt_dataset);
  } else if (this.getRefExpression(opt_dataset)) {
    node = this.getNodeRefWithRepeat(opt_dataset);
  } else {
    throw Error('A control must define a data-xrx-mvc-bind or a data-xrx-mvc-ref ' +
        'attribute.');
  }
  return node;
};



xrx.mvc.Component.prototype.getParentComponent = function() {
};
