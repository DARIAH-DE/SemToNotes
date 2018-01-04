/**
 * @fileoverview A class representing a element node
 * implementation working on a binary XML model.
 */

goog.provide('xrx.node.ElementB');



goog.require('xrx.node');
goog.require('xrx.node.Element');
goog.require('xrx.node.Binary');
goog.require('xrx.token');
goog.require('xrx.token.EndTag');
goog.require('xrx.xpath.NodeSet');



/**
 * Creates a binary element node.
 *
 * @param {!xrx.node.Document}
 * @param {!integer} 
 * @constructor
 */
xrx.node.ElementB = function(document, key) {

  goog.base(this, xrx.node.ELEMENT, document, key);
};
goog.inherits(xrx.node.ElementB, xrx.node.Binary);



/**
 * 
 */
xrx.node.ElementB.prototype.getLabel = function() {
  return this.getIndex().getStructuralIndex().getLabel(this.key_);
};



/**
 * 
 */
xrx.node.ElementB.prototype.getOffset = function() {
  return this.getIndex().getStructuralIndex().getOffset(this.key_);
};



/**
 * 
 */
xrx.node.ElementB.prototype.getLength = function() {
  return this.getIndex().getStructuralIndex().getLength1(this.key_);
};



/**
 *
 */
xrx.node.ElementB.prototype.isSameAs = xrx.node.Element.prototype.isSameAs;



/**
 *
 */
xrx.node.ElementB.prototype.isBefore = xrx.node.Element.prototype.isBefore;



/**
 *
 */
xrx.node.ElementB.prototype.isAfter = xrx.node.Element.prototype.isAfter;



/**
 *
 */
xrx.node.ElementB.prototype.isAncestorOf = xrx.node.Element.prototype.isAncestorOf;



/**
 *
 */
xrx.node.ElementB.prototype.isAttributeOf = xrx.node.Element.prototype.isAttributeOf;



/**
 *
 */
xrx.node.ElementB.prototype.isChildOf = xrx.node.Element.prototype.isChildOf;



/**
 *
 */
xrx.node.ElementB.prototype.isDescendantOf = xrx.node.Element.prototype.isDescendantOf;



/**
 *
 */
xrx.node.ElementB.prototype.isFollowingOf = xrx.node.Element.prototype.isFollowingOf;



/**
 *
 */
xrx.node.ElementB.prototype.isFollowingSiblingOf = xrx.node.Element.prototype.isFollowingSiblingOf;



/**
 *
 */
xrx.node.ElementB.prototype.isParentOf = xrx.node.Element.prototype.isParentOf;



/**
 *
 */
xrx.node.ElementB.prototype.isPrecedingOf = xrx.node.Element.prototype.isPrecedingOf;



/**
 *
 */
xrx.node.ElementB.prototype.isPrecedingSiblingOf = xrx.node.Element.prototype.isPrecedingSiblingOf;



/**
 *
 */
xrx.node.ElementB.prototype.getName = function() {
  var self = this;
  var inst = this.getDocument().getInstance();
  var struct = inst.getIndex().getStructuralIndex();
  var xml = inst.xml().substr(struct.getOffset(self.key_), struct.getLength1(self.key_));
  var loc = inst.getStream().tagName(xml);
  return xml.substr(loc.offset, loc.length);
};



/**
 * 
 */
xrx.node.ElementB.prototype.getNamespaceUri = function(prefix) {
  var inst = this.getDocument().getInstance();
  var ns = inst.getIndex().getNamespace(this.getLabel(), prefix);
  return ns ? ns.uri : '';
};



/**
 * 
 */
xrx.node.ElementB.prototype.getStringValue = function() {
  var struct = this.getIndex().getStructuralIndex();
  struct.atKey(this.getKey());

  if (struct.getType() === xrx.token.EMPTY_TAG) return '';

  var string = '';
  var xml = this.getDocument().getInstance().xml();
  var selfLabel = this.getLabel();

  do {
    if (struct.getType() === xrx.token.END_TAG && 
        struct.getLabel().sameAs(selfLabel)) break;
    string += xml.substr(struct.getOffset() + struct.getLength1(),
        struct.getLength2() - struct.getLength1());
  } while (struct.next());

  return string;
};



/**
 * 
 */
xrx.node.ElementB.prototype.getXml = function() {
  var xml = this.getDocument().getInstance().xml();
  var struct = this.getIndex().getStructuralIndex();
  if (struct.getType(this.key_) === xrx.token.EMPTY_TAG) {
    return xml.substr(this.getOffset(), this.getLength());
  } else {
    var key = struct.createKey(xrx.token.END_TAG, this.getLabel());

    return xml.substring(this.getOffset(), struct.getOffset(key) +
        struct.getLength1(key));
  }
};



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeAncestor = xrx.node.Element.prototype.getNodeAncestor;



/**
 * 
 */
xrx.node.ElementB.prototype.getAttributes = xrx.node.Element.prototype.getAttributes;



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeAttribute = function(test) {
  var self = this;
  var instance = this.getDocument().getInstance();
  var nodeset = new xrx.xpath.NodeSet();
  var xml = instance.xml().substr(this.getOffset(), this.getLength());
  var locs = instance.getStream().attributes(xml);
  var i = 0;
  var attr;
  var add = function(l) {
    attr = new xrx.node.AttributeB(parseInt(l), self);
    if (test.matches(attr)) nodeset.add(attr);
  };
  for(var l in locs) { add(l); };
  return nodeset;
};



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeChild = function(test) {
  var element;
  var text;
  var tmp;
  var type;
  var nodeset = new xrx.xpath.NodeSet();
  var struct = this.getIndex().getStructuralIndex();
  struct.atKey(this.key_);
  var needTextNode = test.needsTextNode();

  // first text node
  if (needTextNode && struct.getLength1() !== struct.getLength2()) {
    text = new xrx.node.TextB(this.getDocument(), struct.getKey());
    if (test.matches(text)) {
      nodeset.add(text);
    }
  }

  // rest of nodes
  var label = this.getLabel();
  label.push(1);
  var nextKey = function(label) {
    var key1 = struct.createKey(xrx.token.START_TAG, label);
    var key2 = struct.createKey(xrx.token.EMPTY_TAG, label);
    var exists = struct.atKey(key1);
    if (!exists) exists = struct.atKey(key2);
    return exists;
  };
  var isKey = nextKey(label);
  while(isKey) {
    var type = struct.getType();
    element = new xrx.node.ElementB(this.getDocument(), struct.getKey());
    if (test.matches(element)) {
      nodeset.add(element);
    }
    if (type !== xrx.token.START_TAG && needTextNode &&
        struct.getLength1() !== struct.getLength2()) {
      text = new xrx.node.TextB(this.getDocument(), struct.getKey());
      if (test.matches(text)) {
        nodeset.add(text);
      }
    }
    if (type === xrx.token.START_TAG && needTextNode) {
      var key = struct.createKey(xrx.token.END_TAG, label);
      struct.atKey(key);
      if (struct.getLength1() !== struct.getLength2()) {
        text = new xrx.node.TextB(this.getDocument(), struct.getKey());
        if (test.matches(text)) {
          nodeset.add(text);
        }
      }
    }
    label.nextSibling();
    isKey = nextKey(label);
  };
  return nodeset;
};



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeDescendant = xrx.node.Element.prototype.getNodeDescendant;



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeFollowing = xrx.node.Element.prototype.getNodeFollowing;



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeFollowingSibling = xrx.node.Element.prototype.getNodeFollowingSibling;



/**
 * 
 */
xrx.node.ElementB.prototype.getNodeParent = xrx.node.Element.prototype.getNodeParent;



/**
 * 
 */
xrx.node.ElementB.prototype.getNodePreceding = xrx.node.Element.prototype.getNodePreceding;



/**
 * 
 */
xrx.node.ElementB.prototype.getNodePrecedingSibling = xrx.node.Element.prototype.getNodePrecedingSibling;



/**
 * @param {!xrx.xml.Label}
 */
xrx.node.ElementB.prototype.forward = function(stop, needTextNode) {
  var self = this;
  var struct = this.getIndex().getStructuralIndex();
  var type;

  struct.atKey(this.getKey());
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

    if (type === xrx.token.END_TAG &&
        struct.getLabel().sameAs(stop)) break;

  } while (struct.next());
};



/**
 * @param {!xrx.xml.Label}
 */
xrx.node.ElementB.prototype.backward = function(stop, needTextNode) {
  var self = this;
  var struct = this.getIndex().getStructuralIndex();
  var type;

  struct.atKey(this.getKey());
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

    if (type === xrx.token.END_TAG &&
        struct.getLabel().sameAs(stop)) break;

  } while (struct.previous());
};



/**
 * 
 */
xrx.node.ElementB.prototype.find = xrx.node.Node.prototype.find;
