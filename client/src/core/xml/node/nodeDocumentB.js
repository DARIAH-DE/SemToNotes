/**
 * @fileoverview A class representing a document node
 *     implementation working on a binary XML model.
 */

goog.provide('xrx.node.DocumentB');



goog.require('xrx.index.Index');
goog.require('xrx.xml.Label');
goog.require('xrx.node');
goog.require('xrx.node.Binary');
goog.require('xrx.node.Document');
goog.require('xrx.token');
goog.require('xrx.xpath.NodeSet');



/**
 * Creates a binary document node.
 *
 * @param {!string} instanceId The ID of the instance. 
 * @constructor
 */
xrx.node.DocumentB = function(instanceId) {

  goog.base(this, xrx.node.DOCUMENT, this);

  this.instanceId_ = instanceId;

  this.instance_ = xrx.mvc.getModelComponent(instanceId);

  this.label_ = new xrx.xml.Label();
};
goog.inherits(xrx.node.DocumentB, xrx.node.Binary);



xrx.node.DocumentB.prototype.getInstance = xrx.node.Document.prototype.getInstance;



xrx.node.DocumentB.prototype.getToken = xrx.node.Document.prototype.getToken;



xrx.node.DocumentB.prototype.getLabel = function() {
  return this.label_;
};



xrx.node.DocumentB.prototype.getOffset = xrx.node.Document.prototype.getOffset;



xrx.node.DocumentB.prototype.getLength = xrx.node.Document.prototype.getLength;



xrx.node.DocumentB.prototype.isSameAs = xrx.node.Document.prototype.isSameAs;



xrx.node.DocumentB.prototype.isBefore = xrx.node.Document.prototype.isBefore;



xrx.node.DocumentB.prototype.isAfter = xrx.node.Document.prototype.isAfter;



xrx.node.DocumentB.prototype.isAncestorOf = xrx.node.Document.prototype.isAncestorOf;



xrx.node.DocumentB.prototype.isAttributeOf = xrx.node.Document.prototype.isAttributeOf;



xrx.node.DocumentB.prototype.isChildOf = xrx.node.Document.prototype.isChildOf;



xrx.node.DocumentB.prototype.isDescendantOf = xrx.node.Document.prototype.isDescendantOf;



xrx.node.DocumentB.prototype.isFollowingOf = xrx.node.Document.prototype.isFollowingOf;



xrx.node.DocumentB.prototype.isFollowingSiblingOf = xrx.node.Document.prototype.isFollowingSiblingOf;



xrx.node.DocumentB.prototype.isParentOf = xrx.node.Document.prototype.isParentOf;



xrx.node.DocumentB.prototype.isPrecedingOf = xrx.node.Document.prototype.isPrecedingOf;



xrx.node.DocumentB.prototype.isPrecedingSiblingOf = xrx.node.Document.prototype.isPrecedingSiblingOf;



xrx.node.DocumentB.prototype.getName = xrx.node.Document.prototype.getName;



xrx.node.DocumentB.prototype.getNamespaceUri = xrx.node.Document.prototype.getNamespaceUri;



xrx.node.DocumentB.prototype.getStringValue = function() {
  var struct = this.getIndex().getStructuralIndex();
  var string = '';
  var xml = this.getInstance().xml();

  struct.first();
  do {
    string += xml.substr(struct.getOffset() + struct.getLength1(),
        struct.getLength2() - struct.getLength1());
  } while (struct.next());

  return string;
};



xrx.node.DocumentB.prototype.getXml = xrx.node.Document.prototype.getXml;



xrx.node.DocumentB.prototype.getNodeAncestor = xrx.node.Document.prototype.getNodeAncestor;



xrx.node.DocumentB.prototype.getNodeAttribute = xrx.node.Document.prototype.getNodeAttribute;



xrx.node.DocumentB.prototype.getNodeChild = function(test) {
  var struct = this.getIndex().getStructuralIndex();
  struct.first();
  var nodeset = new xrx.xpath.NodeSet();
  var element = new xrx.node.ElementB(this.getDocument(), struct.getKey());
  if (test.matches(element)) nodeset.add(element);
  return nodeset;
};



xrx.node.DocumentB.prototype.getNodeDescendant = function(test) {
  var nodeset = new xrx.xpath.NodeSet();
  var struct = this.getIndex().getStructuralIndex();
  var element;
  var text;
  var needTextNode = test.needsTextNode();

  struct.first();
  do {

    if (struct.getType() !== xrx.token.END_TAG) {
      element = new xrx.node.ElementB(this.getDocument(), struct.getKey());
      if (test.matches(element)) {
        nodeset.add(element);
      }
    }

    if (needTextNode && struct.getLength1() !== struct.getLength2()) {
      text = new xrx.node.TextB(this.getDocument(), struct.getKey());
      if (test.matches(text)) {
        nodeset.add(text);
      }
    }
 
  } while(struct.next());

  return nodeset;
};



xrx.node.DocumentB.prototype.getNodeFollowing = xrx.node.Document.prototype.getNodeFollowing;



xrx.node.DocumentB.prototype.getNodeFollowingSibling = xrx.node.Document.prototype.getNodeFollowingSibling;



xrx.node.DocumentB.prototype.getNodeParent = xrx.node.Document.prototype.getNodeParent;



xrx.node.DocumentB.prototype.getNodePreceding = xrx.node.Document.prototype.getNodePreceding;



xrx.node.DocumentB.prototype.getNodePrecedingSibling = xrx.node.Document.prototype.getNodePrecedingSibling;

