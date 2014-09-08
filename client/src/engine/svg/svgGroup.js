***REMOVED***
***REMOVED*** @fileoverview
***REMOVED***

goog.provide('xrx.svg.Group');



***REMOVED***
goog.require('xrx.svg.Element');



***REMOVED***
***REMOVED***
***REMOVED***
xrx.svg.Group = function(element) {

***REMOVED***

  this.childs_ = [];
***REMOVED***
goog.inherits(xrx.svg.Group, xrx.svg.Element);



xrx.svg.Group.tagName = 'g';



xrx.svg.Group.prototype.getChildren = function() {
  return this.childs_;
***REMOVED***



xrx.svg.Group.prototype.addChildren = function(children) {
  if (!goog.isArray(children)) children = [children];
  var child;
  for(var i = 0, len = children.length; i < len; i++) {
    child = children[i];
    this.childs_.push(child);
    goog.dom.append(this.element_, child.getElement());
  }
***REMOVED***



xrx.svg.Group.prototype.removeChildren = function() {
  goog.dom.removeChildren(this.element_);
  this.childs_ = [];
***REMOVED***



xrx.svg.Group.prototype.removeChildAt = function(index) {
  var child = this.childs_[index];
  goog.dom.removeNode(child.getElement());
  this.childs_.splice(index, 1);
***REMOVED***



xrx.svg.Group.prototype.draw = function() {***REMOVED***



xrx.svg.Group.create = function() {
  var element = xrx.svg.Element.create(xrx.svg.Group);
  return new xrx.svg.Group(element);
***REMOVED***
