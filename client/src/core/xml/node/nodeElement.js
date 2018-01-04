/**
 * @fileoverview A class providing functions that can be
 * shared by element node implementations.
 */

goog.provide('xrx.node.Element');



goog.require('xrx.xpath.KindTest');



/** 
 * A class providing functions that can be
 * shared by element node implementations.
 */
xrx.node.Element = function() {};



/**
 * Indicates whether two nodes are the same.
 *
 * @param {!xrx.node} node The node to test against.
 * @return {boolean} Whether the nodes are the same.
 */
xrx.node.Element.prototype.isSameAs = function(node) {
  return this.getType() === node.getType() && 
      this.getLabel().sameAs(node.getLabel());
};



/**
 * Indicates whether a node appears before another node
 * in document order.
 * 
 * @param {!xrx.node} node The node to test against.
 * @return {boolean}
 */
xrx.node.Element.prototype.isBefore = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();

  return selfLabel.isBefore(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) &&
          this.getType() < node.getType() );
};



/**
 * Indicates whether a node appears after another node
 * in document order.
 *
 * @param {!xrx.node} node The node to test against.
 * @return {boolean}
 */
xrx.node.Element.prototype.isAfter = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isAfter(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) &&
          this.getType() > node.getType() );
};



xrx.node.Element.prototype.isAncestorOf = function(node) {
  return this.getLabel().isAncestorOf(node.getLabel());
};



xrx.node.Element.prototype.isAttributeOf = function(node) {
  return false;
};



xrx.node.Element.prototype.isChildOf = function(node) {
  return this.getLabel().isChildOf(node.getLabel());
};



xrx.node.Element.prototype.isDescendantOf = function(node) {
  return this.getLabel().isDescendantOf(node.getLabel());
};



xrx.node.Element.prototype.isFollowingOf = function(node) {
  return this.isAfter(node) && !this.getLabel().isDescendantOf(node.getLabel());
};



xrx.node.Element.prototype.isFollowingSiblingOf = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();

  return selfLabel.isFollowingSiblingOf(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) && 
          this.getType() > node.getType() );
};



xrx.node.Element.prototype.isParentOf = function(node) {
  return this.getLabel().isParentOf(node.getLabel());
};



xrx.node.Element.prototype.isPrecedingOf = function(node) {
  return this.isBefore(node) && !this.getLabel().isAncestorOf(node.getLabel());
};



xrx.node.Element.prototype.isPrecedingSiblingOf = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();

  return selfLabel.isPrecedingSiblingOf(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) && 
          this.getType() < node.getType() );
};



xrx.node.Element.prototype.getAttributes = function() {
  var kindTest = new xrx.xpath.KindTest('attribute');
  return this.getNodeAttribute(kindTest);
};



xrx.node.Element.prototype.getNodeAncestor = function(test) {
  var nodeset = this.find(test, xrx.node[this.impl_.Element].prototype.isDescendantOf,
      true, new xrx.xml.Label());
  // TODO: not sure if this is correct?
  if (test.getName() === 'node') 
      nodeset.unshift(new xrx.node[this.impl_.Document](this.instance_));
  return nodeset;
};



xrx.node.Element.prototype.getNodeChild = function(test) {
  return this.find(test, xrx.node[this.impl_.Element].prototype.isParentOf, false,
      this.getLabel());
};



xrx.node.Element.prototype.getNodeDescendant = function(test) {

  return this.find(test, xrx.node[this.impl_.Element].prototype.isAncestorOf, false,
      this.getLabel());
};



xrx.node.Element.prototype.getNodeFollowing = function(test) {

  return this.find(test, xrx.node[this.impl_.Element].prototype.isPrecedingOf, false,
      new xrx.xml.Label());
};



xrx.node.Element.prototype.getNodeFollowingSibling = function(test) {
  var stop = this.getLabel().clone();
  stop.parent();

  return this.find(test, xrx.node[this.impl_.Element].prototype.isPrecedingSiblingOf,
      false, stop);
};



xrx.node.Element.prototype.getNodeParent = function(test) {
  var stop = this.getLabel().clone();
  stop.parent();

  return this.find(test, xrx.node[this.impl_.Element].prototype.isChildOf, true, stop);
};



xrx.node.Element.prototype.getNodePreceding = function(test) {
  var nodeset = this.find(test, xrx.node[this.impl_.Element].prototype.isFollowingOf, true,
      new xrx.xml.Label());

  // TODO: not sure if this is correct?
  if (test.getName() === 'node') 
      nodeset.unshift(new xrx.node[this.impl_.Document](this.instance_));

  return nodeset;
};



xrx.node.Element.prototype.getNodePrecedingSibling = function(test) {
  var stop = this.getLabel().clone();
  stop.parent();
  return this.find(test, xrx.node[this.impl_.Element].prototype.isFollowingSiblingOf, true,
      stop);
};
