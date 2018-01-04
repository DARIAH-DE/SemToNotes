/**
 * @fileoverview Abstract SVG class representing a container.
 * @private
 */

goog.provide('xrx.svg.Container');



goog.require('goog.dom.DomHelper');
goog.require('xrx.svg.Element');



/**
 * Abstract SVG class representing a container.
 * @param {SVGElement} element An SVG element.
 * @constructor
 * @private
 */
xrx.svg.Container = function(element) {

  goog.base(this, element);

  /**
   * The child elements of this container.
   * @type {Array<xrx.svg.Element>}
   */
  this.childs_ = [];
};
goog.inherits(xrx.svg.Container, xrx.svg.Element);



/**
 * Adds a child element to this container.
 * @param {xrx.svg.Element} element The child element.
 */
xrx.svg.Container.prototype.addChild = function(element) {
  this.childs_.push(element);
  goog.dom.append(this.element_, element.getElement());
};



/**
 * Returns the child elements of this container.
 * @return {Array<xrx.svg.Element>} The child elements.
 */
xrx.svg.Container.prototype.getChildren = function() {
  return this.childs_;
};



/**
 * Removes all child elements from this container.
 */
xrx.svg.Container.prototype.removeChildren = function() {
  goog.dom.removeChildren(this.element_);
  this.childs_ = [];
};



/**
 * Removes a child element at an index.
 * @param {number} index The index.
 */
xrx.svg.Container.prototype.removeChildAt = function(index) {
  var child = this.childs_[index];
  goog.dom.removeNode(child.getElement());
  this.childs_.splice(index, 1);
};



xrx.svg.Container.prototype.disposeInternal = function() {
  var child;
  while(child = this.childs_.pop()) {
    child.dispose();
  };
  this.childs_ = null;
  goog.base(this, 'disposeInternal');
};
