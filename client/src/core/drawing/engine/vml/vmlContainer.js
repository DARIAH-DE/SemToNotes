/**
 * @fileoverview Abstract VML class representing a container.
 * @private
 */

goog.provide('xrx.vml.Container');



goog.require('goog.dom.DomHelper');
goog.require('xrx.vml.Element');



/**
 * Abstract VML class representing a container.
 * @param
 * @constructor
 * @private
 */
xrx.vml.Container = function(element) {

  goog.base(this, element);

  /**
   * The child elements of this container.
   * @type {Array<xrx.vml.Element>}
   */
  this.childs_ = [];
};
goog.inherits(xrx.vml.Container, xrx.vml.Element);



/**
 * Adds a child element to this container.
 * @param {xrx.vml.Element} element The child element.
 */
xrx.vml.Container.prototype.addChild = function(element) {
  this.childs_.push(element);
  this.element_.appendChild(element.getElement());
};



/**
 * Returns the child elements of this container.
 * @return {xrx.vml.Element} The child elements.
 */
xrx.vml.Container.prototype.getChildren = function() {
  return this.childs_;
};



/**
 * Removes all child elements from this container.
 */
xrx.vml.Container.prototype.removeChildren = function() {
  goog.dom.removeChildren(this.element_);
  this.childs_ = [];
};



/**
 * Removes one child element at an index.
 * @param {number} index The index.
 */
xrx.vml.Container.prototype.removeChildAt = function(index) {
  var child = this.childs_[index];
  goog.dom.removeNode(child.getElement());
  this.childs_.splice(index, 1);
};
