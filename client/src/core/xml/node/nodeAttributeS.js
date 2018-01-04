/**
 * @fileoverview A class representing a attribute node
 * implementation working on a streaming XML model.
 */

goog.provide('xrx.node.AttributeS');



goog.require('xrx.node');
goog.require('xrx.node.Attribute');
goog.require('xrx.node.Streaming');
goog.require('xrx.xml.Stream');



xrx.node.AttributeS = function(num, parent) {

  goog.base(this, xrx.node.ATTRIBUTE);

  this.num_ = num;

  this.parent_ = parent;
};
goog.inherits(xrx.node.AttributeS, xrx.node.Streaming);



xrx.node.AttributeS.prototype.getParent = function() {
  return this.parent_;
};



xrx.node.AttributeS.prototype.getStream = xrx.node.Attribute.prototype.getStream;



xrx.node.AttributeS.prototype.getInstance = xrx.node.Attribute.prototype.getInstance;



xrx.node.AttributeS.prototype.getToken = function() {
  var xml = this.getInstance().xml().substr(this.parent_.getOffset(),
      this.parent_.getLength());
  var loc = this.getStream().attribute(xml, this.num_);
  return new xrx.token.Attribute(this.getLabel(), loc.offset, loc.length);
};



xrx.node.AttributeS.prototype.getLabel = function() {
  var label = this.parent_.getLabel().clone();
  label.push(this.num_);
  return label;
};



xrx.node.AttributeS.prototype.getOffset = function() {
  var xml = this.getInstance().xml().substr(this.parent_.getOffset(),
      this.parent_.getLength());
  var loc = this.getStream().attribute(xml, this.num_);
  return loc.offset;
};



xrx.node.AttributeS.prototype.getLength = function() {
  var xml = this.getInstance().xml().substr(this.parent_.getOffset(),
      this.parent_.getLength());
  var loc = this.getStream().attribute(xml, this.num_);
  return loc.length;
};



xrx.node.AttributeS.prototype.isSameAs = xrx.node.Attribute.prototype.isSameAs;



xrx.node.AttributeS.prototype.isBefore = xrx.node.Attribute.prototype.isBefore;



xrx.node.AttributeS.prototype.isAfter = xrx.node.Attribute.prototype.isAfter;



xrx.node.AttributeS.prototype.isAncestorOf = xrx.node.Attribute.prototype.isAncestorOf;



xrx.node.AttributeS.prototype.isAttributeOf = xrx.node.Attribute.prototype.isAttributeOf;



xrx.node.AttributeS.prototype.isChildOf = xrx.node.Attribute.prototype.isChildOf;



xrx.node.AttributeS.prototype.isDescendantOf = xrx.node.Attribute.prototype.isDescendantOf;



xrx.node.AttributeS.prototype.isFollowingOf = xrx.node.Attribute.prototype.isFollowingOf;



xrx.node.AttributeS.prototype.isFollowingSiblingOf = xrx.node.Attribute.prototype.isFollowingSiblingOf;



xrx.node.AttributeS.prototype.isParentOf = xrx.node.Attribute.prototype.isParentOf;



xrx.node.AttributeS.prototype.isPrecedingOf = xrx.node.Attribute.prototype.isPrecedingOf;



xrx.node.AttributeS.prototype.isPrecedingSiblingOf = xrx.node.Attribute.prototype.isPrecedingSiblingOf;



xrx.node.AttributeS.prototype.getName = function() {
  var xml = this.getInstance().xml().substr(this.parent_.getOffset(),
      this.parent_.getLength());
  var stream = new xrx.xml.Stream(xml);
  var loc = stream.attrName(xml, this.num_);
  return loc.xml(xml);
};



xrx.node.AttributeS.prototype.getNamespaceUri = function(prefix) {
  var ns = this.getInstance().getIndex().getNamespace(
      this.parent_.getLabel(), prefix);
  return ns ? ns.uri : '';
};



xrx.node.AttributeS.prototype.getStringValue = function() {
  var xml = this.getInstance().xml().substr(this.parent_.getOffset(),
      this.parent_.getLength());
  var loc = this.getStream().attrValue(xml, this.num_);
  return loc.xml(xml);
};



xrx.node.AttributeS.prototype.getXml = function() {
  var xml = this.getInstance().xml().substr(this.parent_.getOffset(),
      this.parent_.getLength());
  var loc = this.getStream().attribute(xml, this.num_);
  return loc.xml(xml);
};



xrx.node.AttributeS.prototype.getNodeAncestor = xrx.node.Attribute.prototype.getNodeAncestor;



xrx.node.AttributeS.prototype.getNodeAttribute = xrx.node.Attribute.prototype.getNodeAttribute;



xrx.node.AttributeS.prototype.getNodeChild = xrx.node.Attribute.prototype.getNodeChild;



xrx.node.AttributeS.prototype.getNodeDescendant = xrx.node.Attribute.prototype.getNodeDescendant;



xrx.node.AttributeS.prototype.getNodeFollowing = xrx.node.Attribute.prototype.getNodeFollowing;



xrx.node.AttributeS.prototype.getNodeFollowingSibling = xrx.node.Attribute.prototype.getNodeFollowingSibling;



xrx.node.AttributeS.prototype.getNodeParent = xrx.node.Attribute.prototype.getNodeParent;



xrx.node.AttributeS.prototype.getNodePreceding = xrx.node.Attribute.prototype.getNodePreceding;



xrx.node.AttributeS.prototype.getNodePrecedingSibling = xrx.node.Attribute.prototype.getNodePrecedingSibling;
