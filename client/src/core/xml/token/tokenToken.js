/**
 * @fileoverview An abstract class representing a token of a XML
 * instance.
 */

goog.provide('xrx.token.Token');



goog.require('xrx.xml.Label');



/**
 * Base class to construct a new token.
 *
 * @param {!number} type The type of the token.
 * @param {?xrx.xml.Label} label The label attached to the token.
 * @param {?number} offset The offset relative to the start of 
 *     the XML stream.
 * @param {?number} length The number of characters occupied 
 *     in the XML stream.
 * @constructor
 */
xrx.token.Token = function(type, opt_label, opt_offset, opt_length) {



  /**
   * @private
   */
  this.type_ = type;



  /**
   * @private
   */
  this.label_ = opt_label;



  /**
   * @private
   */
  this.offset_ = opt_offset;



  /**
   * @private
   */
  this.length_ = opt_length;
};



/**
 * Compares the generic type of two tokens.
 *
 * @param {!number} type The type to check against.
 * @return {!boolean}
 */
xrx.token.Token.prototype.typeOf = function(type) {
  return this.type_ === type;
};



/**
 * Checks if two tokens are the same. 
 * Two tokens are 'the same' if the types and the labels are 
 * identical. Offset and length do not play any role. 
 *
 * @param {!xrx.token} token The token to check against.
 * @return {!boolean}
 */
xrx.token.Token.prototype.sameAs = function(token) {
  return this.typeOf(token.type()) && this.label_.sameAs(token.label());
};



/**
 * See function xrx.token.sameAs(token), but overloading 
 * the type and the label separately.
 *
 * @param {!type} type The type to check against.
 * @param {!label} label The label to check against.
 * @return {!boolean}
 */
xrx.token.Token.prototype.compare = function(type, label) {
  return this.typeOf(type) && this.label_.sameAs(label);
};



/**
 * Indicates whether the token appears before the overloaded
 * token in document-order.
 * 
 * @param {!xrx.token} token The token to compare.
 * @return {!boolean} 
 */
xrx.token.Token.prototype.isBefore = function(token) {
  return this.label_.isBefore(token.label()) || 
      (this.label_.sameAs(token.label()) && this.type_ < token.type());
};



/**
 * Indicates whether the token appears after the overloaded
 * token in document-order.
 * 
 * @param {!xrx.token} token The token to compare.
 * @return {!boolean} 
 */
xrx.token.Token.prototype.isAfter = function(token) {
  return this.label_.isAfter(token.label()) || 
      (this.label_.sameAs(token.label()) && this.type_ > token.type());
};



/**
 * A cumulative setter function for all private members.
 *
 * @param {!number} type The type of the token.
 * @param {!xrx.xml.Label} label The label attached to the token.
 * @param {?number} offset The offset relative to the start of the XML stream.
 * @param {?number} length The number of characters in the XML stream.
 */
xrx.token.Token.prototype.set = function(type, label, offset, length) {
  this.type_ = type;
  this.label_ = label;
  this.offset_ = offset;
  this.length_ = length;
};



/**
 * A combined setter and getter function. Optionally sets the
 * type. Returns the type or the new type.
 * 
 * @param {?number} opt_type The value to be set (optional).
 * @return {!number}
 */
xrx.token.Token.prototype.type = function(opt_type) {
  if (opt_type !== undefined) this.type_ = opt_type;
  return this.type_;
};



/**
 * A combined setter and getter function. Optionally sets the
 * label. Returns the label or the new label.
 * 
 * @param {?number} opt_label The value to be set (optional).
 * @return {!number}
 */
xrx.token.Token.prototype.label = function(opt_label) {
  if (opt_label !== undefined) this.label_ = opt_label;
  return this.label_;
};



/**
 * A combined setter and getter function. Optionally sets the
 * offset. Returns the offset or the new offset.
 * 
 * @param {?number} opt_offset The value to be set (optional).
 * @return {!number}
 */
xrx.token.Token.prototype.offset = function(opt_offset) {
  if (opt_offset !== undefined) this.offset_ = opt_offset;
  return this.offset_;
};



/**
 * A combined setter and getter function. Optionally sets the
 * length. Returns the length or the new length.
 * 
 * @param {?number} opt_length The value to be set (optional).
 * @return {!number}
 */
xrx.token.Token.prototype.length = function(opt_length) {
  if (opt_length !== undefined) this.length_ = opt_length;
  return this.length_;
};



/**
 * Returns the XML string of a token in a XML stream.
 * 
 * @param {!string} stream A XML stream.
 * @return {!string} The token string.
 */
xrx.token.Token.prototype.xml = function(stream) {
  return stream.substr(this.offset_, this.length_);
};
