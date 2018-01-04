/**
 * @fileoverview A class providing functions that can be
 * shared by text node implementations.
 */


goog.provide('xrx.node.Text');



goog.require('xrx.node');
goog.require('xrx.token');
goog.require('xrx.xpath.NodeSet');



/** 
 * A class providing functions that can be
 * shared by element node implementations.
 */
xrx.node.Text = function(token) {};



/**
 * 
 */
xrx.node.Text.prototype.isSameAs = function(node) {
  return this.getType() === node.getType() && 
      this.getLabel().sameAs(node.getLabel());
};



/**
 * 
 */
xrx.node.Text.prototype.isBefore = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isBefore(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) &&
          this.getType() < node.getType() );
};



/**
 * 
 */
xrx.node.Text.prototype.isAfter = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isAfter(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) &&
          this.getType() > node.getType() );
};



/**
 * 
 */
xrx.node.Text.prototype.isAncestorOf = function(node) {
  return false;
};



/**
 * 
 */
xrx.node.Text.prototype.isAttributeOf = function(node) {
  return false;
};



/**
 * 
 */
xrx.node.Text.prototype.isChildOf = function(node) {
  return node.getType() === xrx.node.ELEMENT &&
      this.getLabel().isChildOf(node.getLabel());
};



/**
 * 
 */
xrx.node.Text.prototype.isDescendantOf = function(node) {
  return ( node.getType() === xrx.node.ELEMENT || 
      node.getType() === xrx.node.DOCUMENT ) &&
          this.getLabel().isDescendantOf(node.getLabel());
};



/**
 * 
 */
xrx.node.Text.prototype.isFollowingOf = function(node) {
  return this.isAfter(node) && !this.isDescendantOf(node);
};



/**
 * 
 */
xrx.node.Text.prototype.isFollowingSiblingOf = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isFollowingSiblingOf(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) && 
          this.getType() > node.getType() );
};



/**
 * 
 */
xrx.node.Text.prototype.isParentOf = function(node) {
  return false;
};



/**
 * 
 */
xrx.node.Text.prototype.isPrecedingOf = function(node) {
  return this.isBefore(node) && !this.getLabel().isAncestorOf(node.getLabel());
};



/**
 * 
 */
xrx.node.Text.prototype.isPrecedingSiblingOf = function(node) {
  var selfLabel = this.getLabel();
  var nodeLabel = node.getLabel();
  return selfLabel.isPrecedingSiblingOf(nodeLabel) ||
      ( selfLabel.sameAs(nodeLabel) && 
          this.getType() < node.getType() );
};



/**
 * 
 */
xrx.node.Text.prototype.getName = function() {
  return '';
};



/**
 * 
 */
xrx.node.Text.prototype.getNamespaceUri = function(prefix) {
  return '';
};



/**
 * 
 */
xrx.node.Text.prototype.getStringValue = function() {
  return this.getDocument().getInstance().xml().substr(this.getOffset(), this.getLength());
};



/**
 * 
 */
xrx.node.Text.prototype.getXml = function() {
  return this.getStringValue();
};



/**
 * 
 */
xrx.node.Text.prototype.getNodeAncestor = function(test) {
  var nodeset = this.find(test, xrx.node[this.impl_.Text].prototype.isDescendantOf,
      true, new xrx.xml.Label());
  // TODO: not sure if this is correct?
  if (test.getName() === 'node') 
      nodeset.unshift(new xrx.node[this.impl_.Document](this.getInstance().getId()));
  return nodeset;
};



/**
 * 
 */
xrx.node.Text.prototype.getNodeAttribute = function(test) {
  return new xrx.xpath.NodeSet();
};



/**
 * 
 */
xrx.node.Text.prototype.getNodeChild = function(test) {
  return new xrx.xpath.NodeSet();
};



/**
 * 
 */
xrx.node.Text.prototype.getNodeDescendant = function(test) {
  return new xrx.xpath.NodeSet();
};



/**
 * 
 */
xrx.node.Text.prototype.getNodeFollowing = function(test) {
  return this.find(test, xrx.node[this.impl_.Text].prototype.isPrecedingOf, false,
      new xrx.xml.Label());
};



/**
 * 
 */
xrx.node.Text.prototype.getNodePreceding = function(test) {
  var nodeset = this.find(test, xrx.node[this.impl_.Text].prototype.isFollowingOf, true,
      new xrx.xml.Label());
  // TODO: not sure if this is correct?
  if (test.getName() === 'node') 
      nodeset.unshift(new xrx.node[this.impl_.Document](this.getInstance().getId()));
  return nodeset;
};



/**
 * 
 */
xrx.node.Text.prototype.getNodePrecedingSibling = function(test) {
  var stop = this.getLabel().clone();
  stop.parent();
  return this.find(test, xrx.node[this.impl_.Text].prototype.isFollowingSiblingOf, true,
      stop);
};
