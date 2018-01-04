/**
 * @fileoverview A class implementing the document node
 * type for streaming XPath evaluation.
 */

goog.provide('xrx.node.DocumentS');



goog.require('xrx.node');
goog.require('xrx.node.Streaming');
goog.require('xrx.node.Document');
goog.require('xrx.xml.Traverse');
goog.require('xrx.xpath.NodeSet');



/**
 * @constructor
 */
xrx.node.DocumentS = function(instanceId) {

  goog.base(this, xrx.node.DOCUMENT, this);

  this.instanceId_ = instanceId;

  this.instance_ = xrx.mvc.getModelComponent(instanceId);

  this.label_ = new xrx.xml.Label();
};
goog.inherits(xrx.node.DocumentS, xrx.node.Streaming);



xrx.node.DocumentS.prototype.getInstance = xrx.node.Document.prototype.getInstance;



xrx.node.DocumentS.prototype.getInstance = xrx.node.Document.prototype.getInstance;



xrx.node.DocumentS.prototype.getToken = xrx.node.Document.prototype.getToken;



xrx.node.DocumentS.prototype.getLabel = function() {
  return this.label_;
};



xrx.node.DocumentS.prototype.getOffset = xrx.node.Document.prototype.getOffset;



xrx.node.DocumentS.prototype.getLength = xrx.node.Document.prototype.getLength;



xrx.node.DocumentS.prototype.isSameAs = xrx.node.Document.prototype.isSameAs;



xrx.node.DocumentS.prototype.isBefore = xrx.node.Document.prototype.isBefore;



xrx.node.DocumentS.prototype.isAfter = xrx.node.Document.prototype.isAfter;



xrx.node.DocumentS.prototype.isAncestorOf = xrx.node.Document.prototype.isAncestorOf;



xrx.node.DocumentS.prototype.isAttributeOf = xrx.node.Document.prototype.isAttributeOf;



xrx.node.DocumentS.prototype.isChildOf = xrx.node.Document.prototype.isChildOf;



xrx.node.DocumentS.prototype.isDescendantOf = xrx.node.Document.prototype.isDescendantOf;



xrx.node.DocumentS.prototype.isFollowingOf = xrx.node.Document.prototype.isFollowingOf;



xrx.node.DocumentS.prototype.isFollowingSiblingOf = xrx.node.Document.prototype.isFollowingSiblingOf;



xrx.node.DocumentS.prototype.isParentOf = xrx.node.Document.prototype.isParentOf;



xrx.node.DocumentS.prototype.isPrecedingOf = xrx.node.Document.prototype.isPrecedingOf;



xrx.node.DocumentS.prototype.isPrecedingSiblingOf = xrx.node.Document.prototype.isPrecedingSiblingOf;



xrx.node.DocumentS.prototype.getName = xrx.node.Document.prototype.getName;



xrx.node.DocumentS.prototype.getNamespaceUri = xrx.node.Document.prototype.getNamespaceUri;



xrx.node.DocumentS.prototype.getStringValue = function() {
  var xml = this.getInstance().xml();
  var traverse = new xrx.xml.Traverse(xml);
  var string = '';
  var self = this;

  traverse.rowStartTag = function(label, offset, length1, length2) {
    string += xml.substr(offset + length1, length2 - length1);
  };

  traverse.rowEmptyTag = function(label, offset, length1, length2) {
    string += xml.substr(offset + length1, length2 - length1);
  };

  traverse.rowEndTag = function(label, offset, length1, length2) {
    string += xml.substr(offset + length1, length2 - length1);
  };

  traverse.forward();

  return string;
};



xrx.node.DocumentS.prototype.getXml = xrx.node.Document.prototype.getXml;



xrx.node.DocumentS.prototype.getNodeAncestor = xrx.node.Document.prototype.getNodeAncestor;



xrx.node.DocumentS.prototype.getNodeAttribute = xrx.node.Document.prototype.getNodeAttribute;



xrx.node.DocumentS.prototype.getNodeChild = function(test) {

  return this.find(test, xrx.node.DocumentS.prototype.isParentOf, false,
      this.getLabel([1]));
};



xrx.node.DocumentS.prototype.getNodeDescendant = function(test) {

  return this.find(test, xrx.node.DocumentS.prototype.isAncestorOf, false,
      this.getLabel([-1]));
};



xrx.node.DocumentS.prototype.getNodeFollowing = xrx.node.Document.prototype.getNodeFollowing;



xrx.node.DocumentS.prototype.getNodeFollowingSibling = xrx.node.Document.prototype.getNodeFollowingSibling;



xrx.node.DocumentS.prototype.getNodeParent = xrx.node.Document.prototype.getNodeParent;



xrx.node.DocumentS.prototype.getNodePreceding = xrx.node.Document.prototype.getNodePreceding;



xrx.node.DocumentS.prototype.getNodePrecedingSibling = xrx.node.Document.prototype.getNodePrecedingSibling;



/**
 * @param {!xrx.xml.Label}
 */
xrx.node.DocumentS.prototype.forward = function(stop) {
  var self = this;
  var traverse = new xrx.xml.Traverse(this.getInstance().xml());
  var token;

  traverse.rowStartTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.StartTag(label.clone(), offset, length1);
    self.eventNode(new xrx.node.ElementS(self.getDocument(), tag));
    if (length1 !== length2) {
      self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
    if (label.sameAs(stop)) traverse.stop();
  };

  traverse.rowEmptyTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.EmptyTag(label.clone(), offset, length1);

    self.eventNode(new xrx.node.ElementS(self.getDocument(), tag));
    if (length1 !== length2) {
      self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
    if (label.sameAs(stop)) traverse.stop();
  };

  traverse.rowEndTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.EndTag(label.clone(), offset, length1);

    if (length1 !== length2) {
      self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
  };

  traverse.forward();
};



/**
 * @private
 */
xrx.node.DocumentS.prototype.find = xrx.node.Node.prototype.find;



