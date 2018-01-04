/**
 * @fileoverview Class implements a repeat control.
 */

goog.provide('xrx.mvc.Repeat');
goog.provide('xrx.mvc.RepeatItem');



goog.require('goog.array');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.style');
goog.require('xrx.mvc');
goog.require('xrx.mvc.ComponentView');



/**
 * @constructor
 */
xrx.mvc.Repeat = function(element) {

  this.firstElements_;

  this.firstItem_;

  this.nextItems_ = [];

  this.activeElement_;

  this.length_ = -1;

  this.firstLabel_;

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Repeat, xrx.mvc.ComponentView);



xrx.mvc.Repeat.prototype.getIndex = function() {
  return !this.activeElement_ ? -1 : this.getRepeatIndex(this.activeElement_) + 1;
};



xrx.mvc.Repeat.prototype.setIndexElement = function(activeElement) {
  this.activeElement_ = activeElement;
};



xrx.mvc.Repeat.prototype.appendItem = function(item) {
  goog.array.forEach(item.getElements(), function(e, i, a) {
    goog.dom.append(this.element_, e);
  }, this)
};



xrx.mvc.Repeat.prototype.createItems_ = function() {
  if (!this.firstItem_) this.firstItem_ =
      new xrx.mvc.RepeatItem(this, this.firstElements_, 0);
  var n = 1;
  var item;
  if (!this.getResult().getNode(0)) {
    goog.array.forEach(this.firstElements_, function(elmnt) {
      goog.style.setStyle(elmnt, 'display', 'none');
    }, this);
  } else {
    goog.array.forEach(this.firstElements_, function(elmnt) {
      goog.style.setStyle(elmnt, 'display', '');
    }, this);
  }
  while(this.getResult().getNode(n)) {
    item = new xrx.mvc.RepeatItem(this, this.firstItem_.getClonedElements(), n);
    this.nextItems_.push(item);
    n++;
  }
};



xrx.mvc.Repeat.prototype.removeItems_ = function() {
  var item;
  while (item = this.nextItems_.pop()) {
    item.removeDom();
  };
};



xrx.mvc.Repeat.prototype.createDom = function() {
  var firstElements_ = goog.dom.getChildren(this.element_);
  if (firstElements_.length === 0) return;
  this.firstElements_ = [];
  goog.array.forEach(firstElements_, function(e, i, a) {
    this.firstElements_.push(e);
  }, this);
};



xrx.mvc.Repeat.prototype.mvcRefresh = function() {
  var node = this.getResult().getNode(0);
  if (this.length_ === this.getResult().getNodes().length && node && this.firstLabel_ &&
      this.firstLabel_.sameAs(node.getLabel())) return; 
  xrx.mvc.removeViewComponents(this.element_);
  this.removeItems_();
  this.createItems_();
  xrx.mvc.Mvc.install(this.element_);
  goog.style.setStyle(this.element_, 'display', 'block');
  this.length_ = this.getResult().getNodes().length;
  if (node) this.firstLabel_ = node.getLabel();
};



/**
 * @constructor
 */
xrx.mvc.RepeatItem = function(repeat, elements, index) {

  this.repeat_ = repeat;

  this.elements_ = elements;

  this.index_ = index;

  this.createDom();
};



xrx.mvc.RepeatItem.prototype.getElements = function() {
  return this.elements_;
};



xrx.mvc.RepeatItem.prototype.removeIds_ = function(parent) {
  var elements = goog.dom.findNodes(parent, function(n) {
      return n instanceof Element;
  });
  parent.removeAttribute('id');
  goog.array.forEach(elements, function(e, i, a) {
    e.removeAttribute('id');
  });
};



/**
 * @private
 */
xrx.mvc.RepeatItem.prototype.getClonedElements = function() {
  var elements = [];
  var element;
  for (var i = 0, len = this.elements_.length; i < len; i++) {
    element = this.elements_[i].cloneNode(true);
    this.removeIds_(element);
    elements.push(element);
  }
  return elements;
};



xrx.mvc.RepeatItem.prototype.createDom = function() {
  this.repeat_.appendItem(this);
  for (var i = 0, len = this.elements_.length; i < len; i++) {
    goog.dom.classes.add(this.elements_[i], 'xrx-repeat-item');
    goog.dom.dataset.set(this.elements_[i], 'xrxRepeatIndex', this.index_);
  }
};



xrx.mvc.RepeatItem.prototype.removeDom = function() {
  for (var i = 0, len = this.elements_.length; i < len; i++) {
    goog.dom.removeNode(this.elements_[i]);
  }
};
