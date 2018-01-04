/**
 * @fileoverview An abstract class representing the document node 
 * of the XDM interface.
 */

goog.provide('xrx.node.Document');



goog.require('xrx.xml.Label');
goog.require('xrx.node');
goog.require('xrx.token');
goog.require('xrx.xpath.NodeSet');



/** 
 * @constructor 
 */
xrx.node.Document = function() {};



xrx.node.Document.prototype.getInstance = function() {
  return this.instance_;
};



xrx.node.Document.prototype.getToken = function() {
  // TODO: implement this.
  return undefined;
};



xrx.node.Document.prototype.getLabel = function() {
  return this.label_;
};



xrx.node.Document.prototype.getOffset = function() {
  return 0;
};



xrx.node.Document.prototype.getLength = function() {
  // TODO: implement this.
  return undefined;
};



xrx.node.Document.prototype.isSameAs = function(node) {
  return node.getType() === xrx.node.DOCUMENT;
};



xrx.node.Document.prototype.isBefore = function(node) {
  return true;
};



xrx.node.Document.prototype.isAfter = function(node) {
  return false;
};



xrx.node.Document.prototype.isAncestorOf = function(node) {
  return true;
};



xrx.node.Document.prototype.isAttributeOf = function(node) {
  return false;
};



xrx.node.Document.prototype.isChildOf = function(node) {
 return false;
};



xrx.node.Document.prototype.isDescendantOf = function(node) {
  return false;
};



xrx.node.Document.prototype.isFollowingOf = function(node) {
  return false;
};



xrx.node.Document.prototype.isFollowingSiblingOf = function(node) {
  return false;
};



xrx.node.Document.prototype.isParentOf = function(node) {
  return node.getType() === xrx.node.ELEMENT && node.getLabel().sameAs(
      new xrx.xml.Label([1]));
};



xrx.node.Document.prototype.isPrecedingOf = function(node) {
  return false;
};



xrx.node.Document.prototype.isPrecedingSiblingOf = function(node) {
  return false;
};



xrx.node.Document.prototype.getName = function() {
  return '';
};



xrx.node.Document.prototype.getNamespaceUri = function(prefix) {
  return '';
};



xrx.node.Document.prototype.getXml = function() {
  return this.getInstance().xml();
};


xrx.node.Document.prototype.getNodeAncestor = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Document.prototype.getNodeAttribute = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Document.prototype.getNodeFollowing = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Document.prototype.getNodeFollowingSibling = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Document.prototype.getNodeParent = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Document.prototype.getNodePreceding = function(test) {
  return new xrx.xpath.NodeSet();
};



xrx.node.Document.prototype.getNodePrecedingSibling = function(test) {
  return new xrx.xpath.NodeSet();
};
