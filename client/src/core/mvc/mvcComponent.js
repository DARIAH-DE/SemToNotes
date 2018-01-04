/**
 * @fileoverview An abstract class representing
 *   a component of the model-view-controller.
 */

goog.provide('xrx.mvc.Component');



goog.require('goog.array');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.string');
goog.require('goog.ui.IdGenerator');
goog.require('goog.Uri.QueryData');
goog.require('xrx.event.Handler');
goog.require('xrx.event.Name');
goog.require('xrx.event.Type');
goog.require('xrx.mvc.ComponentClasses');
goog.require('xrx.mvc.Validate');
goog.require('xrx.mvc.Xpath');
goog.require('xrx.xpath');



/**
 * Constructs a new model-view-controller component.
 * @constructor
 */
xrx.mvc.Component = function(element, uidl) {

  this.element_ = element;

  /**
   * @type xrx.mvc.Xpath
   */
  this.xpath_;

  this.uidl = uidl;

  this.addComponent();

  this.compileXpath_();

  this.createDom();

  this.classes_;

  this.initClasses_();
};



xrx.mvc.Component.prototype.initClasses_ = function() {
  var classes;
  var classesRef = this.getDataset('xrxRefClasses');
  var classesBind = this.getDataset('xrxBindClasses');
  classesRef ? classes = classesRef : classes = classesBind;
  if (classes) this.classes_ = new xrx.mvc.ComponentClasses(this);
};



xrx.mvc.Component.prototype.getXpath = function() {
  return this.xpath_;
};



/**
 * @private
 */
xrx.mvc.Component.prototype.compileXpath_ = function() {
  var debug = '';
  var ref = this.getRefExpression();
  if (ref) this.xpath_ = new xrx.mvc.Xpath(ref, debug);
};



xrx.mvc.Component.prototype.addComponent = function() {
  xrx.mvc.addComponent(this.getId(), this);
};



/**
 * 
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
 * doesn't already have an ID, generate one on the fly.
 * @return {string} Unique ID.
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
 *
 * @return {String} The dataset value.
 */
xrx.mvc.Component.prototype.getDataset = function(key, opt_element) {
  var element = opt_element || this.element_;
  var shortened;
  var standard = goog.dom.dataset.get(element, key);
  if (!standard) {
    shortened = key.replace(/^xrx/, '');
    shortened = shortened.charAt(0).toLowerCase() + shortened.slice(1);
    return goog.dom.dataset.get(element, shortened);
  } else {
    return standard;
  }
};



/**
 * Whether the component has a specific dataset.
 * @return {boolean} Whether the dataset exists.
 */
xrx.mvc.Component.prototype.hasDataset = function(key, opt_element) {
  var element = opt_element || this.element_;
  var shortened;
  var standard = goog.dom.dataset.has(element, key);
  if (!standard) {
    shortened = key.replace(/^xrx/, '');
    shortened = shortened.charAt(0).toLowerCase() + shortened.slice(1);
    return goog.dom.dataset.has(element, shortened);
  } else {
    return standard;
  }
};



xrx.mvc.Component.prototype.getDatasetParam = function(key, params, opt_element) {
  var dataset = this.getDataset(key, opt_element);
  if (!dataset) return null;
  if (dataset.charAt(0) !== '$') {
    return dataset; 
  } else {
    return params.get(dataset.slice(1));
  }
};



xrx.mvc.Component.prototype.getElementBySelectorId_ = function(opt_element,
      opt_selector, scope) {
  var dataset = opt_selector || this.getDataset('xrxSelect', opt_element);
  if (dataset.charAt(0) !== '#') return undefined;
  var element = goog.dom.getElement(dataset.slice(1), scope);
  return dataset && element ? [element] : undefined;
};



xrx.mvc.Component.prototype.getElementBySelectorClass_ = function(opt_element,
      opt_selector, scope) {
  var dataset = opt_selector || this.getDataset('xrxSelect', opt_element);
  if (dataset.charAt(0) !== '.') return undefined;
  var elements = goog.dom.getElementsByClass(dataset.slice(1), scope);
  return dataset && elements.length > 0 ? goog.array.toArray(elements) : undefined;
};



xrx.mvc.Component.prototype.getElementsBySelectorParam_ = function(params,
      opt_element, scope) {
  var selector;
  var elements;
  var dataset = this.getDataset('xrxSelect', opt_element);
  if (dataset.charAt(0) !== '$') return undefined;
  selector = params.get(dataset.slice(1));
  elements = this.getElementBySelectorId_(opt_element, selector, scope) ||
      this.getElementBySelectorClass_(opt_element, selector, scope);
  return dataset && elements && elements.length > 0 ? goog.array.toArray(elements) : undefined;
};



xrx.mvc.Component.prototype.getElementScope_ = function(opt_element, scope) {
  var dataset = this.getDataset('xrxScope', opt_element);
  if (!dataset) return undefined;
  if (dataset.charAt(0) !== '#') throw Error('Invalid scope selector. "#" expected.');
  return goog.dom.getElement(dataset.slice(1));
};



xrx.mvc.Component.prototype.getElementsBySelectAndScope = function(opt_params, opt_element) {
  var scope = this.getElementScope_(opt_element);
  return this.getElementBySelectorId_(opt_element, undefined, scope) ||
      this.getElementBySelectorClass_(opt_element, undefined, scope) ||
      this.getElementsBySelectorParam_(opt_params, opt_element, scope);
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
  var element = goog.dom.getAncestorByClass(this.element_, 'xrx-repeat');
  return element ? xrx.mvc.getViewComponent(element.id) : undefined;
};



/**
 * Returns the index of a dynamically repeated component.
 * @return {number} The index.
 */
xrx.mvc.Component.prototype.getRepeatIndex = function(opt_element) {
  var value;
  var element = opt_element || this.element_;
  var repeatItem = goog.dom.getAncestorByClass(element,
      'xrx-repeat-item');
  if (goog.dom.classes.has(element, 'xrx-repeat-item')) {
    value = this.getDataset('xrxRepeatIndex');
  } else if (repeatItem) {
    value = this.getDataset('xrxRepeatIndex', repeatItem);
  } else {
    throw Error('Repeat item could not be found.');
  }
  return parseInt(value);
};



/**
 * Returns the source URI found in the component's data-resource attribute.
 * @return {?string} The source URI.
 */
xrx.mvc.Component.prototype.getResourceUri = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxResource';
  return this.getDataset(dataset);
};



/**
 * Returns the XPath expression found in the component's data-xrx-ref attribute.
 * @return {string} The expression.
 */
xrx.mvc.Component.prototype.getRefExpression = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxRef';
  return this.getDataset(dataset);
};



/**
 * Returns the bind ID found in the component's data-xrx-bind attribute.
 * @return {string} The bind ID.
 */
xrx.mvc.Component.prototype.getBindId = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxBind';
  return this.getDataset(dataset);
};



xrx.mvc.Component.prototype.getCalculateId = function(opt_dataset) {
  var dataset = opt_dataset || 'xrxCalculate';
  return this.getDataset(dataset);
};



/**
 * Returns the bind referenced by the component.
 * @return {xrx.mvc.Bind} The bind component.
 */
xrx.mvc.Component.prototype.getBind = function() {
  var id = this.getBindId();
  var bind = xrx.mvc.getModelComponent(id);
  if (!bind) throw Error('Bind #' + id + ' does not exist.');
  return bind;
};



xrx.mvc.Component.prototype.getCalculate = function() {
  var id = this.getCalculateId();
  var calc = xrx.mvc.getComponent(id);
  if (!calc) throw Error('Calculate #' + id + ' does not exist.');
  return calc;
};



/**
 * Returns the node held by the component by means of a repeat component
 * and a ref expression.
 * @return {xrx.node.Node} The node.
 */
xrx.mvc.Component.prototype.getResultByRef_ = function() {
  var repeat = this.getRepeat();
  var context = repeat.getResult().getNode(this.getRepeatIndex());
  if (!context) return new xrx.xpath.XPathResult();
  // TODO: Node conversion function
  xrx.mvc.actualComponent = this;
  var nodeB = new xrx.node.ElementB(context.getDocument(), context.getKey());
  return this.xpath_.evaluate(nodeB);
};



/**
 * Returns the result of the components ref or bind expression.
 * @return {!xrx.xpath.XPathResult} The result.
 */
xrx.mvc.Component.prototype.getResult = function() {
  if (this.getBindId() !== null) {
    return this.getBind().getResult();
  } else if (this.getCalculateId() !== null) {
    return this.getCalculate().getResult();
  } else {
    return this.getResultByRef_();
  }
};



/**
 * @private
 */
xrx.mvc.Component.prototype.isVoidElement_ = function() {
  var voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr',
      'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr',
      /* not void, but editable content */ 'select', 'textarea'];
  var tn = this.element_.tagName.toLowerCase();
  return goog.array.contains(voidElements, tn);
};



xrx.mvc.Component.prototype.getParentComponent = function(className, opt_context) {
  var context = opt_context || this.element_;
  var datasetFor = this.getDataset('xrxFor', opt_context);
  var element;
  if (datasetFor) {
    element = goog.dom.getElement(datasetFor);
  } else {
    element = goog.dom.getAncestorByClass(context, className);
  }
  return element ? xrx.mvc.getComponent(element.id) : undefined;
};



xrx.mvc.Component.prototype.getActionElements = function(eventName) {
  var self = this;
  if (this.isVoidElement_()) {
    var elmnt = this.element_;
    var elmnts = [];
    while (elmnt = goog.dom.getNextElementSibling(elmnt)) {
      if (goog.dom.classes.has(elmnt, 'xrx-action') &&
          self.getDataset('xrxEvent', elmnt) === eventName) {
          elmnts.push(elmnt);
      };
      if (!goog.dom.classes.has(elmnt, 'xrx-action')) {
        break;
      };
    };
    return elmnts;
  } else if (this.hasDataset('xrxAction')) {
    var actionElement = goog.dom.getElement(this.getDataset('xrxAction'));
    return goog.dom.findNodes(actionElement, function(node) {
      return goog.dom.isElement(node) && goog.dom.classes.has(node, 'xrx-action') &&
          goog.dom.getParentElement(node) === actionElement &&
          self.getDataset('xrxEvent', node) === eventName;
    });
  } else {
    return goog.dom.findNodes(this.element_, function(node) {
      return goog.dom.isElement(node) && goog.dom.classes.has(node, 'xrx-action') &&
          goog.dom.getParentElement(node) === self.element_ &&
          self.getDataset('xrxEvent', node) === eventName;
    });
  }
  return [];
};



xrx.mvc.Component.prototype.getParameters = function() {
  if (!this.hasDataset('xrxParam')) return undefined;
  var datasetParam = this.getDataset('xrxParam');
  return new goog.Uri.QueryData(datasetParam);
};



xrx.mvc.Component.prototype.registerEvent = function(event) {
  var self = this;
  var isValueUpdate = function() {
    return event === xrx.event.Type.INPUT || event === xrx.event.Type.CHANGE;
  };
  goog.events.listen(self.element_, event, function(e) {
    if (!xrx.event.Name[event]) throw Error('Unknown event.');
    var repeat = self.getRepeat();
    if (repeat) repeat.setIndexElement(self.element_);
    e.preventDefault();
    if (isValueUpdate()) self.mvcModelUpdateData();
    self.dispatch(xrx.event.Name[event]);
  });
};



xrx.mvc.Component.prototype.dispatch = function(eventName) {
  var params = this.getParameters();
  goog.array.forEach(this.getActionElements(eventName), function(element) {
    xrx.mvc.getComponent(element.id).execute(params);
  });
};



xrx.mvc.Component.prototype.show = function(isShown) {
  var display = isShown ? 'block' : 'none';
  goog.style.setElementShown(this.element_, isShown);
  goog.style.setStyle(this.element_, 'display', display);
};
