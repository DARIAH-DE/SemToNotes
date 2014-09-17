/**
 * @fileoverview VML class representing a group.
 */

goog.provide('xrx.vml.Group');



goog.require('xrx.vml.Element');



/**
 * VML class representing a group.
 * @param {Raphael.set} raphael The Raphael set object.
 * @constructor
 * @extends xrx.vml.Element
 */
xrx.vml.Group = function(raphael) {

  goog.base(this, raphael);

  /**
   * The child elements of the group.
   * @type {Array.<xrx.vml.Element>}
   */
  this.childs_ = [];
};
goog.inherits(xrx.vml.Group, xrx.vml.Element);



/**
 * Returns the child elements of the group.
 * @return {xrx.vml.Element} The child elements.
 */
xrx.vml.Group.prototype.getChildren = function() {
  return this.childs_;
};



/**
 * Adds child elements to a group.
 * @param {xrx.vml.Element} children The child elements.
 */
xrx.vml.Group.prototype.addChildren = function(children) {
  if (!goog.isArray(children)) children = [children];
  var child;
  for(var i = 0, len = children.length; i < len; i++) {
    child = children[i];
    this.childs_.push(child);
    this.raphael_.push(child.getRaphael());
  }
};



/**
 * Removes all child elements from the group.
 */
xrx.vml.Group.prototype.removeChildren = function() {
  this.childs_ = [];
  this.raphael_.clear();
};



/**
 * Removes a child element at an index.
 * @param {number} index The index.
 */
xrx.vml.Group.prototype.removeChildAt = function(index) {
  this.childs_.splice(index, 1);
  this.raphael_.splice(index, 1);
};



/**
 * Draws each child element of the group.
 */
xrx.vml.Group.prototype.draw = function() {
  this.raphael_.show();
};



/**
 * Creates a new group.
 * @param {xrx.vml.Canvas} canvas The parent canvas of the group.
 */
xrx.vml.Group.create = function(canvas) {
  var raphael = canvas.getRaphael().set();
  raphael.hide();
  return new xrx.vml.Group(raphael);
};
