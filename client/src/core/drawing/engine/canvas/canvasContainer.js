/**
 * @fileoverview Abstract Canvas class representing a container.
 * @private
 */

goog.provide('xrx.canvas.Container');



goog.require('xrx.canvas.Element');



/**
 * Abstract Canvas class representing a container.
 * @param {xrx.canvas.Canvas} canvas The parent canvas object.
 * @constructor
 * @private
 */
xrx.canvas.Container = function(canvas) {

  goog.base(this, canvas);

  /**
   * The child elements of this container.
   * @type {Array<xrx.canvas.Element>}
   */
  this.childs_ = [];
};
goog.inherits(xrx.canvas.Container, xrx.canvas.Element);



/**
 * Adds a child element to this container.
 * @param {xrx.canvas.Element} element The child element.
 */
xrx.canvas.Container.prototype.addChild = function(element) {
  this.childs_.push(element);
};



/**
 * Returns the child elements of this container.
 * @return {Array<xrx.canvas.Element>} The child elements.
 */
xrx.canvas.Container.prototype.getChildren = function() {
  return this.childs_;
};



/**
 * Removes all child elements from this container.
 */
xrx.canvas.Container.prototype.removeChildren = function() {
  this.childs_ = [];
};



/**
 * Removes a child element at an index.
 * @param {number} index The index.
 */
xrx.canvas.Container.prototype.removeChildAt = function(index) {
  this.childs_.splice(index, 1);
};



xrx.canvas.Container.prototype.disposeInternal = function() {
  var child;
  while(child = this.childs_.pop()) {
    child.dispose();
  }
  this.childs_ = null;
  goog.base(this, 'disposeInternal');
};
