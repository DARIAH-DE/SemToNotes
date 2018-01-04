/**
 * @fileoverview An abstract class representing the attribute node.
 */

goog.provide('xrx.node.Attribute');



goog.require('xrx.node');



/** 
 * A class providing functions that can be shared by attribute node
 * implementations.
 */
xrx.node.Attribute = function() {};



xrx.node.Attribute.prototype.getStream = function() {
  return this.parent_.getDocument().getInstance().getStream();
};



xrx.node.Attribute.prototype.getInstance = function() {
  return this.parent_.getDocument().getInstance();
};



xrx.node.Attribute.prototype.isSameAs = function(node) {
  return this.getType() === node.getType() && 
      this.getLabel().sameAs(node.getLabel());
};



xrx.node.Attribute.prototype.isBefore = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isBefore(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) &&
          this.getType() < node.getType() );
};



xrx.node.Attribute.prototype.isAfter = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isAfter(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) &&
          this.getType() > node.getType() );
};



xrx.node.Attribute.prototype.isAncestorOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isAttributeOf = function(node) {
  return this.parent_.isSameAs(node);
};



xrx.node.Attribute.prototype.isChildOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isDescendantOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isFollowingOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isFollowingSiblingOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isParentOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isPrecedingOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.isPrecedingSiblingOf = function(node) {
  return false;
};



xrx.node.Attribute.prototype.getNodeAncestor = function(test) {
  var nodeset = new xrx.xpath.NodeSet();
  if (test.getType && test.getType() === xrx.node.ATTRIBUTE) return nodeset;
  if (test.getType && test.getType() === xrx.node.TEXT) return nodeset;
  if (test.matches(this.parent_)) nodeset.add(this.parent_);
  nodeset.add(this.parent_.getNodeAncestor(test));
  // TODO: not sure if this is correct?
  if (test.getName() === 'node') 
      nodeset.unshift(new xrx.node.DocumentB(this.instance_));
  return nodeset;
};



xrx.node.Attribute.prototype.getNodeAttribute = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Attribute.prototype.getNodeChild = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Attribute.prototype.getNodeDescendant = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Attribute.prototype.getNodeFollowing = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Attribute.prototype.getNodeFollowingSibling = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Attribute.prototype.getNodeParent = function(test) {
  var nodeset = new xrx.xpath.NodeSet();
  if (test.matches(this.parent_)) nodeset.add(this.parent_);
  return nodeset;
};



xrx.node.Attribute.prototype.getNodePreceding = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Attribute.prototype.getNodePrecedingSibling = function(test) {
  return new xrx.xpath.NodeSet();
};
