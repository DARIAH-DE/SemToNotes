 /**
 * @fileoverview An abstract class representing a XML node.
 */

goog.provide('xrx.node.Node');



goog.require('xrx.node');
goog.require('xrx.node.Document');
goog.require('xrx.token');
goog.require('xrx.xpath.NodeSet');



/**
 * Base class for all XML nodes.
 * 
 * @param {!integer} type The node type.
 * @param {!xrx.node.Document} document The document node.
 * @constructor
 */
xrx.node.Node = function(type, document) {

  /**
   * @type {xrx.node}
   * @private
   */
  this.type_ = type;

  /**
   * @type {xrx.node.Document}
   * @private
   */
  this.document_ = document;
};



/**
 * Returns the the node's document.
 * @return {!xrx.node.Document} The document.
 */
xrx.node.Node.prototype.getInstance = function() {
  return this.document_.getInstance();
};



/**
 * Returns the the node's document.
 * @return {!xrx.node.Document} The document.
 */
xrx.node.Node.prototype.getDocument = function() {
  return this.document_;
};



/**
 * Returns the type of the node.
 * @return {!integer} The type.
 */
xrx.node.Node.prototype.getType = function() {
  return this.type_;
};



/**
 *
 */
xrx.node.Node.prototype.getNameLocal = function() {
  return xrx.node.getNameLocal(this.getName());
};



/**
 *
 */
xrx.node.Node.prototype.getNamePrefix = function() {
  return xrx.node.getNamePrefix(this.getName());
};



/**
 *
 */
xrx.node.Node.prototype.getNameExpanded = function() {
  return xrx.node.getNameExpanded(this.getNamespaceUri(),
    this.getNameLocal(this.getName()));
};



/**
 * Returns the string-value of the required type from a node.
 *
 * @param {!xrx.node} node The node to get value from.
 * @return {string} The value required.
 */
xrx.node.Node.prototype.getValueAsString = function() {
  return this.getStringValue();
};



/**
 * Returns the string-value of the required type from a node, casted to number.
 *
 * @param {!xrx.node} node The node to get value from.
 * @return {number} The value required.
 */
xrx.node.Node.prototype.getValueAsNumber = function() {
  return +this.getValueAsString();
};



/**
 * Returns the string-value of the required type from a node, casted to boolean.
 *
 * @param {!xrx.node} node The node to get value from.
 * @return {boolean} The value required.
 */
xrx.node.Node.prototype.getValueAsBool = function() {
  return !!this.getValueAsString();
};



/**
 * @private
 */
xrx.node.Node.prototype.find = function(test, axisTest, reverse, stop) {
  var self = this;
  var selfLabel = self.getLabel();
  var nodeset = new xrx.xpath.NodeSet();

  this.eventNode = function(node) {
    if (self.getDocument().getInstance() === node.getDocument().getInstance() && axisTest.call(self, node) &&
        test.matches(node)) {
      reverse ? nodeset.unshift(node) : nodeset.add(node);
    }
  };
  
  reverse ? this.backward(stop, test.needsTextNode()) : 
      this.forward(stop, test.needsTextNode());
  return nodeset;
};



/**
 * Interface.
 * Each node implementation and each node type must implement 
 * the functions below.
 */



/**
 * Identity and positional functions
 */
xrx.node.Node.prototype.isSameAs = goog.abstractMethod;
xrx.node.Node.prototype.isBefore = goog.abstractMethod;
xrx.node.Node.prototype.isAfter = goog.abstractMethod;



/**
 * Axis functions
 */
xrx.node.Node.prototype.isAncestorOf = goog.abstractMethod;
xrx.node.Node.prototype.isAttributeOf = goog.abstractMethod;
xrx.node.Node.prototype.isChildOf = goog.abstractMethod;
xrx.node.Node.prototype.isDescendantOf = goog.abstractMethod;
xrx.node.Node.prototype.isFollowingOf = goog.abstractMethod;
xrx.node.Node.prototype.isFollowingSiblingOf = goog.abstractMethod;
xrx.node.Node.prototype.isParentOf = goog.abstractMethod;
xrx.node.Node.prototype.isPrecedingOf = goog.abstractMethod;
xrx.node.Node.prototype.isPrecedingSiblingOf = goog.abstractMethod;



/**
 * Name functions
 */
xrx.node.Node.prototype.getName = goog.abstractMethod;
xrx.node.Node.prototype.getNamespaceUri = goog.abstractMethod;



/**
 * Content functions
 */
xrx.node.Node.prototype.getStringValue = goog.abstractMethod;
xrx.node.Node.prototype.getXml = goog.abstractMethod;



/**
 * Node access functions
 */
xrx.node.Node.prototype.getNodeAncestor = goog.abstractMethod;
xrx.node.Node.prototype.getNodeAttribute = goog.abstractMethod;
xrx.node.Node.prototype.getNodeChild = goog.abstractMethod;
xrx.node.Node.prototype.getNodeDescendant = goog.abstractMethod;
xrx.node.Node.prototype.getNodeFollowing = goog.abstractMethod;
xrx.node.Node.prototype.getNodeFollowingSibling = goog.abstractMethod;
xrx.node.Node.prototype.getNodeParent = goog.abstractMethod;
xrx.node.Node.prototype.getNodePreceding = goog.abstractMethod;
xrx.node.Node.prototype.getNodePrecedingSibling = goog.abstractMethod;
