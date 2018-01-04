/**
 * @fileoverview A node implementation for streaming XPath evaluation.
 */

goog.provide('xrx.node.Streaming');



goog.require('xrx.node');
goog.require('xrx.node.Node');



/**
 * @constructor
 */
xrx.node.Streaming = function(type, document, token) {

  goog.base(this, type, document);

  /**
   * @type {xrx.token}
   * @private
   */
  this.token_ = token;

  /**
   * @type {enum}
   * @private
   */
  this.impl_ = {
    Document: 'DocumentS',
    Element: 'ElementS',
    Attribute: 'AttributeS',
    Text: 'TextS'
  };
};
goog.inherits(xrx.node.Streaming, xrx.node.Node);



/**
 * 
 */
xrx.node.Streaming.prototype.getToken = goog.abstractMethod;



/**
 * 
 */
xrx.node.Streaming.prototype.getLabel = goog.abstractMethod;



/**
 * 
 */
xrx.node.Streaming.prototype.getOffset = goog.abstractMethod;



/**
 * 
 */
xrx.node.Streaming.prototype.getLength = goog.abstractMethod;
