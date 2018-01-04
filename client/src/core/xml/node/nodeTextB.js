/**
 * @fileoverview A class representing a text node
 * implementation working on a binary XML model.
 */

goog.provide('xrx.node.TextB');



goog.require('xrx.xml.Label');
goog.require('xrx.node');
goog.require('xrx.node.Binary');
goog.require('xrx.node.Text');
goog.require('xrx.token');
goog.require('xrx.token.NotTag');
goog.require('xrx.xpath.NodeSet');



/**
 * Creates a binary text node.
 *
 * @param {!xrx.node.Document}
 * @param {!integer} 
 * @constructor
 */
xrx.node.TextB = function(document, key) {

  goog.base(this, xrx.node.TEXT, document, key);
};
goog.inherits(xrx.node.TextB, xrx.node.Binary);




xrx.node.TextB.prototype.getLabel = function() {
  var struct = this.getIndex().getStructuralIndex();
  var label = struct.getLabel(this.key_);
  if (struct.getType(this.key_) === xrx.token.START_TAG) {
    label.push0();
  };
  return label;
};



xrx.node.TextB.prototype.getOffset = function() {
  var struct = this.getIndex().getStructuralIndex();
  var offset = struct.getOffset(this.key_);
  var length1 = struct.getLength1(this.key_);
  return offset + length1;
};



xrx.node.TextB.prototype.getLength = function() {
  var struct = this.getIndex().getStructuralIndex();
  var length1 = struct.getLength1(this.key_);
  var legnth2 = struct.getLength2(this.key_);
  return legnth2 - length1;
};



xrx.node.TextB.prototype.isSameAs = xrx.node.Text.prototype.isSameAs;



xrx.node.TextB.prototype.isBefore = xrx.node.Text.prototype.isBefore;



xrx.node.TextB.prototype.isAfter = xrx.node.Text.prototype.isAfter;



xrx.node.TextB.prototype.isAncestorOf = xrx.node.Text.prototype.isAncestorOf;



xrx.node.TextB.prototype.isAttributeOf = xrx.node.Text.prototype.isAttributeOf;



xrx.node.TextB.prototype.isChildOf = xrx.node.Text.prototype.isChildOf;



xrx.node.TextB.prototype.isDescendantOf = xrx.node.Text.prototype.isDescendantOf;



xrx.node.TextB.prototype.isFollowingOf = xrx.node.Text.prototype.isFollowingOf;



xrx.node.TextB.prototype.isFollowingSiblingOf = xrx.node.Text.prototype.isFollowingSiblingOf;



xrx.node.TextB.prototype.isParentOf = xrx.node.Text.prototype.isParentOf;



xrx.node.TextB.prototype.isPrecedingOf = xrx.node.Text.prototype.isPrecedingOf;



xrx.node.TextB.prototype.isPrecedingSiblingOf = xrx.node.Text.prototype.isPrecedingSiblingOf;



xrx.node.TextB.prototype.getName = xrx.node.Text.prototype.getName;



xrx.node.TextB.prototype.getNamespaceUri = xrx.node.Text.prototype.getNamespaceUri;



xrx.node.TextB.prototype.getStringValue = xrx.node.Text.prototype.getStringValue;



xrx.node.TextB.prototype.getXml = xrx.node.Text.prototype.getXml;



xrx.node.TextB.prototype.getNodeAncestor = xrx.node.Text.prototype.getNodeAncestor;



xrx.node.TextB.prototype.getNodeAttribute = xrx.node.Text.prototype.getNodeAttribute;



xrx.node.TextB.prototype.getNodeChild = xrx.node.Text.prototype.getNodeChild;



xrx.node.TextB.prototype.getNodeDescendant = xrx.node.Text.prototype.getNodeDescendant;



xrx.node.TextB.prototype.getNodeFollowing = xrx.node.Text.prototype.getNodeFollowing;



/**
 * 
 */
xrx.node.TextB.prototype.getNodeFollowingSibling = function(test) {
  var stop = this.getLabel(this.key_).clone();
  stop.parent();
  return this.find(test, xrx.node[this.impl_.Text].prototype.isPrecedingSiblingOf,
      false, stop);
};



xrx.node.TextB.prototype.getNodeParent = function(test) {
  var nodeset = new xrx.xpath.NodeSet();
  var element = new xrx.node.ElementB(this.getDocument(), this.key_);
  if (test.matches(element)) nodeset.add(element);
  return nodeset;
};



xrx.node.TextB.prototype.getNodePreceding = xrx.node.Text.prototype.getNodePreceding;



xrx.node.TextB.prototype.getNodePrecedingSibling = xrx.node.Text.prototype.getNodePrecedingSibling;



/**
 * @param {!xrx.xml.Label}
 */
xrx.node.TextB.prototype.forward = function(stop, needTextNode) {
  var self = this;
  var struct = this.getIndex().getStructuralIndex();
  var type;

  struct.atKey(this.key_);
  do {
    type = struct.getType();

    switch(type) {
    case xrx.token.START_TAG:
      self.eventNode(new xrx.node.ElementB(self.getDocument(), struct.getKey()));
      break;
    case xrx.token.EMPTY_TAG:
      self.eventNode(new xrx.node.ElementB(self.getDocument(), struct.getKey()));
      break;
    default:
      break;
    };

    if (needTextNode && struct.getLength1() !== struct.getLength2()) {
      self.eventNode(new xrx.node.TextB(self.getDocument(), struct.getKey()));
    }

    if (type === xrx.token.END_TAG && struct.getLabel().sameAs(stop)) break;

  } while (struct.next());
};



/**
 * @param {!xrx.xml.Label}
 */
xrx.node.TextB.prototype.backward = function(stop, needTextNode) {
  var self = this;
  var struct = this.getIndex().getStructuralIndex();
  var type;

  struct.atKey(this.key_);
  do {
    type = struct.getType();

    if (needTextNode && struct.getLength1() !== struct.getLength2()) {
      self.eventNode(new xrx.node.TextB(self.getDocument(), struct.getKey()));
    }

    switch(type) {
    case xrx.token.START_TAG:
      self.eventNode(new xrx.node.ElementB(self.getDocument(), struct.getKey()));
      break;
    case xrx.token.EMPTY_TAG:
      self.eventNode(new xrx.node.ElementB(self.getDocument(), struct.getKey()));
      break;
    default:
      break;
    };

    if (type === xrx.token.END_TAG && struct.getLabel().sameAs(stop)) break;

  } while (struct.previous());
};



/**
 * @private
 */
xrx.node.TextB.prototype.find = xrx.node.Node.prototype.find;
