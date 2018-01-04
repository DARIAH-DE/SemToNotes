/**
 * @fileoverview A node implementation based on a binary
 * XML model.
 */

goog.provide('xrx.node.Binary');


goog.require('xrx.node');
goog.require('xrx.node.Node');
goog.require('xrx.token');
goog.require('xrx.xpath.NodeSet');



/**
 * Base class to construct a binary node.
 * @constructor
 */
xrx.node.Binary = function(type, document, key) {

  goog.base(this, type, document);

  /**
   * @type {integer}
   * @private
   */
  this.key_ = key;

  /**
   * @type {enum}
   * @private
   */
  this.impl_ = {
    Document: 'DocumentB',
    Element: 'ElementB',
    Attribute: 'AttributeB',
    Text: 'TextB'
  };
};
goog.inherits(xrx.node.Binary, xrx.node.Node);



/**
 * 
 */
xrx.node.Binary.prototype.getLabel = goog.abstractMethod;



/**
 * 
 */
xrx.node.Binary.prototype.getOffset = goog.abstractMethod;



/**
 * 
 */
xrx.node.Binary.prototype.getLength = goog.abstractMethod;



/**
 * @return {!integer}
 */
xrx.node.Binary.prototype.getKey = function() {
  return this.key_;
};



/**
 * @return {!xrx.index}
 */
xrx.node.Binary.prototype.getIndex = function() {
  return this.document_.getInstance().getIndex();
};
