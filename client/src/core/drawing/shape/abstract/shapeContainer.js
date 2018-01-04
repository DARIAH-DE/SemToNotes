/**
 * @fileoverview An abstract class representing a shape container.
 * @private
 */

goog.provide('xrx.shape.Container');



goog.require('xrx.shape.Geometry');
goog.require('xrx.geometry.Group');



/**
 * An abstract class representing a shape container.
 * @param {xrx.drawing.Drawing} canvas The parent drawing canvas.
 * @constructor
 * @private
 */
xrx.shape.Container = function(drawing) {

  goog.base(this, drawing, new xrx.geometry.Group());

  /**
   * The child shapes of this container.
   * @type {Array<xrx.shape.Shape>}
   * @private
   */
  this.childs_ = [];
};
goog.inherits(xrx.shape.Container, xrx.shape.Geometry);



/**
 * Returns the child elements of this container.
 * @return {Array<xrx.shape.Shape>} The child elements.
 */
xrx.shape.Container.prototype.getChildren = function() {
  return this.childs_;
};



/**
 * Returns the n'th child element of this container.
 * @param {number} index The child elements' index.
 * @return {Array<xrx.shape.Shape>} The child elements.
 */
xrx.shape.Container.prototype.getChild = function(index) {
  return this.childs_[index];
};



/**
 * Adds child elements to this container.
 * @param {(xrx.shape.Shape|Array<xrx.shape.Shape>)} children The elements to add.
 */
xrx.shape.Container.prototype.addChildren = function(children) {
  if (!goog.isArray(children)) children = [children];
  for(var i = 0, len = children.length; i < len; i++) {
    this.childs_.push(children[i]);
    this.engineElement_.addChild(children[i].getEngineElement());
  }
};



/**
 * Removes all elements from this container.
 */
xrx.shape.Container.prototype.removeChildren = function() {
  this.childs_ = [];
  this.engineElement_.removeChildren();
};



/**
 * Removes one element from this container at an index.
 * @param {number} index The index.
 */
xrx.shape.Container.prototype.removeChildAt = function(index) {
  this.childs_.splice(index, 1);
  this.engineElement_.removeChildAt(index);
};



/**
 * Disposes this container.
 */
xrx.shape.Container.prototype.disposeInternal = function() {
  var child;
  while(child = this.childs_.pop()) {
    child.dispose();
    child = null;
  };
  this.childs_ = null;
  goog.base(this, 'disposeInternal');
};
