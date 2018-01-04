/**
 * @fileoverview A class implementing the text node
 * type for streaming XPath evaluation.
 */

goog.provide('xrx.node.TextS');


goog.require('xrx.node');
goog.require('xrx.node.Text');
goog.require('xrx.node.Streaming');
goog.require('xrx.token');
goog.require('xrx.token.NotTag');



/**
 * Constructs a new streaming text node.
 *
 * @param {!xrx.node.Document} instance
 * @param {!xrx.token} tag
 * @param {!integer} length
 * @constructor
 */
xrx.node.TextS = function(document, tag, length) {
  goog.base(this, xrx.node.TEXT, document, null);



  this.tag_ = tag;



  this.length_ = length;
};
goog.inherits(xrx.node.TextS, xrx.node.Streaming);



/**
 * 
 */
xrx.node.TextS.prototype.getToken = function() {
  return new xrx.token.NotTag(this.getLabel(), this.getOffset(),
      this.getLength());
};




/**
 * 
 */
xrx.node.TextS.prototype.getLabel = function() {
  var label = this.tag_.label().clone();
  if (this.tag_.type() === xrx.token.START_TAG) {
    label.push0();
  } else if (this.tag_.type() === xrx.token.END_TAG) {
    var tmp = label.pop();
    label.push(tmp + .5);
  } else {};

  return label;
};



/**
 * 
 */
xrx.node.TextS.prototype.getOffset = function() {
  return this.tag_.offset() + this.tag_.length();
};



/**
 * 
 */
xrx.node.TextS.prototype.getLength = function() {
  return this.length_;
};



/**
 * 
 */
xrx.node.TextS.prototype.isSameAs = xrx.node.Text.prototype.isSameAs;



/**
 * 
 */
xrx.node.TextS.prototype.isBefore = xrx.node.Text.prototype.isBefore;



/**
 * 
 */
xrx.node.TextS.prototype.isAfter = xrx.node.Text.prototype.isAfter;



/**
 * 
 */
xrx.node.TextS.prototype.isAncestorOf = xrx.node.Text.prototype.isAncestorOf;



/**
 * 
 */
xrx.node.TextS.prototype.isAttributeOf = xrx.node.Text.prototype.isAttributeOf;



/**
 * 
 */
xrx.node.TextS.prototype.isChildOf = xrx.node.Text.prototype.isChildOf;



/**
 * 
 */
xrx.node.TextS.prototype.isDescendantOf = xrx.node.Text.prototype.isDescendantOf;



/**
 * 
 */
xrx.node.TextS.prototype.isFollowingOf = xrx.node.Text.prototype.isFollowingOf;



/**
 * 
 */
xrx.node.TextS.prototype.isFollowingSiblingOf = xrx.node.Text.prototype.isFollowingSiblingOf;



/**
 * 
 */
xrx.node.TextS.prototype.isParentOf = xrx.node.Text.prototype.isParentOf;



/**
 * 
 */
xrx.node.TextS.prototype.isPrecedingOf = xrx.node.Text.prototype.isPrecedingOf;



/**
 * 
 */
xrx.node.TextS.prototype.isPrecedingSiblingOf = xrx.node.Text.prototype.isPrecedingSiblingOf;



/**
 * 
 */
xrx.node.TextS.prototype.getName = xrx.node.Text.prototype.getName;



/**
 * 
 */
xrx.node.TextS.prototype.getNamespaceUri = xrx.node.Text.prototype.getNamespaceUri;



/**
 * 
 */
xrx.node.TextS.prototype.getStringValue = xrx.node.Text.prototype.getStringValue;



/**
 * 
 */
xrx.node.TextS.prototype.getXml = xrx.node.Text.prototype.getXml;



/**
 * 
 */
xrx.node.TextS.prototype.getNodeAncestor = xrx.node.Text.prototype.getNodeAncestor;



/**
 * 
 */
xrx.node.TextS.prototype.getNodeAttribute = xrx.node.Text.prototype.getNodeAttribute;



/**
 * 
 */
xrx.node.TextS.prototype.getNodeChild = xrx.node.Text.prototype.getNodeChild;



/**
 * 
 */
xrx.node.TextS.prototype.getNodeDescendant = xrx.node.Text.prototype.getNodeDescendant;



/**
 * 
 */
xrx.node.TextS.prototype.getNodeFollowing = xrx.node.Text.prototype.getNodeFollowing;



/**
 * 
 */
xrx.node.TextS.prototype.getNodeFollowingSibling = function(test) {
  var stop = this.tag_.label().clone();
  stop.parent();

  return this.find(test, xrx.node[this.impl_.Text].prototype.isPrecedingSiblingOf,
      false, stop);
};



/**
 * 
 */
xrx.node.TextS.prototype.getNodeParent = function(test) {
  var nodeset = new xrx.xpath.NodeSet();
  var element = new xrx.node.ElementS(this.getDocument().getInstance(), this.tag_);

  if (test.matches(element)) nodeset.add(element);

  return nodeset;
};



/**
 * 
 */
xrx.node.TextS.prototype.getNodePreceding = xrx.node.Text.prototype.getNodePreceding;



/**
 * 
 */
xrx.node.TextS.prototype.getNodePrecedingSibling = xrx.node.Text.prototype.getNodePrecedingSibling;




/**
 * @param {!xrx.xml.Label}
 */
xrx.node.TextS.prototype.forward = function(stop) {
  var self = this;
  var traverse = new xrx.xml.Traverse(this.getDocument().getInstance().xml());
  var token;

  traverse.rowStartTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.StartTag(label.clone(), offset, length1);
    self.eventNode(new xrx.node.ElementS(self.getDocument(), tag));
    if (length1 !== length2) {
      self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
  };

  traverse.rowEmptyTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.EmptyTag(label.clone(), offset, length1);

    self.eventNode(new xrx.node.ElementS(self.getDocument(), tag));
    if (length1 !== length2) {
      self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
  };

  traverse.rowEndTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.EndTag(label.clone(), offset, length1);

    if (length1 !== length2) {
      self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
    if (label.sameAs(stop)) traverse.stop();
  };

  traverse.forward(self.tag_);
};



/**
 * @param {!xrx.xml.Label}
 */
xrx.node.TextS.prototype.backward = function(stop) {
  var self = this;
  var traverse = new xrx.xml.Traverse(this.getDocument().getInstance().xml());
  var token;

  traverse.rowStartTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.StartTag(label.clone(), offset, length1);

    if (length1 !== length2) {
      //self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
    self.eventNode(new xrx.node.ElementS(self.getDocument(), tag));
    if (label.sameAs(stop)) traverse.stop();
  };

  traverse.rowEmptyTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.EmptyTag(label.clone(), offset, length1);

    if (length1 !== length2) {
      //self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
    self.eventNode(new xrx.node.ElementS(self.getDocument(), tag));
    if (label.sameAs(stop)) traverse.stop();
  };

  traverse.rowEndTag = function(label, offset, length1, length2) {
    var tag = new xrx.token.EndTag(label.clone(), offset, length1);

    if (length1 !== length2) {
      //self.eventNode(new xrx.node.TextS(self.getDocument(), tag, length2 - length1));
    }
  };
  traverse.backward(self.tag_);
};

